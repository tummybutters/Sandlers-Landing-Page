import { google } from 'googleapis';

export const SHEET_HEADERS = [
  'submission_id',
  'created_at',
  'updated_at',
  'status',
  'payment_status',
  'build_status',
  'domain_status',
  'notification_status',
  'business_name',
  'contact_email',
  'phone_number',
  'business_address',
  'service_area',
  'domain_1',
  'domain_2',
  'domain_3',
  'template_id',
  'template_name',
  'template_description',
  'preferred_contact',
  'logo_file_name',
  'logo_mime_type',
  'logo_blob_pathname',
  'logo_blob_url',
  'sms_status',
  'twilio_from_number',
  'twilio_to_number',
  'twilio_last_outbound_sid',
  'twilio_last_outbound_body',
  'twilio_last_outbound_at',
  'twilio_last_inbound_body',
  'twilio_last_inbound_at',
  'sms_thread_json',
  'stripe_checkout_session_id',
  'stripe_customer_id',
  'stripe_subscription_id',
  'stripe_payment_intent_id',
  'paid_at',
  'raw_intake_json',
  'website_json',
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

function getSheetRange(sheetName) {
  return `${sheetName}!A:${columnNumberToLetter(SHEET_HEADERS.length)}`;
}

function getRowRange(sheetName, rowNumber) {
  return `${sheetName}!A${rowNumber}:${columnNumberToLetter(SHEET_HEADERS.length)}${rowNumber}`;
}

function buildRowValues(submission) {
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

async function ensureSheetHeaders(sheets, spreadsheetId, sheetName) {
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!1:1`,
  });

  const currentHeaders = existing.data.values?.[0] || [];
  const matches =
    currentHeaders.length === SHEET_HEADERS.length &&
    currentHeaders.every((value, index) => value === SHEET_HEADERS[index]);

  if (matches) return;

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!1:1`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [SHEET_HEADERS],
    },
  });
}

function createRowRecord(headerRow, row) {
  return Object.fromEntries(headerRow.map((header, index) => [header, row[index] || '']));
}

async function getSheetsClient(env) {
  const spreadsheetId = env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const sheetName = env.GOOGLE_SHEETS_SHEET_NAME || 'Submissions';

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID is not configured');
  }

  const auth = getGoogleAuth(env);
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    await ensureSheetHeaders(sheets, spreadsheetId, sheetName);
  } catch (error) {
    if (isPermissionError(error)) {
      throw formatGoogleAccessError('Google Sheet', env, error);
    }

    if (isNotFoundError(error)) {
      throw formatGoogleNotFoundError('Google Sheet', spreadsheetId, error);
    }

    throw error;
  }

  return { spreadsheetId, sheetName, sheets };
}

async function getSheetRecords(env) {
  const { spreadsheetId, sheetName, sheets } = await getSheetsClient(env);
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: getSheetRange(sheetName),
  });

  const rows = response.data.values || [];
  const headerRow = rows[0] || SHEET_HEADERS;

  return { spreadsheetId, sheetName, sheets, rows, headerRow };
}

function parseSmsThread(rowRecord) {
  if (!rowRecord.sms_thread_json) {
    return [];
  }

  try {
    const parsed = JSON.parse(rowRecord.sms_thread_json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
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
    range: getRowRange(sheetName, rowNumber),
    valueInputOption: 'RAW',
    requestBody: {
      values: [updatedRow],
    },
  });

  return rowRecord;
}

export async function appendSubmissionToSheet(submission, env) {
  const { spreadsheetId, sheetName, sheets } = await getSheetsClient(env);

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: getSheetRange(sheetName),
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
  const submissionIndex = headerRow.indexOf('submission_id');
  const matchedRowIndex = rows.findIndex((row, index) => index > 0 && row[submissionIndex] === submissionId);

  if (matchedRowIndex === -1) {
    throw new Error(`No submission found for ${submissionId}`);
  }

  await updateRowRecord(env, matchedRowIndex, (rowRecord) => {
    rowRecord.status = 'paid';
    rowRecord.payment_status = 'paid';
    rowRecord.stripe_checkout_session_id = checkoutSession.id || '';
    rowRecord.stripe_customer_id = checkoutSession.customer || '';
    rowRecord.stripe_subscription_id = checkoutSession.subscription || '';
    rowRecord.stripe_payment_intent_id = checkoutSession.payment_intent || '';
    rowRecord.paid_at = new Date().toISOString();
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
  const submissionIndex = headerRow.indexOf('submission_id');
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

    rowRecord.notification_status = 'sent';
    rowRecord.sms_status = smsResult.status || 'sent';
    rowRecord.twilio_from_number = smsResult.from || rowRecord.twilio_from_number;
    rowRecord.twilio_to_number = smsResult.to || rowRecord.twilio_to_number;
    rowRecord.twilio_last_outbound_sid = smsResult.sid || '';
    rowRecord.twilio_last_outbound_body = smsResult.body || '';
    rowRecord.twilio_last_outbound_at = smsResult.sentAt || '';
    rowRecord.sms_thread_json = JSON.stringify(thread);
  });

  return { submissionId };
}

export async function appendInboundSmsToSubmission(fromPhoneNumber, message, env) {
  const { rows, headerRow } = await getSheetRecords(env);
  const phoneIndex = headerRow.indexOf('phone_number');

  const matchedRowIndex = [...rows.keys()]
    .reverse()
    .find((index) => index > 0 && rows[index][phoneIndex] === fromPhoneNumber);

  if (matchedRowIndex === undefined) {
    throw new Error(`No submission found for phone number ${fromPhoneNumber}`);
  }

  const updated = await updateRowRecord(env, matchedRowIndex, (rowRecord) => {
    const thread = parseSmsThread(rowRecord);
    thread.push({
      sid: message.sid,
      direction: 'inbound',
      body: message.body,
      from: message.from,
      to: message.to,
      at: message.receivedAt,
      status: 'received',
    });

    rowRecord.notification_status = 'replied';
    rowRecord.sms_status = 'replied';
    rowRecord.twilio_from_number = rowRecord.twilio_from_number || message.to || '';
    rowRecord.twilio_to_number = message.from || rowRecord.twilio_to_number;
    rowRecord.twilio_last_inbound_body = message.body;
    rowRecord.twilio_last_inbound_at = message.receivedAt;
    rowRecord.sms_thread_json = JSON.stringify(thread);
  });

  return { submissionId: updated.submission_id };
}
