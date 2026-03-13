import { template3ImageSet } from '../photos/optimized/templateImageSets'

const templateStyles = `
  .template3 {
    --bg: #f3f1e7;
    --ink: #1f231d;
    --muted: rgba(31, 35, 29, 0.68);
    --line: rgba(31, 35, 29, 0.11);
    --accent: #2f5d3a;
    --accent-rgb: 47, 93, 58;
    min-height: 100vh;
    color: var(--ink);
    font-family: "Avenir Next", "Segoe UI", sans-serif;
    background: linear-gradient(180deg, #f8f6ef 0%, #f3f1e7 100%);
    overflow-x: clip;
  }

  .template3 * {
    box-sizing: border-box;
  }

  .template3 a {
    color: inherit;
    text-decoration: none;
  }

  .template3__shell {
    width: min(1320px, calc(100% - 32px));
    margin: 0 auto;
    padding: 18px 0 68px;
  }

  .template3__band {
    position: relative;
    isolation: isolate;
    padding: 28px 0;
  }

  .template3__band::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 100vw;
    transform: translateX(-50%);
    z-index: -1;
  }

  .template3__band + .template3__band {
    margin-top: 24px;
  }

  .template3__band--hero::before {
    background:
      radial-gradient(circle at top right, rgba(var(--accent-rgb), 0.06), transparent 30%),
      linear-gradient(180deg, #f3eee2 0%, #efe8d8 100%);
  }

  .template3__band--approach::before {
    background: linear-gradient(180deg, #e8ece1 0%, #dfe6d8 100%);
  }

  .template3__band--services::before {
    background: linear-gradient(180deg, #f7f4ec 0%, #f2ede2 100%);
  }

  .template3__band--contact::before {
    background: linear-gradient(180deg, #e6ebe0 0%, #dce4d8 100%);
  }

  .template3__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 28px;
    margin-bottom: 20px;
    padding: 2px 0 14px;
    border-bottom: 1px solid var(--line);
  }

  .template3__brand {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
  }

  .template3__brandMark {
    width: 52px;
    height: 52px;
    flex-shrink: 0;
    border-radius: 14px;
    border: 1px solid rgba(var(--accent-rgb), 0.16);
    background: rgba(255, 255, 255, 0.48);
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .template3__brandMark img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .template3__brandInitials {
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .template3__brandMeta {
    min-width: 0;
    display: grid;
    gap: 4px;
  }

  .template3__eyebrow {
    margin: 0;
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  .template3__brandName {
    margin: 0;
    font-size: 1.02rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .template3__nav {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    padding-left: 24px;
    margin-left: auto;
    border-left: 1px solid rgba(31, 35, 29, 0.1);
  }

  .template3__nav a {
    color: rgba(31, 35, 29, 0.7);
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .template3__hero {
    display: block;
  }

  .template3__heroCard,
  .template3__sectionCard,
  .template3__serviceCard,
  .template3__contactCard {
    border: none;
    border-radius: 0;
    background: transparent;
    backdrop-filter: none;
    box-shadow: none;
  }

  .template3__heroCard {
    position: relative;
    padding: clamp(24px, 4vw, 42px);
    min-height: clamp(340px, 46vh, 460px);
    overflow: hidden;
    border: 1px solid rgba(31, 35, 29, 0.08);
    border-radius: 24px;
    background: #e4e9df;
  }

  .template3__heroBackdrop {
    position: absolute;
    inset: 0;
  }

  .template3__heroBackdrop img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .template3__heroBackdrop::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(248, 246, 239, 0.92) 0%, rgba(248, 246, 239, 0.8) 34%, rgba(248, 246, 239, 0.24) 72%, rgba(248, 246, 239, 0.5) 100%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(31, 35, 29, 0.12));
  }

  .template3__heroBackdropAmbient {
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at 34% 34%, rgba(var(--accent-rgb), 0.1), transparent 22%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.08));
  }

  .template3__heroLayout {
    display: grid;
    position: relative;
    z-index: 1;
    grid-template-columns: 1fr;
    gap: 0;
    align-items: end;
    min-height: clamp(250px, 34vh, 340px);
  }

  .template3__heroCopy {
    max-width: min(620px, 100%);
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 0;
    backdrop-filter: none;
    box-shadow: none;
  }

  .template3__kicker,
  .template3__sectionTag {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin: 0;
    color: var(--muted);
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .template3__kicker::before,
  .template3__sectionTag::before {
    content: "";
    width: 26px;
    height: 1px;
    background: rgba(var(--accent-rgb), 0.34);
  }

  .template3__headline {
    margin: 14px 0 0;
    font-family: "Iowan Old Style", "Georgia", serif;
    font-size: clamp(2.15rem, 4.3vw, 3.9rem);
    line-height: 0.96;
    letter-spacing: -0.06em;
    max-width: 11.5ch;
  }

  .template3__headlineLine {
    display: block;
  }

  .template3__heroSubhead {
    max-width: 52ch;
    margin: 14px 0 0;
    color: var(--muted);
    font-size: 0.98rem;
    line-height: 1.65;
    font-weight: 500;
  }

  .template3__heroActions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px;
    margin-top: 20px;
  }

  .template3__heroSecondary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: rgba(31, 35, 29, 0.76);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .template3__heroSecondary svg {
    width: 14px;
    height: 14px;
  }

  .template3__signals {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin-top: 18px;
    padding-top: 16px;
    border-top: 1px solid rgba(31, 35, 29, 0.1);
  }

  .template3__signal {
    padding: 0 12px 0 0;
  }

  .template3__signalValue {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: -0.04em;
  }

  .template3__signalLabel {
    margin: 8px 0 0;
    color: var(--muted);
    font-size: 0.78rem;
    line-height: 1.4;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .template3__section {
    margin-top: 0;
  }

  .template3__sectionCard {
    padding: 0;
  }

  .template3__sectionHeader {
    display: grid;
    grid-template-columns: minmax(0, 1.06fr) minmax(320px, 0.82fr);
    gap: 28px;
    align-items: start;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(31, 35, 29, 0.1);
  }

  .template3__sectionTitle {
    margin: 12px 0 0;
    font-family: "Iowan Old Style", "Georgia", serif;
    font-size: clamp(1.7rem, 2.5vw, 2.45rem);
    line-height: 1.02;
    letter-spacing: -0.05em;
    max-width: 14ch;
  }

  .template3__sectionText {
    margin: 0;
    color: var(--muted);
    font-size: 0.92rem;
    line-height: 1.65;
    max-width: 34ch;
  }

  .template3__aboutLayout,
  .template3__contactLayout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(320px, 0.9fr);
    gap: 18px;
    margin-top: 18px;
  }

  .template3__aboutText {
    display: grid;
    gap: 14px;
  }

  .template3__aboutText p {
    margin: 0;
    max-width: 54ch;
    color: var(--muted);
    font-size: 0.98rem;
    line-height: 1.72;
  }

  .template3__visualCard {
    border: 1px solid rgba(31, 35, 29, 0.08);
    border-radius: 22px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.18);
  }

  .template3__visualCard img {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 280px;
    object-fit: cover;
  }

  .template3__visualCardAmbient {
    min-height: 280px;
    position: relative;
    background:
      radial-gradient(circle at 22% 24%, rgba(var(--accent-rgb), 0.12), transparent 18%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.36), rgba(255, 255, 255, 0.1));
  }

  .template3__visualCardAmbient::before {
    content: "";
    position: absolute;
    inset: 16% 18%;
    border-radius: 24px;
    border: 1px solid rgba(31, 35, 29, 0.08);
    background: rgba(255, 255, 255, 0.28);
  }

  .template3__quoteBand {
    margin-top: 16px;
    padding: 0 0 0 16px;
    border-left: 1px solid rgba(var(--accent-rgb), 0.34);
    font-family: "Iowan Old Style", "Georgia", serif;
    font-size: clamp(1.2rem, 1.75vw, 1.65rem);
    line-height: 1.22;
    letter-spacing: -0.03em;
    max-width: 18ch;
  }

  .template3__servicesGrid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin-top: 20px;
  }

  .template3__serviceCard {
    padding: 14px 0 0;
    border-top: 1px solid rgba(31, 35, 29, 0.1);
  }

  .template3__serviceIndex {
    margin: 0;
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .template3__serviceName {
    margin: 10px 0 0;
    font-size: 1.18rem;
    line-height: 1.15;
    font-weight: 700;
    max-width: 16ch;
  }

  .template3__serviceDescription {
    margin: 10px 0 0;
    color: var(--muted);
    font-size: 0.92rem;
    line-height: 1.65;
    max-width: 30ch;
  }

  .template3__contactCard {
    padding: 0;
  }

  .template3__contactTitle {
    margin: 0;
    font-family: "Iowan Old Style", "Georgia", serif;
    font-size: clamp(1.8rem, 2.7vw, 2.65rem);
    line-height: 0.98;
    letter-spacing: -0.05em;
    max-width: 10ch;
  }

  .template3__contactText {
    margin: 14px 0 0;
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.65;
    max-width: 40ch;
  }

  .template3__contactList {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 16px;
  }

  .template3__contactItem {
    display: grid;
    gap: 4px;
    padding: 18px 0;
    border-top: 1px solid rgba(31, 35, 29, 0.1);
  }

  .template3__contactLabel {
    color: var(--muted);
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 700;
  }

  .template3__contactValue {
    font-size: 1rem;
    line-height: 1.6;
  }

  .template3 .btn-wrapper {
    --dot-size: 6px;
    --line-weight: 1px;
    --line-distance: 0.9rem 1.1rem;
    --animation-speed: 0.35s;
    --dot-color: #666;
    --line-color: #999;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;
    padding: var(--line-distance);
    background-color: transparent;
    transition: background-color 0.3s ease-in-out;
    user-select: none;
  }

  .template3 .btn-wrapper:has(.btn:hover) {
    animation: template3-background-color-change calc(var(--animation-speed) * 4) ease-in-out forwards;
  }

  @keyframes template3-background-color-change {
    80% {
      background-color: transparent;
    }
    100% {
      background-color: #e5ff0055;
    }
  }

  .template3 .btn {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.8rem 1.25rem;
    background-color: #e5ff00;
    background-image: linear-gradient(#0000, #0004);
    border: none;
    color: #0008;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    text-transform: capitalize;
    border-radius: 30% / 200%;
    cursor: pointer;
    box-shadow:
      0 0 0px 1px #0003,
      0px 1px 1px rgba(3, 7, 18, 0.02),
      0px 5px 4px rgba(3, 7, 18, 0.04),
      0px 12px 9px rgba(3, 7, 18, 0.06),
      0px 20px 15px rgba(3, 7, 18, 0.08),
      0px 32px 24px rgba(3, 7, 18, 0.1);
    transition:
      background-color 0.2s ease-in-out,
      transform 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out,
      border-radius 0.3s ease-in-out,
      border-color 0.2s ease-in-out;
  }

  .template3 .btn:hover {
    background-color: #fff;
    transform: scale(1.05);
    border-radius: 10% / 200%;
  }

  .template3 .btn:active {
    background-color: #e5ff00;
    transform: scale(0.98);
    border-radius: 20% / 200%;
  }

  .template3 .btn-svg {
    margin-left: 0.5rem;
    height: 24px;
    stroke-width: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: #0007;
    fill: #fffa;
    transition: all 0.3s ease-in-out;
  }

  .template3 .btn:hover .btn-svg {
    stroke: #0008;
    fill: #e5ff00;
  }

  .template3 .btn:active .btn-svg {
    stroke: #0009;
    fill: #f1ff76;
  }

  .template3 .dot {
    position: absolute;
    width: var(--dot-size);
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: var(--dot-color);
    transition: all 0.3s ease-in-out;
    opacity: 0;
  }

  .template3 .btn-wrapper:has(.btn:hover) .dot.top.left {
    top: 50%;
    left: 20%;
    animation: template3-move-top-left var(--animation-speed) ease-in-out forwards;
  }

  @keyframes template3-move-top-left {
    90% {
      opacity: 0.6;
    }
    100% {
      top: calc(var(--dot-size) * -0.5);
      left: calc(var(--dot-size) * -0.5);
      opacity: 1;
    }
  }

  .template3 .btn-wrapper:has(.btn:hover) .dot.top.right {
    top: 50%;
    right: 20%;
    animation: template3-move-top-right var(--animation-speed) ease-in-out forwards;
    animation-delay: calc(var(--animation-speed) * 0.6);
  }

  @keyframes template3-move-top-right {
    80% {
      opacity: 0.6;
    }
    100% {
      top: calc(var(--dot-size) * -0.5);
      right: calc(var(--dot-size) * -0.5);
      opacity: 1;
    }
  }

  .template3 .btn-wrapper:has(.btn:hover) .dot.bottom.right {
    bottom: 50%;
    right: 20%;
    animation: template3-move-bottom-right var(--animation-speed) ease-in-out forwards;
    animation-delay: calc(var(--animation-speed) * 1.2);
  }

  @keyframes template3-move-bottom-right {
    80% {
      opacity: 0.6;
    }
    100% {
      bottom: calc(var(--dot-size) * -0.5);
      right: calc(var(--dot-size) * -0.5);
      opacity: 1;
    }
  }

  .template3 .btn-wrapper:has(.btn:hover) .dot.bottom.left {
    bottom: 50%;
    left: 20%;
    animation: template3-move-bottom-left var(--animation-speed) ease-in-out forwards;
    animation-delay: calc(var(--animation-speed) * 1.8);
  }

  @keyframes template3-move-bottom-left {
    80% {
      opacity: 0.6;
    }
    100% {
      bottom: calc(var(--dot-size) * -0.5);
      left: calc(var(--dot-size) * -0.5);
      opacity: 1;
    }
  }

  .template3 .line {
    position: absolute;
    transition: all 0.3s ease-in-out;
  }

  .template3 .line.horizontal {
    height: var(--line-weight);
    width: 100%;
    background-image: repeating-linear-gradient(
      90deg,
      transparent 0 calc(var(--line-weight) * 2),
      var(--line-color) calc(var(--line-weight) * 2) calc(var(--line-weight) * 4)
    );
  }

  .template3 .line.vertical {
    width: var(--line-weight);
    height: 100%;
    background-image: repeating-linear-gradient(
      0deg,
      transparent 0 calc(var(--line-weight) * 2),
      var(--line-color) calc(var(--line-weight) * 2) calc(var(--line-weight) * 4)
    );
  }

  .template3 .line.top {
    top: calc(var(--line-weight) * -0.5);
    transform-origin: top left;
    transform: rotate(5deg) scaleX(0);
  }

  .template3 .line.bottom {
    bottom: calc(var(--line-weight) * -0.5);
    transform-origin: bottom right;
    transform: rotate(5deg) scaleX(0);
  }

  .template3 .line.left {
    left: calc(var(--line-weight) * -0.5);
    transform-origin: bottom left;
    transform: rotate(0deg) scaleY(0);
  }

  .template3 .line.right {
    right: calc(var(--line-weight) * -0.5);
    transform-origin: top right;
    transform: rotate(5deg) scaleY(0);
  }

  .template3 .btn-wrapper:has(.btn:hover) .line.top {
    animation: template3-draw-top var(--animation-speed) ease-in-out forwards;
    animation-delay: calc(var(--animation-speed) * 0.8);
  }

  @keyframes template3-draw-top {
    100% {
      transform: rotate(0deg) scaleX(1);
    }
  }

  .template3 .btn-wrapper:has(.btn:hover) .line.right {
    animation: template3-draw-right var(--animation-speed) ease-in-out forwards;
    animation-delay: calc(var(--animation-speed) * 1.4);
  }

  @keyframes template3-draw-right {
    100% {
      transform: rotate(0deg) scaleY(1);
    }
  }

  .template3 .btn-wrapper:has(.btn:hover) .line.bottom {
    animation: template3-draw-bottom var(--animation-speed) ease-in-out forwards;
    animation-delay: calc(var(--animation-speed) * 2);
  }

  @keyframes template3-draw-bottom {
    100% {
      transform: rotate(0deg) scaleX(1);
    }
  }

  .template3 .btn-wrapper:has(.btn:hover) .line.left {
    animation: template3-draw-left var(--animation-speed) ease-in-out forwards;
    animation-delay: calc(var(--animation-speed) * 2.4);
  }

  @keyframes template3-draw-left {
    100% {
      transform: rotate(0deg) scaleY(1);
    }
  }

  @media (max-width: 1080px) {
    .template3__heroLayout,
    .template3__sectionHeader,
    .template3__aboutLayout,
    .template3__contactLayout,
    .template3__servicesGrid,
    .template3__signals {
      grid-template-columns: 1fr;
    }

    .template3__header {
      align-items: flex-start;
      flex-direction: column;
    }

    .template3__nav {
      margin-left: 0;
      padding-left: 0;
      border-left: none;
      flex-wrap: wrap;
    }
  }

  @media (max-width: 720px) {
    .template3__shell {
      width: min(calc(100% - 16px), 1320px);
      padding-top: 18px;
      padding-bottom: 56px;
    }

    .template3__headline {
      font-size: clamp(2rem, 11vw, 3.3rem);
    }

    .template3__heroCard {
      min-height: 320px;
      padding: 18px;
    }

    .template3__heroCopy {
      max-width: none;
    }

    .template3__visualCard img,
    .template3__visualCardAmbient {
      min-height: 260px;
    }

    .template3__heroActions {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`

