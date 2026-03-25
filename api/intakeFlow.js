import { appendSubmissionToSheet } from './googleSheetsDrive.js';
import { normalizePhoneNumber } from './twilioSms.js';
import {
  LEGAL_CONSENT_LABEL_TEXT,
  LEGAL_VERSION,
  SMS_CONSENT_LABEL_TEXT,
  SMS_CONSENT_SCOPE,
} from '../src/legal/legalConfig.js';

function cloneSubmission(body) {
  return JSON.parse(JSON.stringify(body || {}));
}

function ensureObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function coerceBoolean(value) {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    return ['true', '1', 'yes', 'on'].includes(value.trim().toLowerCase());
  }

  return false;
}

function logNonBlockingFailure(label, error, context = {}) {
  console.error(label, {
    ...context,
    message: error instanceof Error ? error.message : 'Unknown failure',
    stack: error instanceof Error ? error.stack : undefined,
  });
}

function normalizeConsent(incoming, rawIntake, env) {
  const consent = ensureObject(incoming.consent);
  const capture = ensureObject(consent.capture);
  const legalAccepted = coerceBoolean(consent.legalAccepted) || coerceBoolean(rawIntake.legalAccepted);
  const smsOptIn = coerceBoolean(consent.smsOptIn) || coerceBoolean(rawIntake.smsOptIn);
  const createdAt = incoming.createdAt || new Date().toISOString();

  return {
    legalAccepted,
    legalAcceptedAt: legalAccepted ? consent.legalAcceptedAt || createdAt : '',
    legalVersion: consent.legalVersion || LEGAL_VERSION,
    legalLabel: consent.legalLabel || LEGAL_CONSENT_LABEL_TEXT,
    smsOptIn,
    smsOptInAt: smsOptIn ? consent.smsOptInAt || createdAt : '',
    smsOptOutAt: consent.smsOptOutAt || '',
    smsHelpRequestedAt: consent.smsHelpRequestedAt || '',
    smsConsentScope: consent.smsConsentScope || SMS_CONSENT_SCOPE,
    smsConsentLabel: consent.smsConsentLabel || SMS_CONSENT_LABEL_TEXT,
    capture: {
      pagePath: capture.pagePath || '',
      pageUrl: capture.pageUrl || '',
      userAgent: capture.userAgent || env.REQUEST_USER_AGENT || '',
    },
  };
}

function normalizeSubmission(body, env = {}) {
  const incoming = cloneSubmission(body);
  const customer = ensureObject(incoming.customer);
  const rawIntake = ensureObject(incoming.rawIntake);
  const consent = normalizeConsent(incoming, rawIntake, env);
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
    consent,
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
      status: consent.smsOptIn ? 'consented' : 'not_consented',
      consentScope: consent.smsConsentScope,
      fromNumber: '',
      toNumber: normalizedPhone,
      lastOutboundSid: '',
      lastOutboundBody: '',
      lastOutboundAt: '',
      lastInboundBody: '',
      lastInboundAt: '',
      thread: [],
    },
    rawIntake: {
      ...rawIntake,
      legalAccepted: consent.legalAccepted,
      smsOptIn: consent.smsOptIn,
      consentAudit: consent,
    },
  };
}

export async function processIntakeSubmission(body, env) {
  const submission = normalizeSubmission(body, env);

  if (!submission.submissionId) {
    return {
      status: 400,
      payload: { error: 'submissionId is required' },
    };
  }

  if (!submission.consent.legalAccepted) {
    return {
      status: 400,
      payload: { error: 'Privacy Policy and Terms of Service acceptance is required' },
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
