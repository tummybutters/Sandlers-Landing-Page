import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { buildImportedSiteData } from '../../siteData.js';
import { useSectionNavigation } from '../../useSectionNavigation.js';
import { selectedOptimizedPhotos } from '../../../../photos/optimized/templateImageSets.js';
import styles from './Lumina.module.css';

const defaultData = {
  businessName: 'Lumina Consulting',
  eyebrow: 'Enterprise Advisory',
  heroTitle: 'Clarity Amidst\nComplexity',
  heroP: 'We guide premium service businesses through growth, repositioning, and high-stakes decisions with a bias toward thoughtful, usable strategy.',
  aboutH2: 'The Lumina Method',
  aboutP1: 'Before prescribing a solution, we immerse ourselves in the actual context of the business. Strong strategy is born from nuance, not presentation theatre.',
  aboutP2: 'We build frameworks that can live beyond the kickoff meeting and support better decisions over time.',
  services: [
    { name: 'Organizational Design', description: 'Restructuring teams and priorities for stronger strategic alignment.' },
    { name: 'Market Entry', description: 'Planning thoughtful expansion into new markets, offers, or client segments.' },
    { name: 'Brand and Culture', description: 'Aligning internal clarity with outward-facing trust and perception.' },
  ],
  email: 'hello@luminaconsulting.com',
  phone: '(212) 555-0184',
  address: 'New York · Paris · Kyoto',
  contactBlurb: 'Schedule a confidential consultation to discuss the current mandate, positioning challenge, or next-phase decision.',
  stats: [
    ['98%', 'Client retention over 5 years'],
    ['$4B', 'Value unlocked in 2024'],
    ['15+', 'Industry accolades'],
  ],
}

const Lumina = ({ data = defaultData }) => {
  const { site, heroLines, services, stats, emailHref } = buildImportedSiteData(defaultData, data, { statCount: 3 });
  const handleSectionNavigation = useSectionNavigation(112);
  return (
    <div className={styles.lumina}>
      <header className={styles.header}>
        <div className={styles.logo}>{site.businessName}</div>
        <nav className={styles.nav}>
          <a href="#approach" onClick={handleSectionNavigation}>Our Approach</a>
          <a href="#expertise" onClick={handleSectionNavigation}>Capabilities</a>
          <a href="#culture" onClick={handleSectionNavigation}>Culture</a>
        </nav>
        <a className={styles.contactLink} href={emailHref}>Connect</a>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroLayout}>
            <div className={styles.heroText}>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {heroLines[0]} <br/>
              <em>{heroLines[1]}</em>
            </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {site.heroP}
            </motion.p>
              
              <motion.div 
                className={styles.heroCta}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
                <span>Read our latest insights</span>
                <ArrowRight size={18} />
              </motion.div>
            </div>
            <motion.div 
              className={styles.heroImage}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <img src={selectedOptimizedPhotos.sophisticatedInterior01} alt="" />
            </motion.div>
          </div>
        </section>

        <section id="approach" className={styles.approach}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>01.</span>
            <h2>The Lumina Method</h2>
          </div>
          
          <div className={styles.approachContent}>
            <div className={styles.approachColumn}>
              <h3>{site.aboutH2}</h3>
              <p>{site.aboutP1}</p>
            </div>
            <div className={styles.approachColumn}>
              <h3>Sustained Impact</h3>
              <p>{site.aboutP2}</p>
            </div>
          </div>
        </section>

        <section id="expertise" className={styles.services}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>02.</span>
            <h2>Capabilities</h2>
          </div>
          <div className={styles.serviceTable}>
            {services.map((s, i) => (
              <div key={i} className={styles.serviceRow}>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <div className={styles.line}></div>
              </div>
            ))}
          </div>
        </section>

        <section id="proof" className={styles.proof}>
          <div className={styles.statsLayout}>
            {stats.map((item) => (
              <div className={styles.statBox} key={`${item.value}-${item.label}`}>
                <span className={styles.statVal}>{item.value}</span>
                <span className={styles.statLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="culture" className={styles.features}>
          <div className={styles.featureImage}>
            <img src={selectedOptimizedPhotos.executiveDeskDetail01} alt="" />
          </div>
          <div className={styles.featureText}>
            <h2>{site.aboutH2}</h2>
            <p>{site.contactBlurb}</p>
            <a className={styles.outlineBtn} href={emailHref}>Explore our work</a>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Begin the dialogue.</h2>
          <p>{site.contactBlurb}</p>
          <a href={emailHref} className={styles.solidBtn}>Reach out directly</a>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerLogo}>{site.businessName}</div>
          <div className={styles.footerMenu}>
            <ul>
              <li>Contact</li>
              <li>{site.address}</li>
              <li>{site.phone}</li>
              <li>{site.email}</li>
            </ul>
            <ul>
              <li>Legal</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} {site.businessName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Lumina;
