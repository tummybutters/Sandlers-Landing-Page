import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import useViewport from './useViewport';

const c = {
  bg: '#ffffff',
  surface: '#f4f7fb',
  navy: '#0f1f3d',
  blue: '#2563eb',
  blueLight: '#eff4ff',
  text: '#0f1f3d',
  muted: '#4a5568',
  border: '#e2e8f0',
};

const s = {
  root: { minHeight: '100vh', background: c.bg, color: c.text, fontFamily: "'Helvetica Neue', Arial, sans-serif", overflowX: 'hidden' },
  nav: { padding: '0 60px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${c.border}`, background: c.bg, position: 'sticky', top: 0, zIndex: 10 },
  navBrand: { fontSize: '15px', fontWeight: 800, letterSpacing: '-0.01em', color: c.navy },
  navLinks: { display: 'flex', alignItems: 'center', gap: '28px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.muted },
  navLink: { color: 'inherit', textDecoration: 'none' },
  navBtn: { padding: '9px 22px', background: c.blue, color: '#fff', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer', borderRadius: '6px', textDecoration: 'none', display: 'inline-block' },
  hero: { padding: '76px 60px 84px', maxWidth: '1120px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '64px', alignItems: 'center', minHeight: 'calc(100vh - 68px)' },
  eyebrow: { display: 'inline-block', padding: '5px 12px', background: c.blueLight, color: c.blue, fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '24px', borderRadius: '4px' },
  h1: { fontSize: 'clamp(2.8rem, 4.8vw, 4.4rem)', fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.04em', marginBottom: '20px', color: c.navy },
  heroP: { fontSize: '1rem', lineHeight: 1.72, color: c.muted, marginBottom: '32px', maxWidth: '560px' },
  btnPrimary: { padding: '14px 30px', background: c.blue, color: '#fff', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', borderRadius: '6px', textDecoration: 'none', display: 'inline-block' },
  statCard: { padding: '28px 24px', background: c.bg, border: `1px solid ${c.border}`, borderRadius: '10px', borderLeft: `4px solid ${c.blue}`, marginBottom: '16px' },
  statNum: { fontSize: '2.4rem', fontWeight: 800, color: c.blue, lineHeight: 1, letterSpacing: '-0.04em' },
  statLabel: { fontSize: '13px', color: c.muted, marginTop: '6px' },
  bgSection: { background: c.surface, padding: '88px 0' },
  section: { padding: '88px 0' },
  wrap: { maxWidth: '1120px', margin: '0 auto', padding: '0 60px' },
  label: { fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: c.blue, marginBottom: '12px', display: 'block' },
  h2: { fontSize: 'clamp(2.1rem, 3.6vw, 3.1rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.04, marginBottom: '22px', color: c.navy },
  p: { fontSize: '1rem', lineHeight: 1.8, color: c.muted, marginBottom: '16px', maxWidth: '600px' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '48px' },
  card: { padding: '36px 28px', background: c.bg, border: `1px solid ${c.border}`, borderRadius: '10px' },
  cardBar: { width: '36px', height: '4px', background: c.blue, borderRadius: '2px', marginBottom: '22px' },
  cardH: { fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', color: c.navy, lineHeight: 1.2 },
  cardP: { fontSize: '0.9rem', lineHeight: 1.75, color: c.muted },
  contactBg: { background: c.navy, padding: '100px 60px' },
  contactWrap: { maxWidth: '1120px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' },
  input: { width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: '#fff', fontFamily: 'inherit', fontSize: '0.95rem', outline: 'none', borderRadius: '6px', display: 'block', marginBottom: '16px', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: '#fff', fontFamily: 'inherit', fontSize: '0.95rem', outline: 'none', borderRadius: '6px', resize: 'none', display: 'block', marginBottom: '16px', boxSizing: 'border-box' },
  footer: { padding: '24px 60px', borderTop: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: c.muted, background: c.bg },
};

const STATS = [
  ['20+', 'Years of Experience'],
  ['50+', 'Projects Advised'],
  ['100%', 'Tailored Engagements'],
];

const SERVICES = [
  ['Strategic Consulting', 'Provides strategic consulting and operational advisory services to builders, developers, and real estate investors, with guidance shaped around evolving business and project needs.'],
  ['Project Oversight', 'Supports project oversight, planning, and coordination across active initiatives, helping teams maintain direction, accountability, and informed decision-making.'],
  ['Business Management Consulting', 'Advises on business management, organizational priorities, and operational structure for clients navigating complex development and real estate environments.'],
];

export default function Template2() {
  const ref = useRef(null);
  const { isMobile, isTablet } = useViewport();
  const padX = isMobile ? 20 : isTablet ? 32 : 60;
  const navPadY = isMobile ? 14 : 0;
  const sectionPad = isMobile ? 60 : isTablet ? 72 : 88;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-r]', { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.15,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={s.root}>
      <nav style={{ ...s.nav, padding: `${navPadY}px ${padX}px`, height: isMobile ? 'auto' : s.nav.height, flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : s.nav.alignItems, gap: isMobile ? '14px' : 0 }}>
        <span style={s.navBrand} data-r>YOUR COMPANY</span>
        <div style={{ ...s.navLinks, width: isMobile ? '100%' : 'auto', gap: isMobile ? '14px' : s.navLinks.gap, flexWrap: isMobile ? 'wrap' : 'nowrap' }} data-r>
          <a href="#about" style={s.navLink}>About</a>
          <a href="#services" style={s.navLink}>Services</a>
          <a href="#contact" style={{ ...s.navBtn, padding: isMobile ? '10px 18px' : s.navBtn.padding }}>Contact</a>
        </div>
      </nav>

      <div style={{ ...s.hero, padding: `${isMobile ? 56 : 76}px ${padX}px ${isMobile ? 64 : 84}px`, gridTemplateColumns: isTablet ? '1fr' : s.hero.gridTemplateColumns, gap: isTablet ? '36px' : s.hero.gap, minHeight: isTablet ? 'auto' : s.hero.minHeight }}>
        <div>
          <span style={s.eyebrow} data-r>Capital & Advisory</span>
          <h1 style={s.h1} data-r>Operational Insight<br />for Evolving Projects</h1>
          <p style={s.heroP} data-r>Provides strategic consulting and operational advisory services to builders, developers, and real estate investors, including development planning, project oversight, and business management consulting.</p>
          <a href="#contact" style={s.btnPrimary} data-r>Start a Conversation</a>
        </div>
        <div data-r>
          {STATS.map(([num, label]) => (
            <div key={label} style={s.statCard}>
              <div style={s.statNum}>{num}</div>
              <div style={s.statLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div id="about" style={{ ...s.bgSection, padding: `${sectionPad}px 0` }}>
        <div style={{ ...s.wrap, padding: `0 ${padX}px` }}>
          <span style={s.label}>About</span>
          <h2 style={s.h2}>Built on experience.<br />Focused on execution.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', gap: isTablet ? '12px' : '40px' }}>
            <p style={{ ...s.p, maxWidth: '100%' }}>Provides strategic consulting and operational advisory services to builders, developers, and real estate investors with an emphasis on planning, coordination, and practical execution support.</p>
            <p style={{ ...s.p, maxWidth: '100%' }}>Work may include development planning, project oversight, and business management consulting tailored to the needs of active ventures, internal teams, and leadership stakeholders.</p>
          </div>
        </div>
      </div>

      <div id="services" style={{ ...s.section, padding: `${sectionPad}px 0` }}>
        <div style={{ ...s.wrap, padding: `0 ${padX}px` }}>
          <span style={s.label}>Services</span>
          <h2 style={s.h2}>What we do</h2>
          <div style={{ ...s.cardGrid, gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : s.cardGrid.gridTemplateColumns, gap: isMobile ? '18px' : s.cardGrid.gap }}>
            {SERVICES.map(([h, p]) => (
              <div key={h} style={s.card}>
                <div style={s.cardBar} />
                <h3 style={s.cardH}>{h}</h3>
                <p style={s.cardP}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="contact" style={{ ...s.contactBg, padding: `${isMobile ? 64 : 100}px ${padX}px` }}>
        <div style={{ ...s.contactWrap, gridTemplateColumns: isTablet ? '1fr' : s.contactWrap.gridTemplateColumns, gap: isTablet ? '40px' : s.contactWrap.gap }}>
          <div>
            <span style={{ ...s.label, color: 'rgba(255,255,255,0.5)' }}>Contact</span>
            <h2 style={{ ...s.h2, color: '#fff' }}>Let’s discuss<br />your next initiative.</h2>
            <p style={{ ...s.p, color: 'rgba(255,255,255,0.6)', maxWidth: '100%' }}>Reach out to discuss a project, advisory engagement, or general inquiry. We respond to all qualified inquiries within 24 hours.</p>
            <div style={{ marginTop: '32px', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 2.4 }}>
              <div>contact@yourcompany.com</div>
              <div>(000) 000-0000</div>
              <div>123 Business Ave, Your City, ST 00000</div>
            </div>
          </div>
          <form onSubmit={e => e.preventDefault()}>
            <input placeholder="Name" style={s.input} />
            <input placeholder="Email" style={s.input} />
            <textarea placeholder="Message" rows={5} style={s.textarea} />
            <button style={{ ...s.btnPrimary, width: '100%', padding: '14px' }} type="submit">Send Message</button>
          </form>
        </div>
      </div>

      <div style={{ ...s.footer, padding: `24px ${padX}px`, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '10px' : 0, alignItems: isMobile ? 'flex-start' : 'center' }}>
        <span>© 2026 Your Company Name. All rights reserved.</span>
        <span>Privacy Policy</span>
      </div>
    </div>
  );
}
