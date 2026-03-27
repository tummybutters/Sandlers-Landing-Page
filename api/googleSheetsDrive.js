import { google } from 'googleapis';

export const SHEET_COLUMNS = {
  submissionId: 'record_submission_id',
  createdAt: 'record_created_at_utc',
  updatedAt: 'record_updated_at_utc',
  submissionStatus: 'pipeline_submission_status',
  paymentStatus: 'billing_payment_status',
  buildStatus: 'delivery_build_status',
  domainStatus: 'delivery_domain_status',
  notificationStatus: 'outreach_notification_status',
  businessName: 'client_business_name',
  contactEmail: 'client_contact_email',
  phoneNumber: 'client_phone_e164',
  businessAddress: 'client_business_address',
  serviceArea: 'client_service_area',
  domainPrimary: 'website_domain_primary',
  domainSecondary: 'website_domain_secondary',
  domainTertiary: 'website_domain_tertiary',
  templateId: 'website_template_id',
  templateName: 'website_template_name',
  templateDescription: 'website_template_description',
  preferredContact: 'contact_preference',
  legalAccepted: 'consent_legal_accepted',
  legalAcceptedAt: 'consent_legal_accepted_at_utc',
  legalVersion: 'consent_legal_version',
  smsOptIn: 'consent_sms_opt_in',
  smsOptInAt: 'consent_sms_opt_in_at_utc',
  smsOptOutAt: 'consent_sms_opt_out_at_utc',
  smsHelpRequestedAt: 'consent_sms_help_requested_at_utc',
  smsConsentScope: 'consent_sms_scope',
  consentAuditJson: 'consent_audit_json',
  logoFileName: 'asset_logo_file_name',
  logoMimeType: 'asset_logo_mime_type',
  logoBlobPathname: 'asset_logo_storage_pathname',
  logoBlobUrl: 'asset_logo_storage_url',
  smsStatus: 'messaging_sms_status',
  twilioFromNumber: 'messaging_twilio_from_number',
  twilioToNumber: 'messaging_twilio_to_number',
  twilioLastOutboundSid: 'messaging_last_outbound_sid',
  twilioLastOutboundBody: 'messaging_last_outbound_body',
  twilioLastOutboundAt: 'messaging_last_outbound_at_utc',
  twilioLastInboundBody: 'messaging_last_inbound_body',
  twilioLastInboundAt: 'messaging_last_inbound_at_utc',
  smsThreadJson: 'messaging_thread_json',
  stripeCheckoutSessionId: 'billing_stripe_checkout_session_id',
  stripeCustomerId: 'billing_stripe_customer_id',
  stripeSubscriptionId: 'billing_stripe_subscription_id',
  stripePaymentIntentId: 'billing_stripe_payment_intent_id',
  paidAt: 'billing_paid_at_utc',
  rawIntakeJson: 'intake_raw_json',
  websiteJson: 'website_context_json',
};

