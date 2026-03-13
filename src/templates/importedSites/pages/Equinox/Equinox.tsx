import { motion } from 'framer-motion';
import { Leaf, Droplets, Wind, ArrowUpRight } from 'lucide-react';
import { buildImportedSiteData } from '../../siteData.js';
import { useSectionNavigation } from '../../useSectionNavigation.js';
import { selectedOptimizedPhotos } from '../../../../photos/optimized/templateImageSets.js';
import styles from './Equinox.module.css';

const defaultData = {
  businessName: 'Equinox Partners',
  eyebrow: 'Sustainability advisory',
  heroTitle: 'Organic Growth,\nStructured Gracefully',
  heroP: 'We advise resilient organizations on sustainable transformation, long-horizon strategy, and operational models designed to endure.',
  aboutH2: 'The Philosophy',
  aboutP1: 'Growth at the expense of resilience is temporary. The strongest premium businesses are built to adapt, compound trust, and preserve long-term value.',
  aboutP2: 'Equinox Partners helps leadership teams move away from extractive habits toward operating models that are more regenerative, credible, and durable.',
  services: [
    { name: 'Green Architecture', description: 'Re-engineering supply chains and operating models to reduce waste while improving resilience.' },
    { name: 'Fluid Capital', description: 'Directing investment and strategic resources toward durable, long-term value creation.' },
    { name: 'Cultural Adaptation', description: 'Helping teams evolve structure, leadership rhythm, and internal behavior without losing coherence.' },
  ],
  email: 'hello@equinoxpartners.com',
  phone: '(206) 555-0149',
  address: 'Oslo · Vancouver · Kyoto',
  contactBlurb: 'Schedule a dialogue about the next phase of growth, sustainability, or strategic reinvention.',
  stats: [
    ['12M+', 'Tons of carbon offset engineered'],
    ['$6.2B', 'Sustainable assets under guidance'],
    ['100%', 'Partner client retention rate'],
  ],
}

const Equinox = ({ data = defaultData }) => {
  const { site, heroLines, services, stats, emailHref } = buildImportedSiteData(defaultData, data, { statCount: 3 });
  const handleSectionNavigation = useSectionNavigation(104);
  return (
    <div className={styles.equinox}>
      <nav className={styles.nav}>
        <div className={styles.logo}>{site.businessName}</div>
        <div className={styles.navItems}>
          <a href="#vision" onClick={handleSectionNavigation}>Vision</a>
          <a href="#domains" onClick={handleSectionNavigation}>Domains</a>
          <a href="#impact" onClick={handleSectionNavigation}>Impact</a>
        </div>
        <a className={styles.contactBtn} href={emailHref}>Start the dialogue</a>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={selectedOptimizedPhotos.modernCoastal01} 
            alt="" 
            className={styles.heroImg}
          />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroEyebrow}>{site.eyebrow}</div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          >
            {heroLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index === heroLines.length - 1 && !/[.!?]$/.test(line) ? '.' : ''}
                {index < heroLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          >
            {site.heroP}
          </motion.p>
        </div>
      </section>

      <section id="vision" className={styles.vision}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>The Philosophy</h2>
          <div className={styles.visionText}>
            <p className={styles.largeText}>
              {site.aboutP1}
            </p>
            <p className={styles.smallText}>
              {site.aboutP2}
            </p>
          </div>
        </div>
      </section>

      <section id="domains" className={styles.domains}>
        <div className={styles.container}>
          <div className={styles.domainGrid}>
            {services.map((service, index) => {
              const Icon = [Leaf, Droplets, Wind][index] || Leaf
              return (
                <div key={service.name} className={styles.domainCard}>
                  <Icon className={styles.icon} size={32} />
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="impact" className={styles.impact}>
        <div className={styles.impactVisual}>
          <img src={selectedOptimizedPhotos.quietContemplation01} alt="" />
        </div>
        <div className={styles.impactData}>
          {stats.map((item) => (
            <div className={styles.statBox} key={`${item.value}-${item.label}`}>
              <h4>{item.value}</h4>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className={styles.cta}>
        <h2>{site.businessName}</h2>
        <a href="#contact" className={styles.ctaLink} onClick={handleSectionNavigation}>
          Schedule a dialogue <ArrowUpRight size={20} />
        </a>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.brandBadge}>{site.businessName}</div>
          <div className={styles.footerLinks}>
            <span>{site.address}</span>
            <span>{site.phone}</span>
            <span>{site.email}</span>
          </div>
        </div>
        <div className={styles.legal}>© {new Date().getFullYear()} {site.businessName}.</div>
      </footer>
    </div>
  );
};

export default Equinox;
