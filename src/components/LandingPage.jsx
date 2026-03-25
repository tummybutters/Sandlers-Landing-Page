import { AnimatePresence, motion } from 'framer-motion';
import { Cable, Clock3, ServerCog, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MagneticFlightLink, RollingNavLink } from './PremiumMotionLinks';

const transition = { duration: 0.75, ease: [0.22, 1, 0.36, 1] };

const primaryNavItems = [
  { href: '#deploy', label: 'Infrastructure', detail: 'Systems, guardrails, deployment' },
  { href: '#results', label: 'Results', detail: 'Proof, metrics, outcomes' },
  { href: '#company', label: 'Company', detail: 'How Qortana works with you' },
];

const deploymentCards = [
  {
    icon: ShieldCheck,
    title: 'Secure Agent Environments',
    body:
      "Enterprise-grade sandboxed runtimes with the isolation, policy enforcement, and credential management that production AI demands. Your agents run in locked-down environments with strict network controls, file system boundaries, and audit trails — not on someone's laptop.",
  },
  {
    icon: Clock3,
    title: '24/7 Autonomous Workflows',
    body:
      'AI agents that operate continuously across Slack, email, SMS, and CRM — qualifying leads, managing handoffs, processing requests, and escalating only what requires a human. Deployed on dedicated infrastructure, not shared multi-tenant platforms.',
  },
  {
    icon: Cable,
    title: 'Platform Selection & Architecture',
    body:
      'We evaluate your operations, map the right platforms to the right problems, and design architectures that scale without creating a maintenance nightmare. We know which models and agent frameworks actually hold up under load.',
  },
  {
    icon: ServerCog,
    title: 'Implementation & Ongoing Management',
    body:
      "We don't hand you a document and disappear. We deploy, configure, integrate, monitor, and maintain the full system so your team gets the output without owning the infrastructure burden.",
  },
];

const processSteps = [
  {
    label: '01',
    title: 'Workflow Audit',
    body:
      'We map your current operations and identify the highest-leverage processes for autonomous AI.',
  },
  {
    label: '02',
    title: 'Architecture & Platform Selection',
    body:
      'We design the infrastructure, define the boundaries, and document every major decision.',
  },
  {
    label: '03',
    title: 'Deployment & Hardening',
    body:
      'We build it, lock it down, and connect it to your live systems on dedicated infrastructure.',
  },
  {
    label: '04',
    title: 'Monitoring & Iteration',
    body:
      'We watch the system, ship updates, rotate credentials, and keep performance tight over time.',
  },
];

const fitSignals = [
  'B2B companies doing $2M–$50M and scaling faster than operations can hire.',
  "Sales teams drowning in leads that don't get followed up consistently.",
  "Operators who know AI should own the repetitive work but don't have the infrastructure talent to deploy it safely.",
];

const faqs = [
  {
    question: 'Do we need an internal AI team first?',
    answer:
      'No. Most teams come to us because they have the business need but not the infrastructure bench to make it production-ready.',
  },
  {
    question: 'Will agents be allowed to act freely in our stack?',
    answer:
      'No. We define the approval boundaries with you up front so autonomous work stays governed and high-risk actions stay behind review.',
  },
  {
    question: 'How is this different from trying tools ourselves?',
    answer:
      'Tools get you experiments. Infrastructure gets you production. We design the environments, guardrails, integrations, credential model, and monitoring layer that make the system durable.',
  },
  {
    question: 'Do you only work with enterprise teams?',
    answer:
      'No. We focus on fast-moving B2B companies and agencies with enough operational volume that unreliable AI becomes expensive quickly.',
  },
];