export const SHEET_HEADERS = [
  SHEET_COLUMNS.submissionId,
  SHEET_COLUMNS.createdAt,
  SHEET_COLUMNS.updatedAt,
  SHEET_COLUMNS.submissionStatus,
  SHEET_COLUMNS.paymentStatus,
  SHEET_COLUMNS.buildStatus,
  SHEET_COLUMNS.domainStatus,
  SHEET_COLUMNS.notificationStatus,
  SHEET_COLUMNS.businessName,
  SHEET_COLUMNS.contactEmail,
  SHEET_COLUMNS.phoneNumber,
  SHEET_COLUMNS.businessAddress,
  SHEET_COLUMNS.serviceArea,
  SHEET_COLUMNS.domainPrimary,
  SHEET_COLUMNS.domainSecondary,
  SHEET_COLUMNS.domainTertiary,
  SHEET_COLUMNS.templateId,
  SHEET_COLUMNS.templateName,
  SHEET_COLUMNS.templateDescription,
  SHEET_COLUMNS.preferredContact,
  SHEET_COLUMNS.legalAccepted,
  SHEET_COLUMNS.legalAcceptedAt,
  SHEET_COLUMNS.legalVersion,
  SHEET_COLUMNS.smsOptIn,
  SHEET_COLUMNS.smsOptInAt,
  SHEET_COLUMNS.smsOptOutAt,
  SHEET_COLUMNS.smsHelpRequestedAt,
  SHEET_COLUMNS.smsConsentScope,
  SHEET_COLUMNS.consentAuditJson,
  SHEET_COLUMNS.logoFileName,
  SHEET_COLUMNS.logoMimeType,
  SHEET_COLUMNS.logoBlobPathname,
  SHEET_COLUMNS.logoBlobUrl,
  SHEET_COLUMNS.smsStatus,
  SHEET_COLUMNS.twilioFromNumber,
  SHEET_COLUMNS.twilioToNumber,
  SHEET_COLUMNS.twilioLastOutboundSid,
  SHEET_COLUMNS.twilioLastOutboundBody,
  SHEET_COLUMNS.twilioLastOutboundAt,
  SHEET_COLUMNS.twilioLastInboundBody,
  SHEET_COLUMNS.twilioLastInboundAt,
  SHEET_COLUMNS.smsThreadJson,
  SHEET_COLUMNS.stripeCheckoutSessionId,
  SHEET_COLUMNS.stripeCustomerId,
  SHEET_COLUMNS.stripeSubscriptionId,
  SHEET_COLUMNS.stripePaymentIntentId,
  SHEET_COLUMNS.paidAt,
  SHEET_COLUMNS.rawIntakeJson,
  SHEET_COLUMNS.websiteJson,
];

export const SANDLER_SHEET_HEADERS = [
  'record_submission_id',
  'record_source',
  'record_created_at_utc',
  'record_updated_at_utc',
  'ops_lifecycle_stage',
  'ops_intake_status',
  'ops_verification_status',
  'ops_booking_status',
  'ops_onboarding_status',
  'ops_owner',
  'ops_priority',
  'ops_next_action',
  'ops_ai_summary',
  'ops_internal_notes',
  'client_business_name',
  'client_full_name',
  'client_contact_email',
  'client_phone_e164',
  'client_service_area',
  'contact_preference',
  'agent_role_type',
  'agent_business_structure',
  'sales_top_services',
  'workflow_biggest_time_sink',
  'workflow_active_opportunity_volume',
  'workflow_weekly_quote_volume',
  'workflow_recurring_workflow_tasks',
  'workflow_current_stall_point',
  'systems_active_systems',
  'systems_priority_accounts',
  'workflow_file_storage_home',
  'workflow_commission_tracking',
  'governance_required_approvals',
  'value_immediate_value',
  'consent_legal_accepted',
  'consent_legal_accepted_at_utc',
  'intake_label',
  'intake_raw_json',
];

function columnNumberToLetter(columnNumber) {
  let number = columnNumber;
  let output = '';

  while (number > 0) {
    const remainder = (number - 1) % 26;
    output = String.fromCharCode(65 + remainder) + output;
    number = Math.floor((number - 1) / 26);
  }

  return output;
}

function isPermissionError(error) {
  const status = error?.code || error?.status || error?.response?.status;
  return status === 401 || status === 403;
}

function isNotFoundError(error) {
  const status = error?.code || error?.status || error?.response?.status;
  return status === 404;
}

function formatGoogleAccessError(resourceLabel, env, error) {
  const serviceAccount = env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 'the configured Google service account';
  return new Error(
    `${resourceLabel} access denied for ${serviceAccount}. Share the ${resourceLabel.toLowerCase()} with that service account and make sure the Google API is enabled.`,
    { cause: error instanceof Error ? error : undefined },
  );
}

function formatGoogleNotFoundError(resourceLabel, identifier, error) {
  return new Error(
    `${resourceLabel} not found for id ${identifier}. Verify the ID in Vercel and make sure the resource still exists.`,
    { cause: error instanceof Error ? error : undefined },
  );
}

