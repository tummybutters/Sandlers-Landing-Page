import { useState } from 'react';
import useSecretRouteMeta from '../hooks/useSecretRouteMeta';

export default function SecretBusinessCard({
  routeTitle,
  fullName,
  title,
  note,
  brandHref,
  primaryActions,
  contactDownloadPath,
}) {
  const [saveLabel, setSaveLabel] = useState('Add to Contacts');

  useSecretRouteMeta(routeTitle);

  const handleSaveContact = async () => {
    try {
      const response = await fetch(contactDownloadPath);

      if (!response.ok) {
        throw new Error('Unable to load contact file');
      }

      const blob = await response.blob();
      const fileName = contactDownloadPath.split('/').pop() || `${fullName.toLowerCase().replace(/\s+/g, '-')}.vcf`;
      const file = new File([blob], fileName, { type: 'text/vcard' });

      if (navigator.canShare && navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${fullName} Contact`,
        });
        setSaveLabel('Shared');
        window.setTimeout(() => setSaveLabel('Add to Contacts'), 1600);
        return;
      }
    } catch {
      // Fall through to opening the .vcf file directly.
    }

    const link = document.createElement('a');
    link.href = contactDownloadPath;
    document.body.appendChild(link);
    link.click();
    link.remove();
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
