import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Diamond } from 'lucide-react';
import { buildImportedSiteData } from '../../siteData.js';
import { useSectionNavigation } from '../../useSectionNavigation.js';
import { selectedOptimizedPhotos } from '../../../../photos/optimized/templateImageSets.js';
import styles from './Aura.module.css';

const defaultData = {
  businessName: 'Aura Partners',
  eyebrow: 'Private advisory',
  heroTitle: 'Refined\nIntelligence',
  heroP: 'We advise premium organizations through strategic transitions, positioning work, and careful high-trust decision support.',
  aboutH2: 'Silence is a strategy',
  aboutP1: 'Our best work happens when the situation is sensitive, the audience is demanding, and the business needs a calmer, more credible way forward.',
  aboutP2: 'In a market full of noise, strong positioning and disciplined execution still read as the rarest luxury.',
  services: [
    { name: 'Market Positioning', description: 'Calibrate public perception and sharpen how the business is understood by clients, investors, and partners.' },
    { name: 'Governance Review', description: 'Bring structure and alignment to leadership communication, operating decisions, and strategic pacing.' },
    { name: 'Digital Elegance', description: 'Translate complex offerings into a smoother, more premium digital presence.' },
  ],
  email: 'contact@aurapartners.com',
  phone: '(213) 555-0171',
  address: 'Private advisory roster',
  contactBlurb: 'Request an introductory session and we will follow up with the right next step for the current mandate.',
  stats: [
    ['100%', 'NDA compliance'],
    ['12', 'Active partnerships annually'],
  ],
}

const Aura = ({ data = defaultData }) => {
  const { site, heroLines, services, stats, emailHref } = buildImportedSiteData(defaultData, data, { statCount: 2 });
  const handleSectionNavigation = useSectionNavigation(112);
  return (
    <div className={styles.aura}>
      <nav className={styles.nav}>
        <div className={styles.logo}>{site.businessName}</div>
        <div className={styles.navLinks}>
          <a href="#services" onClick={handleSectionNavigation}>Services</a>
          <a href="#ethos" onClick={handleSectionNavigation}>Ethos</a>
          <a href="#impact" onClick={handleSectionNavigation}>Impact</a>
        </div>
        <a className={styles.contactBtn} href={emailHref}>Start a conversation</a>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroBackdrop}>
          <img src={selectedOptimizedPhotos.founderAdvisory04} alt="" />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.glowBg} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>{site.eyebrow}</p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={styles.titleWrapper}
          >
            <h1>{heroLines[0]}<br/>{heroLines[1]}.</h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {site.heroP}
          </motion.p>
        </div>
        <div className={styles.mouseScroll}>
          <div className={styles.mouseWheel}></div>
        </div>
      </section>

      <section id="services" className={styles.services}>
        <div className={styles.glassContainer}>
          <div className={styles.sectionHeader}>
            <Sparkles size={20} className={styles.iconAccent} />
            <h2>Bespoke Capabilities</h2>
          </div>
          
          <div className={styles.serviceCards}>
            {services.map((service) => (
              <div key={service.name} className={styles.card}>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ethos" className={styles.ethos}>
        <div className={styles.ethosText}>
          <h2>{site.aboutH2}.</h2>
          <p>{site.aboutP1} {site.aboutP2}</p>
        </div>
      </section>

      <section id="impact" className={styles.impact}>
        <div className={styles.impactGrid}>
          <div className={styles.impactMetric}>
            <ShieldCheck size={32} className={styles.iconAccent} />
            <h4>{stats[0]?.label || 'Total Discretion'}</h4>
            <p>{stats[0]?.value || '100%'}</p>
          </div>
          <div className={styles.impactMetric}>
            <Diamond size={32} className={styles.iconAccent} />
            <h4>{stats[1]?.label || 'Exclusive Roster'}</h4>
            <p>{stats[1]?.value || '12'}</p>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.glassContainerCta}>
          <h2>{site.businessName}</h2>
          <p>{site.contactBlurb}</p>
          <form className={styles.ctaForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder={site.email} className={styles.input} />
            <a className={styles.submitBtn} href={emailHref}>Send inquiry</a>
          </form>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.logoSmall}>{site.businessName}</span>
          <span className={styles.copyright}>© {new Date().getFullYear()} {site.businessName}.</span>
        </div>
      </footer>
    </div>
  );
};

export default Aura;