function getGoogleAuth(env) {
  const clientEmail = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Google service account credentials are not configured');
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

function getSheetRange(sheetName, headerCount) {
  return `${sheetName}!A:${columnNumberToLetter(headerCount)}`;
}

function getRowRange(sheetName, rowNumber, headerCount) {
  return `${sheetName}!A${rowNumber}:${columnNumberToLetter(headerCount)}${rowNumber}`;
}

function resolveSheetName(env, submission) {
  const defaultSheetName = env.GOOGLE_SHEETS_SHEET_NAME || 'Submissions';
  const sandlerSheetName = env.GOOGLE_SHEETS_SANDLER_SHEET_NAME || 'sandler';
  const rawIntake = submission?.rawIntake || {};

  if (
    submission?.source === 'sandler_agent_intake' ||
    rawIntake.intakeType === 'sandler_agent_intake' ||
    rawIntake.landingVariant === 'sales_assistant_legacy'
  ) {
    return sandlerSheetName;
  }

  return defaultSheetName;
}

function isSandlerSubmission(submission) {
  const rawIntake = submission?.rawIntake || {};

  return (
    submission?.source === 'sandler_agent_intake' ||
    rawIntake.intakeType === 'sandler_agent_intake' ||
    rawIntake.landingVariant === 'sales_assistant_legacy'
  );
}

function formatCellValue(value) {
  if (Array.isArray(value)) {
    return value.join(' | ');
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  return value || '';
}

function buildDefaultRowValues(submission) {
  const consent = submission.consent || {};
  const messaging = submission.messaging || {};

  return [
    submission.submissionId,
    submission.createdAt,
    submission.updatedAt,
    submission.status,
    submission.paymentStatus,
    submission.buildStatus,
    submission.domainStatus,
    submission.notificationStatus,
    submission.customer.businessName,
    submission.customer.contactEmail,
    submission.customer.phoneNumber,
    submission.customer.businessAddress,
    submission.customer.serviceArea,
    submission.website.domains[0] || '',
    submission.website.domains[1] || '',
    submission.website.domains[2] || '',
    submission.website.template?.id || '',
    submission.website.template?.name || '',
    submission.website.template?.description || '',
    submission.preferredContact,
    consent.legalAccepted ? 'true' : 'false',
    consent.legalAcceptedAt || '',
    consent.legalVersion || '',
    consent.smsOptIn ? 'true' : 'false',
    consent.smsOptInAt || '',
    consent.smsOptOutAt || '',
    consent.smsHelpRequestedAt || '',
    consent.smsConsentScope || '',
    JSON.stringify(consent),
    submission.assets.logo.fileName || '',
    submission.assets.logo.mimeType || '',
    submission.assets.logo.storage.pathname || '',
    submission.assets.logo.storage.url || '',
    messaging.status || '',
    messaging.fromNumber || '',
    messaging.toNumber || '',
    messaging.lastOutboundSid || '',
    messaging.lastOutboundBody || '',
    messaging.lastOutboundAt || '',
    messaging.lastInboundBody || '',
    messaging.lastInboundAt || '',
    JSON.stringify(Array.isArray(messaging.thread) ? messaging.thread : []),
    submission.stripe.checkoutSessionId || '',
    submission.stripe.customerId || '',
    submission.stripe.subscriptionId || '',
    submission.stripe.paymentIntentId || '',
    submission.stripe.paidAt || '',
    JSON.stringify(submission.rawIntake),
    JSON.stringify({
      domains: submission.website.domains,
      template: submission.website.template,
      logo: {
        provided: submission.assets.logo.provided,
        fileName: submission.assets.logo.fileName,
        mimeType: submission.assets.logo.mimeType,
        storage: submission.assets.logo.storage,
      },
    }),
  ];
}

function buildSandlerRowValues(submission) {
  const rawIntake = submission.rawIntake || {};
  const consent = submission.consent || {};
  const customer = submission.customer || {};
  const answers = rawIntake.answers || {};

  return [
    submission.submissionId,
    submission.source || rawIntake.intakeType || '',
    submission.createdAt,
    submission.updatedAt,
    'intake_submitted',
    'new',
    'unreviewed',
    'not_booked',
    'not_started',
    '',
    'normal',
    '',
    '',
    '',
    customer.businessName || rawIntake.businessName || '',
    customer.fullName || rawIntake.fullName || '',
    customer.contactEmail || rawIntake.contactEmail || '',
    customer.phoneNumber || rawIntake.phoneNumber || '',
    customer.serviceArea || rawIntake.territory || '',
    submission.preferredContact || '',
    formatCellValue(rawIntake.roleType || answers.roleType),
    formatCellValue(rawIntake.businessStructure || answers.businessStructure),
    formatCellValue(rawIntake.topServices || answers.topServices),
    formatCellValue(rawIntake.biggestTimeSink || answers.biggestTimeSink),
    formatCellValue(rawIntake.activeOpportunityVolume || answers.activeOpportunityVolume),
    formatCellValue(rawIntake.weeklyQuoteVolume || answers.weeklyQuoteVolume),
    formatCellValue(rawIntake.recurringWorkflowTasks || answers.recurringWorkflowTasks),
    formatCellValue(rawIntake.currentStallPoint || answers.currentStallPoint),
    formatCellValue(rawIntake.activeSystems || answers.activeSystems),
    formatCellValue(rawIntake.priorityAccounts || answers.priorityAccounts),
    formatCellValue(rawIntake.fileStorageHome || answers.fileStorageHome),
    formatCellValue(rawIntake.commissionTracking || answers.commissionTracking),
    formatCellValue(rawIntake.requiredApprovals || answers.requiredApprovals),
    formatCellValue(rawIntake.immediateValue || answers.immediateValue),
    consent.legalAccepted ? 'true' : 'false',
    consent.legalAcceptedAt || '',
    rawIntake.intakeLabel || 'Sandler Agent Intake',
    JSON.stringify(rawIntake),
  ];
}

function buildRowValues(submission) {
  return isSandlerSubmission(submission)
    ? buildSandlerRowValues(submission)
    : buildDefaultRowValues(submission);
}

function resolveSheetHeaders(submission) {
  return isSandlerSubmission(submission) ? SANDLER_SHEET_HEADERS : SHEET_HEADERS;
}

async function ensureSheetHeaders(sheets, spreadsheetId, sheetName, headers) {
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!1:1`,
  });

  const currentHeaders = existing.data.values?.[0] || [];
  const matches =
    currentHeaders.length === headers.length &&
    currentHeaders.every((value, index) => value === headers[index]);

  if (matches) return;

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!1:1`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [headers],
    },
  });
}

