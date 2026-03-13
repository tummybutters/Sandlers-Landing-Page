import { motion } from 'framer-motion';
import { buildImportedSiteData } from '../../siteData.js';
import { useSectionNavigation } from '../../useSectionNavigation.js';
import { selectedOptimizedPhotos } from '../../../../photos/optimized/templateImageSets.js';
import styles from './Veritas.module.css';

const defaultData = {
  businessName: 'Veritas Group',
  eyebrow: 'Generational capital advisory',
  heroTitle: 'Enduring Strategy\nFor Generational\nCapital',
  heroP: 'Advising distinguished families, principals, and institutions on capital preservation, strategic acquisitions, and long-horizon decision making.',
  aboutH2: 'Our Heritage',
  aboutP1: 'We work quietly behind significant decisions, helping clients think in decades instead of headlines.',
  aboutP2: 'The philosophy is rooted in permanence: independent counsel, patient judgment, and support that is deliberately selective.',
  services: [
    { name: 'Capital Preservation', description: 'Multi-generational planning built to withstand volatility and protect long-range objectives.' },
    { name: 'Institutional Advisory', description: 'Strategic capital allocation support for endowments, family enterprises, and private offices.' },
    { name: 'Strategic Acquisitions', description: 'Discreet transaction support for high-value asset transfers and sensitive negotiations.' },
  ],
  email: 'private@veritasgroup.com',
  phone: '(917) 555-0168',
  address: 'London · Geneva · New York',
  contactBlurb: 'We accept new clients through direct inquiry or mutual qualification. Begin with a private note and we will respond appropriately.',
  stats: [
    ['$40B+', 'Assets under advisory'],
    ['1954', 'Year established'],
    ['75', 'Partners worldwide'],
  ],
}

const Veritas = ({ data = defaultData }) => {
  const { site, heroLines, services, stats, emailHref } = buildImportedSiteData(defaultData, data, { statCount: 3 });
  const handleSectionNavigation = useSectionNavigation(104);
  return (
    <div className={styles.veritas}>
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>{site.eyebrow.toUpperCase()}</div>
        <div className={styles.topbarCenter}>
          <h1 className={styles.brandName}>{site.businessName}</h1>
        </div>
        <div className={styles.topbarRight}>
          <a href="#contact" className={styles.navLink} onClick={handleSectionNavigation}>Inquiries</a>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroShell}>
          <motion.div 
            className={styles.heroCopy}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <p className={styles.heroKicker}>{site.eyebrow}</p>
            <h2 className={styles.heroTitle}>
              {heroLines.map((line, index) => (
                <span key={`${line}-${index}`}>
                  {line}
                  {index === heroLines.length - 1 && !/[.!?]$/.test(line) ? '.' : ''}
                  {index < heroLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>
            <div className={styles.heroDivider}></div>
            <p className={styles.heroSubtitle}>{site.heroP}</p>
          </motion.div>
          <div className={styles.heroFrame}>
            <div className={styles.heroImage}>
              <img src={selectedOptimizedPhotos.luxuryWorkspace01} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className={styles.services}>
        <div className={styles.sectionHeading}>
          <span className={styles.romanNumeral}>I.</span>
          <h3>Areas of Practice</h3>
        </div>

        <div className={styles.serviceList}>
          {services.map((service) => (
            <div key={service.name} className={styles.serviceItem}>
              <div className={styles.serviceContent}>
                <h4>{service.name}</h4>
                <p>{service.description}</p>
              </div>
              <div className={styles.serviceLine}></div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className={styles.about}>
        <div className={styles.aboutLayout}>
          <div className={styles.aboutImage}>
            <img src={selectedOptimizedPhotos.executiveDeskDetail01} alt="" />
          </div>
          <div className={styles.aboutText}>
            <span className={styles.romanNumeral}>II.</span>
            <h3>{site.aboutH2}</h3>
            <p>{site.aboutP1}</p>
            <p>{site.aboutP2}</p>
            <div className={styles.signature}>
              {site.businessName}
              <span>{site.eyebrow}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="proof" className={styles.credibility}>
        <div className={styles.credContainer}>
          {stats.map((item) => (
            <div key={`${item.value}-${item.label}`} className={styles.credItem}>
              <span className={styles.credNum}>{item.value}</span>
              <span className={styles.credDesc}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className={styles.contact}>
        <div className={styles.contactInner}>
          <span className={styles.romanNumeral}>III.</span>
          <h3>Private Correspondence</h3>
          <p>{site.contactBlurb}</p>
          <a className={styles.inquiryBtn} href={emailHref}>Request an Audience</a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerAddresses}>
          <div className={styles.address}>
            <strong>London</strong>
            <br />12 St. James's Square
            <br />SW1Y 4LB
          </div>
          <div className={styles.address}>
            <strong>Geneva</strong>
            <br />Rue du Rhône 50
            <br />1204 Genève
          </div>
          <div className={styles.address}>
            <strong>New York</strong>
            <br />590 Madison Avenue
            <br />NY 10022
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.footerBrand}>{site.businessName.toUpperCase()}</div>
          <div className={styles.footerLegal}>© {new Date().getFullYear()} {site.businessName}. {site.email} · {site.phone}</div>
        </div>
      </footer>
    </div>
  );
};

export default Veritas;
