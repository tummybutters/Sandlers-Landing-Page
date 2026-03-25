export const BRAND_NAME = 'Qortana';
export const COMPANY_LEGAL_NAME = 'Qortana';
export const LEGAL_VERSION = '2026-03-25';
export const LEGAL_EFFECTIVE_DATE = 'March 25, 2026';
export const LEGAL_LAST_UPDATED = 'March 25, 2026';
export const SUPPORT_EMAIL = 'legal@yourdomain.com';
export const SUPPORT_PHONE = '(000) 000-0000';
export const POSTAL_ADDRESS_LINES = ['Your Company Mailing Address'];
export const GOVERNING_LAW_STATE = 'California';
export const GOVERNING_VENUE = 'Orange County, California';
export const PRIVACY_RIGHTS_EMAIL = 'privacy@yourdomain.com';

export const LEGAL_ROUTES = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/messaging-terms', label: 'Messaging Terms' },
];

export const LEGAL_CONSENT_PARTS = [
  { type: 'text', value: 'I have read and agree to the ' },
  { type: 'link', value: 'Privacy Policy', to: '/privacy' },
  { type: 'text', value: ' and ' },
  { type: 'link', value: 'Terms of Service', to: '/terms' },
  { type: 'text', value: '.' },
];

export const LEGAL_CONSENT_LABEL_TEXT =
  'I have read and agree to the Privacy Policy and Terms of Service.';

export const SMS_CONSENT_SCOPE = 'inquiry_and_scheduled_call';

export const SMS_CONSENT_LABEL_TEXT = `I agree to receive text messages from ${BRAND_NAME} about my inquiry and scheduled call, including confirmations, reminders, rescheduling, and direct follow-up. Message frequency varies. Message and data rates may apply. Reply STOP to opt out and HELP for help. Consent is not a condition of purchase.`;

export const SMS_CONSENT_HELP_PARTS = [
  { type: 'text', value: 'See the ' },
  { type: 'link', value: 'Messaging Terms', to: '/messaging-terms' },
  { type: 'text', value: ' for full SMS program details.' },
];

export function formatContactLines() {
  return [
    COMPANY_LEGAL_NAME,
    ...POSTAL_ADDRESS_LINES,
    SUPPORT_EMAIL,
    SUPPORT_PHONE,
  ];
}
