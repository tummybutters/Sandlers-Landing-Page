import { Link } from 'react-router-dom';
import { LEGAL_ROUTES } from '../legal/legalConfig';

function buildClassName(parts) {
  return parts.filter(Boolean).join(' ');
}

export default function LegalLinks({
  className = '',
  tone = 'light',
  align = 'center',
  condensed = false,
  showLabel = true,
}) {
  return (
    <div
      className={buildClassName([
        'legal-links',
        `legal-links-${tone}`,
        `legal-links-align-${align}`,
        condensed ? 'legal-links-condensed' : '',
        className,
      ])}
    >
      {showLabel ? <span className="legal-links-label">Legal</span> : null}

      <div className="legal-links-items">
        {LEGAL_ROUTES.map((item) => (
          <Link key={item.to} to={item.to} className="legal-links-item">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
