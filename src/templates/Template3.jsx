import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import useViewport from './useViewport';

const c = {
  bg: '#f0ece4',
  dark: '#141a10',
  green: '#1e4228',
  greenLight: '#2d6040',
  accent: '#d4a843',
  text: '#141a10',
  muted: '#42493d',
  border: '#d8d2c8',
};

const s = {
  root: { minHeight: '100vh', background: c.bg, color: c.text, fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif", overflowX: 'hidden' },
  nav: { padding: '0 60px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(20, 26, 16, 0.92)', borderBottom: `1px solid rgba(212,168,67,0.12)`, position: 'sticky', top: 0, zIndex: 10, backdropFilter: 'blur(10px)' },
  navBrand: { fontSize: '12px', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#fff' },
  navLinks: { display: 'flex', gap: '28px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.7)' },
  navLink: { color: 'inherit', textDecoration: 'none' },
  hero: { background: c.green, color: '#fff', padding: '72px 60px 84px', minHeight: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  heroBg: { position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1e4228 0%, #0e2014 60%, #0a1a0c 100%)', zIndex: 0 },
  heroAccent: { position: 'absolute', top: '60px', right: '60px', width: '240px', height: '240px', border: `1px solid rgba(212,168,67,0.2)`, borderRadius: '50%', zIndex: 0 },
  heroAccent2: { position: 'absolute', top: '80px', right: '80px', width: '180px', height: '180px', border: `1px solid rgba(212,168,67,0.1)`, borderRadius: '50%', zIndex: 0 },
  heroContent: { position: 'relative', zIndex: 1 },
  heroKicker: { fontSize: '11px', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: c.accent, marginBottom: '18px', display: 'block' },
  h1: { fontSize: 'clamp(3.2rem, 6.8vw, 6rem)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.045em', marginBottom: '24px', textTransform: 'uppercase', maxWidth: '900px' },
  heroMeta: { display: 'flex', alignItems: 'center', gap: '32px', borderTop: `1px solid rgba(255,255,255,0.12)`, paddingTop: '26px', marginTop: '4px' },
  heroP: { fontSize: '1.06rem', lineHeight: 1.78, color: 'rgba(255,255,255,0.84)', maxWidth: '460px', fontFamily: 'Arial, sans-serif', fontWeight: 500 },
  btn: { padding: '14px 32px', background: c.accent, color: c.dark, fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap', flexShrink: 0 },
  section: { padding: '84px 60px', maxWidth: '1120px', margin: '0 auto' },
  label: { fontSize: '10px', fontWeight: 800, letterSpacing: '0.35em', textTransform: 'uppercase', color: c.greenLight, marginBottom: '16px', display: 'block' },
  h2: { fontSize: 'clamp(2.5rem, 4.8vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.94, marginBottom: '28px', textTransform: 'uppercase', color: c.dark },
  p: { fontSize: '1.04rem', lineHeight: 1.84, color: c.muted, marginBottom: '18px', fontFamily: 'Arial, sans-serif', fontWeight: 500, maxWidth: '560px' },
  aboutGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' },
  svcList: { marginTop: '40px', borderTop: `2px solid ${c.dark}` },
  svcItem: { display: 'grid', gridTemplateColumns: '60px 1fr auto', alignItems: 'center', gap: '32px', padding: '32px 0', borderBottom: `1px solid ${c.border}` },
  svcNum: { fontSize: '1.5rem', fontWeight: 900, color: c.accent, letterSpacing: '-0.04em' },
  svcH: { fontSize: '1.28rem', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '8px' },
  svcP: { fontSize: '0.96rem', lineHeight: 1.78, color: c.muted, fontFamily: 'Arial, sans-serif', fontWeight: 500 },
  contactSection: { background: c.dark, color: '#fff', padding: '96px 60px' },
  contactWrap: { maxWidth: '1120px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' },
  input: { width: '100%', padding: '14px 0', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.15)', color: '#fff', fontFamily: 'inherit', fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.01em', outline: 'none', display: 'block', marginBottom: '24px', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '14px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', fontFamily: 'Arial, sans-serif', fontWeight: 500, fontSize: '1rem', outline: 'none', resize: 'none', display: 'block', marginBottom: '24px', boxSizing: 'border-box' },
  footer: { padding: '20px 60px', borderTop: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.muted, background: c.bg },
};

const SERVICES = [
  ['Strategic Consulting', 'Provides strategic consulting and operational advisory services to builders, developers, and real estate investors, with support calibrated to each engagement and operating environment.'],
  ['Development Planning', 'Advises on development planning, project leadership, and implementation strategy to help teams maintain alignment across moving parts and priorities.'],
  ['Operational Advisory', 'Offers project oversight and business management consulting for organizations seeking experienced guidance across complex real estate and development activity.'],
];

export default function Template3() {
  const ref = useRef(null);
  const { isMobile, isTablet } = useViewport();
  const padX = isMobile ? 20 : isTablet ? 32 : 60;
  const navPadY = isMobile ? 16 : 0;
  const sectionPad = isMobile ? 60 : isTablet ? 72 : 84;

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
      <nav style={{ ...s.nav, padding: `${navPadY}px ${padX}px`, height: isMobile ? 'auto' : s.nav.height, flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : s.nav.alignItems, gap: isMobile ? '14px' : 0 }}>
        <span style={s.navBrand} data-r>Your Company</span>
        <div style={{ ...s.navLinks, width: isMobile ? '100%' : 'auto', gap: isMobile ? '16px' : s.navLinks.gap, flexWrap: isMobile ? 'wrap' : 'nowrap' }} data-r>
          <a href="#about" style={s.navLink}>About</a>
          <a href="#services" style={s.navLink}>Services</a>
          <a href="#contact" style={s.navLink}>Contact</a>
        </div>
      </nav>

      <section style={{ ...s.hero, padding: `${isMobile ? 56 : 72}px ${padX}px ${isMobile ? 64 : 84}px`, minHeight: isTablet ? 'auto' : s.hero.minHeight }}>
        <div style={s.heroBg} />
        {!isMobile && <div style={{ ...s.heroAccent, top: isTablet ? '36px' : s.heroAccent.top, right: isTablet ? '32px' : s.heroAccent.right }} />}
        {!isMobile && <div style={{ ...s.heroAccent2, top: isTablet ? '56px' : s.heroAccent2.top, right: isTablet ? '52px' : s.heroAccent2.right }} />}
        <div style={s.heroContent}>
          <span style={s.heroKicker} data-r>Capital & Advisory</span>
          <h1 style={s.h1} data-r>Guide<br />Complexity.<br />Maintain Direction.</h1>
          <div style={{ ...s.heroMeta, flexDirection: isTablet ? 'column' : 'row', alignItems: isTablet ? 'flex-start' : s.heroMeta.alignItems, gap: isTablet ? '20px' : s.heroMeta.gap }} data-r>
            <p style={s.heroP}>Provides strategic consulting and operational advisory services to builders, developers, and real estate investors, including development planning, project oversight, and business management consulting.</p>
            <a href="#contact" style={s.btn}>Start a Conversation</a>
          </div>
        </div>
      </section>

      <div id="about" style={{ ...s.section, padding: `${sectionPad}px ${padX}px 48px` }}>
        <span style={s.label}>About</span>
        <div style={{ ...s.aboutGrid, gridTemplateColumns: isTablet ? '1fr' : s.aboutGrid.gridTemplateColumns, gap: isTablet ? '24px' : s.aboutGrid.gap }}>
          <h2 style={{ ...s.h2, marginBottom: 0 }}>Experienced<br />Advisory Support</h2>
          <div>
            <p style={s.p}>Provides strategic consulting and operational advisory services to builders, developers, and real estate investors, with a focus on maintaining momentum across planning and execution.</p>
            <p style={s.p}>Scope may include development planning, project oversight, and business management consulting that helps leadership teams navigate complexity with structure and discretion.</p>
          </div>
        </div>
      </div>

      <div id="services" style={{ padding: `0 ${padX}px ${isMobile ? 64 : 96}px`, maxWidth: '1120px', margin: '0 auto' }}>
        <span style={s.label}>Services</span>
        <h2 style={s.h2}>What We Do</h2>
        <div style={s.svcList}>
          {SERVICES.map(([h, p], i) => (
            <div key={h} style={{ ...s.svcItem, gridTemplateColumns: isMobile ? '1fr' : isTablet ? '48px 1fr' : s.svcItem.gridTemplateColumns, gap: isMobile ? '14px' : isTablet ? '20px' : s.svcItem.gap, alignItems: isMobile ? 'start' : s.svcItem.alignItems }}>
              <span style={s.svcNum}>0{i + 1}</span>
              <div>
                <div style={s.svcH}>{h}</div>
                <p style={s.svcP}>{p}</p>
              </div>
              {!isTablet && <div style={{ width: '48px', height: '48px', border: `2px solid ${c.accent}`, borderRadius: '50%', flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </div>

      <div id="contact" style={{ ...s.contactSection, padding: `${isMobile ? 64 : 96}px ${padX}px` }}>
        <div style={{ ...s.contactWrap, gridTemplateColumns: isTablet ? '1fr' : s.contactWrap.gridTemplateColumns, gap: isTablet ? '40px' : s.contactWrap.gap }}>
          <div>
            <span style={{ ...s.label, color: 'rgba(255,255,255,0.4)' }}>Contact</span>
            <h2 style={{ ...s.h2, color: '#fff' }}>Ready to Connect?</h2>
            <p style={{ ...s.p, color: 'rgba(255,255,255,0.82)', maxWidth: '100%' }}>Reach out to discuss a project, advisory engagement, or general inquiry. We respond to all qualified inquiries within 24 hours.</p>
            <div style={{ marginTop: '32px', color: 'rgba(255,255,255,0.78)', fontSize: '0.98rem', lineHeight: 2.2, fontFamily: 'Arial, sans-serif', fontWeight: 500 }}>
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

      <div style={{ ...s.footer, padding: `20px ${padX}px`, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '10px' : 0, alignItems: isMobile ? 'flex-start' : 'center' }}>
        <span>© 2026 Your Company Name. All rights reserved.</span>
        <span>Privacy Policy</span>
      </div>
    </div>
  );
}
