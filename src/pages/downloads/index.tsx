import Layout from '@theme/Layout';
import clsx from 'clsx';

import BreadcrumbTrail from '../../components/BreadcrumbTrail';
import metadata from '../../../_data/swanlake-latest/metadata.json';
import styles from './index.module.css';

const distServer = 'https://dist.ballerina.io';
const currentVersion = metadata.version;
const normalizedSwanLakeVersion = currentVersion.startsWith('swan-lake-')
  ? currentVersion
  : `swan-lake-${currentVersion}`;
const releaseNotesHref = `/downloads/swan-lake-release-notes/${normalizedSwanLakeVersion}/`;

const packages = [
  {
    name: 'Windows',
    icon: '/images/downloads/windows.svg',
    file: metadata['windows-installer'],
    size: metadata['windows-installer-size'],
  },
  {
    name: 'Linux DEB',
    icon: '/images/downloads/linux.svg',
    file: metadata['linux-installer'],
    size: metadata['linux-installer-size'],
  },
  {
    name: 'Linux RPM',
    icon: '/images/downloads/linux.svg',
    file: metadata['rpm-installer'],
    size: metadata['rpm-installer-size'],
  },
  {
    name: 'macOS Intel',
    icon: '/images/downloads/mac.svg',
    file: metadata['macos-installer'],
    size: metadata['macos-installer-size'],
  },
  {
    name: 'macOS Apple Silicon',
    icon: '/images/downloads/mac.svg',
    file: metadata['macos-arm-installer'],
    size: metadata['macos-arm-installer-size'],
  },
];

const supportLinks = [
  {
    title: 'Installation options',
    description: 'Choose installers, ZIP-based setup, updates, and uninstall steps.',
    href: '/learn/install-ballerina/installation-options/',
  },
  {
    title: 'Build from source',
    description: 'Use the source build path when you need to work on the distribution itself.',
    href: '/downloads/installation-options/build-ballerina-from-source/',
  },
  {
    title: 'Artifact verification',
    description: 'Check installer signatures, certificates, and Cosign/Rekor verification steps.',
    href: '/downloads/verify-ballerina-artifacts/',
  },
  {
    title: 'Release notes',
    description: 'Open the current Swan Lake release notes in the migrated downloads section.',
    href: releaseNotesHref,
  },
  {
    title: 'Archived versions',
    description: 'Browse older installers and archived distribution packages grouped by release stream.',
    href: '/downloads/archived/',
  },
];

export default function DownloadsPage() {
  return (
    <Layout title="Downloads" description="Download Ballerina distributions and installation guides.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <BreadcrumbTrail items={[{label: 'Home', href: '/'}, {label: 'Downloads'}]} />
            <h1 className={styles.title}>Downloads</h1>
            <p className={styles.lead}>
              Install the latest Ballerina distribution, verify your setup, and jump into the
              language with the first migration-ready downloads experience.
            </p>
            <div className={styles.versionCard}>
              <span className={styles.versionEyebrow}>Current stable release</span>
              <strong className={styles.versionValue}>{metadata['display-version']}</strong>
              <span className={styles.versionMeta}>Released on {metadata['release-date']}</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>Step 1: Install Ballerina Swan Lake</h2>
              <p>
                Download the package that matches your operating system. These buttons preserve the
                old site’s artifact host and go directly to the Ballerina distribution server.
              </p>
            </div>
            <div className={styles.packageGrid}>
              {packages.map((item) => (
                <a
                  key={item.name}
                  className={styles.packageCard}
                  href={`${distServer}/downloads/${currentVersion}/${item.file}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={item.icon} alt="" className={styles.packageIcon} />
                  <span className={styles.packageName}>{item.name}</span>
                  <span className={styles.packageFile}>{item.file}</span>
                  <span className={styles.packageMeta}>{item.size}</span>
                </a>
              ))}
            </div>
            <span id="swanlake" />
          </div>
        </section>

        <section className={clsx(styles.section, styles.utilitySection)}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>Guides and next steps</h2>
              <p>
                The downloads landing page stays focused on the highest-traffic actions, while the
                detailed setup and maintenance docs live in dedicated pages.
              </p>
            </div>
            <div className={styles.utilityGrid}>
              {supportLinks.map((item) => (
                <a
                  key={item.title}
                  className={styles.utilityCard}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span>{item.external ? 'Open live page' : 'Open guide'}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.stepsGrid}>
              <div className={styles.stepCard}>
                <span className={styles.stepIndex}>Step 2</span>
                <h2>Verify the installation</h2>
                <p>
                  Run <code>bal version</code> in your terminal or shell. For more CLI coverage,
                  use the live guide until the CLI section is migrated.
                </p>
                <a href="https://ballerina.io/learn/cli-commands/" target="_blank" rel="noreferrer">
                  Open CLI commands
                </a>
              </div>
              <div className={styles.stepCard}>
                <span className={styles.stepIndex}>Step 3</span>
                <h2>Run a sample program</h2>
                <p>
                  Open a starter file in VS Code, install the Ballerina extension if prompted, and
                  run the sample to confirm the toolchain is working.
                </p>
                <a
                  href="vscode://wso2.ballerina/open-file?gist=74cea880fefcb463d26a0c46f38fce39&file=hello_world.bal"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open hello_world.bal
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
