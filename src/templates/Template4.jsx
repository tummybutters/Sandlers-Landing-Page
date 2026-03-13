import { useState } from 'react'
import { template4ImageSet } from '../photos/optimized/templateImageSets'

const templateStyles = `
  .template4 {
    --paper: #f7f2ea;
    --lavender: #e7dcf6;
    --rose: #f4e1e6;
    --mist: #dde0f3;
    --plum: #2b1f39;
    --ink: #2d2333;
    --muted: rgba(45, 35, 51, 0.72);
    --line: rgba(45, 35, 51, 0.12);
    --accent: #7754da;
    --accent-soft: #ee67ee;
    --section-space: clamp(44px, 6vw, 80px);
    min-height: 100vh;
    color: var(--ink);
    background: var(--paper);
    font-family: "Avenir Next", "Segoe UI", sans-serif;
  }

  .template4 * {
    box-sizing: border-box;
  }

  .template4 a {
    color: inherit;
    text-decoration: none;
  }

  .template4__shell {
    width: min(1280px, calc(100% - 32px));
    margin: 0 auto;
  }

  .template4__topbar {
    background: var(--paper);
    border-bottom: 1px solid var(--line);
  }

  .template4__topbarInner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    min-height: 66px;
  }

  .template4__brand {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
  }

  .template4__brandMark {
    width: 56px;
    height: 56px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    border-radius: 18px;
    overflow: hidden;
    color: #fff;
    background: linear-gradient(135deg, var(--accent), #a186ea);
  }

  .template4__brandMark img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .template4__brandInitials {
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .template4__brandMeta {
    min-width: 0;
    display: grid;
    gap: 4px;
  }

  .template4__eyebrow {
    margin: 0;
    color: var(--muted);
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  .template4__brandName {
    margin: 0;
    font-size: 1.06rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .template4__nav {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .template4__nav a {
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(45, 35, 51, 0.64);
  }

  .template4__nav a:hover {
    color: var(--ink);
  }

  .template4__navPhone {
    padding-left: 16px;
    border-left: 1px solid rgba(45, 35, 51, 0.14);
    color: var(--ink) !important;
  }

  .template4__heroBand {
    background:
      radial-gradient(circle at 78% 22%, rgba(119, 84, 218, 0.16), transparent 18%),
      radial-gradient(circle at 18% 80%, rgba(238, 103, 238, 0.14), transparent 18%),
      linear-gradient(180deg, #fbf8f4 0%, var(--paper) 100%);
    padding: 18px 0 var(--section-space);
  }

  .template4__heroLayout {
    display: grid;
    grid-template-columns: minmax(0, 1.18fr) minmax(280px, 0.82fr);
    gap: clamp(24px, 4vw, 48px);
    align-items: center;
  }

  .template4__heroCopy {
    max-width: 760px;
  }

  .template4__heroTag,
  .template4__sectionTag {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin: 0;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(45, 35, 51, 0.66);
  }

  .template4__heroTag::before,
  .template4__sectionTag::before {
    content: "";
    width: 40px;
    height: 1px;
    background: rgba(119, 84, 218, 0.48);
  }

  .template4__headline {
    margin: 18px 0 0;
    font-family: "Iowan Old Style", "Georgia", serif;
    font-size: clamp(2.35rem, 4.7vw, 4.35rem);
    line-height: 0.96;
    letter-spacing: -0.06em;
    max-width: 12.5ch;
  }

  .template4__headlineLine {
    display: block;
  }

  .template4__heroText {
    margin: 18px 0 0;
    max-width: 50ch;
    color: var(--muted);
    font-size: 1rem;
    line-height: 1.72;
  }

  .template4__heroActions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    margin-top: 20px;
  }

  .template4 .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 1rem 2rem;
    font-size: 0.92rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: rgb(255, 255, 255);
    color: var(--accent);
    cursor: pointer;
    border-radius: 0.5rem;
    border-bottom: 2px solid var(--accent);
    border-right: 2px solid var(--accent);
    border-top: 2px solid white;
    border-left: 2px solid white;
    transition-duration: 1s;
    transition-property: border-top, border-left, border-bottom, border-right, box-shadow, transform;
  }

  .template4 .btn:hover {
    border-top: 2px solid var(--accent);
    border-left: 2px solid var(--accent);
    border-bottom: 2px solid var(--accent-soft);
    border-right: 2px solid var(--accent-soft);
    box-shadow:
      rgba(240, 46, 170, 0.4) 5px 5px,
      rgba(240, 46, 170, 0.3) 10px 10px,
      rgba(240, 46, 170, 0.2) 15px 15px;
    transform: translate(-2px, -2px);
  }

  .template4 .btn--ghost {
    background: transparent;
    color: var(--ink);
    border-top: 2px solid rgba(255, 255, 255, 0.7);
    border-left: 2px solid rgba(255, 255, 255, 0.7);
    border-bottom: 2px solid rgba(45, 35, 51, 0.18);
    border-right: 2px solid rgba(45, 35, 51, 0.18);
  }

  .template4 .btn--dark {
    background: rgba(255, 255, 255, 0.96);
    color: var(--accent);
  }

  .template4__heroSecondary,
  .template4__inlineLink {
    display: inline-flex;
    align-items: center;
    color: rgba(45, 35, 51, 0.74);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .template4__heroSecondary:hover,
  .template4__inlineLink:hover {
    color: var(--ink);
  }

  .template4__heroStats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin-top: 22px;
    padding-top: 16px;
    border-top: 1px solid rgba(45, 35, 51, 0.1);
  }

  .template4__stat {
    display: grid;
    gap: 8px;
  }

  .template4__statValue {
    margin: 0;
    font-family: "Iowan Old Style", "Georgia", serif;
    font-size: 1.4rem;
    letter-spacing: -0.04em;
  }

  .template4__statLabel {
    margin: 0;
    color: rgba(45, 35, 51, 0.62);
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    line-height: 1.5;
  }

  .template4__heroVisual {
    position: relative;
    min-height: 420px;
  }

  .template4__heroImageMain {
    position: absolute;
    inset: 0 4% 12% 0;
    overflow: hidden;
    border-radius: 220px 220px 28px 28px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.06)),
      linear-gradient(135deg, rgba(119, 84, 218, 0.14), rgba(238, 103, 238, 0.12)),
      #e9dff8;
  }

  .template4__heroImageMain img,
  .template4__detailVisual img,
  .template4__galleryLead img,
  .template4__galleryStackItem img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  .template4__heroAmbient {
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at 24% 22%, rgba(119, 84, 218, 0.24), transparent 20%),
      radial-gradient(circle at 74% 68%, rgba(238, 103, 238, 0.24), transparent 18%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.06));
  }

  .template4__heroImageInset {
    position: absolute;
    right: 0;
    bottom: 0;
    width: min(200px, 44%);
    aspect-ratio: 4 / 5;
    border-radius: 28px;
    overflow: hidden;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.08)),
      #f6ebf0;
  }

  .template4__heroInsetAmbient {
    width: 100%;
    height: 100%;
    background:
      linear-gradient(135deg, rgba(119, 84, 218, 0.12), rgba(238, 103, 238, 0.12)),
      repeating-linear-gradient(
        -45deg,
        rgba(45, 35, 51, 0.04),
        rgba(45, 35, 51, 0.04) 16px,
        rgba(255, 255, 255, 0.18) 16px,
        rgba(255, 255, 255, 0.18) 32px
      );
  }

  .template4__servicesBand {
    background: var(--lavender);
    padding: var(--section-space) 0;
  }

  .template4__sectionHeader {
    display: grid;
    grid-template-columns: minmax(0, 1.18fr) minmax(260px, 0.72fr);
    gap: 32px;
    align-items: start;
    margin-bottom: 24px;
  }

  .template4__sectionTitle {
    margin: 14px 0 0;
    font-family: "Iowan Old Style", "Georgia", serif;
    font-size: clamp(1.7rem, 3vw, 2.7rem);
    line-height: 1;
    letter-spacing: -0.05em;
    max-width: 15ch;
  }

  .template4__sectionText {
    margin: 0;
    color: rgba(45, 35, 51, 0.76);
    font-size: 0.95rem;
    line-height: 1.7;
    max-width: 34ch;
  }

  .template4__serviceList {
    display: grid;
    gap: 0;
  }

  .template4__serviceRow {
    display: grid;
    grid-template-columns: 56px minmax(0, 1fr) auto;
    gap: 16px;
    align-items: start;
    padding: 18px 0;
    border-top: 1px solid rgba(45, 35, 51, 0.12);
  }

  .template4__serviceRow:last-child {
    border-bottom: 1px solid rgba(45, 35, 51, 0.12);
  }

  .template4__serviceNumber {
    color: rgba(45, 35, 51, 0.5);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .template4__serviceBody {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .template4__serviceName {
    margin: 0;
    font-family: "Iowan Old Style", "Georgia", serif;
    font-size: clamp(1.3rem, 2.3vw, 1.8rem);
    line-height: 1.06;
    letter-spacing: -0.04em;
  }

  .template4__serviceDescription {
    margin: 0;
    color: rgba(45, 35, 51, 0.76);
    font-size: 0.95rem;
    line-height: 1.72;
    max-width: 56ch;
  }

  .template4__serviceAction {
    align-self: start;
    padding-top: 0.15rem;
  }

  .template4__approachBand {
    background: var(--rose);
    padding: var(--section-space) 0;
  }

  .template4__approachGrid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(300px, 0.78fr);
    gap: 28px;
    align-items: start;
  }

  .template4__copyStack {
    display: grid;
    gap: 14px;
  }

  .template4__copyStack p {
    margin: 0;
    color: rgba(45, 35, 51, 0.78);
    font-size: 0.97rem;
    line-height: 1.78;
    max-width: 54ch;
  }

  .template4__quote {
    margin: 6px 0 0;
    padding-left: 16px;
    border-left: 2px solid rgba(119, 84, 218, 0.4);
    font-family: "Iowan Old Style", "Georgia", serif;
    font-size: clamp(1.15rem, 2vw, 1.55rem);
    line-height: 1.2;
    letter-spacing: -0.03em;
    max-width: 24ch;
  }

  .template4__detailRail {
    display: grid;
    gap: 18px;
  }

  .template4__detailVisual {
    min-height: 320px;
    overflow: hidden;
    border-radius: 32px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.08)),
      #edd5df;
  }

  .template4__detailAmbient {
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at 28% 24%, rgba(119, 84, 218, 0.18), transparent 18%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.04)),
      repeating-linear-gradient(
        -45deg,
        rgba(45, 35, 51, 0.03),
        rgba(45, 35, 51, 0.03) 14px,
        rgba(255, 255, 255, 0.18) 14px,
        rgba(255, 255, 255, 0.18) 28px
      );
  }

  .template4__stepList {
    display: grid;
    gap: 10px;
  }

  .template4__step {
    display: grid;
    grid-template-columns: 36px 1fr;
    gap: 12px;
    align-items: start;
    padding-top: 12px;
    border-top: 1px solid rgba(45, 35, 51, 0.12);
  }

  .template4__stepNumber {
    color: rgba(45, 35, 51, 0.54);
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .template4__stepTitle {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 700;
  }

  .template4__stepText {
    margin: 6px 0 0;
    color: rgba(45, 35, 51, 0.74);
    font-size: 0.92rem;
    line-height: 1.68;
  }

  .template4__galleryBand {
    background: var(--mist);
    padding: var(--section-space) 0;
  }

  .template4__galleryLayout {
    display: grid;
    grid-template-columns: minmax(0, 1.12fr) minmax(240px, 0.68fr);
    gap: 20px;
    align-items: start;
  }

  .template4__galleryLead {
    min-height: 360px;
    overflow: hidden;
    border-radius: 40px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.08)),
      #d6dbf3;
  }

  .template4__galleryLeadAmbient {
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at 26% 24%, rgba(255, 255, 255, 0.44), transparent 16%),
      radial-gradient(circle at 74% 72%, rgba(119, 84, 218, 0.18), transparent 18%),
      linear-gradient(135deg, rgba(119, 84, 218, 0.12), rgba(238, 103, 238, 0.08));
  }

  .template4__galleryStack {
    display: grid;
    gap: 18px;
  }

  .template4__galleryStackItem {
    min-height: 170px;
    overflow: hidden;
    border-radius: 28px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.08)),
      #eef0fb;
  }

  .template4__contactBand {
    background:
      radial-gradient(circle at 76% 24%, rgba(238, 103, 238, 0.18), transparent 18%),
      linear-gradient(180deg, #342445 0%, var(--plum) 100%);
    color: #f7f0ff;
    padding: var(--section-space) 0;
  }

  .template4__contactBand .template4__sectionTag,
  .template4__contactBand .template4__sectionText,
  .template4__contactBand .template4__contactInfoLabel,
  .template4__contactBand .template4__formLabel {
    color: rgba(247, 240, 255, 0.72);
  }

  .template4__contactBand .template4__sectionTitle,
  .template4__contactBand .template4__contactInfoValue,
  .template4__contactBand .template4__field {
    color: #fff;
  }

  .template4__contactBand .template4__sectionTag::before {
    background: rgba(238, 103, 238, 0.68);
  }

  .template4__contactLayout {
    display: grid;
    grid-template-columns: minmax(0, 0.96fr) minmax(320px, 0.78fr);
    gap: 24px;
    align-items: start;
  }

  .template4__contactStack {
    display: grid;
    gap: 14px;
  }

  .template4__contactInfo {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.14);
  }

  .template4__contactInfoItem {
    display: grid;
    gap: 4px;
  }

  .template4__contactInfoLabel {
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .template4__contactInfoValue {
    font-size: 1rem;
    line-height: 1.6;
  }

  .template4__form {
    display: grid;
    gap: 16px;
  }

  .template4__fieldGroup {
    display: grid;
    gap: 8px;
  }

  .template4__formLabel {
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .template4__field {
    width: 100%;
    padding: 0 0 12px;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.22);
    font: inherit;
    outline: none;
  }

  .template4__field::placeholder {
    color: rgba(247, 240, 255, 0.42);
  }

  .template4__field:focus {
    border-bottom-color: rgba(238, 103, 238, 0.7);
  }

  .template4__field--textarea {
    min-height: 100px;
    resize: vertical;
  }

  @media (max-width: 1080px) {
    .template4__heroLayout,
    .template4__approachGrid,
    .template4__galleryLayout,
    .template4__contactLayout,
    .template4__sectionHeader {
      grid-template-columns: 1fr;
    }

    .template4__heroVisual {
      min-height: 360px;
    }

    .template4__serviceRow,
    .template4__serviceBody {
      grid-template-columns: 1fr;
    }

    .template4__serviceAction {
      justify-self: start;
    }
  }

  @media (max-width: 820px) {
    .template4__topbarInner,
    .template4__heroStats,
    .template4__contactInfo {
      grid-template-columns: 1fr;
    }

    .template4__topbarInner {
      display: grid;
      padding: 18px 0;
    }

    .template4__nav {
      justify-content: flex-start;
    }
  }

  @media (max-width: 640px) {
    .template4__shell {
      width: min(100% - 18px, 1240px);
    }

    .template4__headline {
      font-size: clamp(2.35rem, 12vw, 4rem);
    }

    .template4__heroVisual {
      min-height: 360px;
    }

    .template4__heroImageMain {
      inset: 0 0 22% 0;
    }

    .template4__heroImageInset {
      width: 56%;
    }

    .template4 .btn {
      width: 100%;
    }

    .template4__heroActions {
      align-items: stretch;
    }
  }
`

