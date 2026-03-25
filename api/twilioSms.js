const DEFAULT_PAYMENT_CONFIRMED_SMS =
  "Hey! This is Summer from Qortana Websites. We work directly with Malohn Capital and just received your payment. We’ll begin building your website now, and you can expect the next update from this number within 24 hours. If you have any questions in the meantime, please reach out to your Malohn Capital rep.";

const STOP_KEYWORDS = new Set(['STOP', 'STOPALL', 'UNSUBSCRIBE', 'CANCEL', 'END', 'QUIT']);
const HELP_KEYWORDS = new Set(['HELP', 'INFO', 'SUPPORT']);

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

export function getInboundSmsIntent(body) {
  const normalized = String(body || '').trim().toUpperCase();

  if (STOP_KEYWORDS.has(normalized)) {
    return 'stop';
  }

  if (HELP_KEYWORDS.has(normalized)) {
    return 'help';
  }

  return 'message';
}

export function canSendOperationalSms(submission) {
  return Boolean(
    submission?.consent?.smsOptIn &&
      !submission?.consent?.smsOptOutAt &&
      submission?.customer?.phoneNumber,
  );
}

export async function sendOperationalSms(submission, body, env) {
  if (!canSendOperationalSms(submission)) {
    throw new Error('SMS consent is not active for this submission');
  }

  return sendTwilioSms(submission.customer.phoneNumber, body, env);
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
  const to =
    checkoutSession.customer_details?.phone ||
    checkoutSession.metadata?.phone_number ||
    '';

  if (!to) {
    throw new Error('Stripe checkout session is missing a phone number for payment confirmation SMS');
  }

  return sendTwilioSms(to, DEFAULT_PAYMENT_CONFIRMED_SMS, env);
}