function createRowRecord(headerRow, row) {
  return Object.fromEntries(headerRow.map((header, index) => [header, row[index] || '']));
}

async function getSheetsClient(env, options = {}) {
  const spreadsheetId = env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const sheetName = options.sheetName || resolveSheetName(env, options.submission);
  const headers = options.headers || resolveSheetHeaders(options.submission);

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID is not configured');
  }

  const auth = getGoogleAuth(env);
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    await ensureSheetHeaders(sheets, spreadsheetId, sheetName, headers);
  } catch (error) {
    if (isPermissionError(error)) {
      throw formatGoogleAccessError('Google Sheet', env, error);
    }

    if (isNotFoundError(error)) {
      throw formatGoogleNotFoundError('Google Sheet', spreadsheetId, error);
    }

    throw error;
  }

  return { spreadsheetId, sheetName, sheets, headers };
}

async function getSheetRecords(env, options = {}) {
  const { spreadsheetId, sheetName, sheets, headers } = await getSheetsClient(env, options);
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: getSheetRange(sheetName, headers.length),
  });

  const rows = response.data.values || [];
  const headerRow = rows[0] || headers;

  return { spreadsheetId, sheetName, sheets, rows, headerRow };
}

function parseSmsThread(rowRecord) {
  if (!rowRecord[SHEET_COLUMNS.smsThreadJson]) {
    return [];
  }

  try {
    const parsed = JSON.parse(rowRecord[SHEET_COLUMNS.smsThreadJson]);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function parseConsentAudit(rowRecord) {
  if (!rowRecord[SHEET_COLUMNS.consentAuditJson]) {
    return {};
  }

  try {
    const parsed = JSON.parse(rowRecord[SHEET_COLUMNS.consentAuditJson]);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function isTruthyValue(value) {
  return ['true', '1', 'yes', 'on'].includes(String(value || '').trim().toLowerCase());
}

async function updateRowRecord(env, matchRowIndex, mutateRecord) {
  const { spreadsheetId, sheetName, sheets, rows, headerRow } = await getSheetRecords(env);

  if (matchRowIndex <= 0 || matchRowIndex >= rows.length) {
    throw new Error('Submission row could not be found');
  }

  const rowNumber = matchRowIndex + 1;
  const rowRecord = createRowRecord(headerRow, rows[matchRowIndex]);
  mutateRecord(rowRecord);
  rowRecord.updated_at = new Date().toISOString();

  const updatedRow = headerRow.map((header) => rowRecord[header] || '');

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: getRowRange(sheetName, rowNumber, headerRow.length),
    valueInputOption: 'RAW',
    requestBody: {
      values: [updatedRow],
    },
  });

  return rowRecord;
}

export async function appendSubmissionToSheet(submission, env) {
  const headers = resolveSheetHeaders(submission);
  const { spreadsheetId, sheetName, sheets } = await getSheetsClient(env, { submission, headers });

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: getSheetRange(sheetName, headers.length),
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [buildRowValues(submission)],
      },
    });
  } catch (error) {
    if (isPermissionError(error)) {
      throw formatGoogleAccessError('Google Sheet', env, error);
    }

    if (isNotFoundError(error)) {
      throw formatGoogleNotFoundError('Google Sheet', spreadsheetId, error);
    }

    throw error;
  }
}

