import { motion } from 'framer-motion';
import { ArrowRight, FileStack, LockKeyhole, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const transition = { duration: 0.75, ease: [0.22, 1, 0.36, 1] };

const featureCards = [
  {
    title: 'Quote Prep & Revisions',
    body: 'You dictate the changes or forward the carrier pricing. Qortana formats it into a clean, client-facing summary while you drive to your next meeting.',
  },
  {
    title: 'Paperwork & Contract Support',
    body: 'Stop hunting for the right PDF or manually filling out provider agreements. Qortana preps the paperwork and structures your opportunity intake so nothing stalls.',
  },
  {
    title: 'Zero-Touch File Hygiene',
    body: 'No more saving files as "quote_final_v3.pdf" to your desktop. Qortana automatically names, categorizes, and files your documents into the right folders.',
  },
  {
    title: 'Follow-Up Enforcement',
    body: 'Leave a meeting, send Qortana a quick voice note, and it instantly drafts the recap, outlines the next steps, and organizes the action items for your review.',
  },
  {
    title: 'Commission Visibility',
    body: 'Get an extra set of eyes on your money. Qortana helps track administrative details and discrepancies so you actually get paid for the deals you close.',
  },
];

const setupSteps = [
  {
    title: 'The Brain Dump',
    label: 'Discovery',
    body: 'You show us your messy quoting process, your specific provider formats, and how you actually like your paperwork handled. No judgment, just fact-gathering.',
  },
  {
    title: 'We Do the Heavy Lifting',
    label: 'The Build',
    body: 'You go back to selling. Our ops team custom-tunes Qortana to understand your specific vendors, contracts, and folder structures. You do not touch a single setting.',
  },
  {
    title: 'Start Delegating',
    label: 'Execution',
    body: 'We hand you the keys. From day one, you just text, email, or send voice notes to Qortana exactly like you would a human executive assistant.',
  },
];

const faqs = [
  {
    question: 'Is Qortana going to automatically email my clients?',
    answer:
      'Absolutely not. You own the relationship. Qortana preps the paperwork and drafts the emails, but hands them to you for review. Nothing goes out until you personally hit send. You keep 100% control.',
  },
  {
    question: 'How is this different from just using a generic AI chatbot?',
    answer:
      'Generic AI does not know how to read a messy telecom carrier quote or navigate a provider portal. Qortana does. It is a managed sales-ops layer built specifically for the multi-vendor chaos of independent agents. Plus, we do the setup for you.',
  },
  {
    question: 'Is my deal and commission data actually secure?',
    answer:
      'Yes. Your data is your business. Qortana is built on Nvidia Enterprise Security Architecture (NeMo). This provides bank-level isolation. Your information is locked down and never used to train public models.',
  },
  {
    question: 'What if I use a dozen different providers with totally different formats?',
    answer:
      'That is exactly why you need Qortana. Human assistants get bogged down by that complexity, and rigid software breaks. Because we custom-tune Qortana to your workflows during onboarding, it adapts to your specific provider mix.',
  },
  {
    question: 'How much does this cost compared to hiring an assistant?',
    answer:
      'A fraction of the cost, with none of the management overhead. You do not have to train Qortana, pay it benefits, or worry about it quitting. We map out exact packaging during your workflow review based on your pipeline volume.',
  },
];

export default function LandingPage() {
  return (
    <div className="landing-shell">
      <div className="landing-noise" />
      <div className="landing-ambient-glow landing-ambient-glow-left" />
      <div className="landing-ambient-glow landing-ambient-glow-right" />

      <main className="landing-main">
        <motion.section
          className="landing-hero"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          <span className="landing-eyebrow">Managed Sales Ops For Channel Teams</span>

          <h1 className="landing-title">
            <span>Scale your sales pipeline</span>
            <span className="landing-title-accent">without scaling your admin.</span>
          </h1>

          <p className="landing-subtitle">
            Stop waiting two days for ops support to untangle a quote. Forward a messy provider
            email to Qortana and watch it instantly generate client-ready documents. No data entry,
            no hours of procrastination, and no logging into a CRM ever again.
          </p>

          <div className="landing-cta-row">
            <Link to="/intake" className="landing-cta-primary">
              See the assistant in action
              <ArrowRight size={16} />
            </Link>
            <a href="#features" className="landing-cta-secondary">
              Explore the workflow
            </a>
          </div>

          <div className="landing-proof-row">
            <span>Quote prep</span>
            <span>Paperwork support</span>
            <span>Commission visibility</span>
          </div>
        </motion.section>

        <motion.section
          className="landing-device-stage"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.08 }}
        >
          <div className="landing-device-backdrop" />

          <div className="landing-phone-wrap">
            <div className="landing-phone-float landing-phone-float-top">
              <span className="landing-float-label">Forward the mess</span>
              <strong>Provider email in. Client-ready draft out.</strong>
            </div>

            <div className="landing-phone">
              <div className="landing-phone-notch" />

              <div className="landing-phone-screen">
                <div className="landing-phone-status">
                  <span>9:41</span>
                  <span>Secure session</span>
                </div>

                <div className="landing-assistant-row">
                  <div className="landing-assistant-avatar">Q</div>
                  <div>
                    <p className="landing-assistant-name">Qortana Assistant</p>
                    <p className="landing-assistant-state">Approval-gated and active</p>
                  </div>
                </div>

                <div className="landing-message landing-message-user">
                  Forwarding this messy provider email. Can you turn it into a client-ready quote
                  summary for Smith?
                </div>

                <div className="landing-message-card">
                  <div className="landing-message-meta">
                    <ShieldCheck size={14} />
                    <span>Review stays with you</span>
                  </div>

                  <p className="landing-message-body">
                    Parsed the carrier pricing, drafted the summary, and staged the follow-up
                    email. Nothing client-facing has been sent.
                  </p>

                  <div className="landing-doc-card">
                    <div className="landing-doc-icon">
                      <FileStack size={18} />
                    </div>
                    <div className="landing-doc-copy">
                      <strong>Smith quote summary</strong>
                      <span>Ready for review and approval</span>
                    </div>
                    <span className="landing-doc-tag">Ready</span>
                  </div>
                </div>

                <div className="landing-phone-footer">
                  <div className="landing-phone-pill">
                    <LockKeyhole size={14} />
                    <span>You approve every external send</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="landing-phone-float landing-phone-float-bottom">
              <span className="landing-float-label">Stay in selling mode</span>
              <strong>Qortana handles the admin drag while you move the deal.</strong>
            </div>
          </div>

          <div className="landing-security-callout">
            <ShieldCheck size={16} />
            <span>
              Enterprise-Grade Privacy built on Nvidia&apos;s SOTA Security Architecture to keep
              your deal, client, and commission data strictly yours.
            </span>
          </div>
        </motion.section>

        <section id="features" className="landing-section">
          <div className="landing-section-header">
            <span className="landing-section-label">Features</span>
            <h2>Hand off the admin drag. Keep the commission.</h2>
            <p>
              Qortana is not a DIY prompt library or another tool you have to configure. It is a
              managed sales-ops assistant built for the messy reality of multi-vendor channel
              sales. You talk to it. It does the work.
            </p>
          </div>

          <div className="landing-feature-grid">
            {featureCards.map((feature, index) => (
              <motion.article
                key={feature.title}
                className="landing-feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ ...transition, delay: index * 0.06 }}
              >
                <span className="landing-card-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="landing-section">
          <div className="landing-section-header">
            <span className="landing-section-label">How It Works</span>
            <h2>You do not build it. You just hire it.</h2>
            <p>
              You already have enough software to manage. Qortana is a fully managed service. No
              writing prompts, no configuring settings, and no complex integrations. We map your
              chaos; you get an assistant ready to work.
            </p>
          </div>

          <div className="landing-steps-grid">
            {setupSteps.map((step, index) => (
              <motion.article
                key={step.title}
                className="landing-step-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ ...transition, delay: index * 0.08 }}
              >
                <span className="landing-card-index">{String(index + 1).padStart(2, '0')}</span>
                <p className="landing-step-label">{step.label}</p>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </motion.article>
            ))}
          </div>

          <p className="landing-footer-note">
            <strong>Behind the Scenes:</strong> Your business evolves, and so does Qortana. We
            constantly push new workflow enhancements, upgrade its memory, and teach it new skills
            without you lifting a finger.
          </p>
        </section>

        <section className="landing-section">
          <div className="landing-section-header">
            <span className="landing-section-label">FAQ</span>
            <h2>Straight Answers</h2>
            <p>
              You have been promised "magic software" before. Here is exactly how Qortana works in
              the real world.
            </p>
          </div>

          <div className="landing-faq-grid">
            {faqs.map((item, index) => (
              <motion.article
                key={item.question}
                className="landing-faq-card"
                initial={{ opacity: 0, y: 20 }}
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

        <section className="landing-final-cta">
          <span className="landing-section-label">Final CTA</span>
          <h2>Stop acting like a junior admin. Get back to selling.</h2>
          <p>
            Every hour you spend renaming PDFs, untangling carrier quotes, and fighting with your
            CRM is an hour you are not closing a deal. Hand the backend to Qortana. Get your time
            back.
          </p>

          <div className="landing-final-cta-row">
            <Link to="/intake" className="landing-cta-primary">
              See Qortana in action
              <ArrowRight size={16} />
            </Link>
          </div>

          <p className="landing-final-note">
            Stop waiting 2 days for quotes you can get in 10 minutes.
          </p>
        </section>
      </main>
    </div>
  );
}
