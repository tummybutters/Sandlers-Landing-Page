import { Link, NavLink } from 'react-router-dom';
import LegalLinks from './LegalLinks';
import { BRAND_NAME, SUPPORT_EMAIL, SUPPORT_PHONE } from '../legal/legalConfig';

const PRIMARY_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/intake', label: 'Strategy Intake' },
];

function normalizePhoneHref(phoneNumber) {
  return `tel:${phoneNumber.replace(/[^\d+]/g, '')}`;
}

export default function GlobalFooter() {
  return (
    <footer className="global-footer">
      <div className="global-footer-shell">
        <section className="global-footer-column">
          <span className="global-footer-label">Speak Directly With The Founder</span>
          <p className="global-footer-copy">
            If you want a direct line instead of a generic inbox, reach out to Thomas directly.
          </p>

          <div className="global-footer-contact-list">
            <a href={`mailto:${SUPPORT_EMAIL}`} className="global-footer-contact-link">
              {SUPPORT_EMAIL}
            </a>
            <a href={normalizePhoneHref(SUPPORT_PHONE)} className="global-footer-contact-link">
              {SUPPORT_PHONE}
            </a>
          </div>
        </section>

        <nav className="global-footer-column" aria-label={`${BRAND_NAME} footer`}>
          <span className="global-footer-label">Navigate</span>
          <div className="global-footer-nav">
            {PRIMARY_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `global-footer-nav-link${isActive ? ' global-footer-nav-link-active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        <LegalLinks tone="light" align="right" condensed className="global-footer-legal" />
      </div>
    </footer>
  );
}
