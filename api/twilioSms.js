const DEFAULT_SMS_TEMPLATE =
  "Hey, this is Summer from Qortana. We work with Malohn Capital and got your form submission. We're on it, and I'll text you again soon with your live website link.";

export function normalizePhoneNumber(rawPhoneNumber) {
  const input = `${rawPhoneNumber || ''}`.trim();
  if (!input) {
    return '';
  }

  const digits = input.replace(/\D/g, '');

  if (input.startsWith('+') && digits.length >= 10) {
    return `+${digits}`;
  }

  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }

  throw new Error('Phone number must be a valid US number with 10 digits or include a country code');
}

function getTwilioAuth(env) {
  if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN || !env.TWILIO_PHONE_NUMBER) {
    throw new Error(
      'Twilio is not fully configured. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER.',
    );
  }

  return {
    accountSid: env.TWILIO_ACCOUNT_SID,
    authToken: env.TWILIO_AUTH_TOKEN,
    phoneNumber: normalizePhoneNumber(env.TWILIO_PHONE_NUMBER),
  };
}

function buildBasicAuthHeader(accountSid, authToken) {
  return `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`;
}

export async function sendInitialIntakeSms(submission, env) {
  const { accountSid, authToken, phoneNumber: from } = getTwilioAuth(env);
  const to = normalizePhoneNumber(submission.customer.phoneNumber);
  const body = env.TWILIO_INTAKE_CONFIRMATION_MESSAGE || DEFAULT_SMS_TEMPLATE;

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: buildBasicAuthHeader(accountSid, authToken),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: new URLSearchParams({
        To: to,
        From: from,
        Body: body,
      }),
    },
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || `Twilio SMS send failed with status ${response.status}`,
    );
  }

  return {
    sid: data.sid || '',
    status: data.status || 'queued',
    from,
    to,
    body,
    sentAt: new Date().toISOString(),
  };
}