const proofMetrics = [
  '52-second median response time to inbound leads',
  '2.1x increase in booked estimates within 30 days',
  '14 hours of manual follow-up removed each week',
];

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    const mediaQuery = window.matchMedia('(min-width: 821px)');

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    const handleViewportChange = (event) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleViewportChange);
    } else {
      mediaQuery.addListener(handleViewportChange);
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);

      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleViewportChange);
      } else {
        mediaQuery.removeListener(handleViewportChange);
      }
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((isOpen) => !isOpen);

  return (
    <div className="company-shell">
      <div className="company-grid" />
      <div className="company-glow company-glow-left" />
      <div className="company-glow company-glow-right" />

      <header className={`company-header${isMobileMenuOpen ? ' company-header-menu-open' : ''}`}>
        <div className="company-header-inner">
          <Link to="/" className="company-brand" aria-label="Qortana home">
            <span className="company-brand-mark">
              <img src="/qortana-logo.png" alt="" className="company-brand-logo" />
            </span>
            <span>Qortana</span>
          </Link>

          <nav className="company-nav" aria-label="Primary">
            {primaryNavItems.map((item) => (
              <RollingNavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          <MagneticFlightLink
            to="/intake"
            label="Book a strategy call"
            variant="header"
            className="company-header-cta"
          />

          <button
            type="button"
            className={`company-menu-toggle${isMobileMenuOpen ? ' is-open' : ''}`}
            aria-expanded={isMobileMenuOpen}
            aria-controls="company-mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={toggleMobileMenu}
          >
            <span className="company-menu-toggle-label">{isMobileMenuOpen ? 'Close' : 'Menu'}</span>
            <span className="company-menu-toggle-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen ? (
            <div className="company-mobile-menu-shell">
              <motion.button
                type="button"
                className="company-mobile-menu-backdrop"
                aria-label="Close navigation menu"
                onClick={closeMobileMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
              />

              <motion.div
                id="company-mobile-menu"
                className="company-mobile-menu-panel"
                initial={{ opacity: 0, y: -18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.97 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="company-mobile-menu-intro">
                  <span className="company-mobile-menu-kicker">Navigate</span>
                  <p>Choose a section or jump straight into the intake.</p>
                </div>

                <nav className="company-mobile-nav" aria-label="Mobile primary">
                  {primaryNavItems.map((item, index) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="company-mobile-nav-link"
                      onClick={closeMobileMenu}
                    >
                      <span className="company-mobile-nav-index">0{index + 1}</span>
                      <span className="company-mobile-nav-copy">
                        <span className="company-mobile-nav-title">{item.label}</span>
                        <span className="company-mobile-nav-detail">{item.detail}</span>
                      </span>
                    </a>
                  ))}
                </nav>

                <div className="company-mobile-menu-cta-wrap">
                  <MagneticFlightLink
                    to="/intake"
                    label="Book a strategy call"
                    variant="header"
                    className="company-mobile-menu-cta"
                  />
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="company-main">
        <motion.section
          className="company-hero"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          <div className="company-hero-backdrop" aria-hidden="true" />

          <div className="company-hero-copy">
            <h1 className="company-title">
              <span>The infrastructure partner</span>
              <span className="company-title-accent">
                for companies ready to run AI agents in production.
              </span>
            </h1>

            <div className="company-hero-actions">
              <MagneticFlightLink to="/intake" label="Book a strategy call" />
            </div>
          </div>
        </motion.section>

        <section id="company" className="company-section">
          <div className="company-section-header">
            <span className="company-section-label">Introducing Qortana</span>
            <h2>Most companies are testing AI. Very few are running it.</h2>
          </div>

          <div className="company-copy-block">
            <p>
              Qortana is a consulting and implementation firm that builds the infrastructure layer
              between &quot;we should use AI&quot; and &quot;AI is running our operations around
              the clock.&quot; We assess your workflows, select the right platforms, harden the
              security boundaries, and deploy autonomous agents that handle real work without a
              human babysitting a chat window.
            </p>
            <p className="company-emphasis">
              This isn&apos;t prompt engineering. This is production infrastructure.
            </p>
            <div className="company-section-actions">
              <MagneticFlightLink to="/intake" label="Book a strategy call" />
            </div>
          </div>
        </section>

        <section id="deploy" className="company-section">
          <div className="company-section-header">
            <span className="company-section-label">What We Deploy</span>
            <h2>Autonomous AI infrastructure, deployed properly.</h2>
          </div>

          <div className="company-capability-grid">
            {deploymentCards.map(({ icon: Icon, title, body }, index) => (
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

        <section id="process" className="company-section company-section-grid">
          <div className="company-section-header">
            <span className="company-section-label">How We Work</span>
            <h2>We design, deploy, and stay in the loop.</h2>
          </div>

          <div className="company-process-grid">
            {processSteps.map((step, index) => (
              <motion.article
                key={step.title}
                className="company-process-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ ...transition, delay: index * 0.06 }}
              >
                <span className="company-process-number">{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="fit" className="company-section">
          <div className="company-section-header">
            <span className="company-section-label">Who This Is For</span>
            <h2>Built for teams stuck between demos and production.</h2>
          </div>

          <div className="company-copy-block company-copy-block-wide">
            <p>
              B2B companies doing $2M–$50M that are scaling faster than their operations team can
              hire. Sales teams drowning in leads that don&apos;t get followed up. Operators who
              know AI should be handling the repetitive work but don&apos;t have the infrastructure
              talent to make it durable, safe, and production-ready.
            </p>
          </div>

          <div className="company-fit-signals">
            {fitSignals.map((signal) => (
              <div key={signal} className="company-fit-chip">
                {signal}
              </div>
            ))}
          </div>
        </section>

        <section id="results" className="company-section">
          <div className="company-section-header">
            <span className="company-section-label">Client Results</span>
            <h2>Operational impact, not AI theater.</h2>
          </div>

          <motion.article
            className="company-results-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={transition}
          >
            <div className="company-results-copy">
              <span className="company-results-kicker">Summit HVAC</span>
              <blockquote>
                “Our HVAC ads finally scale because every lead gets a real reply in under a
                minute.”
              </blockquote>
              <p>
                We rebuilt Summit HVAC&apos;s ad funnel and AI SMS concierge so every click turned
                into a booked estimate instead of another lead sitting in a queue.
              </p>
            </div>

            <div className="company-results-meta">
              {proofMetrics.map((metric) => (
                <div key={metric} className="company-results-metric">
                  {metric}
                </div>
              ))}
            </div>
          </motion.article>
        </section>

        <section id="faq" className="company-section company-section-grid company-section-grid-soft">
          <div className="company-section-header">
            <span className="company-section-label">FAQ</span>
            <h2>Straight answers for serious teams.</h2>
          </div>

          <div className="company-faq-grid">
            {faqs.map((item, index) => (
              <motion.article
                key={item.question}
                className="company-faq-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ ...transition, delay: index * 0.04 }}
              >
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="company-final-cta">
          <span className="company-section-label company-section-label-dark">Strategy Call</span>
          <h2>Start with a thirty-minute infrastructure strategy call.</h2>
          <p>
            We&apos;ll map your highest-value workflows, identify what&apos;s ready for autonomous
            AI, and give you an honest assessment of what it takes to get there.
          </p>

          <div className="company-final-actions">
            <MagneticFlightLink to="/intake" label="Book a strategy call" variant="light" />
          </div>
        </section>
      </main>
    </div>
  );
}
