import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const c = {
  bg: '#f0ece4',
  dark: '#141a10',
  green: '#1e4228',
  greenLight: '#2d6040',
  accent: '#d4a843',
  text: '#141a10',
  muted: '#5a6152',
  border: '#d8d2c8',
};

const s = {
  root: { minHeight: '100vh', background: c.bg, color: c.text, fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif", overflowX: 'hidden' },
  hero: { background: c.green, color: '#fff', padding: '0 60px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '80px', position: 'relative', overflow: 'hidden' },
  heroBg: { position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1e4228 0%, #0e2014 60%, #0a1a0c 100%)', zIndex: 0 },
  heroAccent: { position: 'absolute', top: '60px', right: '60px', width: '240px', height: '240px', border: `1px solid rgba(212,168,67,0.2)`, borderRadius: '50%', zIndex: 0 },
  heroAccent2: { position: 'absolute', top: '80px', right: '80px', width: '180px', height: '180px', border: `1px solid rgba(212,168,67,0.1)`, borderRadius: '50%', zIndex: 0 },
  heroContent: { position: 'relative', zIndex: 1 },
  heroKicker: { fontSize: '11px', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: c.accent, marginBottom: '20px', display: 'block' },
  h1: { fontSize: 'clamp(3.5rem, 8vw, 8rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '32px', textTransform: 'uppercase' },
  heroMeta: { display: 'flex', alignItems: 'center', gap: '40px', borderTop: `1px solid rgba(255,255,255,0.12)`, paddingTop: '32px', marginTop: '8px' },
  heroP: { fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', maxWidth: '460px', fontFamily: 'Arial, sans-serif', fontWeight: 400 },
  btn: { padding: '14px 32px', background: c.accent, color: c.dark, fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap', flexShrink: 0 },
  section: { padding: '96px 60px', maxWidth: '1120px', margin: '0 auto' },
  label: { fontSize: '10px', fontWeight: 800, letterSpacing: '0.35em', textTransform: 'uppercase', color: c.greenLight, marginBottom: '16px', display: 'block' },
  h2: { fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: '40px', textTransform: 'uppercase', color: c.dark },
  p: { fontSize: '1rem', lineHeight: 1.8, color: c.muted, marginBottom: '18px', fontFamily: 'Arial, sans-serif', fontWeight: 400, maxWidth: '560px' },
  aboutGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' },
  svcList: { marginTop: '40px', borderTop: `2px solid ${c.dark}` },
  svcItem: { display: 'grid', gridTemplateColumns: '60px 1fr auto', alignItems: 'center', gap: '32px', padding: '32px 0', borderBottom: `1px solid ${c.border}` },
  svcNum: { fontSize: '1.5rem', fontWeight: 900, color: c.accent, letterSpacing: '-0.04em' },
  svcH: { fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '8px' },
  svcP: { fontSize: '0.9rem', lineHeight: 1.7, color: c.muted, fontFamily: 'Arial, sans-serif', fontWeight: 400 },
  contactSection: { background: c.dark, color: '#fff', padding: '96px 60px' },
  contactWrap: { maxWidth: '1120px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' },
  input: { width: '100%', padding: '14px 0', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.15)', color: '#fff', fontFamily: 'inherit', fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.01em', outline: 'none', display: 'block', marginBottom: '24px', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontFamily: 'Arial, sans-serif', fontWeight: 400, fontSize: '0.95rem', outline: 'none', resize: 'none', display: 'block', marginBottom: '24px', boxSizing: 'border-box' },
  footer: { padding: '20px 60px', borderTop: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.muted, background: c.bg },
};

const SERVICES = [
  ['Strategic Consulting', 'Provides strategic consulting and operational advisory services to builders, developers, and real estate investors, with support calibrated to each engagement and operating environment.'],
  ['Development Planning', 'Advises on development planning, project leadership, and implementation strategy to help teams maintain alignment across moving parts and priorities.'],
  ['Operational Advisory', 'Offers project oversight and business management consulting for organizations seeking experienced guidance across complex real estate and development activity.'],
];

export default function Template3() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-r]', { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={s.root}>
      <section style={s.hero}>
        <div style={s.heroBg} />
        <div style={s.heroAccent} />
        <div style={s.heroAccent2} />
        <div style={s.heroContent}>
          <span style={s.heroKicker} data-r>Capital & Advisory</span>
          <h1 style={s.h1} data-r>Guide<br />Complexity.<br />Maintain Direction.</h1>
          <div style={s.heroMeta} data-r>
            <p style={s.heroP}>Provides strategic consulting and operational advisory services to builders, developers, and real estate investors, including development planning, project oversight, and business management consulting.</p>
            <a href="#contact" style={s.btn}>Start a Conversation</a>
          </div>
        </div>
      </section>

      <div style={{ ...s.section, paddingBottom: '48px' }}>
        <span style={s.label}>About</span>
        <div style={s.aboutGrid}>
          <h2 style={{ ...s.h2, marginBottom: 0 }}>Experienced<br />Advisory Support</h2>
          <div>
            <p style={s.p}>Provides strategic consulting and operational advisory services to builders, developers, and real estate investors, with a focus on maintaining momentum across planning and execution.</p>
            <p style={s.p}>Scope may include development planning, project oversight, and business management consulting that helps leadership teams navigate complexity with structure and discretion.</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 60px 96px', maxWidth: '1120px', margin: '0 auto' }}>
        <span style={s.label}>Services</span>
        <h2 style={s.h2}>What We Do</h2>
        <div style={s.svcList}>
          {SERVICES.map(([h, p], i) => (
            <div key={h} style={s.svcItem}>
              <span style={s.svcNum}>0{i + 1}</span>
              <div>
                <div style={s.svcH}>{h}</div>
                <p style={s.svcP}>{p}</p>
              </div>
              <div style={{ width: '48px', height: '48px', border: `2px solid ${c.accent}`, borderRadius: '50%', flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

      <div id="contact" style={s.contactSection}>
        <div style={s.contactWrap}>
          <div>
            <span style={{ ...s.label, color: 'rgba(255,255,255,0.4)' }}>Contact</span>
            <h2 style={{ ...s.h2, color: '#fff' }}>Ready to Connect?</h2>
            <p style={{ ...s.p, color: 'rgba(255,255,255,0.55)', maxWidth: '100%' }}>Reach out to discuss a project, advisory engagement, or general inquiry. We respond to all qualified inquiries within 24 hours.</p>
            <div style={{ marginTop: '32px', color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 2.4, fontFamily: 'Arial, sans-serif' }}>
              <div>contact@yourcompany.com</div>
              <div>(000) 000-0000</div>
              <div>123 Business Ave, Your City, ST 00000</div>
            </div>
          </div>
          <form onSubmit={e => e.preventDefault()}>
            <input placeholder="Name" style={s.input} />
            <input placeholder="Email" style={s.input} />
            <textarea placeholder="Message" rows={5} style={s.textarea} />
            <button style={{ ...s.btn, background: c.accent, color: c.dark, width: '100%', border: 'none', cursor: 'pointer' }} type="submit">Send Message</button>
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
