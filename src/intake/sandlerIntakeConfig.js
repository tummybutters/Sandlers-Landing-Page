export const QUESTION_STEPS = [
  {
    id: 'q01_company_model',
    kicker: 'Company Snapshot',
    title: 'What kind of company are you running?',
    description: 'Start with the shape of the business we would be designing for.',
    fields: [
      {
        name: 'companyModel',
        label: 'Select one',
        type: 'radio',
        required: true,
        options: [
          'B2B services firm',
          'Agency / client-services business',
          'SaaS / software company',
          'Ops-heavy local or field-service company',
          'Multi-team company with mixed workflows',
          'Other',
        ],
      },
    ],
  },
  {
    id: 'q02_revenue_band',
    kicker: 'Company Snapshot',
    title: 'What revenue band are you in right now?',
    description: 'A rough range is enough. This helps us calibrate the operating complexity.',
    fields: [
      {
        name: 'revenueBand',
        label: 'Select one',
        type: 'radio',
        required: true,
        options: [
          'Under $2M',
          '$2M-$5M',
          '$5M-$10M',
          '$10M-$25M',
          '$25M-$50M',
          '$50M+',
        ],
      },
    ],
  },
  {
    id: 'q03_operating_region',
    kicker: 'Company Snapshot',
    title: 'Where does the team mainly operate today?',
    description: 'We are mapping the footprint the system would need to support.',
    fields: [
      {
        name: 'operatingRegion',
        label: 'Select one',
        type: 'radio',
        required: true,
        options: [
          'Single city or metro',
          'Regional / multi-city',
          'National',
          'International',
          'Mixed / distributed',
        ],
      },
    ],
  },
  {
    id: 'q04_pressure_teams',
    kicker: 'Workflow Reality',
    title: 'Which teams feel the most operational pressure right now?',
    description: 'Select all that apply.',
    fields: [
      {
        name: 'pressureTeams',
        label: 'Select all that apply',
        type: 'checkbox',
        required: true,
        options: [
          'Sales',
          'Revenue operations / sales admin',
          'Customer operations / support',
          'Project delivery / fulfillment',
          'Leadership / internal routing',
          'Finance / back-office admin',
        ],
      },
    ],
  },
  {
    id: 'q05_biggest_bottleneck',
    kicker: 'Workflow Reality',
    title: 'Where does repetitive work create the most drag today?',
    description: 'Choose the bottleneck that feels the most expensive right now.',
    fields: [
      {
        name: 'biggestBottleneck',
        label: 'Select one',
        type: 'radio',
        required: true,
        options: [
          'Lead qualification and response time',
          'Sales follow-up and CRM hygiene',
          'Inbox triage and internal routing',
          'Customer requests and support operations',
          'Approvals, handoffs, and internal coordination',
          'Reporting, research, and recurring admin work',
        ],
      },
    ],
  },
  {
    id: 'q06_current_systems',
    kicker: 'Systems & Access',
    title: 'Which systems are part of the live workflow today?',
    description: 'Select all that apply.',
    fields: [
      {
        name: 'currentSystems',
        label: 'Select all that apply',
        type: 'checkbox',
        required: true,
        options: [
          'Google Workspace / Gmail',
          'Microsoft 365 / Outlook',
          'Slack',
          'HubSpot / Salesforce / CRM',
          'Airtable / Notion / internal ops databases',
          'Help desk or ticketing tools',
          'Shared files and internal documents',
          'SMS / phone systems',
        ],
      },
    ],
  },
  {
    id: 'q07_target_use_cases',
    kicker: 'Autonomous Agents',
    title: 'Which outcomes would you want autonomous AI handling first?',
    description: 'Select all that apply.',
    fields: [
      {
        name: 'targetUseCases',
        label: 'Select all that apply',
        type: 'checkbox',
        required: true,
        options: [
          'Qualifying and routing inbound leads',
          'Following up across email or SMS',
          'Sales administration and CRM updates',
          'Customer operations and request handling',
          'Internal routing and approval preparation',
          'Research, reporting, or recurring analysis',
          'Scheduling and handoff coordination',
        ],
      },
    ],
  },
  {
    id: 'q08_approval_boundaries',
    kicker: 'Governance',
    title: 'What should always stay behind human approval?',
    description: 'Select all that apply.',
    fields: [
      {
        name: 'approvalBoundaries',
        label: 'Select all that apply',
        type: 'checkbox',
        required: true,
        options: [
          'Outbound emails or messages',
          'CRM writes or stage changes',
          'File or document edits',
          'Proposal, quote, or contract actions',
          'Customer-impacting escalations',
          'Financial or purchasing actions',
        ],
      },
    ],
  },
  {
    id: 'q09_security_priorities',
    kicker: 'Security & Infrastructure',
    title: 'Which deployment constraints matter most?',
    description: 'Select all that apply.',
    fields: [
      {
        name: 'securityPriorities',
        label: 'Select all that apply',
        type: 'checkbox',
        required: true,
        options: [
          'Dedicated client infrastructure',
          'Sandboxed runtimes and isolation',
          'Credential separation and secrets management',
          'Network and file-system boundaries',
          'Audit trails and activity logging',
          'SSO or access-control requirements',
          'We need guidance here',
        ],
      },
    ],
  },
  {
    id: 'q10_ai_maturity',
    kicker: 'Readiness',
    title: 'How far has your team already pushed AI?',
    description: 'Pick the answer closest to reality.',
    fields: [
      {
        name: 'aiMaturity',
        label: 'Select one',
        type: 'radio',
        required: true,
        options: [
          'We are mostly experimenting with tools',
          'We use AI occasionally, but nothing is production-ready',
          'A few automations exist, but they are fragile',
          'We have agents live, but they need stronger infrastructure',
          'We are ready to move into serious deployment',
        ],
      },
    ],
  },
  {
    id: 'q11_deployment_timeline',
    kicker: 'Priority',
    title: 'What is your timeline for getting this into production?',
    description: 'This helps us understand urgency and sequencing.',
    fields: [
      {
        name: 'deploymentTimeline',
        label: 'Select one',
        type: 'radio',
        required: true,
        options: [
          'Immediately',
          'Within 30 days',
          'This quarter',
          'We are serious, but still assessing',
          'Exploratory only',
        ],
      },
    ],
  },
  {
    id: 'q12_additional_context',
    kicker: 'Final Context',
    title: 'What would make this engagement obviously worth it?',
    description: 'Tell us the outcome, workflow, or operational headache that matters most.',
    fields: [
      {
        name: 'additionalContext',
        label: 'Your answer',
        type: 'textarea',
        required: true,
        placeholder:
          'Example: We need leads qualified and routed in real time, CRM updates handled automatically, and every external message held behind approval.',
      },
    ],
  },
];

export const CONTACT_STEP = {
  id: 'contact_info',
  kicker: 'Contact Info',
  title: 'Where should we send next steps?',
  description: 'We use this to review your intake and prepare the strategy call properly.',
  fields: [
    {
      name: 'fullName',
      label: 'Full Name',
      placeholder: 'Taylor Morgan',
      type: 'text',
      required: true,
    },
    {
      name: 'roleTitle',
      label: 'Role / Title',
      placeholder: 'Founder, COO, Head of Operations',
      type: 'text',
      required: true,
    },
    {
      name: 'businessName',
      label: 'Company Name',
      placeholder: 'Qortana Client Co.',
      type: 'text',
      required: true,
    },
    {
      name: 'contactEmail',
      label: 'Work Email',
      placeholder: 'taylor@example.com',
      type: 'email',
      required: true,
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      placeholder: '+1 (555) 000-0000',
      type: 'tel',
      required: true,
    },
  ],
};

export const QORTANA_INTAKE_STEPS = [...QUESTION_STEPS, CONTACT_STEP];
export const SANDLER_INTAKE_STEPS = QORTANA_INTAKE_STEPS;
