import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { buildImportedSiteData } from '../../siteData.js';
import { useSectionNavigation } from '../../useSectionNavigation.js';
import { selectedOptimizedPhotos } from '../../../../photos/optimized/templateImageSets.js';
import styles from './Onyx.module.css';

const defaultData = {
  businessName: 'Onyx Advisory',
  eyebrow: 'Restricted access advisory',
  heroTitle: 'Uncompromising\nExcellence',
  heroP: 'Advisory for highly selective organizations. We operate best where the stakes are high, the signal is weak, and the answer needs to be definitive.',
  aboutH2: 'We are entirely absent from the public eye',
  aboutP1: 'Our partners work as discreet strategic operators for businesses facing consequential transitions, restructurings, and institutional pressure.',
  aboutP2: 'The mandate is not to decorate the problem. It is to absorb complexity, reduce fragility, and create decisive movement.',
  services: [
    { name: 'Restructuring', description: 'Operational recalibration to maximize latent value in underperforming assets or teams.' },
    { name: 'Crisis Mitigation', description: 'Strategic countermeasures during moments of institutional vulnerability or sharp external pressure.' },
    { name: 'Hostile Acquisition', description: 'Tactical advisory for non-consensus consolidation and aggressive market moves.' },
  ],
  email: 'restricted@onyxadvisory.com',
  phone: '(646) 555-0113',
  address: 'Restricted access',
  contactBlurb: 'Authorize a secure inquiry if the mandate requires discretion, speed, and a willingness to act.',
  stats: [
    ['$85B+', 'Capital repositioned'],
    ['0', 'Public failures'],
    ['14', 'Active restructurings'],
  ],
}

const Onyx = ({ data = defaultData }) => {
  const { site, heroLines, services, stats, emailHref } = buildImportedSiteData(defaultData, data, { statCount: 3 });
  const handleSectionNavigation = useSectionNavigation(104);
  return (
    <div className={styles.onyx}>
      <header className={styles.header}>
        <div className={styles.logo}>{site.businessName}</div>
        <nav className={styles.navLinks}>
          <a href="#dossier" onClick={handleSectionNavigation}>DOSSIER</a>
          <a href="#services" onClick={handleSectionNavigation}>CAPABILITIES</a>
          <a href="#metrics" onClick={handleSectionNavigation}>INDEX</a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroLayout}>
            <motion.div 
              className={styles.heroTypo}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
            >
              <div className={styles.heroLabel}>{site.eyebrow}</div>
              <h1 className={styles.massiveText}>
                {heroLines.map((line, index) => (
                  <span key={`${line}-${index}`}>
                    {line.toUpperCase()}
                    {index === heroLines.length - 1 && !/[.!?]$/.test(line) ? '.' : ''}
                    {index < heroLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </h1>
              <motion.div 
                className={styles.heroSub}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <p>{site.heroP}</p>
                <div className={styles.scrollIndicator}>
                  SCROLL <ArrowDown size={14} />
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.heroFrame}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.8, ease: "circOut" }}
            >
              <img src={selectedOptimizedPhotos.businessPartners01} alt="" />
              <div className={styles.heroFrameMeta}>Restricted access mandate</div>
            </motion.div>
          </div>
        </section>

        <section id="services" className={styles.section}>
          <div className={styles.gridLayout}>
            <div className={styles.colLabel}>
              [01] CAPABILITIES
            </div>
            <div className={styles.colContent}>
              {services.map((service) => (
                <div key={service.name} className={styles.serviceItem}>
                  <h2>{service.name.toUpperCase()}</h2>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="dossier" className={styles.section}>
          <div className={styles.gridLayout}>
            <div className={styles.colLabel}>
              [02] DOSSIER
            </div>
            <div className={styles.colContent}>
              <div className={styles.dossierImage}>
                <img src={selectedOptimizedPhotos.investorReview01} alt="" />
              </div>
              <h3 className={styles.statementText}>
                {site.aboutH2}.
              </h3>
              <p className={styles.descText}>
                {site.aboutP1} {site.aboutP2}
              </p>
            </div>
          </div>
        </section>

        <section id="metrics" className={styles.sectionDark}>
          <div className={styles.gridLayout}>
            <div className={styles.colLabelDark}>
              [03] INDEX
            </div>
            <div className={styles.colContent}>
              <div className={styles.metricsWrapper}>
                {stats.map((item) => (
                  <div className={styles.metric} key={`${item.value}-${item.label}`}>
                    <span className={styles.metricVal}>{item.value}</span>
                    <span className={styles.metricLabel}>{item.label.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaBox}>
            <h2>AUTHORIZE<br/>ENGAGEMENT</h2>
            <a className={styles.solidBtn} href={emailHref}>Request a conversation</a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerFlex}>
          <div>{site.businessName}</div>
          <div>{site.phone}</div>
          <div>{site.email}</div>
        </div>
      </footer>
    </div>
  );
};

export default Onyx;
