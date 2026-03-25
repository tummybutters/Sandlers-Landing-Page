import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Cable,
  Clock3,
  ServerCog,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const transition = { duration: 0.75, ease: [0.22, 1, 0.36, 1] };

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
      'AI agents that operate continuously across your communication channels — Slack, email, SMS, CRM — qualifying leads, managing handoffs, processing requests, and escalating only what requires a human. Deployed on dedicated infrastructure, not shared multi-tenant platforms.',
  },
  {
    icon: Cable,
    title: 'Platform Selection & Architecture',
    body:
      'Not every AI tool deserves a place in your stack. We evaluate your operations, map the right platforms to the right problems, and design architectures that scale without creating a maintenance nightmare. We work with the best foundation models and agent frameworks available — and we know which ones actually hold up under load.',
  },
  {
    icon: ServerCog,
    title: 'Implementation & Ongoing Management',
    body:
      "We don't hand you a document and wish you luck. We deploy, configure, integrate, monitor, and maintain the full system. Your team gets the output. We handle the infrastructure.",
  },
];

const processSteps = [
  {
    label: '01',
    title: 'Workflow Audit',
    body:
      'We map your current operations and identify the highest-leverage processes for autonomous AI — the ones where speed, consistency, and 24/7 availability create measurable revenue impact.',
  },
  {
    label: '02',
    title: 'Architecture & Platform Selection',
    body:
      'We design the infrastructure: which models, which agent frameworks, which security boundaries, which integrations. Every decision is documented and defensible.',
  },
  {
    label: '03',
    title: 'Deployment & Hardening',
    body:
      'We build it, lock it down, and connect it to your live systems. Dedicated infrastructure per client. No shared runtimes. No corners cut on isolation.',
  },
  {
    label: '04',
    title: 'Monitoring & Iteration',
    body:
      'We watch the system, ship updates, rotate credentials, and tune performance. You get a partner, not a one-time vendor.',
  },
];

const fitSignals = [
  'B2B companies doing $2M–$50M and scaling faster than operations can hire.',
  "Sales teams drowning in leads that don't get followed up consistently.",
  "Operations leaders who know AI should be handling repetitive work but don't have the infrastructure talent to make it production-ready.",
];

const faqs = [
  {
    question: 'Do we need an internal AI team before working with Qortana?',
    answer:
      "No. Most teams come to us because they have the business need but not the infrastructure bench to make it production-ready. We handle the architecture, deployment, hardening, and ongoing management.",
  },
  {
    question: 'Will autonomous agents be allowed to do anything they want inside our stack?',
    answer:
      'No. We define the approval boundaries with you up front. The point is governed autonomy: agents handle the repetitive work continuously, while actions that require human judgment stay behind policy and review gates.',
  },
  {
    question: 'How is this different from trying a few AI tools ourselves?',
    answer:
      "Tools get you experiments. Infrastructure gets you production. We design the environments, guardrails, integrations, credential model, and monitoring layer so the system can keep running after the demo ends.",
  },
  {
    question: 'Do you only work with enterprise companies?',
    answer:
      'No. We are focused on fast-moving B2B companies and agencies that have real operational volume and real downside if the system is unreliable. If AI is already on the roadmap but execution is the bottleneck, you are probably in the right place.',
  },
];

const proofMetrics = [
  '52-second median response time to inbound leads',
  '2.1x increase in booked estimates within 30 days',
  '14 hours of manual follow-up removed each week',
];

