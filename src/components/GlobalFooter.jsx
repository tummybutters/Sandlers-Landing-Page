import { Link, NavLink } from 'react-router-dom';
import { BRAND_NAME, SUPPORT_EMAIL, SUPPORT_PHONE } from '../legal/legalConfig';

const PRIMARY_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/intake', label: 'Strategy Intake' },
];

const LEGAL_LINKS = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/messaging-terms', label: 'Messaging Terms' },
];

function normalizePhoneHref(phoneNumber) {
  return `tel:${phoneNumber.replace(/[^\d+]/g, '')}`;
}

export default function GlobalFooter() {
  return (
    <footer className="global-footer">
      <div className="global-footer-shell">
        <section className="global-footer-column global-footer-column-founder">
          <h2 className="global-footer-heading">Speak directly with the founder.</h2>
          <p className="global-footer-copy">
            Questions, fit checks, or a faster path to a conversation. Reach Thomas directly.
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
          <div className="global-footer-link-list">
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

        <nav className="global-footer-column global-footer-legal" aria-label="Legal">
          <span className="global-footer-label">Legal</span>
          <div className="global-footer-link-list">
            {LEGAL_LINKS.map((item) => (
              <Link key={item.to} to={item.to} className="global-footer-nav-link">
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  );
}