export async function updateSubmissionFromStripe(checkoutSession, env) {
  const submissionId =
    checkoutSession.client_reference_id || checkoutSession.metadata?.submission_id || '';

  if (!submissionId) {
    throw new Error('Stripe session is missing submission_id');
  }

  const { rows, headerRow } = await getSheetRecords(env);
  const submissionIndex = headerRow.indexOf(SHEET_COLUMNS.submissionId);
  const matchedRowIndex = rows.findIndex((row, index) => index > 0 && row[submissionIndex] === submissionId);

  if (matchedRowIndex === -1) {
    throw new Error(`No submission found for ${submissionId}`);
  }

  await updateRowRecord(env, matchedRowIndex, (rowRecord) => {
    rowRecord[SHEET_COLUMNS.submissionStatus] = 'paid';
    rowRecord[SHEET_COLUMNS.paymentStatus] = 'paid';
    rowRecord[SHEET_COLUMNS.stripeCheckoutSessionId] = checkoutSession.id || '';
    rowRecord[SHEET_COLUMNS.stripeCustomerId] = checkoutSession.customer || '';
    rowRecord[SHEET_COLUMNS.stripeSubscriptionId] = checkoutSession.subscription || '';
    rowRecord[SHEET_COLUMNS.stripePaymentIntentId] = checkoutSession.payment_intent || '';
    rowRecord[SHEET_COLUMNS.paidAt] = new Date().toISOString();
  });

  return { submissionId };
}

export async function recordPaymentConfirmationSms(checkoutSession, smsResult, env) {
  const submissionId =
    checkoutSession.client_reference_id || checkoutSession.metadata?.submission_id || '';

  if (!submissionId) {
    throw new Error('Stripe session is missing submission_id');
  }

  const { rows, headerRow } = await getSheetRecords(env);
  const submissionIndex = headerRow.indexOf(SHEET_COLUMNS.submissionId);
  const matchedRowIndex = rows.findIndex((row, index) => index > 0 && row[submissionIndex] === submissionId);

  if (matchedRowIndex === -1) {
    throw new Error(`No submission found for ${submissionId}`);
  }

  await updateRowRecord(env, matchedRowIndex, (rowRecord) => {
    const thread = parseSmsThread(rowRecord);
    thread.push({
      sid: smsResult.sid,
      direction: 'outbound',
      body: smsResult.body,
      from: smsResult.from,
      to: smsResult.to,
      at: smsResult.sentAt,
      status: smsResult.status,
    });

    rowRecord[SHEET_COLUMNS.notificationStatus] = 'sent';
    rowRecord[SHEET_COLUMNS.smsStatus] = smsResult.status || 'sent';
    rowRecord[SHEET_COLUMNS.twilioFromNumber] = smsResult.from || rowRecord[SHEET_COLUMNS.twilioFromNumber];
    rowRecord[SHEET_COLUMNS.twilioToNumber] = smsResult.to || rowRecord[SHEET_COLUMNS.twilioToNumber];
    rowRecord[SHEET_COLUMNS.twilioLastOutboundSid] = smsResult.sid || '';
    rowRecord[SHEET_COLUMNS.twilioLastOutboundBody] = smsResult.body || '';
    rowRecord[SHEET_COLUMNS.twilioLastOutboundAt] = smsResult.sentAt || '';
    rowRecord[SHEET_COLUMNS.smsThreadJson] = JSON.stringify(thread);
  });

  return { submissionId };
}

