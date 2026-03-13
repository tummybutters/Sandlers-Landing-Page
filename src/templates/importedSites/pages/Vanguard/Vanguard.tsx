import { motion } from 'framer-motion';
import { Layers, Zap, Telescope } from 'lucide-react';
import { buildImportedSiteData } from '../../siteData.js';
import { useSectionNavigation } from '../../useSectionNavigation.js';
import { selectedOptimizedPhotos } from '../../../../photos/optimized/templateImageSets.js';
import styles from './Vanguard.module.css';

const defaultData = {
  businessName: 'Vanguard Network',
  eyebrow: 'Future systems advisory',
  heroTitle: 'Accelerating\nTomorrow',
  heroP: 'Vanguard advises ambitious organizations on technology adoption, asymmetric growth vectors, and the architecture of what comes next.',
  aboutH2: 'The Vanguard Protocol',
  aboutP1: 'We do not deliver abstract decks. We build embedded strategic logic that helps organizations move faster with fewer translation layers.',
  aboutP2: 'When the gap between strategy and execution gets too wide, growth becomes theatre. Our work is to close that gap.',
  services: [
    { name: 'AI Integration', description: 'Deploying modern intelligence systems across legacy operational frameworks.' },
    { name: 'Data Architecture', description: 'Structuring decision pipelines for real-time leadership use.' },
    { name: 'Future Casting', description: 'Scenario modeling that helps teams front-run emerging market shifts.' },
  ],
  email: 'hello@vanguardnetwork.com',
  phone: '(650) 555-0156',
  address: 'Global advisory network',
  contactBlurb: 'Your industry is moving quickly. Start the conversation before the current model hardens into a constraint.',
  stats: [
    ['10x', 'Velocity multiplier'],
    ['99%', 'Precision'],
    ['$2B+', 'R&D optimized'],
  ],
}

const Vanguard = ({ data = defaultData }) => {
  const { site, heroLines, services, stats, emailHref } = buildImportedSiteData(defaultData, data, { statCount: 3 });
  const handleSectionNavigation = useSectionNavigation(96);
  return (
    <div className={styles.vanguard}>
      <header className={styles.navbar}>
        <div className={styles.brand}>
          <div className={styles.dot}></div>
          {site.businessName}
        </div>
        <div className={styles.menu}>
          <a href="#protocol" onClick={handleSectionNavigation}>PROTOCOL</a>
          <a href="#vectors" onClick={handleSectionNavigation}>VECTORS</a>
          <a href="#outcomes" onClick={handleSectionNavigation}>OUTCOMES</a>
        </div>
        <a className={styles.actionBtn} href={emailHref}>Start a conversation</a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          >
            {heroLines[0].toUpperCase()}<br/>
            {heroLines[1].toUpperCase()}.
          </motion.h1>
          <motion.div 
            className={styles.heroSub}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
            <p>{site.heroP}</p>
            <div className={styles.scrollLine}></div>
          </motion.div>
        </div>
        <div className={styles.abstractGraphic}>
          <div className={styles.graphicImage}>
            <img src={selectedOptimizedPhotos.cinematicAerial01} alt="" />
          </div>
          <div className={styles.orb}></div>
          <div className={styles.gridPlane}></div>
        </div>
      </section>

      <section id="vectors" className={styles.vectors}>
        <div className={styles.sectionHead}>
          <span>01.</span>
          <h2>STRATEGIC VECTORS</h2>
        </div>
        <div className={styles.vectorCards}>
          {services.map((v, i) => {
            const Icon = [Zap, Layers, Telescope][i] || Zap
            return (
            <motion.div 
              key={v.name} 
              className={styles.vCard}
              whileHover={{ y: -5 }}
            >
              <div className={styles.vCardTop}>
                <span className={styles.vTag}>0{i + 1}</span>
                <Icon className={styles.vIcon} size={24} />
              </div>
              <h3>{v.name}</h3>
              <p>{v.description}</p>
            </motion.div>
          )})}
        </div>
      </section>

      <section id="protocol" className={styles.protocol}>
        <div className={styles.protocolSplit}>
          <div className={styles.pLeft}>
            <h2>{site.aboutH2.toUpperCase()}</h2>
          </div>
          <div className={styles.pRight}>
            <p>{site.aboutP1}</p>
            <p>{site.aboutP2}</p>
          </div>
        </div>
      </section>

      <section id="outcomes" className={styles.outcomes}>
        <div className={styles.outcomeGrid}>
          <div className={styles.outcomeBig}>
            <span className={styles.num}>{stats[0]?.value || '10x'}</span>
            <span className={styles.label}>{stats[0]?.label.toUpperCase() || 'VELOCITY MULTIPLIER'}</span>
          </div>
          <div className={styles.outcomeSmallGroup}>
            <div className={styles.outcomeSmall}>
              <span className={styles.numS}>{stats[1]?.value || '99%'}</span>
              <span className={styles.labelS}>{stats[1]?.label.toUpperCase() || 'PRECISION'}</span>
            </div>
            <div className={styles.outcomeSmall}>
              <span className={styles.numS}>{stats[2]?.value || '$2B+'}</span>
              <span className={styles.labelS}>{stats[2]?.label.toUpperCase() || 'R&D OPTIMIZED'}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>BREAK OR BE BROKEN.</h2>
        <p>{site.contactBlurb}</p>
        <a className={styles.hugeBtn} href={emailHref}>Speak with {site.businessName}</a>
      </section>

      <footer className={styles.footer}>
        <div className={styles.fMain}>{site.businessName.toUpperCase()}</div>
        <div className={styles.fData}>{site.email} · {site.phone}</div>
      </footer>
    </div>
  );
};

export default Vanguard;