const defaultData = {
  businessName: 'Summit Ridge Investment Office',
  eyebrow: 'Acquisitions & Asset Strategy',
  heroTitle: 'Sharper Views\nOn Assets,\nOperators,\nAnd Risk',
  heroP:
    'Summit Ridge Investment Office helps active buyers and operators evaluate opportunities, frame risk, and improve decision quality across acquisitions, portfolio assets, and operating plans.',
  aboutH2: 'High Conviction,\nLow Drama',
  aboutP1:
    'We work with investors who need faster synthesis and cleaner underwriting without losing the nuance behind the decision. The goal is not more paperwork. It is better judgment.',
  aboutP2:
    'Whether the issue is a new acquisition, a wobbly asset, or an operating question inside the portfolio, we help teams focus on what matters and ignore what does not.',
  services: [
    {
      name: 'Acquisition Review',
      description:
        'Underwriting support, opportunity framing, and decision memos for buyers who want clearer go or no-go calls.',
    },
    {
      name: 'Asset Strategy',
      description:
        'Portfolio-level thinking around positioning, performance, and capital priorities for existing holdings.',
    },
    {
      name: 'Operating Assessment',
      description:
        'Outside review for assets or teams that need a more disciplined read on execution, margin, and risk.',
    },
  ],
  email: 'partners@summitridgeoffice.com',
  phone: '(562) 555-0124',
  address: '910 Industry Way, Long Beach, CA 90813',
  domain: 'summitridgeoffice.com',
  contactBlurb:
    'If you are evaluating an asset, pressure-testing a plan, or sorting through an operating issue, send over the outline and we will take a look.',
  stats: [
    ['120+', 'Deals Reviewed'],
    ['$500M+', 'Asset Value Touched'],
    ['Multi-Market', 'Coverage'],
  ],
  colors: {
    accent: '#2f5d3a',
    gold: '#c89d3c',
  },
  ...template3ImageSet,
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

function toRgbTuple(hex, fallback) {
  const normalized = String(hex || '').trim().replace('#', '')
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return fallback
  }

  return (normalized.match(/.{1,2}/g) || []).map((value) => parseInt(value, 16)).join(', ')
}

