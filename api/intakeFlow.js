import { appendSubmissionToSheet } from './googleSheetsDrive.js';
import { normalizePhoneNumber } from './twilioSms.js';

function cloneSubmission(body) {
  return JSON.parse(JSON.stringify(body || {}));
}

function ensureObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function logNonBlockingFailure(label, error, context = {}) {
  console.error(label, {
    ...context,
    message: error instanceof Error ? error.message : 'Unknown failure',
    stack: error instanceof Error ? error.stack : undefined,
  });
}

function normalizeSubmission(body) {
  const incoming = cloneSubmission(body);
  const customer = ensureObject(incoming.customer);
  const rawIntake = ensureObject(incoming.rawIntake);
  const normalizedPhone = customer.phoneNumber
    ? normalizePhoneNumber(customer.phoneNumber)
    : '';

  return {
    submissionId: incoming.submissionId || '',
    createdAt: incoming.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    source: incoming.source || 'qortana_company_intake',
    status: 'submitted',
    paymentStatus: 'not_applicable',
    buildStatus: 'not_applicable',
    domainStatus: 'not_applicable',
    notificationStatus: 'not_started',
    preferredContact: incoming.preferredContact || 'Email',
    customer: {
      fullName: customer.fullName || rawIntake.fullName || '',
      businessName: customer.businessName || rawIntake.businessName || '',
      contactEmail: customer.contactEmail || rawIntake.contactEmail || '',
      phoneNumber: normalizedPhone,
      businessAddress: customer.businessAddress || '',
      serviceArea: customer.serviceArea || rawIntake.operatingRegion || rawIntake.territory || '',
    },
    website: {
      domains: [],
      template: null,
    },
    assets: {
      logo: {
        provided: false,
        fileName: '',
        mimeType: '',
        sizeBytes: 0,
        base64: '',
        storage: {
          provider: 'vercel_blob',
          pathname: '',
          fileName: '',
          url: '',
        },
      },
    },
    stripe: {
      checkoutSessionId: '',
      checkoutUrl: '',
      customerId: '',
      subscriptionId: '',
      paymentIntentId: '',
      paidAt: '',
      clientReferenceId: incoming.submissionId || '',
      customerEmailPrefill: customer.contactEmail || rawIntake.contactEmail || '',
    },
    automation: {
      buildStartedAt: null,
      buildCompletedAt: null,
      deployedAt: null,
      liveAt: null,
      textSentAt: null,
    },
    messaging: {
      provider: 'twilio',
      status: 'not_started',
      fromNumber: '',
      toNumber: normalizedPhone,
      lastOutboundSid: '',
      lastOutboundBody: '',
      lastOutboundAt: '',
      lastInboundBody: '',
      lastInboundAt: '',
      thread: [],
    },
    rawIntake,
  };
}

export async function processIntakeSubmission(body, env) {
  const submission = normalizeSubmission(body);

  if (!submission.submissionId) {
    return {
      status: 400,
      payload: { error: 'submissionId is required' },
    };
  }

  try {
    await appendSubmissionToSheet(submission, env);
  } catch (error) {
    logNonBlockingFailure('Submission sync to Google Sheets failed', error, {
      submissionId: submission.submissionId,
    });
    throw error;
  }

  return {
    status: 200,
    payload: {
      ok: true,
      submissionId: submission.submissionId,
    },
  };
}
