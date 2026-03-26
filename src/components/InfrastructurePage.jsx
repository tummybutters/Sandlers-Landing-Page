import { motion } from 'framer-motion';
import { ArrowRight, Cable, Clock3, ServerCog } from 'lucide-react';
import { Link } from 'react-router-dom';
import CompanySiteShell from './CompanySiteShell';
import { MagneticFlightLink } from './PremiumMotionLinks';
import { infrastructurePillars } from '../content/companySiteContent';

const transition = { duration: 0.75, ease: [0.22, 1, 0.36, 1] };

const pillarIcons = {
  'autonomous-workers': ServerCog,
  'claude-workspaces': Clock3,
  'deployment-models': Cable,
};

const compoundingPoints = [
  'Persistent context and retained operating memory',
  'Clear approval boundaries and cleaner exception handling',
  'A growing record of task quality, errors, and optimization opportunities',
];

export default function InfrastructurePage() {
  return (
    <CompanySiteShell>
      <motion.section
        className="company-page-hero"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        <div className="company-page-hero-copy">
          <span className="company-section-label">Infrastructure</span>
          <h1 className="company-page-title">
            Infrastructure for teams that need AI to do the work, not just discuss it.
          </h1>
          <p className="company-page-intro">
            Qortana builds the operating environment behind autonomous execution: worker systems,
            Claude-centered workspaces, and deployment models chosen around trust boundaries,
            retained state, and real operational throughput.
          </p>
          <p className="company-page-intro company-page-intro-secondary">
            The point is not more tooling. The point is a system that can run repeatedly, stay
            grounded in context, and improve over time.
          </p>

          <div className="company-hero-actions">
            <MagneticFlightLink to="/intake" label="Book a strategy call" />
            <MagneticFlightLink to="/about" label="About Qortana" variant="light" />
          </div>
        </div>
      </motion.section>

      <section className="company-section">
        <div className="company-section-header">
          <span className="company-section-label">Core Pillars</span>
          <h2>Three layers that turn AI from access into operating leverage.</h2>
        </div>

        <div className="company-pillar-grid">
          {infrastructurePillars.map((pillar, index) => {
            const Icon = pillarIcons[pillar.slug];

            return (
              <motion.article
                key={pillar.slug}
                className="company-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ ...transition, delay: index * 0.05 }}
              >
                <div className="company-card-icon">
                  <Icon size={20} />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
                <Link to={pillar.href} className="company-inline-link">
                  {pillar.label} <ArrowRight size={15} />
                </Link>
              </motion.article>
            );
          })}
        </div>

        <div className="company-section-actions">
          <MagneticFlightLink to="/intake" label="Book a strategy call" />
        </div>
      </section>

      <section className="company-section company-section-grid">
        <div className="company-section-header">
          <span className="company-section-label">Why It Compounds</span>
          <h2>The long-term value is not only inference. It is retained operational memory.</h2>
        </div>

        <div className="company-fit-signals company-fit-signals-wide">
          {compoundingPoints.map((point) => (
            <div key={point} className="company-fit-chip">
              {point}
            </div>
          ))}
        </div>

        <div className="company-copy-block company-copy-block-wide">
          <p>
            Over time, this creates an agent data flywheel: tasks performed, outcomes reviewed,
            errors surfaced, exceptions understood, and future execution improved with better
            context than the system had before.
          </p>
        </div>
      </section>

      <section className="company-section">
        <div className="company-section-header">
          <span className="company-section-label">Under The Hood</span>
          <h2>Selective explicitness where it matters.</h2>
        </div>

        <div className="company-page-story-grid">
          <article className="company-page-story-card">
            <h3>OpenClaw-based worker systems</h3>
            <p>
              We deploy enterprise-modified OpenClaw workers for teams that need more than a chat
              interface. The system is shaped around repeatable work, bounded execution, and the
              environment the worker must operate inside.
            </p>
          </article>

          <article className="company-page-story-card">
            <h3>Anthropic and Claude where they count</h3>
            <p>
              For many teams, the right Anthropic plan matters more than scattered model access. We
              structure Claude Code workspaces so the subscription strategy is tied to actual
              throughput, not loose experimentation.
            </p>
          </article>

          <article className="company-page-story-card">
            <h3>Cloud where useful, local where it compounds</h3>
            <p>
              Cloud deployment is available. But when local state, filesystem continuity, or
              session persistence create more leverage, we design for hybrid or on-prem operation
              so the system keeps learning from real use.
            </p>
          </article>
        </div>
      </section>

      <section className="company-final-cta">
        <span className="company-section-label company-section-label-dark">Infrastructure Review</span>
        <h2>See what your operation needs before you buy another AI tool.</h2>
        <p>
          We&apos;ll map the workflows, identify where worker systems make sense, and recommend the
          deployment model that fits your constraints instead of forcing a generic stack.
        </p>

        <div className="company-final-actions">
          <MagneticFlightLink to="/intake" label="Book a strategy call" variant="light" />
        </div>
      </section>
    </CompanySiteShell>
  );
}
