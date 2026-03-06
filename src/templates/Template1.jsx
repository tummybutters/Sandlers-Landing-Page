import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const c = {
  bg: '#07070b',
  surface: '#0d0d12',
  gold: '#c49a3c',
  goldDim: '#7a5e1e',
  text: '#e4dfd5',
  muted: '#7a7266',
  rule: '#1e1b14',
};

const s = {
  root: { minHeight: '100vh', background: c.bg, color: c.text, fontFamily: 'Georgia, serif', overflowX: 'hidden' },
  hero: { minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '80px 48px', position: 'relative' },
  heroRule: { position: 'absolute', bottom: 0, left: '60px', right: '60px', height: '1px', background: c.rule },
  eyebrow: { fontSize: '10px', letterSpacing: '0.42em', textTransform: 'uppercase', color: c.gold, marginBottom: '32px', fontFamily: 'system-ui, sans-serif' },
  h1: { fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 400, lineHeight: 1.02, fontStyle: 'italic', marginBottom: '28px', maxWidth: '780px' },
  heroP: { fontSize: '1rem', lineHeight: 1.8, color: c.muted, maxWidth: '500px', marginBottom: '48px', fontFamily: 'system-ui, sans-serif' },
  btn: { padding: '13px 36px', border: `1px solid ${c.goldDim}`, color: c.gold, fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', fontFamily: 'system-ui, sans-serif', background: 'transparent', cursor: 'pointer' },
  wrap: { maxWidth: '1040px', margin: '0 auto', padding: '0 60px' },
  section: { padding: '96px 0' },
  label: { fontSize: '9px', letterSpacing: '0.45em', textTransform: 'uppercase', color: c.gold, marginBottom: '20px', fontFamily: 'system-ui, sans-serif', display: 'block' },
  h2: { fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.08, marginBottom: '36px' },
  p: { fontSize: '0.97rem', lineHeight: 1.85, color: c.muted, marginBottom: '18px', fontFamily: 'system-ui, sans-serif', maxWidth: '600px' },
  rule: { height: '1px', background: c.rule, margin: '0 60px' },
  svcGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: c.rule, marginTop: '48px' },
  svc: { padding: '40px 32px', background: c.bg },
  svcMark: { width: '28px', height: '1px', background: c.gold, marginBottom: '24px' },
  svcH: { fontSize: '1.08rem', fontStyle: 'italic', marginBottom: '14px', lineHeight: 1.3 },
  svcP: { fontSize: '0.88rem', lineHeight: 1.75, color: c.muted, fontFamily: 'system-ui, sans-serif' },
  contactSection: { background: c.surface, padding: '96px 60px' },
  contactWrap: { maxWidth: '1040px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' },
  input: { background: 'transparent', border: 'none', borderBottom: `1px solid ${c.rule}`, padding: '10px 0', color: c.text, fontFamily: 'Georgia, serif', fontSize: '0.95rem', outline: 'none', width: '100%', display: 'block', marginBottom: '20px' },
  textarea: { background: c.bg, border: `1px solid ${c.rule}`, padding: '14px', color: c.text, fontFamily: 'Georgia, serif', fontSize: '0.95rem', outline: 'none', width: '100%', resize: 'none', display: 'block', marginBottom: '20px' },
  footer: { padding: '24px 60px', borderTop: `1px solid ${c.rule}`, display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: c.muted, fontFamily: 'system-ui, sans-serif' },
};

const SERVICES = [
  ['Strategic Consulting', 'Provides strategic consulting and operational advisory services to builders, developers, and real estate investors, with guidance tailored to evolving priorities and long-term objectives.'],
  ['Development Planning', 'Advises on development planning, project coordination, and execution frameworks that help leadership teams move initiatives forward with structure and oversight.'],
  ['Business Management Advisory', 'Supports business management, stakeholder alignment, and ongoing operational decision-making across complex real estate and development-related engagements.'],
];

export default function Template1() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-r]', { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: 'power3.out', delay: 0.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={s.root}>
      <section style={s.hero}>
        <span style={s.eyebrow} data-r>Capital & Advisory</span>
        <h1 style={s.h1} data-r>Strategic Perspective<br />for Complex Initiatives</h1>
        <p style={s.heroP} data-r>Provides strategic consulting and operational advisory services to builders, developers, and real estate investors, including development planning, project oversight, and business management consulting.</p>
        <a href="#contact" style={s.btn} data-r>Start a Conversation</a>
        <div style={s.heroRule} />
      </section>

      <div style={s.rule} />
      <div style={s.wrap}>
        <div style={s.section}>
          <span style={s.label}>About</span>
          <h2 style={s.h2}>An experienced approach<br />to advisory leadership</h2>
          <p style={s.p}>Provides strategic consulting and operational advisory services to builders, developers, and real estate investors, with an emphasis on thoughtful planning, measured execution, and steady project leadership.</p>
          <p style={s.p}>Engagements may include development planning, project oversight, and business management consulting designed to support complex priorities with clarity, discretion, and continuity.</p>
        </div>
      </div>

      <div style={s.rule} />
      <div style={s.wrap}>
        <div style={{ ...s.section, paddingBottom: '0' }}>
          <span style={s.label}>Services</span>
          <h2 style={s.h2}>What we offer</h2>
        </div>
        <div style={s.svcGrid}>
          {SERVICES.map(([h, p]) => (
            <div key={h} style={s.svc}>
              <div style={s.svcMark} />
              <h3 style={s.svcH}>{h}</h3>
              <p style={s.svcP}>{p}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: '96px' }} />
      <div style={s.rule} />

      <div id="contact" style={s.contactSection}>
        <div style={s.contactWrap}>
          <div>
            <span style={s.label}>Contact</span>
            <h2 style={s.h2}>Get in touch</h2>
            <p style={{ ...s.p, maxWidth: '100%' }}>Reach out to discuss an upcoming project, an active engagement, or a general advisory need. We respond to all qualified inquiries within 24 hours.</p>
            <div style={{ marginTop: '32px', color: c.muted, fontSize: '0.9rem', lineHeight: 2.4, fontFamily: 'system-ui, sans-serif' }}>
              <div>contact@yourcompany.com</div>
              <div>(000) 000-0000</div>
              <div>123 Business Ave, Your City, ST 00000</div>
            </div>
          </div>
          <form onSubmit={e => e.preventDefault()}>
            <input placeholder="Name" style={s.input} />
            <input placeholder="Email" style={s.input} />
            <textarea placeholder="Message" rows={5} style={s.textarea} />
            <button style={{ ...s.btn, border: `1px solid ${c.goldDim}` }} type="submit">Send Message</button>
          </form>
        </div>
      </div>

      <div style={s.footer}>
        <span>© 2026 Your Company Name. All rights reserved.</span>
        <span>Privacy Policy</span>
      </div>
    </div>
  );
}
