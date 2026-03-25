import { processIntakeSubmission } from './intakeFlow.js';

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
  }

  return raw ? JSON.parse(raw) : {};
}

function getRequestOrigin(req) {
  const forwardedProto = req.headers['x-forwarded-proto'];
  const host = req.headers['x-forwarded-host'] || req.headers.host;

  if (!host) {
    return '';
  }

  const proto = forwardedProto || (host.includes('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = await readJsonBody(req);
    const result = await processIntakeSubmission(body, {
      ...process.env,
      REQUEST_ORIGIN: getRequestOrigin(req),
      REQUEST_USER_AGENT: req.headers['user-agent'] || '',
    });
    return res.status(result.status).json(result.payload);
  } catch (error) {
    const status = error instanceof SyntaxError ? 400 : 500;
    const message =
      error instanceof SyntaxError
        ? 'Request body must be valid JSON'
        : error instanceof Error
          ? error.message
          : 'Failed to process intake submission';

    console.error('POST /api/intake failed', {
      message,
      stack: error instanceof Error ? error.stack : undefined,
    });

    return res.status(status).json({
      error: message,
    });
  }
}