export async function appendInboundSmsToSubmission(fromPhoneNumber, message, env) {
  const { rows, headerRow } = await getSheetRecords(env);
  const phoneIndex = headerRow.indexOf(SHEET_COLUMNS.phoneNumber);

  const matchedRowIndex = [...rows.keys()]
    .reverse()
    .find((index) => index > 0 && rows[index][phoneIndex] === fromPhoneNumber);

  if (matchedRowIndex === undefined) {
    throw new Error(`No submission found for phone number ${fromPhoneNumber}`);
  }

  const updated = await updateRowRecord(env, matchedRowIndex, (rowRecord) => {
    const thread = parseSmsThread(rowRecord);
    const consentAudit = parseConsentAudit(rowRecord);
    const normalizedBody = String(message.body || '').trim().toUpperCase();
    thread.push({
      sid: message.sid,
      direction: 'inbound',
      body: message.body,
      from: message.from,
      to: message.to,
      at: message.receivedAt,
      status: 'received',
    });

    if (['STOP', 'STOPALL', 'UNSUBSCRIBE', 'CANCEL', 'END', 'QUIT'].includes(normalizedBody)) {
      rowRecord[SHEET_COLUMNS.notificationStatus] = 'sms_opted_out';
      rowRecord[SHEET_COLUMNS.smsStatus] = 'revoked';
      rowRecord[SHEET_COLUMNS.smsOptIn] = 'false';
      rowRecord[SHEET_COLUMNS.smsOptOutAt] = message.receivedAt;
      consentAudit.smsOptIn = false;
      consentAudit.smsOptOutAt = message.receivedAt;
    } else if (['HELP', 'INFO', 'SUPPORT'].includes(normalizedBody)) {
      rowRecord[SHEET_COLUMNS.notificationStatus] = 'sms_help_requested';
      rowRecord[SHEET_COLUMNS.smsStatus] = 'help_requested';
      rowRecord[SHEET_COLUMNS.smsHelpRequestedAt] = message.receivedAt;
      consentAudit.smsHelpRequestedAt = message.receivedAt;
    } else {
      rowRecord[SHEET_COLUMNS.notificationStatus] = 'replied';
      rowRecord[SHEET_COLUMNS.smsStatus] = isTruthyValue(rowRecord[SHEET_COLUMNS.smsOptIn])
        ? 'replied'
        : rowRecord[SHEET_COLUMNS.smsStatus] || 'received';
    }

    rowRecord[SHEET_COLUMNS.twilioFromNumber] = rowRecord[SHEET_COLUMNS.twilioFromNumber] || message.to || '';
    rowRecord[SHEET_COLUMNS.twilioToNumber] = message.from || rowRecord[SHEET_COLUMNS.twilioToNumber];
    rowRecord[SHEET_COLUMNS.twilioLastInboundBody] = message.body;
    rowRecord[SHEET_COLUMNS.twilioLastInboundAt] = message.receivedAt;
    rowRecord[SHEET_COLUMNS.smsThreadJson] = JSON.stringify(thread);
    rowRecord[SHEET_COLUMNS.consentAuditJson] = JSON.stringify({
      ...consentAudit,
      capture:
        consentAudit.capture && typeof consentAudit.capture === 'object'
          ? consentAudit.capture
          : {},
    });
  });

  return { submissionId: updated[SHEET_COLUMNS.submissionId] };
}
