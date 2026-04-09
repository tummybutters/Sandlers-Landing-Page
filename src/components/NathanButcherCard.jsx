import { useState } from 'react';
import useSecretRouteMeta from '../hooks/useSecretRouteMeta';

const contactLinks = [
  {
    label: 'Website',
    href: 'https://qortana.com/',
    className: 'secret-card-action secret-card-action-primary',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nathanbutcher123',
    className: 'secret-card-action',
  },
  {
    label: '714 235 3089',
    href: 'tel:+17142353089',
    className: 'secret-card-action',
  },
];

function buildNathanVCard() {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Butcher;Nathan;;;',
    'FN:Nathan Butcher',
    'ORG:Qortana',
    'TITLE:AI & Automation Engineer',
    'TEL;TYPE=CELL:+1-714-235-3089',
    'URL:https://qortana.com',
    'URL:https://www.linkedin.com/in/nathanbutcher123',
    'NOTE:Building your autonomous workforce.',
    'END:VCARD',
  ].join('\r\n');
}

export default function NathanButcherCard() {
  const [saveLabel, setSaveLabel] = useState('Save Contact');

  useSecretRouteMeta('Nathan Butcher | Qortana');

  const handleSaveContact = async () => {
    const vcard = buildNathanVCard();
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const file = new File([blob], 'nathan-butcher.vcf', { type: 'text/vcard' });

    try {
      if (navigator.canShare && navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Nathan Butcher Contact',
        });
        setSaveLabel('Shared');
        window.setTimeout(() => setSaveLabel('Save Contact'), 1600);
        return;
      }
    } catch {
      // Fall back to download behavior below when native share is unavailable or cancelled.
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nathan-butcher.vcf';

    if ('download' in HTMLAnchorElement.prototype) {
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      window.location.href = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcard)}`;
    }

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setSaveLabel('Saved');
    window.setTimeout(() => setSaveLabel('Save Contact'), 1600);
  };

  return (
    <main className="secret-card-shell" role="main" aria-label="Digital business card for Nathan Butcher">
      <div className="secret-card-orb secret-card-orb-left" aria-hidden="true" />
      <div className="secret-card-orb secret-card-orb-right" aria-hidden="true" />

      <section className="secret-card">
        <div className="secret-card-content">
          <a
            className="secret-card-brand"
            href="https://qortana.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Qortana website"
          >
            <img src="/qortana-logo.png" alt="" className="secret-card-brand-logo" />
            <span>Qortana</span>
          </a>

          <p className="secret-card-kicker">Private digital card</p>
          <h1 className="secret-card-name">Nathan Butcher</h1>
          <div className="secret-card-title">AI &amp; Automation Engineer</div>
          <p className="secret-card-slogan">
            <strong>Building your autonomous workforce.</strong>
          </p>

          <div className="secret-card-actions" aria-label="Contact links">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                className={link.className}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                {link.label}
              </a>
            ))}

            <button className="secret-card-action" type="button" onClick={handleSaveContact}>
              {saveLabel}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
