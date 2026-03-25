import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LegalLinks from './LegalLinks';
import { LEGAL_PAGE_CONTENT } from '../legal/legalContent';
import { BRAND_NAME, formatContactLines } from '../legal/legalConfig';

function renderParagraph(paragraph, index) {
  return <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>;
}

function renderBullet(bullet, index) {
  return <li key={`${index}-${bullet.slice(0, 24)}`}>{bullet}</li>;
}

export default function LegalPage({ pageKey }) {
  const page = LEGAL_PAGE_CONTENT[pageKey];

  useEffect(() => {
    if (!page) {
      document.title = BRAND_NAME;
      return;
    }

    document.title = `${page.title} | ${BRAND_NAME}`;
  }, [page]);

  if (!page) {
    return null;
  }

  return (
    <div className="legal-shell">
      <div className="legal-grid" />
      <div className="legal-glow legal-glow-left" />
      <div className="legal-glow legal-glow-right" />

      <main className="legal-page">
        <header className="legal-hero">
          <div className="legal-hero-copy">
            <span className="legal-kicker">{page.eyebrow}</span>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
          </div>

          <div className="legal-hero-actions">
            <Link to="/intake" className="legal-primary-link">
              Continue to Intake
              <ArrowUpRight size={16} />
            </Link>
            <Link to="/" className="legal-secondary-link">
              Back to Home
            </Link>
          </div>
        </header>

        <LegalLinks tone="dark" align="left" />

        <section className="legal-card-stack">
          {page.sections.map((section) => (
            <article key={section.title} className="legal-card">
              <h2>{section.title}</h2>

              {section.paragraphs?.map(renderParagraph)}

              {section.bullets?.length ? (
                <ul>
                  {section.bullets.map(renderBullet)}
                </ul>
              ) : null}

              {section.contact ? (
                <div className="legal-contact-block">
                  {formatContactLines().map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
