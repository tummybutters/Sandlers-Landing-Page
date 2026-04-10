import { useState } from 'react';
import useSecretRouteMeta from '../hooks/useSecretRouteMeta';

function buildVCard({
  firstName,
  lastName,
  fullName,
  company,
  title,
  phoneNumber,
  email,
  website,
  socialLinks = [],
  note,
}) {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${fullName}`,
    `ORG:${company}`,
    `TITLE:${title}`,
  ];

  if (phoneNumber) {
    lines.push(`TEL;TYPE=CELL:${phoneNumber}`);
  }

  if (email) {
    lines.push(`EMAIL;TYPE=INTERNET:${email}`);
  }

  if (website) {
    lines.push(`URL:${website}`);
  }

  socialLinks.forEach((link) => {
    if (link.href) {
      lines.push(`URL:${link.href}`);
    }
  });

  if (note) {
    lines.push(`NOTE:${note}`);
  }

  lines.push('END:VCARD');
  return lines.join('\r\n');
}

export default function SecretBusinessCard({
  routeTitle,
  firstName,
  lastName,
  fullName,
  title,
  note,
  brandHref,
  primaryActions,
  saveFileName,
  phoneNumber,
  email,
  socialLinks,
}) {
  const [saveLabel, setSaveLabel] = useState('Save Contact');

  useSecretRouteMeta(routeTitle);

  const handleSaveContact = async () => {
    const vcard = buildVCard({
      firstName,
      lastName,
      fullName,
      company: 'Qortana',
      title,
      phoneNumber,
      email,
      website: brandHref,
      socialLinks,
      note,
    });
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const file = new File([blob], saveFileName, { type: 'text/vcard' });

    try {
      if (navigator.canShare && navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${fullName} Contact`,
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
    link.download = saveFileName;

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
    <main className="secret-card-shell" role="main" aria-label={`Digital business card for ${fullName}`}>
      <div className="secret-card-orb secret-card-orb-left" aria-hidden="true" />
      <div className="secret-card-orb secret-card-orb-right" aria-hidden="true" />

      <section className="secret-card">
        <div className="secret-card-content">
          <a
            className="secret-card-brand"
            href={brandHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Qortana website"
          >
            <img src="/qortana-logo.png" alt="" className="secret-card-brand-logo" />
            <span>Qortana</span>
          </a>

          <p className="secret-card-kicker">Private digital card</p>
          <h1 className="secret-card-name">{fullName}</h1>
          <div className="secret-card-title">{title}</div>
          <p className="secret-card-slogan">
            <strong>{note}</strong>
          </p>

          <div className="secret-card-actions" aria-label="Contact links">
            {primaryActions.map((link) => (
              <a
                key={link.label}
                className={link.className}
                href={link.href}
                target={link.href.startsWith('http') || link.href.startsWith('mailto:') ? '_blank' : undefined}
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
