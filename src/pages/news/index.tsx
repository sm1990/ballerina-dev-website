import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import BreadcrumbTrail from '@site/src/components/BreadcrumbTrail';
import articlesData from '@site/_data/articles.json';

import styles from './index.module.css';

function NewsCard({
  title,
  source,
  author,
  date,
  url,
}: {
  title: string;
  source: string;
  author?: string;
  date: string;
  url: string;
}): ReactNode {
  return (
    <a className={styles.card} href={url} target="_blank" rel="noreferrer">
      <Heading as="h2" className={styles.cardTitle}>
        {title}
      </Heading>
      <p className={styles.cardMeta}>{author ? `By ${author} in ${source}` : `In ${source}`}</p>
      <p className={styles.cardDate}>{date}</p>
      <span className={styles.cardLink}>Read article</span>
    </a>
  );
}

export default function NewsPage(): ReactNode {
  return (
    <Layout
      title="News"
      description="Industry coverage, mentions, and external articles featuring the Ballerina programming language.">
      <main className={styles.page}>
        <div className="container">
          <div className={styles.content}>
            <BreadcrumbTrail items={[{label: 'Home', href: '/'}, {label: 'News'}]} />
            <header className={styles.header}>
              <Heading as="h1" className={styles.title}>
                News
              </Heading>
              <p className={styles.description}>
                External coverage and industry mentions highlighted by the Ballerina team.
              </p>
            </header>
            <div className={styles.grid}>
              {articlesData.articles.map((article) => (
                <NewsCard key={`${article.title}-${article.date}`} {...article} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
