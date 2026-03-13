import { motion } from 'framer-motion';
import { Grid, Activity, Layers, CornerDownRight } from 'lucide-react';
import { buildImportedSiteData } from '../../siteData.js';
import { useSectionNavigation } from '../../useSectionNavigation.js';
import { selectedOptimizedPhotos } from '../../../../photos/optimized/templateImageSets.js';
import styles from './Nexus.module.css';

const defaultData = {
  businessName: 'Nexus Strategy',
  eyebrow: 'Enterprise systems advisory',
  heroTitle: 'Architecting\nEnterprise\nSystems',
  heroP: 'Precision advisory for high-complexity operations, decision systems, and growth environments where clarity must scale.',
  aboutH2: 'Systematic excellence',
  aboutP1: 'We help leadership teams reduce operational drag, strengthen internal decision logic, and improve the way complex work moves through the business.',
  aboutP2: 'The focus is not noise or novelty. It is cleaner systems, faster thinking, and stronger execution under pressure.',
  services: [
    { name: 'Operational Velocity', description: 'Reducing friction in core processes and sharpening execution across high-value systems.' },
    { name: 'Data Infrastructure', description: 'Turning intuition into clearer measurement, reporting, and decision support.' },
    { name: 'Technology Integration', description: 'Aligning teams, tools, and legacy workflows so scale does not create chaos.' },
  ],
  email: 'partners@nexusstrategy.com',
  phone: '(415) 555-0140',
  address: 'Secure advisory network',
  contactBlurb: 'Start a direct conversation about the operational bottleneck, system challenge, or strategic constraint in front of your team.',
  stats: [
    ['240%', 'Avg. efficiency gain'],
    ['<12MS', 'Decision latency decrease'],
    ['O(1)', 'Scaling complexity'],
  ],
}

const Nexus = ({ data = defaultData }) => {
  const { site, heroLines, services, stats, emailHref } = buildImportedSiteData(defaultData, data, { statCount: 3 });
  const handleSectionNavigation = useSectionNavigation(112);
  return (
    <div className={styles.nexus}>
      <header className={styles.header}>
        <div className={styles.navGrid}>
          <div className={styles.brand}>{site.businessName}</div>
          <div className={styles.navItems}>
            <a href="#solutions" onClick={handleSectionNavigation}>Solutions</a>
            <a href="#engine" onClick={handleSectionNavigation}>Engine</a>
            <a href="#metrics" onClick={handleSectionNavigation}>Metrics</a>
          </div>
          <a className={styles.engage} href={emailHref}>Contact</a>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {heroLines.map((line) => (
                <span key={line}>{line}<br/></span>
              ))}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {site.heroP}
            </motion.p>
            <motion.a 
              className={styles.blueBtn}
              href="#solutions"
              onClick={handleSectionNavigation}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              START REVIEW <CornerDownRight size={16} />
            </motion.a>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.gridPattern}></div>
            <img src={selectedOptimizedPhotos.modernBoardroom01} alt="" />
          </div>
        </div>
      </section>

      <section id="solutions" className={styles.solutions}>
        <div className={styles.solutionHeader}>
          <h2>[01] CORE COMPETENCIES</h2>
        </div>
        <div className={styles.solutionGrid}>
          {services.map((service, index) => {
            const Icon = [Activity, Grid, Layers][index] || Activity
            return (
              <div key={service.name} className={styles.solCard}>
                <Icon className={styles.solIcon} size={32} />
                <h3>{service.name.toUpperCase()}</h3>
                <p>{service.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section id="engine" className={styles.marquee}>
        <div className={styles.marqueeInner}>
          {Array(5).fill(`${site.aboutH2.toUpperCase()}. `).map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </section>

      <section id="metrics" className={styles.proofGrid}>
        <div className={styles.proofHeader}>
          <h2>[02] METRICS VALIDATION</h2>
        </div>
        <div className={styles.metricsContainer}>
          {stats.map((m, i) => (
            <div key={i} className={styles.metricCard}>
              <span className={styles.metricVal}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaGrid}>
          <div className={styles.ctaContent}>
            <h2>SYSTEM READY.</h2>
            <p>{site.contactBlurb}</p>
          </div>
          <div className={styles.ctaAction}>
            <a className={styles.blueBtnLarge} href={emailHref}>Start the conversation <CornerDownRight size={20} /></a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>{site.businessName}</div>
          <div className={styles.footerStatus}>{site.address}</div>
          <div className={styles.footerLegal}>{site.email} | {site.phone}</div>
        </div>
      </footer>
    </div>
  );
};

export default Nexus;
