import { appendInboundSmsToSubmission } from './googleSheetsDrive.js';
import { getInboundSmsIntent, normalizePhoneNumber } from './twilioSms.js';
import { BRAND_NAME, SUPPORT_EMAIL } from '../src/legal/legalConfig.js';

async function readFormBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
  }

  return Object.fromEntries(new URLSearchParams(raw));
}

function twimlResponse(message = '') {
  const escaped = message
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

  return `<?xml version="1.0" encoding="UTF-8"?><Response>${escaped ? `<Message>${escaped}</Message>` : ''}</Response>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = await readFormBody(req);
    const fromPhoneNumber = normalizePhoneNumber(body.From);
    const intent = getInboundSmsIntent(body.Body);

    await appendInboundSmsToSubmission(
      fromPhoneNumber,
      {
        sid: body.MessageSid || '',
        body: body.Body || '',
        from: fromPhoneNumber,
        to: body.To || '',
        receivedAt: new Date().toISOString(),
      },
      process.env,
    );

    res.setHeader('Content-Type', 'text/xml');

    if (intent === 'stop') {
      return res
        .status(200)
        .send(
          twimlResponse(
            `${BRAND_NAME}: You’ve been unsubscribed from text updates about your inquiry and scheduled call. No further messages will be sent.`,
          ),
        );
    }

    if (intent === 'help') {
      return res
        .status(200)
        .send(
          twimlResponse(
            `${BRAND_NAME}: For help with your inquiry or scheduled call, email ${SUPPORT_EMAIL}. Message frequency varies. Message and data rates may apply.`,
          ),
        );
    }

    return res.status(200).send(twimlResponse());
  } catch (error) {
    console.error('POST /api/twilio-webhook failed', {
      message: error instanceof Error ? error.message : 'Unknown Twilio webhook failure',
      stack: error instanceof Error ? error.stack : undefined,
    });

    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(twimlResponse());
  }
}