function toTelHref(phone) {
  const digits = String(phone || '').replace(/[^\d+]/g, '')
  return `tel:${digits || '15555550100'}`
}

function toDomainHref(domain) {
  const trimmed = String(domain || '').trim()
  if (!trimmed) {
    return 'https://example.com'
  }

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

function arrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17L17 7M17 7H9.5M17 7V14.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NorthStarButton({ href, label }) {
  return (
    <div className="btn-wrapper">
      <div className="line horizontal top" />
      <div className="line vertical right" />
      <div className="line horizontal bottom" />
      <div className="line vertical left" />

      <div className="dot top left" />
      <div className="dot top right" />
      <div className="dot bottom right" />
      <div className="dot bottom left" />

      <a className="btn" href={href}>
        <span className="btn-text">{label}</span>
        <svg className="btn-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M17.6744 11.4075L15.7691 17.1233C15.7072 17.309 15.5586 17.4529 15.3709 17.5087L3.69348 20.9803C3.22819 21.1186 2.79978 20.676 2.95328 20.2155L6.74467 8.84131C6.79981 8.67588 6.92419 8.54263 7.08543 8.47624L12.472 6.25822C12.696 6.166 12.9535 6.21749 13.1248 6.38876L17.5294 10.7935C17.6901 10.9542 17.7463 11.1919 17.6744 11.4075Z" />
          <path d="M3.2959 20.6016L9.65986 14.2376" />
          <path d="M17.7917 11.0557L20.6202 8.22724C21.4012 7.44619 21.4012 6.17986 20.6202 5.39881L18.4989 3.27749C17.7178 2.49645 16.4515 2.49645 15.6704 3.27749L12.842 6.10592" />
          <path d="M11.7814 12.1163C11.1956 11.5305 10.2458 11.5305 9.66004 12.1163C9.07426 12.7021 9.07426 13.6519 9.66004 14.2376C10.2458 14.8234 11.1956 14.8234 11.7814 14.2376C12.3671 13.6519 12.3671 12.7021 11.7814 12.1163Z" />
        </svg>
      </a>
    </div>
  )
}

function ImageSurface({ src, className = '', ambientClassName }) {
  return (
    <div className={className}>
      {src ? <img src={src} alt="" /> : <div className={ambientClassName} />}
    </div>
  )
}

export default function Template3({ data = defaultData }) {
  const merged = {
    ...defaultData,
    ...data,
    colors: {
      ...defaultData.colors,
      ...(data?.colors || {}),
    },
  }

  const stats = merged.stats?.length ? merged.stats : defaultData.stats
  const services = merged.services?.length ? merged.services : defaultData.services
  const headlineLines = splitLines(merged.heroTitle)
  const aboutLines = splitLines(merged.aboutH2)
  const accentRgb = toRgbTuple(merged.colors.accent, '47, 93, 58')

  return (
    <div
      className="template3"
      style={{
        '--accent': merged.colors.accent || defaultData.colors.accent,
        '--accent-rgb': accentRgb,
      }}
    >
      <style>{templateStyles}</style>

      <main className="template3__shell">
        <header className="template3__header">
          <a className="template3__brand" href="#top">
            <div className="template3__brandMark" aria-hidden="true">
              {merged.logoUrl ? (
                <img src={merged.logoUrl} alt="" />
              ) : (
                <span className="template3__brandInitials">{getInitials(merged.businessName)}</span>
              )}
            </div>

            <div className="template3__brandMeta">
              <p className="template3__eyebrow">{merged.eyebrow}</p>
              <p className="template3__brandName">{merged.businessName}</p>
            </div>
          </a>

          <nav className="template3__nav" aria-label="Section navigation">
            <a href="#approach">Approach</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <div className="template3__band template3__band--hero">
          <section className="template3__hero" id="top">
            <article className="template3__heroCard">
              <div className="template3__heroBackdrop" aria-hidden="true">
                {merged.heroImageUrl ? (
                  <img src={merged.heroImageUrl} alt="" />
                ) : (
                  <div className="template3__heroBackdropAmbient" />
                )}
              </div>

              <div className="template3__heroLayout">
                <div className="template3__heroCopy">
                  <p className="template3__kicker">{merged.eyebrow}</p>
                  <h1 className="template3__headline">
                    {headlineLines.map((line) => (
                      <span key={line} className="template3__headlineLine">
                        {line}
                      </span>
                    ))}
                  </h1>
                  <p className="template3__heroSubhead">{merged.heroP}</p>

                  <div className="template3__heroActions">
                    <NorthStarButton href="#contact" label="Start the conversation" />
                    <a className="template3__heroSecondary" href="#services">
                      Explore services
                      {arrowIcon()}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </section>

          <section className="template3__signals">
            {stats.map(([value, label]) => (
              <article key={`${value}-${label}`} className="template3__signal">
                <p className="template3__signalValue">{value}</p>
                <p className="template3__signalLabel">{label}</p>
              </article>
            ))}
          </section>
        </div>

        <section className="template3__section template3__band template3__band--approach" id="approach">
          <article className="template3__sectionCard">
            <div className="template3__sectionHeader">
              <div>
                <p className="template3__sectionTag">Approach</p>
                <h2 className="template3__sectionTitle">
                  {aboutLines.map((line) => (
                    <span key={line} className="template3__headlineLine">
                      {line}
                    </span>
                  ))}
                </h2>
              </div>
              <p className="template3__sectionText">Clearer framing. Better judgment.</p>
            </div>

            <div className="template3__aboutLayout">
              <div className="template3__aboutText">
                <p>{merged.aboutP1}</p>
                <p>{merged.aboutP2}</p>
                <div className="template3__quoteBand">Better judgment beats more theater.</div>
              </div>

              <ImageSurface
                src={merged.aboutImageUrl}
                className="template3__visualCard"
                ambientClassName="template3__visualCardAmbient"
              />
            </div>
          </article>
        </section>

        <section className="template3__section template3__band template3__band--services" id="services">
          <article className="template3__sectionCard">
            <div className="template3__sectionHeader">
              <div>
                <p className="template3__sectionTag">Services</p>
                <h2 className="template3__sectionTitle">
                {splitLines('Three focused ways\nto step in.').map((line) => (
                  <span key={line} className="template3__headlineLine">
                    {line}
                  </span>
                ))}
              </h2>
              </div>
              <p className="template3__sectionText">Three simple entry points.</p>
            </div>

            <div className="template3__servicesGrid">
              {services.map((service, index) => (
                <article key={service.name} className="template3__serviceCard">
                  <p className="template3__serviceIndex">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="template3__serviceName">{service.name}</h3>
                  <p className="template3__serviceDescription">{service.description}</p>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className="template3__section template3__band template3__band--contact" id="contact">
          <div className="template3__contactLayout">
            <article className="template3__contactCard">
              <h2 className="template3__contactTitle">
                {splitLines('Bring the outline.\nWe can sharpen the rest.').map((line) => (
                  <span key={line} className="template3__headlineLine">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="template3__contactText">{merged.contactBlurb}</p>

              <div className="template3__heroActions" style={{ marginTop: '24px' }}>
                <NorthStarButton href={`mailto:${merged.email}`} label="Email direct" />
                <a className="template3__heroSecondary" href={toDomainHref(merged.domain)}>
                  Visit website
                  {arrowIcon()}
                </a>
              </div>
            </article>

            <article className="template3__contactCard">
              <ul className="template3__contactList">
                <li className="template3__contactItem">
                  <span className="template3__contactLabel">Phone</span>
                  <a className="template3__contactValue" href={toTelHref(merged.phone)}>
                    {merged.phone}
                  </a>
                </li>
                <li className="template3__contactItem">
                  <span className="template3__contactLabel">Email</span>
                  <a className="template3__contactValue" href={`mailto:${merged.email}`}>
                    {merged.email}
                  </a>
                </li>
                <li className="template3__contactItem">
                  <span className="template3__contactLabel">Office</span>
                  <p className="template3__contactValue">{merged.address}</p>
                </li>
                <li className="template3__contactItem">
                  <span className="template3__contactLabel">Domain</span>
                  <a className="template3__contactValue" href={toDomainHref(merged.domain)}>
                    {merged.domain || 'example.com'}
                  </a>
                </li>
              </ul>
            </article>
          </div>
        </section>
      </main>
    </div>
  )
}
