import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './index.module.css';

type Sample = {
  title: string;
  slug: string;
};

type Section = {
  title: string;
  samples: Sample[];
};

type Group = {
  title: string;
  sections: Section[];
};

type Props = {
  groups: Group[];
};

export default function BbeIndex({groups}: Props) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.intro}>
        Explore and try out a series of guided Ballerina examples grouped by language and library topic.
      </p>
      {groups.map((group) => (
        <section key={group.title} className={styles.group}>
          <Heading as="h2" className={styles.groupTitle}>
            {group.title}
          </Heading>
          <div className={styles.sectionGrid}>
            {group.sections.map((section) => (
              <article key={section.title} className={styles.card}>
                <Heading as="h3" className={styles.cardTitle}>
                  {section.title}
                </Heading>
                <ul className={styles.list}>
                  {section.samples.map((sample) => (
                    <li key={sample.slug}>
                      <Link className={styles.link} to={`/learn/by-example/${sample.slug}/`}>
                        {sample.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