const defaultData = {
  businessName: 'Aster Advisory Studio',
  eyebrow: 'Strategic Advisory',
  heroTitle: 'Quiet clarity\nfor serious\nbusiness decisions',
  heroP:
    'Private advisory for founders, principals, and small leadership teams working through decisions that benefit from steadier framing.',
  aboutH2: 'Elegant structure,\nwithout the clutter',
  aboutP1:
    'We help leaders sort through live priorities, shape cleaner communication, and make confident decisions without adding more noise to the process.',
  aboutP2:
    'The work stays close to the real situation: a narrower brief, a better sequence, and next steps that can be used immediately.',
  services: [
    {
      name: 'Strategic Advisory',
      description:
        'Ongoing counsel for founders or senior operators who need a steady outside read on priorities, positioning, and key decisions.',
    },
    {
      name: 'Planning Intensives',
      description:
        'Short engagements to sharpen direction, reduce noise, and turn a messy conversation into a usable next step.',
    },
    {
      name: 'Decision Support',
      description:
        'Focused work around launches, partnerships, leadership questions, and other calls where the downside of confusion is expensive.',
    },
  ],
  email: 'hello@asteradvisory.com',
  phone: '(323) 555-0182',
  address: 'Pasadena, CA',
  domain: 'asteradvisory.com',
  contactBlurb:
    'Send the short version of what you are working through, and we can tell you quickly whether the fit is right.',
  stats: [
    ['High-trust', 'Engagement style'],
    ['Small-team', 'Decision support'],
    ['Fast', 'First response'],
  ],
  colors: {
    accent: '#7754da',
  },
  ...template4ImageSet,
}

