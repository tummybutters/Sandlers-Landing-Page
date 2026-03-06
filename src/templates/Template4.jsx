import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const c = {
  bg: '#faf5ee',
  cream: '#f2ead8',
  burgundy: '#7d2535',
  burgundyLight: '#9c3545',
  tan: '#c5a47e',
  text: '#2a1810',
  muted: '#7a6558',
  border: '#e0d5c5',
};

const s = {
  root: { minHeight: '100vh', background: c.bg, color: c.text, fontFamily: 'Georgia, "Times New Roman", serif', overflowX: 'hidden' },
  nav: { padding: '0 60px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${c.border}` },
  navBrand: { fontSize: '13px', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', fontWeight: 600 },
  navLinks: { display: 'flex', gap: '36px', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', color: c.muted },
  hero: { background: c.cream, padding: '120px 60px', textAlign: 'center', borderBottom: `1px solid ${c.border}`, position: 'relative' },
  heroDeco: { width: '80px', height: '1px', background: c.tan, margin: '0 auto 32px' },
  heroBadge: { fontSize: '10px', letterSpacing: '0.5em', textTransform: 'uppercase', color: c.tan, marginBottom: '24px', display: 'block', fontFamily: 'system-ui, sans-serif' },
  h1: { fontSize: 'clamp(2.6rem, 5vw, 4.8rem)', fontWeight: 400, lineHeight: 1.1, fontStyle: 'italic', marginBottom: '28px', color: c.burgundy },
  heroP: { fontSize: '1.05rem', lineHeight: 1.85, color: c.muted, maxWidth: '540px', margin: '0 auto 48px', fontFamily: 'system-ui, sans-serif' },
  btn: { padding: '14px 40px', background: c.burgundy, color: '#fff', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', fontFamily: 'system-ui, sans-serif', border: 'none', cursor: 'pointer' },
  ornament: { textAlign: 'center', color: c.tan, fontSize: '1.2rem', margin: '48px 0 0', letterSpacing: '0.5em' },
  section: { padding: '96px 60px', maxWidth: '1060px', margin: '0 auto' },
  sectionHead: { textAlign: 'center', marginBottom: '64px' },
  label: { fontSize: '10px', letterSpacing: '0.45em', textTransform: 'uppercase', color: c.tan, marginBottom: '16px', display: 'block', fontFamily: 'system-ui, sans-serif' },
  h2: { fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.1, color: c.burgundy, marginBottom: '16px' },
  dividerLine: { width: '60px', height: '1px', background: c.tan, margin: '0 auto' },
  p: { fontSize: '1rem', lineHeight: 1.9, color: c.muted, marginBottom: '18px', fontFamily: 'system-ui, sans-serif' },
  aboutGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' },
  svcGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', textAlign: 'center' },
  svcCard: { padding: '40px 28px', background: c.cream, borderTop: `3px solid ${c.burgundy}` },
  svcDeco: { width: '32px', height: '1px', background: c.tan, margin: '0 auto 24px' },
  svcH: { fontSize: '1.08rem', fontStyle: 'italic', marginBottom: '16px', color: c.burgundy, lineHeight: 1.3 },
  svcP: { fontSize: '0.9rem', lineHeight: 1.8, color: c.muted, fontFamily: 'system-ui, sans-serif' },
  contactBg: { background: c.cream, borderTop: `1px solid ${c.border}` },
  contactInner: { maxWidth: '1060px', margin: '0 auto', padding: '96px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' },
  input: { width: '100%', padding: '10px 0', background: 'transparent', border: 'none', borderBottom: `1px solid ${c.border}`, color: c.text, fontFamily: 'Georgia, serif', fontSize: '0.95rem', outline: 'none', display: 'block', marginBottom: '20px', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '12px', background: c.bg, border: `1px solid ${c.border}`, color: c.text, fontFamily: 'system-ui, sans-serif', fontSize: '0.93rem', outline: 'none', resize: 'none', display: 'block', marginBottom: '20px', boxSizing: 'border-box' },
  footer: { padding: '22px 60px', borderTop: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', fontSize: '11px', letterSpacing: '0.12em', color: c.muted, fontFamily: 'system-ui, sans-serif' },
};

const SERVICES = [
  ['Strategic Consulting', 'Provides strategic consulting and operational advisory services to builders, developers, and real estate investors, with each engagement shaped around the client’s evolving priorities.'],
  ['Project Oversight', 'Supports development planning, project oversight, and coordination across initiatives that require clear structure, measured guidance, and experienced leadership.'],
  ['Business Management Consulting', 'Advises on business management, organizational execution, and operational decision-making within complex real estate and development contexts.'],
];

export default function Template4() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-r]', { opacity: 0, scale: 0.97 }, {
        opacity: 1, scale: 1, duration: 1, stagger: 0.12, ease: 'power2.out', delay: 0.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={s.root}>
      <nav style={s.nav}>
        <span style={s.navBrand} data-r>Your Company Name</span>
        <div style={s.navLinks} data-r>
          <span>About</span>
          <span>Services</span>
          <span>Contact</span>
        </div>
      </nav>

      <section style={s.hero}>
        <span style={s.heroBadge} data-r>Capital & Advisory</span>
        <div style={s.heroDeco} data-r />
        <h1 style={s.h1} data-r>Measured Advisory Support<br />for Complex Mandates</h1>
        <p style={s.heroP} data-r>Provides strategic consulting and operational advisory services to builders, developers, and real estate investors, including development planning, project oversight, and business management consulting.</p>
        <a href="#contact" style={s.btn} data-r>Start a Conversation</a>
        <div style={s.ornament} data-r>— ✦ —</div>
      </section>

      <div style={s.section}>
        <div style={s.sectionHead}>
          <span style={s.label}>About Us</span>
          <h2 style={s.h2}>A Disciplined Approach<br />to Advisory Work</h2>
          <div style={s.dividerLine} />
        </div>
        <div style={s.aboutGrid}>
          <p style={s.p}>Provides strategic consulting and operational advisory services to builders, developers, and real estate investors with a focus on thoughtful planning, active oversight, and practical business support.</p>
          <p style={s.p}>Engagements may span development planning, project oversight, and business management consulting for clients seeking experienced perspective across complex initiatives and ongoing operations.</p>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${c.border}`, background: c.bg }}>
        <div style={s.section}>
          <div style={s.sectionHead}>
            <span style={s.label}>Our Services</span>
            <h2 style={s.h2}>What We Offer</h2>
            <div style={s.dividerLine} />
          </div>
          <div style={s.svcGrid}>
            {SERVICES.map(([h, p]) => (
              <div key={h} style={s.svcCard}>
                <div style={s.svcDeco} />
                <h3 style={s.svcH}>{h}</h3>
                <p style={s.svcP}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="contact" style={s.contactBg}>
        <div style={s.contactInner}>
          <div>
            <span style={s.label}>Contact Us</span>
            <h2 style={s.h2}>We'd Love to<br />Hear From You</h2>
            <div style={{ ...s.dividerLine, margin: '0 0 28px' }} />
            <p style={{ ...s.p, maxWidth: '100%' }}>Reach out to discuss a project, advisory engagement, or general inquiry. We respond to all qualified inquiries within 24 hours.</p>
            <div style={{ marginTop: '28px', color: c.muted, fontSize: '0.9rem', lineHeight: 2.6, fontFamily: 'system-ui, sans-serif' }}>
              <div>contact@yourcompany.com</div>
              <div>(000) 000-0000</div>
              <div>123 Business Ave, Your City, ST 00000</div>
            </div>
          </div>
          <form onSubmit={e => e.preventDefault()}>
            <input placeholder="Name" style={s.input} />
            <input placeholder="Email" style={s.input} />
            <textarea placeholder="Message" rows={5} style={s.textarea} />
            <button style={{ ...s.btn, cursor: 'pointer' }} type="submit">Send Message</button>
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
