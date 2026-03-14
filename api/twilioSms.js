const DEFAULT_PAYMENT_CONFIRMED_SMS =
  "Hey, this is Summer from Qortana. Your payment went through and we're building your website now. I'll text you again soon with your live website link.";

function isEnabled(value) {
  return value === '1' || value === 'true';
}

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

async function sendTwilioSms(to, body, env) {
  const { accountSid, authToken, phoneNumber: from } = getTwilioAuth(env);
  const normalizedTo = normalizePhoneNumber(to);

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: buildBasicAuthHeader(accountSid, authToken),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: new URLSearchParams({
        To: normalizedTo,
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
    to: normalizedTo,
    body,
    sentAt: new Date().toISOString(),
  };
}

export async function sendPaymentConfirmedSms(checkoutSession, env) {
  if (!isEnabled(`${env.TWILIO_PAYMENT_CONFIRMED_ENABLED || ''}`.toLowerCase())) {
    return null;
  }

  const to =
    checkoutSession.customer_details?.phone ||
    checkoutSession.metadata?.phone_number ||
    '';

  if (!to) {
    throw new Error('Stripe checkout session is missing a phone number for payment confirmation SMS');
  }

  return sendTwilioSms(to, DEFAULT_PAYMENT_CONFIRMED_SMS, env);
}
