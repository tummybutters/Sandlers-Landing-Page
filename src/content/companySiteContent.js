export const companyRouteNavItems = [
  { to: '/', label: 'Home', detail: 'Overview and proof' },
  { to: '/about', label: 'About', detail: 'Why Qortana exists' },
  { to: '/infrastructure', label: 'Infrastructure', detail: 'Workers, workspaces, deployment' },
];

export const infrastructurePillars = [
  {
    slug: 'autonomous-workers',
    title: 'Autonomous Workers',
    body:
      'Persistent worker systems configured to carry scoped tasks from start to finish inside guarded operating environments.',
    href: '/infrastructure/autonomous-workers',
    label: 'See worker model',
  },
  {
    slug: 'claude-workspaces',
    title: 'Claude Workspaces',
    body:
      'Claude-centered workspaces built for session continuity, retained context, and repeated execution rather than one-off prompting.',
    href: '/infrastructure/claude-workspaces',
    label: 'Explore workspaces',
  },
  {
    slug: 'deployment-models',
    title: 'Deployment Models',
    body:
      'Cloud, on-prem, and hybrid deployment paths chosen around trust boundaries, state retention, and long-term compounding value.',
    href: '/infrastructure/deployment-models',
    label: 'Compare deployment',
  },
];
