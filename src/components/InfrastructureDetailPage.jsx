import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CompanySiteShell from './CompanySiteShell';
import { MagneticFlightLink } from './PremiumMotionLinks';

const transition = { duration: 0.75, ease: [0.22, 1, 0.36, 1] };

const DETAIL_CONTENT = {
  'autonomous-workers': {
    label: 'Autonomous Workers',
    title: 'Workers built to carry scoped tasks from start to finish.',
    intro:
      'These are not isolated prompts. They are persistent worker systems configured to operate inside defined environments, follow clear boundaries, and complete repeated work with less human babysitting.',
    secondary:
      'Qortana uses worker infrastructure when the business needs reliable execution, retained context, and a system that can be tuned over time rather than restarted from scratch every session.',
    sections: [
      {
        title: 'Execution with guardrails',
        body:
          'Workers are useful when they can do real work without drifting into unsafe behavior. We define what they can touch, what needs approval, and how exceptions are surfaced before they are allowed to run against live workflows.',
      },
      {
        title: 'Real operating environments',
        body:
          'The system is designed around the environment the work actually lives in: files, systems, task queues, message channels, approvals, and business rules. That keeps autonomy attached to reality instead of theater.',
      },
      {
        title: 'Optimization over time',
        body:
          'Because the worker model is persistent, the system can be reviewed and improved with more precision. Failures, edge cases, and repeated friction points become inputs to the next iteration instead of disappearing after the session ends.',
      },
    ],
  },
  'claude-workspaces': {
    label: 'Claude Workspaces',
    title: 'Claude-centered workspaces designed for continuity, not one-off prompting.',
    intro:
      'For many teams, the highest-leverage Anthropic investment is not broad seat sprawl. It is a workspace architecture that turns Claude Code into a repeatable operating layer.',
    secondary:
      'Qortana configures workspaces around long-running execution, retained session context, local or hybrid state where appropriate, and an environment built for real task follow-through.',
    sections: [
      {
        title: '24/7 Claude Code worker setups',
        body:
          'The goal is to let Claude-based systems keep carrying tasks forward instead of forcing humans to restart the same chain of reasoning every time work resumes.',
      },
      {
        title: 'Session continuity as leverage',
        body:
          'When the environment preserves history, files, prior attempts, and successful patterns, the system gets more useful. That continuity is what turns model access into durable operating memory.',
      },
      {
        title: 'The agent data flywheel',
        body:
          'As tasks repeat, the workspace accumulates the raw material for optimization: outputs, mistakes, exceptions, and better ways of routing work. That makes future performance easier to tune systematically.',
      },
    ],
  },
  'deployment-models': {
    label: 'Deployment Models',
    title: 'Choose the deployment model that fits the work, the state, and the trust boundary.',
    intro:
      'Some workloads belong in the cloud. Others benefit from local state, filesystem continuity, or tighter proximity to the environment they are acting inside. Qortana designs around that reality from the start.',
    secondary:
      'We do not force a single deployment story across every client. We recommend the model that gives the business the right combination of control, throughput, and long-term compounding value.',
    sections: [
      {
        title: 'Cloud where it makes sense',
        body:
          'Cloud environments are often the fastest way to launch, centralize access, and support distributed execution. When speed and flexibility matter most, cloud can be the right starting point.',
      },
      {
        title: 'Hybrid and on-prem where it compounds',
        body:
          'If the value depends on local files, retained sessions, durable operating memory, or more sensitive execution boundaries, hybrid or on-prem becomes a strategic choice rather than a technical preference.',
      },
      {
        title: 'Deterministic automation where AI is not the right tool',
        body:
          'Not every step should be inference-driven. When a workflow is better served by deterministic automation, we keep it deterministic and let the AI layer focus on the parts that actually benefit from judgment and flexible execution.',
      },
    ],
  },
};

export default function InfrastructureDetailPage({ pageKey }) {
  const page = DETAIL_CONTENT[pageKey];

  if (!page) {
    return null;
  }

  return (
    <CompanySiteShell>
      <motion.section
        className="company-page-hero"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        <div className="company-page-hero-copy">
          <span className="company-section-label">{page.label}</span>
          <h1 className="company-page-title">{page.title}</h1>
          <p className="company-page-intro">{page.intro}</p>
          <p className="company-page-intro company-page-intro-secondary">{page.secondary}</p>

          <div className="company-hero-actions">
            <MagneticFlightLink to="/intake" label="Book a strategy call" />
            <MagneticFlightLink to="/infrastructure" label="Back to infrastructure" variant="light" />
          </div>
        </div>
      </motion.section>

      <section className="company-section">
        <div className="company-page-story-grid">
          {page.sections.map((section, index) => (
            <motion.article
              key={section.title}
              className="company-page-story-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...transition, delay: index * 0.05 }}
            >
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="company-final-cta">
        <span className="company-section-label company-section-label-dark">Next Layer</span>
        <h2>See how this fits into the full infrastructure system.</h2>
        <p>
          Explore the broader infrastructure model or move straight into the intake if you already
          know which workflows need a serious operating layer behind them.
        </p>

        <div className="company-final-actions">
          <MagneticFlightLink to="/intake" label="Book a strategy call" variant="light" />
          <Link to="/infrastructure" className="company-inline-link company-inline-link-dark">
            Back to infrastructure <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </CompanySiteShell>
  );
}
