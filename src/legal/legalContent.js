import {
  BRAND_NAME,
  COMPANY_LEGAL_NAME,
  GOVERNING_LAW_STATE,
  GOVERNING_VENUE,
  LEGAL_EFFECTIVE_DATE,
  LEGAL_LAST_UPDATED,
  LEGAL_ROUTES,
  LEGAL_VERSION,
  PRIVACY_RIGHTS_EMAIL,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
} from './legalConfig';

export const LEGAL_PAGE_CONTENT = {
  privacy: {
    route: '/privacy',
    title: 'Privacy Policy',
    eyebrow: 'Privacy',
    intro: `${COMPANY_LEGAL_NAME} doing business as ${BRAND_NAME} respects your privacy. This Privacy Policy explains how we collect, use, disclose, and protect personal information when you visit our website, submit an intake form, schedule a call, communicate with us by email or text message, or otherwise interact with us.`,
    sections: [
      {
        title: 'Effective Dates',
        paragraphs: [
          `Effective Date: ${LEGAL_EFFECTIVE_DATE}`,
          `Last Updated: ${LEGAL_LAST_UPDATED}`,
          `Version: ${LEGAL_VERSION}`,
        ],
      },
      {
        title: 'Notice at Collection',
        paragraphs: [
          'At or before the point we collect personal information, we tell you the categories of information we collect and the business or commercial purposes for using it. In this intake funnel, that generally includes identifiers and contact details, business information, scheduling information, communications data, and website usage data.',
          'We collect this information to review your inquiry, decide whether there is a fit, schedule and administer calls, send service-related communications, maintain records of consent and opt-out preferences, improve our site and operations, secure our systems, and comply with legal obligations.',
        ],
      },
      {
        title: 'Information We Collect',
        bullets: [
          'Contact and identity information, such as your name, email address, phone number, job title, company name, and company website.',
          'Business and intake information, such as the workflows, systems, approval boundaries, goals, pain points, and operational context you provide through our intake flow.',
          'Scheduling and communication information, such as booked-call details, rescheduling activity, call-related notes, and the communications we exchange with you.',
          'Consent and compliance information, such as whether you accepted our legal terms, whether you opted in to SMS reminders, timestamps, message scope, device or browser details, and opt-out history.',
          'Website and technical information, such as IP address, browser type, referral source, page views, timestamps, and cookie or analytics data collected automatically.',
        ],
      },
      {
        title: 'How We Use Information',
        bullets: [
          'To review, qualify, and respond to your inquiry.',
          'To schedule, confirm, administer, reschedule, and follow up on strategy calls and related meetings.',
          'To send service-related emails and, if you opt in, inquiry-related and call-related text messages.',
          'To document consent, opt-in, opt-out, and communication history.',
          'To operate, secure, troubleshoot, and improve our website, intake flow, and internal systems.',
          'To enforce our agreements, protect our rights, prevent fraud, and comply with legal obligations.',
        ],
      },
      {
        title: 'Email and Text Messages',
        paragraphs: [
          `If you provide your email address, we may email you about your inquiry, scheduling, confirmations, reminders, rescheduling, and related administrative communications. If a message is promotional in nature, we will provide a lawful unsubscribe method and honor applicable opt-out requests.`,
          `If you provide your mobile number and separately opt in, we may send text messages from ${BRAND_NAME} about your inquiry and scheduled call, including confirmations, reminders, rescheduling, and direct follow-up. Message frequency varies. Message and data rates may apply. You may opt out at any time by replying STOP or by using another reasonable opt-out method we make available. You may request help by replying HELP.`,
          'We honor applicable revocation and opt-out requests in accordance with applicable law and maintain records of those requests for compliance purposes.',
        ],
      },
      {
        title: 'How We Share Information',
        paragraphs: [
          'We do not sell your personal information for money, and we do not share mobile phone numbers or SMS opt-in data with third parties for their own marketing or promotional purposes.',
          'We may disclose personal information to service providers and contractors that help us run the website, intake flow, scheduling, CRM, analytics, hosting, document storage, email delivery, and text messaging infrastructure. We may also disclose information to professional advisors, insurers, regulators, law enforcement, and counterparties in a merger, financing, or similar transaction when legally permitted or required.',
        ],
      },
      {
        title: 'Cookies and Analytics',
        paragraphs: [
          'We may use cookies, pixels, analytics tools, and similar technologies to understand site usage, maintain performance, improve the funnel, and measure operational effectiveness. You can usually control cookies through your browser settings, although disabling some technologies may affect site functionality.',
        ],
      },
      {
        title: 'Retention and Security',
        paragraphs: [
          'We retain personal information for as long as reasonably necessary to respond to inquiries, administer scheduling, preserve business and legal records, document consent and opt-out history, provide services, resolve disputes, and comply with applicable law.',
          'We use reasonable administrative, technical, and physical safeguards designed to protect personal information. No method of storage or transmission is completely secure, so we cannot guarantee absolute security.',
        ],
      },
      {
        title: 'California Privacy Rights',
        paragraphs: [
          'If you are a California resident, you may have rights under the CCPA, as amended, including the right to know, delete, correct, and obtain information about certain uses of your personal information, and the right to opt out of the sale or sharing of personal information if those activities occur.',
          'We do not currently sell or share personal information for cross-context behavioral advertising through this intake funnel. If that changes, we will update this policy and provide any legally required notice and controls.',
          `To submit a privacy request or ask a question about your rights, contact us at ${PRIVACY_RIGHTS_EMAIL}. We may need to verify your identity before completing a request.`,
        ],
      },
      {
        title: 'Your Choices',
        bullets: [
          'You may choose not to provide requested information, although that may limit our ability to review your inquiry or schedule a call.',
          'You may opt out of marketing emails by using the unsubscribe method in those emails.',
          'You may opt out of call-related text messages by replying STOP or by using another reasonable opt-out method we make available.',
          'You may contact us to request access, correction, or deletion where applicable.',
        ],
      },
      {
        title: 'Third-Party Services',
        paragraphs: [
          'Our website and workflow may rely on third-party services such as scheduling providers, hosting providers, analytics providers, Google Workspace tools, and SMS providers. Their handling of your information is subject to their own terms and privacy practices.',
        ],
      },
      {
        title: 'Children and International Visitors',
        paragraphs: [
          'Our website and services are not directed to children under 13, and we do not knowingly collect personal information from children under 13 through this intake flow.',
          'If you access the website from outside the United States, you understand that your information may be transferred to and processed in the United States or other jurisdictions where our service providers operate.',
        ],
      },
      {
        title: 'Changes and Contact',
        paragraphs: [
          'We may update this Privacy Policy from time to time. When we do, we will revise the Last Updated date and, where required, provide any additional notice.',
          `Questions about this Privacy Policy can be sent to ${SUPPORT_EMAIL} or ${SUPPORT_PHONE}.`,
        ],
        contact: true,
      },
    ],
  },
  terms: {
    route: '/terms',
    title: 'Terms of Service',
    eyebrow: 'Terms',
    intro: `These Terms of Service govern your access to and use of the ${BRAND_NAME} website, intake forms, scheduling pages, communications, and related services.`,
    sections: [
      {
        title: 'Effective Dates',
        paragraphs: [
          `Effective Date: ${LEGAL_EFFECTIVE_DATE}`,
          `Last Updated: ${LEGAL_LAST_UPDATED}`,
          `Version: ${LEGAL_VERSION}`,
        ],
      },
      {
        title: 'Use of the Website',
        paragraphs: [
          'This website is intended to provide information about our services and allow prospective clients, partners, and contacts to submit inquiries and schedule calls. You agree to use the website only for lawful purposes and in a way that does not interfere with the site or the rights of others.',
        ],
      },
      {
        title: 'Eligibility',
        paragraphs: [
          'You represent that you are at least 18 years old and have authority to act on your own behalf or on behalf of the business or organization you represent.',
        ],
      },
      {
        title: 'No Client Relationship Until Signed Agreement',
        paragraphs: [
          'Submitting a form, booking a call, or exchanging messages with us does not by itself create a client, contractor, partnership, fiduciary, or exclusive business relationship.',
          'Any paid engagement must be set out in a separate written agreement signed by both parties.',
        ],
      },
      {
        title: 'No Guarantee of Results',
        paragraphs: [
          'Any examples, strategy ideas, workflow suggestions, implementation concepts, estimates, or discussions of potential outcomes are informational only unless a separate signed agreement states otherwise. We do not guarantee any specific revenue result, lead volume, operating outcome, or implementation result.',
        ],
      },
      {
        title: 'Your Information and Submissions',
        bullets: [
          'You agree that information you submit will be truthful, accurate, and not misleading.',
          'You will not submit information that violates law, infringes third-party rights, contains harmful code, or includes confidential information you are not authorized to share.',
          'We may use the information you submit in accordance with our Privacy Policy.',
        ],
      },
      {
        title: 'Scheduling and Communications',
        paragraphs: [
          'Scheduled calls are subject to availability and may be rescheduled or canceled by either party. Discovery calls and strategy calls are informational and do not obligate either party to proceed.',
          `By submitting a form or otherwise contacting us, you agree that we may communicate with you electronically regarding your inquiry, scheduling, service administration, and related matters. If you separately opt in to text messages, you authorize ${BRAND_NAME} to send SMS or MMS messages at the number you provide for inquiry-related and call-related communications.`,
          'Message frequency varies. Message and data rates may apply. Consent to receive text messages is not a condition of purchase. You may opt out at any time by replying STOP or by using another reasonable opt-out method we make available.',
        ],
      },
      {
        title: 'Intellectual Property',
        paragraphs: [
          `All content on this website, including text, branding, graphics, layouts, and design elements, is owned by or licensed to ${BRAND_NAME} and is protected by applicable intellectual property laws.`,
          'You may use the website only for internal business evaluation and informational purposes unless we agree otherwise in writing.',
        ],
      },
      {
        title: 'Prohibited Conduct',
        bullets: [
          'Using the website in violation of law or regulation.',
          'Attempting to gain unauthorized access to the site or related systems.',
          'Interfering with the operation, security, or integrity of the site.',
          'Scraping, harvesting, or collecting data from the site without authorization.',
          'Impersonating another person or submitting false or fraudulent information.',
        ],
      },
      {
        title: 'Third-Party Services',
        paragraphs: [
          'We may use or link to third-party services such as scheduling providers, hosting providers, analytics tools, communication tools, and internal workflow systems. We are not responsible for the availability or practices of third-party services.',
        ],
      },
      {
        title: 'Disclaimers',
        paragraphs: [
          'THE WEBSITE, INTAKE FLOW, CONTENT, COMMUNICATIONS, AND RELATED SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS TO THE MAXIMUM EXTENT PERMITTED BY LAW.',
          'TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL IMPLIED WARRANTIES, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.',
        ],
      },
      {
        title: 'Limitation of Liability',
        paragraphs: [
          'TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS OPPORTUNITY, ARISING OUT OF OR RELATING TO YOUR USE OF THE WEBSITE OR YOUR RELIANCE ON WEBSITE CONTENT OR COMMUNICATIONS.',
          'TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO THESE TERMS OR THE WEBSITE WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS (US $100).',
        ],
      },
      {
        title: 'Indemnification',
        paragraphs: [
          'You agree to defend, indemnify, and hold harmless us and our owners, employees, contractors, agents, and affiliates from and against claims, liabilities, damages, losses, costs, and expenses, including reasonable attorneys’ fees, arising out of your use of the website, your submissions, your violation of these Terms, or your violation of law or third-party rights.',
        ],
      },
      {
        title: 'Governing Law and Venue',
        paragraphs: [
          `These Terms are governed by the laws of the State of ${GOVERNING_LAW_STATE}, without regard to conflict-of-law principles.`,
          `Any legal action arising out of or relating to these Terms shall be brought exclusively in the state or federal courts located in ${GOVERNING_VENUE}, and you consent to the personal jurisdiction of those courts.`,
        ],
      },
      {
        title: 'Changes and Contact',
        paragraphs: [
          'We may update these Terms from time to time by posting the revised version on this website and updating the Last Updated date above.',
          `Questions about these Terms can be sent to ${SUPPORT_EMAIL} or ${SUPPORT_PHONE}.`,
        ],
        contact: true,
      },
    ],
  },
  messagingTerms: {
    route: '/messaging-terms',
    title: 'Messaging Terms',
    eyebrow: 'SMS Terms',
    intro: `By opting in to receive text messages from ${BRAND_NAME}, you agree to these Messaging Terms.`,
    sections: [
      {
        title: 'Effective Dates',
        paragraphs: [
          `Effective Date: ${LEGAL_EFFECTIVE_DATE}`,
          `Last Updated: ${LEGAL_LAST_UPDATED}`,
          `Version: ${LEGAL_VERSION}`,
        ],
      },
      {
        title: 'Program Description',
        paragraphs: [
          `${BRAND_NAME} may send you text messages related to your inquiry and scheduled call, including confirmations, reminders, rescheduling, and direct follow-up tied to that inquiry or booking process.`,
          'This SMS program is operational and inquiry-related. It is not intended for ongoing promotional campaigns through this intake funnel.',
        ],
      },
      {
        title: 'Message Frequency and Costs',
        paragraphs: [
          'Message frequency varies based on your interaction with us, your booking activity, and whether rescheduling or follow-up is needed.',
          'Message and data rates may apply according to your mobile carrier plan.',
        ],
      },
      {
        title: 'Opt-Out',
        paragraphs: [
          'You may opt out at any time by replying STOP to any message or by using another reasonable opt-out method we make available.',
          'After you opt out, you may receive one final confirmation message confirming that your opt-out request has been processed.',
        ],
      },
      {
        title: 'Help',
        paragraphs: [
          `For help, reply HELP or contact us at ${SUPPORT_EMAIL} or ${SUPPORT_PHONE}.`,
        ],
      },
      {
        title: 'Consent and Carriers',
        paragraphs: [
          'Consent to receive text messages is not a condition of purchase.',
          'Carriers are not liable for delayed or undelivered messages.',
        ],
      },
      {
        title: 'Related Policies',
        paragraphs: [
          `Your information will be handled in accordance with our ${LEGAL_ROUTES[0].label}, and your use of the website remains subject to our ${LEGAL_ROUTES[1].label}.`,
        ],
      },
    ],
  },
};
