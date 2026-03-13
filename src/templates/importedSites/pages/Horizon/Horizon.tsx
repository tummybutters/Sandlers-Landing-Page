import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, ArrowUpRight, Minus } from 'lucide-react';
import { buildImportedSiteData } from '../../siteData.js';
import { useSectionNavigation } from '../../useSectionNavigation.js';
import { selectedOptimizedPhotos } from '../../../../photos/optimized/templateImageSets.js';
import styles from './Horizon.module.css';

const defaultData = {
  businessName: 'Horizon Partners',
  eyebrow: 'Strategic Capital Advisory',
  heroTitle: 'Transforming Complexity\nInto Clear\nMarket Advantage',
  heroP: 'We advise leadership teams, investors, and premium service firms on strategy, positioning, and complex decisions where confidence matters.',
  aboutH2: 'A singular focus\non clear decisions',
  aboutP1: 'Horizon Partners works with organizations that need sharper framing, stronger judgment, and an outside perspective that is direct without becoming noisy.',
  aboutP2: 'Our role is to simplify the problem, pressure-test the path, and help the next important move feel more deliberate.',
  services: [
    { name: 'Strategic Advisory', description: 'Guidance for leadership teams navigating growth, risk, and consequential decisions.' },
    { name: 'Positioning Review', description: 'Clarify how the business presents its value to clients, partners, and investors.' },
    { name: 'Capital Readiness', description: 'Sharpen the story and decision logic before important financing or partner conversations.' },
  ],
  email: 'partners@horizon.com',
  phone: '(310) 555-0130',
  address: 'Zurich · London · New York',
  contactBlurb: 'Start a confidential conversation about the mandate, pressure point, or decision currently on the table.',
  stats: [
    ['120+', 'Client mandates'],
    ['$14.2B+', 'Capital advised'],
    ['32%', 'Average value yield'],
  ],
}

const Horizon = ({ data = defaultData }) => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [scrolled, setScrolled] = useState(false);
  const { site, heroLines, services, stats, emailHref } = buildImportedSiteData(defaultData, data, { statCount: 3 });
  const handleSectionNavigation = useSectionNavigation(112);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.horizon}>
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.logo}>{site.businessName}</div>
        <div className={styles.navLinks}>
          <a href="#services" onClick={handleSectionNavigation}>Services</a>
          <a href="#about" onClick={handleSectionNavigation}>Philosophy</a>
          <a href="#proof" onClick={handleSectionNavigation}>Cases</a>
        </div>
        <a className={styles.contactBtn} href={emailHref}>
          Contact <ArrowUpRight size={14} />
        </a>
      </nav>

      <section className={styles.hero}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.heroLabel}>{site.eyebrow}</p>
          <h1 className={styles.heroTitle}>{heroLines[0]} <br />{heroLines[1]} <br />{heroLines[2]}</h1>
          <a className={styles.heroCta} href="#services" onClick={handleSectionNavigation}>
            Explore our methodology <ChevronRight size={16} />
          </a>
        </motion.div>
        
        <motion.div 
          className={styles.heroImageWrapper}
          style={{ y: yParallax }}
        >
          <div className={styles.heroImage}>
            <img src={selectedOptimizedPhotos.businessPartners02} alt="" />
          </div>
        </motion.div>
      </section>

      <section id="services" className={styles.services}>
        <div className={styles.servicesHeader}>
          <Minus className={styles.sectionIcon} />
          <h2>Capabilities</h2>
          <p>{site.heroP}</p>
        </div>

        <div className={styles.serviceGrid}>
          {services.map((s, i) => (
            <motion.div 
              key={i}
              className={styles.serviceCard}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
            >
              <h3>0{i + 1}</h3>
              <h4>{s.name}</h4>
              <p>{s.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="about" className={styles.about}>
        <div className={styles.aboutSplit}>
          <div className={styles.aboutLeft}>
            <h2>{site.aboutH2.replace('\n', ' ')}</h2>
          </div>
          <div className={styles.aboutRight}>
            <p>{site.aboutP1}</p>
            <p>{site.aboutP2}</p>
          </div>
        </div>
      </section>

      <section id="proof" className={styles.proof}>
        <div className={styles.proofInner}>
          {stats.map((item) => (
            <div className={styles.statLine} key={`${item.value}-${item.label}`}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <motion.h2 
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          viewport={{ once: true }}
        >
          Initiate a conversation.
        </motion.h2>
        <a className={styles.largeBtn} href={emailHref}>Contact {site.businessName}</a>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>{site.businessName}</div>
        <div className={styles.footerLinks}>
          <span>{site.address}</span>
          <span>{site.phone}</span>
          <span>{site.email}</span>
        </div>
        <div className={styles.copyright}>© {new Date().getFullYear()} {site.businessName}.</div>
      </footer>
    </div>
  );
};

export default Horizon;