function splitLines(value) {
  return String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function getInitials(name) {
  return String(name || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function toTelHref(phone) {
  const digits = String(phone || '').replace(/[^\d+]/g, '')
  return `tel:${digits || '15555550182'}`
}

function toDomainHref(domain) {
  const trimmed = String(domain || '').trim()
  if (!trimmed) {
    return 'https://example.com'
  }

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

function MediaBlock({ src, ambientClass }) {
  if (src) {
    return <img src={src} alt="" />
  }

  return <div className={ambientClass} aria-hidden="true" />
}

export default function Template4({ data = defaultData }) {
  const merged = {
    ...defaultData,
    ...data,
    colors: {
      ...defaultData.colors,
      ...(data?.colors || {}),
    },
  }

  const services = merged.services?.length ? merged.services : defaultData.services
  const stats = merged.stats?.length ? merged.stats : defaultData.stats
  const headlineLines = splitLines(merged.heroTitle)
  const aboutLines = splitLines(merged.aboutH2)
  const galleryImages = Array.isArray(merged.galleryImages) ? merged.galleryImages : []
  const accent = merged.colors.accent || defaultData.colors.accent
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    brief: '',
  })

  function handleFieldChange(event) {
    const { name, value } = event.target
    setFormState((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const subject = formState.name
      ? `Inquiry from ${formState.name}`
      : `Inquiry for ${merged.businessName}`

    const body = [
      `Name: ${formState.name || 'Not provided'}`,
      `Email: ${formState.email || 'Not provided'}`,
      '',
      'Project brief:',
      formState.brief || merged.contactBlurb,
    ].join('\n')

    if (typeof window !== 'undefined') {
      window.location.href = `mailto:${merged.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }
  }

  return (
    <div className="template4" style={{ '--accent': accent }}>
      <style>{templateStyles}</style>

      <header className="template4__topbar">
        <div className="template4__shell template4__topbarInner">
          <a className="template4__brand" href="#top">
            <div className="template4__brandMark" aria-hidden="true">
              {merged.logoUrl ? (
                <img src={merged.logoUrl} alt="" />
              ) : (
                <span className="template4__brandInitials">{getInitials(merged.businessName)}</span>
              )}
            </div>

            <div className="template4__brandMeta">
              <p className="template4__eyebrow">{merged.eyebrow}</p>
              <p className="template4__brandName">{merged.businessName}</p>
            </div>
          </a>

          <nav className="template4__nav" aria-label="Section navigation">
            <a href="#services">Services</a>
            <a href="#approach">Approach</a>
            <a href="#contact">Contact</a>
            <a className="template4__navPhone" href={toTelHref(merged.phone)}>
              {merged.phone}
            </a>
          </nav>
        </div>
      </header>

      <section className="template4__heroBand" id="top">
        <div className="template4__shell template4__heroLayout">
          <div className="template4__heroCopy">
            <p className="template4__heroTag">{merged.eyebrow}</p>
            <h1 className="template4__headline">
              {headlineLines.map((line) => (
                <span key={line} className="template4__headlineLine">
                  {line}
                </span>
              ))}
            </h1>
            <p className="template4__heroText">{merged.heroP}</p>

            <div className="template4__heroActions">
              <a className="btn" href="#contact">
                Start the conversation
              </a>
              <a className="template4__heroSecondary" href="#services">
                Explore services
              </a>
            </div>

            <div className="template4__heroStats">
              {stats.map(([value, label]) => (
                <article key={`${value}-${label}`} className="template4__stat">
                  <p className="template4__statValue">{value}</p>
                  <p className="template4__statLabel">{label}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="template4__heroVisual" aria-hidden="true">
            <div className="template4__heroImageMain">
              <MediaBlock
                src={merged.heroImageUrl}
                className="template4__heroImageMain"
                ambientClass="template4__heroAmbient"
              />
            </div>

            <div className="template4__heroImageInset">
              <MediaBlock
                src={galleryImages[0]}
                className="template4__heroImageInset"
                ambientClass="template4__heroInsetAmbient"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="template4__servicesBand" id="services">
        <div className="template4__shell">
          <div className="template4__sectionHeader">
            <div>
              <p className="template4__sectionTag">Services</p>
              <h2 className="template4__sectionTitle">
                {splitLines('Three ways\nto step in').map((line) => (
                  <span key={line} className="template4__headlineLine">
                    {line}
                  </span>
                ))}
              </h2>
            </div>
            <p className="template4__sectionText">
              Clear scope, direct language, and room for the details to breathe.
            </p>
          </div>

          <div className="template4__serviceList">
            {services.map((service, index) => (
              <article key={service.name} className="template4__serviceRow">
                <p className="template4__serviceNumber">{String(index + 1).padStart(2, '0')}</p>
                <div className="template4__serviceBody">
                  <h3 className="template4__serviceName">{service.name}</h3>
                  <p className="template4__serviceDescription">{service.description}</p>
                </div>
                <div className="template4__serviceAction">
                  <a className="template4__inlineLink" href="#contact">
                    Inquire
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="template4__approachBand" id="approach">
        <div className="template4__shell">
          <div className="template4__sectionHeader">
            <div>
              <p className="template4__sectionTag">Approach</p>
              <h2 className="template4__sectionTitle">
                {aboutLines.map((line) => (
                  <span key={line} className="template4__headlineLine">
                    {line}
                  </span>
                ))}
              </h2>
            </div>
            <p className="template4__sectionText">
              Built to feel measured, not over-explained.
            </p>
          </div>

          <div className="template4__approachGrid">
            <div className="template4__copyStack">
              <p>{merged.aboutP1}</p>
              <p>{merged.aboutP2}</p>
              <blockquote className="template4__quote">
                Calm structure. Clear next steps.
              </blockquote>
            </div>

            <div className="template4__detailRail">
              <div className="template4__detailVisual" aria-hidden="true">
                <MediaBlock
                  src={merged.aboutImageUrl || galleryImages[1]}
                  className="template4__detailVisual"
                  ambientClass="template4__detailAmbient"
                />
              </div>

              <div className="template4__stepList">
                <article className="template4__step">
                  <div className="template4__stepNumber">01</div>
                  <div>
                    <h3 className="template4__stepTitle">
                      {splitLines('Define the\nreal question').map((line) => (
                        <span key={line} className="template4__headlineLine">
                          {line}
                        </span>
                      ))}
                    </h3>
                    <p className="template4__stepText">
                      Start with the real version.
                    </p>
                  </div>
                </article>
                <article className="template4__step">
                  <div className="template4__stepNumber">02</div>
                  <div>
                    <h3 className="template4__stepTitle">
                      {splitLines('Tighten the\nframing').map((line) => (
                        <span key={line} className="template4__headlineLine">
                          {line}
                        </span>
                      ))}
                    </h3>
                    <p className="template4__stepText">
                      Reduce noise and clarify tradeoffs.
                    </p>
                  </div>
                </article>
                <article className="template4__step">
                  <div className="template4__stepNumber">03</div>
                  <div>
                    <h3 className="template4__stepTitle">
                      {splitLines('Leave with\ndirection').map((line) => (
                        <span key={line} className="template4__headlineLine">
                          {line}
                        </span>
                      ))}
                    </h3>
                    <p className="template4__stepText">
                      End with something usable.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="template4__galleryBand">
        <div className="template4__shell">
          <div className="template4__sectionHeader">
            <div>
              <p className="template4__sectionTag">Image rhythm</p>
              <h2 className="template4__sectionTitle">
                {splitLines('Selected moments\nand supporting detail').map((line) => (
                  <span key={line} className="template4__headlineLine">
                    {line}
                  </span>
                ))}
              </h2>
            </div>
            <p className="template4__sectionText">
              Enough visual relief to keep the page light.
            </p>
          </div>

          <div className="template4__galleryLayout">
            <div className="template4__galleryLead" aria-hidden="true">
              <MediaBlock
                src={galleryImages[2]}
                className="template4__galleryLead"
                ambientClass="template4__galleryLeadAmbient"
              />
            </div>

            <div className="template4__galleryStack">
              <div className="template4__galleryStackItem" aria-hidden="true">
                <MediaBlock
                  src={galleryImages[3]}
                  className="template4__galleryStackItem"
                  ambientClass="template4__heroInsetAmbient"
                />
              </div>
              <div className="template4__galleryStackItem" aria-hidden="true">
                <MediaBlock
                  src={galleryImages[4]}
                  className="template4__galleryStackItem"
                  ambientClass="template4__detailAmbient"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="template4__contactBand" id="contact">
        <div className="template4__shell template4__contactLayout">
          <div className="template4__contactStack">
            <div>
              <p className="template4__sectionTag">Contact</p>
              <h2 className="template4__sectionTitle">
                {splitLines('Start with\nthe short version.').map((line) => (
                  <span key={line} className="template4__headlineLine">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="template4__sectionText">{merged.contactBlurb}</p>
            </div>

            <div className="template4__contactInfo">
              <div className="template4__contactInfoItem">
                <span className="template4__contactInfoLabel">Phone</span>
                <a className="template4__contactInfoValue" href={toTelHref(merged.phone)}>
                  {merged.phone}
                </a>
              </div>
              <div className="template4__contactInfoItem">
                <span className="template4__contactInfoLabel">Email</span>
                <a className="template4__contactInfoValue" href={`mailto:${merged.email}`}>
                  {merged.email}
                </a>
              </div>
              <div className="template4__contactInfoItem">
                <span className="template4__contactInfoLabel">Office</span>
                <p className="template4__contactInfoValue">{merged.address}</p>
              </div>
              <div className="template4__contactInfoItem">
                <span className="template4__contactInfoLabel">Website</span>
                <a className="template4__contactInfoValue" href={toDomainHref(merged.domain)}>
                  {merged.domain || 'example.com'}
                </a>
              </div>
            </div>
          </div>

          <form className="template4__form" onSubmit={handleSubmit}>
            <div className="template4__fieldGroup">
              <label className="template4__formLabel" htmlFor="template4-name">
                Name
              </label>
              <input
                id="template4-name"
                className="template4__field"
                type="text"
                name="name"
                value={formState.name}
                onChange={handleFieldChange}
                placeholder="Your name"
              />
            </div>

            <div className="template4__fieldGroup">
              <label className="template4__formLabel" htmlFor="template4-email">
                Email
              </label>
              <input
                id="template4-email"
                className="template4__field"
                type="email"
                name="email"
                value={formState.email}
                onChange={handleFieldChange}
                placeholder="you@example.com"
              />
            </div>

            <div className="template4__fieldGroup">
              <label className="template4__formLabel" htmlFor="template4-brief">
                Brief
              </label>
              <textarea
                id="template4-brief"
                className="template4__field template4__field--textarea"
                name="brief"
                value={formState.brief}
                onChange={handleFieldChange}
                placeholder="A few lines about what you are working through."
              />
            </div>

            <button className="btn btn--dark" type="submit">
              Open drafted email
            </button>
          </form>
        </div>

        <div className="template4__shell">
          <div className="template4__footer">{merged.businessName}</div>
        </div>
      </section>
    </div>
  )
}
