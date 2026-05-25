import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

const modules = [
  {
    icon: '📦',
    title: 'Bulk Sending',
    desc: 'High-volume batch payroll, salary, pension & corporate disbursements via RAAST.',
    to: '/bulk-sending/',
    color: '#3a7bd5',
  },
  {
    icon: '↔️',
    title: 'P2P Payments',
    desc: 'Instant person-to-person transfers via CAS aliases (CNIC, mobile, IBAN).',
    to: '/p2p/',
    color: '#7b68ee',
  },
  {
    icon: '🏪',
    title: 'P2M / Merchant',
    desc: 'QR code (Static & Dynamic), RTP, and merchant-initiated payment flows.',
    to: '/p2m/',
    color: '#00bfff',
  },
  {
    icon: '🔐',
    title: 'PISP',
    desc: 'Consent-based third-party payment initiation with full lifecycle management.',
    to: '/pisp/',
    color: '#ff6b9d',
  },
  {
    icon: '🌍',
    title: 'Remittance',
    desc: 'Inbound international remittance via MTOs — FCY→PKR conversion to RAAST.',
    to: '/remittance/',
    color: '#00d4aa',
  },
];

function HomepageHeader() {
  return (
    <header className={styles.futuristicHeader}>
      <div className={styles.backgroundAnimation} />
      <div className={styles.particles}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles[`particle${i + 1}`]} />
        ))}
      </div>

      <div className={styles.headerContent}>
        <div className={styles.logoWrapper}>
          <img
            src={useBaseUrl('/img/OpenConnect.png')}
            alt="OpenConnect"
            className={styles.headerImage}
          />
        </div>

        <Heading as="h1" className={styles.mainTitle}>
          OpenConnect
        </Heading>

        <p className={styles.subtitle}>
          Enterprise Integration Middleware for Real-Time Payments
        </p>

        <div className={styles.divider} />

        <p className={styles.description}>
          Official technical documentation for RAAST integration — covering Bulk Sending,
          P2P, P2M, PISP & Remittance modules via the OpenConnect middleware platform
          by Paysys Labs.
        </p>

        <div className={styles.ctaContainer}>
          <Link className={styles.ctaButton} to="/introduction">
            Get Started
          </Link>
          <Link className={styles.ctaButtonSecondary} to="/api-specifications">
            API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

function ModulesSection() {
  return (
    <section className={styles.modulesSection}>
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionTitle}>Integration Modules</h2>
        <p className={styles.sectionSubtitle}>
          Five RAAST modules — each with full API reference, message specs, process flows, and response codes.
        </p>
        <div className={styles.moduleGrid}>
          {modules.map((m) => (
            <Link key={m.title} to={m.to} className={styles.moduleCard} style={{ '--card-color': m.color }}>
              <span className={styles.moduleIcon}>{m.icon}</span>
              <div className={styles.moduleTitle}>
                {m.title}
              </div>
              <p className={styles.moduleDesc}>{m.desc}</p>
              <span className={styles.moduleArrow}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section className={styles.archSection}>
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionTitle}>System Architecture</h2>
        <p className={styles.sectionSubtitle}>
          OpenConnect sits between bank channels and SBP MPG — handling routing, transformation, and protocol bridging.
        </p>
        <div className={styles.archImages}>
          <img
            src={useBaseUrl('/img/OC-architecture.png')}
            alt="OpenConnect Architecture"
            className={styles.archImg}
          />
          <img
            src={useBaseUrl('/img/OC-system.png')}
            alt="OpenConnect System"
            className={styles.archImg}
          />
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: '5', label: 'Integration Modules' },
    { value: '60+', label: 'REST API Endpoints' },
    { value: 'ISO 20022', label: 'Messaging Standard' },
    { value: 'RAAST', label: 'SBP Payment Network' },
  ];
  return (
    <section className={styles.statsSection}>
      <div className={styles.sectionInner}>
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Official RAAST OpenConnect API documentation — Bulk Sending, P2P, P2M, PISP & Remittance"
    >
      <HomepageHeader />
      <StatsSection />
      <ModulesSection />
      <ArchitectureSection />
    </Layout>
  );
}