export default function LandingPage() {
  return (
    <div className="company-shell">
      <div className="company-grid" />
      <div className="company-glow company-glow-left" />
      <div className="company-glow company-glow-right" />

      <header className="company-header">
        <div className="company-header-inner">
          <Link to="/" className="company-brand" aria-label="Qortana home">
            <span className="company-brand-mark">Q</span>
            <span>Qortana</span>
          </Link>

          <nav className="company-nav" aria-label="Primary">
            <a href="#deploy">What We Deploy</a>
            <a href="#process">How We Work</a>
            <a href="#fit">Who It&apos;s For</a>
            <a href="#faq">FAQ</a>
          </nav>

          <Link to="/intake" className="company-header-cta">
            Book a strategy call
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      <main className="company-main">
        <motion.section
          className="company-hero"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          <div className="company-hero-copy">
            <span className="company-eyebrow">AI Infrastructure Consulting</span>

            <h1 className="company-title">
              <span>The infrastructure partner</span>
              <span className="company-title-accent">
                for companies ready to run AI agents in production.
              </span>
            </h1>

            <p className="company-subtitle">
              We consult on, architect, and deploy autonomous AI systems that work
              24/7 — on enterprise-grade infrastructure your security team will actually
              approve.
            </p>

            <div className="company-cta-row">
              <Link to="/intake" className="company-cta-primary">
                Book a strategy call
                <ArrowRight size={16} />
              </Link>
              <a href="#deploy" className="company-cta-secondary">
                What we deploy
              </a>
            </div>

            <div className="company-proof-pills" aria-label="Proof points">
              <span>Dedicated client environments</span>
              <span>Governed autonomous workflows</span>
              <span>Ongoing infrastructure management</span>
            </div>
          </div>

          <motion.div
            className="company-stage"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...transition, delay: 0.08 }}
          >
            <div className="company-stage-panel">
              <div className="company-stage-topline">
                <span className="company-stage-badge">Production Agent Runtime</span>
                <span className="company-stage-status">
                  <ShieldCheck size={14} />
                  Policy gates active
                </span>
              </div>

              <div className="company-stage-card">
                <div className="company-stage-card-head">
                  <div className="company-stage-icon">
                    <Bot size={20} />
                  </div>
                  <div>
                    <p className="company-stage-kicker">Autonomous Coverage</p>
                    <h2>24/7 agent operations</h2>
                  </div>
                </div>

                <div className="company-stage-list">
                  <div>
                    <span>Channels</span>
                    <strong>Slack, email, SMS, CRM</strong>
                  </div>
                  <div>
                    <span>Isolation</span>
                    <strong>Dedicated infrastructure per client</strong>
                  </div>
                  <div>
                    <span>Escalation model</span>
                    <strong>Human review where it matters</strong>
                  </div>
                </div>
              </div>

              <div className="company-stage-stack">
                <div className="company-stage-stack-card">
                  <span>Live workflows</span>
                  <strong>Lead qualification + routing</strong>
                </div>
                <div className="company-stage-stack-card">
                  <span>Infrastructure</span>
                  <strong>Credential isolation + audit trails</strong>
                </div>
                <div className="company-stage-stack-card">
                  <span>Management</span>
                  <strong>Monitoring, rotation, iteration</strong>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <section className="company-section company-intro">
          <div className="company-section-header company-section-header-left">
            <span className="company-section-label">Intro</span>
            <h2>Most companies are experimenting with AI. A few are running it.</h2>
            <p>
              We bridge that gap. Qortana is a consulting and implementation firm that
              builds the infrastructure layer between &quot;we should use AI&quot; and
              &quot;AI is running our operations around the clock.&quot; We assess your
              workflows, select the right platforms, harden the security boundaries,
              and deploy autonomous agents that handle real work — lead qualification,
              sales administration, customer operations, internal routing — without a
              human babysitting a chat window.
            </p>
            <p className="company-emphasis">
              This isn&apos;t prompt engineering. This is production infrastructure.
            </p>
            <div className="company-section-actions">
              <Link to="/intake" className="company-cta-primary">
                Book a strategy call
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section id="deploy" className="company-section">
          <div className="company-section-header">
            <span className="company-section-label">What We Deploy</span>
            <h2>Autonomous AI infrastructure for teams that move fast and can&apos;t afford downtime.</h2>
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

        <section id="process" className="company-section">
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
          <div className="company-fit-panel">
            <div className="company-section-header company-section-header-left">
              <span className="company-section-label">Who This Is For</span>
              <h2>Where we work best is exactly where most AI rollouts stall.</h2>
              <p>
                B2B companies doing $2M–$50M that are scaling faster than their
                operations team can hire. Sales teams drowning in leads that don&apos;t
                get followed up. Operations leaders who know AI should be handling the
                repetitive work but don&apos;t have the infrastructure talent to make it
                production-ready.
              </p>
              <p>
                If your team has tried AI tools and hit the wall between &quot;cool
                demo&quot; and &quot;actually running in production&quot; — that&apos;s
                exactly where we work.
              </p>
            </div>

            <div className="company-fit-signals">
              {fitSignals.map((signal) => (
                <div key={signal} className="company-fit-chip">
                  {signal}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="company-section">
          <div className="company-section-header">
            <span className="company-section-label">Client Results</span>
            <h2>Operational impact still matters more than the tooling story.</h2>
            <p>
              We&apos;ll swap in broader infrastructure case studies as they are
              published. For now, the Summit HVAC rollout still earns its place because
              it shows what happens when autonomous automation is connected to real
              operations and measured against revenue.
            </p>
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
                “Our HVAC ads finally scale because every lead gets a real reply in under a minute.”
              </blockquote>
              <p>
                We rebuilt Summit HVAC&apos;s ad funnel and AI SMS concierge so every
                click turned into a booked estimate instead of another lead sitting in a
                queue.
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

        <section id="faq" className="company-section">
          <div className="company-section-header">
            <span className="company-section-label">FAQ</span>
            <h2>Straight answers for teams taking AI seriously.</h2>
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
          <h2>Start with a free thirty-minute infrastructure strategy call.</h2>
          <p>
            We&apos;ll map your highest-value workflows, identify what&apos;s ready for
            autonomous AI, and give you an honest assessment of what it takes to get
            there — whether you work with us or not.
          </p>

          <div className="company-final-actions">
            <Link to="/intake" className="company-cta-light">
              Book a strategy call
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
