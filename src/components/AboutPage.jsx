import { motion } from 'framer-motion';
import { ArrowRight, Compass, Gauge, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import CompanySiteShell from './CompanySiteShell';
import { MagneticFlightLink } from './PremiumMotionLinks';

const transition = { duration: 0.75, ease: [0.22, 1, 0.36, 1] };

const principles = [
  {
    icon: Compass,
    title: 'Built around real operations',
    body:
      'We start with the work that already exists: lead handling, handoffs, quoting flow, paperwork, internal follow-up, and the approvals that cannot break.',
  },
  {
    icon: ShieldCheck,
    title: 'Designed for control',
    body:
      'We treat autonomy as something that must be bounded, audited, and staged properly instead of something a team simply turns on and hopes behaves.',
  },
  {
    icon: Gauge,
    title: 'Run to improve over time',
    body:
      'The goal is not a prettier demo. The goal is a system that produces better output as it gains more history, more feedback, and more operational context.',
  },
];

export default function AboutPage() {
  return (
    <CompanySiteShell>
      <motion.section
        className="company-page-hero"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        <div className="company-page-hero-copy">
          <span className="company-section-label">About Qortana</span>
          <h1 className="company-page-title">
            We build the operating environment behind autonomous work.
          </h1>
          <p className="company-page-intro">
            Qortana exists for teams that do not need more AI demos. They need systems that can
            execute real work repeatedly, hold context over time, and stay inside defined
            boundaries.
          </p>
          <p className="company-page-intro company-page-intro-secondary">
            We assess workflows, shape the right deployment model, configure worker environments,
            and stay in the loop as those systems move from promising idea to durable operating
            layer.
          </p>

          <div className="company-hero-actions">
            <MagneticFlightLink to="/intake" label="Book a strategy call" />
            <MagneticFlightLink to="/infrastructure" label="Explore infrastructure" variant="light" />
          </div>
        </div>
      </motion.section>

      <section className="company-section">
        <div className="company-section-header">
          <span className="company-section-label">How We Think</span>
          <h2>AI becomes valuable when it can operate, retain context, and improve.</h2>
        </div>

        <div className="company-pillar-grid">
          {principles.map(({ icon: Icon, title, body }, index) => (
            <motion.article
              key={title}
              className="company-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...transition, delay: index * 0.05 }}
            >
              <div className="company-card-icon">
                <Icon size={20} />
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="company-section company-section-grid">
        <div className="company-section-header">
          <span className="company-section-label">What We Actually Do</span>
          <h2>We do not sell prompts. We design the environment the work runs inside.</h2>
        </div>

        <div className="company-page-story-grid">
          <article className="company-page-story-card">
            <h3>We start with workflow reality.</h3>
            <p>
              Before anything is deployed, we look at how work actually moves through the business:
              where leads stall, where approvals sit, where human follow-up is inconsistent, and
              which systems matter first.
            </p>
          </article>

          <article className="company-page-story-card">
            <h3>We design for operating conditions.</h3>
            <p>
              That means choosing the right worker model, the right workspace logic, and the right
              deployment posture for the environment the system will live in, not the environment a
              demo prefers.
            </p>
          </article>

          <article className="company-page-story-card">
            <h3>We stay through optimization.</h3>
            <p>
              The value compounds when tasks, outcomes, and exceptions are retained and reviewed
              over time. We stay close enough to improve the system instead of handing off a static
              build and disappearing.
            </p>
          </article>
        </div>
      </section>

      <section className="company-final-cta">
        <span className="company-section-label company-section-label-dark">Next Step</span>
        <h2>Start with the workflows worth turning into repeatable systems.</h2>
        <p>
          We&apos;ll review the parts of your operation that actually matter, where autonomy helps,
          and where controls need to stay tight before anything moves into production.
        </p>

        <div className="company-final-actions">
          <MagneticFlightLink to="/intake" label="Book a strategy call" variant="light" />
          <Link to="/infrastructure" className="company-inline-link company-inline-link-dark">
            Explore infrastructure <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </CompanySiteShell>
  );
}
