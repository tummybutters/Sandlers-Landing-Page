import { recordPaymentConfirmationSms, updateSubmissionFromStripe } from './googleSheetsDrive.js';
import { getStripe, getStripeWebhookSecret } from './stripeCheckout.js';
import { sendPaymentConfirmedSms } from './twilioSms.js';

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

function getSubmissionId(checkoutSession) {
  return checkoutSession.client_reference_id || checkoutSession.metadata?.submission_id || '';
}

function isPaymentConfirmedEvent(event) {
  return (
    (event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded') &&
    event.data.object?.payment_status === 'paid'
  );
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const signature = req.headers['stripe-signature'];
    if (!signature) {
      return res.status(400).json({ error: 'Missing Stripe signature' });
    }

    const stripe = getStripe(process.env);
    const secret = getStripeWebhookSecret(process.env);
    const rawBody = await readRawBody(req);
    const event = stripe.webhooks.constructEvent(rawBody, signature, secret);

    if (isPaymentConfirmedEvent(event)) {
      try {
        await updateSubmissionFromStripe(event.data.object, process.env);
      } catch (error) {
        console.error('Stripe webhook Google Sheets sync failed', {
          eventId: event.id,
          eventType: event.type,
          submissionId: getSubmissionId(event.data.object),
          checkoutSessionId: event.data.object?.id || '',
          message: error instanceof Error ? error.message : 'Unknown webhook sync failure',
          stack: error instanceof Error ? error.stack : undefined,
        });
      }

      try {
        const smsResult = await sendPaymentConfirmedSms(event.data.object, process.env);

        if (smsResult) {
          try {
            await recordPaymentConfirmationSms(event.data.object, smsResult, process.env);
          } catch (error) {
            console.error('Stripe payment confirmation SMS sheet sync failed', {
              eventId: event.id,
              eventType: event.type,
              submissionId: getSubmissionId(event.data.object),
              checkoutSessionId: event.data.object?.id || '',
              message: error instanceof Error ? error.message : 'Unknown payment confirmation SMS sheet sync failure',
              stack: error instanceof Error ? error.stack : undefined,
            });
          }
        }
      } catch (error) {
        console.error('Stripe payment confirmation SMS failed', {
          eventId: event.id,
          eventType: event.type,
          submissionId: getSubmissionId(event.data.object),
          checkoutSessionId: event.data.object?.id || '',
          message: error instanceof Error ? error.message : 'Unknown payment confirmation SMS failure',
          stack: error instanceof Error ? error.stack : undefined,
        });
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    return res.status(400).json({
      error: error instanceof Error ? error.message : 'Webhook processing failed',
    });
  }
}
