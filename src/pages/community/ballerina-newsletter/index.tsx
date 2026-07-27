import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import BreadcrumbTrail from '../../../components/BreadcrumbTrail';
import NewsletterSubscription from '../../../components/NewsletterSubscription';
import newsletterIndexData from '../../../generated/newsletterIndexData';
import styles from './index.module.css';

const [currentIssue, ...pastIssues] = newsletterIndexData;

function NewsletterList({
  title,
  issues,
}: {
  title: string;
  issues: typeof newsletterIndexData;
}) {
  if (issues.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <Heading as="h2" className={styles.sectionTitle}>
        {title}
      </Heading>
      <div className={styles.list}>
        {issues.map((issue) => (
          <a key={issue.slug} className={styles.issueCard} href={`${issue.href}/`}>
            <p className={styles.issueMeta}>{issue.issue}</p>
            <Heading as="h3" className={styles.issueTitle}>
              {issue.title}
            </Heading>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function BallerinaNewsletterPage() {
  return (
    <Layout
      title="Ballerina newsletter"
      description="Periodic newsletter on Ballerina with hand-picked content and regular updates on the language.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <BreadcrumbTrail items={[{label: 'Home', href: '/'}, {label: 'Ballerina newsletter'}]} />
            <div className={styles.heroGrid}>
              <div>
                <Heading as="h1" className={styles.title}>
                  Ballerina newsletter
                </Heading>
                <p className={styles.description}>
                  This is a periodic newsletter on Ballerina with hand-picked content and
                  regular updates on the language.
                </p>
              </div>
              <NewsletterSubscription />
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <div className="container">
            <NewsletterList title="Current issue" issues={currentIssue ? [currentIssue] : []} />
            <NewsletterList title="Past issues" issues={pastIssues} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
