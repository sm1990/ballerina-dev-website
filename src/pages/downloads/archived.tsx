import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

import BreadcrumbTrail from '../../components/BreadcrumbTrail';
import releaseNotes from '../../../_data/release_notes_versions.json';
import swanLakeReleaseNotes from '../../../_data/swanlake_release_notes_versions.json';
import styles from './archived.module.css';

type ArchivedRelease = {
  version: string;
  'release-date': string;
  'linux-installer'?: string;
  'windows-installer'?: string;
  'macos-installer'?: string;
  'macos-arm-installer'?: string;
  'other-artefacts': string[];
};

const distServer = 'https://dist.ballerina.io';
const liveSite = 'https://ballerina.io';
const missingLocalLegacyReleaseNotes = new Set(['0.990.5', '0.990.7']);

const compareByReleaseDateDesc = (a: ArchivedRelease, b: ArchivedRelease) =>
  b['release-date'].localeCompare(a['release-date']);

const getLegacyReleaseNotesHref = (stream: string, version: string) =>
  missingLocalLegacyReleaseNotes.has(version)
    ? `${liveSite}/downloads/${stream}/${version}/`
    : `/downloads/${stream}/${version}/`;

const getSwanLakeReleaseNotesHref = (version: string) =>
  `/downloads/swan-lake-release-notes/${
    version.startsWith('swan-lake-') ? version : `swan-lake-${version}`
  }/`;

const isExternalHref = (href: string) => href.startsWith('http://') || href.startsWith('https://');

const archivedGroups = [
  {
    id: 'swan-lake-archived-versions',
    title: 'Swan Lake archived versions',
    releases: [...(swanLakeReleaseNotes as ArchivedRelease[])].sort(compareByReleaseDateDesc),
    releaseNotesHref: (version: string) => getSwanLakeReleaseNotesHref(version),
  },
  {
    id: '1.2.x-archived-versions',
    title: '1.2.x archived versions',
    note: (
      <>
        You can download the Visual Studio Code extension for Ballerina 1.2.x versions from the{' '}
        <a
          href="https://marketplace.visualstudio.com/items?itemName=ballerina.ballerina"
          target="_blank"
          rel="noreferrer"
        >
          VS Code marketplace
        </a>
        .
      </>
    ),
    releases: (releaseNotes as ArchivedRelease[])
      .filter((item) => item.version.startsWith('1.2.'))
      .sort(compareByReleaseDateDesc),
    releaseNotesHref: (version: string) => getLegacyReleaseNotesHref('1.2.x-release-notes', version),
  },
  {
    id: '1.1.x-archived-versions',
    title: '1.1.x archived versions',
    releases: (releaseNotes as ArchivedRelease[])
      .filter((item) => item.version.startsWith('1.1.'))
      .sort(compareByReleaseDateDesc),
    releaseNotesHref: (version: string) => getLegacyReleaseNotesHref('1.1.x-release-notes', version),
  },
  {
    id: '1.0.x-archived-versions',
    title: '1.0.x archived versions',
    releases: (releaseNotes as ArchivedRelease[])
      .filter((item) => item.version.startsWith('1.0.'))
      .sort(compareByReleaseDateDesc),
    releaseNotesHref: (version: string) => getLegacyReleaseNotesHref('1.0.x-release-notes', version),
  },
  {
    id: '0.9.x-archived-versions',
    title: '0.9.x archived versions',
    releases: (releaseNotes as ArchivedRelease[])
      .filter((item) => item.version.startsWith('0.9'))
      .sort(compareByReleaseDateDesc),
    releaseNotesHref: (version: string) => getLegacyReleaseNotesHref('0.9.x-release-notes', version),
  },
];

const tocItems = archivedGroups.map((group) => ({
  id: group.id,
  label: group.title,
}));

function installerRows(item: ArchivedRelease) {
  const rows = [
    item['linux-installer'],
    item['windows-installer'],
    item['macos-installer'],
    item['macos-arm-installer'],
    ...(item['other-artefacts'] ?? []),
  ].filter(Boolean) as string[];

  return Array.from(new Set(rows));
}

export default function ArchivedDownloadsPage() {
  return (
    <Layout
      title="Archived versions"
      description="Archived Ballerina distribution versions and installers."
    >
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <BreadcrumbTrail items={[{label: 'Home', href: '/'}, {label: 'Downloads', href: '/downloads/'}, {label: 'Archived versions'}]} />
            <h1 className={styles.title}>Archived versions</h1>
            <p className={styles.lead}>
              Browse past Ballerina distributions by release stream. The download artifacts still
              come from the original distribution host. Release notes now resolve locally wherever
              source content is available, and fall back to the live site only for a few missing
              archived versions.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className="row">
              <div className="col col--3">
                <nav className={styles.sideNav} aria-label="Archived version groups">
                  <ul className={styles.sideNavList}>
                    {tocItems.map((item) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`}>{item.label}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="col col--9">
                <div className={styles.groups}>
                  {archivedGroups.map((group) => (
                    <section key={group.id} id={group.id} className={styles.groupSection}>
                      <div className={styles.groupHeader}>
                        <h2>{group.title}</h2>
                        {group.note ? <p className={styles.groupNote}>{group.note}</p> : null}
                      </div>

                      <div className={styles.releaseStack}>
                        {group.releases.map((item) => (
                          <article
                            key={`${group.id}-${item.version}`}
                            id={item.version}
                            className={styles.releaseCard}
                          >
                            <div className={styles.releaseHeader}>
                              <h3>{item.version}</h3>
                              <span>{item['release-date']}</span>
                            </div>
                            <div className={styles.tableWrap}>
                              <table className={styles.releaseTable}>
                                <tbody>
                                  {installerRows(item).map((asset) => (
                                    <tr key={asset}>
                                      <td>{asset}</td>
                                      <td>
                                        <a
                                          href={`${distServer}/downloads/${item.version}/${asset}`}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          Download
                                        </a>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            {isExternalHref(group.releaseNotesHref(item.version)) ? (
                              <a
                                className={styles.releaseNotesLink}
                                href={group.releaseNotesHref(item.version)}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Release notes
                              </a>
                            ) : (
                              <Link
                                className={styles.releaseNotesLink}
                                to={group.releaseNotesHref(item.version)}
                              >
                                Release notes
                              </Link>
                            )}
                          </article>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
