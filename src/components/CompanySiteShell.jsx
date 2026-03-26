import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { companyRouteNavItems } from '../content/companySiteContent';
import { MagneticFlightLink } from './PremiumMotionLinks';

function CompanyNavItem({ item, onNavigate }) {
  const content = (
    <>
      <span className="company-nav-link-fill" aria-hidden="true" />
      <span className="company-nav-link-label">
        <span className="company-nav-link-track">
          <span>{item.label}</span>
          <span aria-hidden="true">{item.label}</span>
        </span>
      </span>
    </>
  );

  if (item.to) {
    return (
      <Link to={item.to} className="company-nav-link" onClick={onNavigate}>
        {content}
      </Link>
    );
  }

  return (
    <a href={item.href} className="company-nav-link" onClick={onNavigate}>
      {content}
    </a>
  );
}

export default function CompanySiteShell({
  children,
  navItems = companyRouteNavItems,
  ctaTo = '/intake',
  ctaLabel = 'Book a strategy call',
}) {
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
            {navItems.map((item) => (
              <CompanyNavItem key={item.to || item.href} item={item} />
            ))}
          </nav>

          <MagneticFlightLink
            to={ctaTo}
            label={ctaLabel}
            variant="header"
            className="company-header-cta"
          />

          <button
            type="button"
            className={`company-menu-toggle${isMobileMenuOpen ? ' is-open' : ''}`}
            aria-expanded={isMobileMenuOpen}
            aria-controls="company-mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
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
                  <p>Choose a page or jump straight into the intake.</p>
                </div>

                <nav className="company-mobile-nav" aria-label="Mobile primary">
                  {navItems.map((item, index) => {
                    const content = (
                      <>
                        <span className="company-mobile-nav-index">0{index + 1}</span>
                        <span className="company-mobile-nav-copy">
                          <span className="company-mobile-nav-title">{item.label}</span>
                          <span className="company-mobile-nav-detail">{item.detail}</span>
                        </span>
                      </>
                    );

                    if (item.to) {
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="company-mobile-nav-link"
                          onClick={closeMobileMenu}
                        >
                          {content}
                        </Link>
                      );
                    }

                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className="company-mobile-nav-link"
                        onClick={closeMobileMenu}
                      >
                        {content}
                      </a>
                    );
                  })}
                </nav>

                <div className="company-mobile-menu-cta-wrap">
                  <MagneticFlightLink
                    to={ctaTo}
                    label={ctaLabel}
                    variant="header"
                    className="company-mobile-menu-cta"
                  />
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="company-main company-page-main">{children}</main>
    </div>
  );
}
