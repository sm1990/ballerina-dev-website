import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import BreadcrumbTrail from '../../components/BreadcrumbTrail';
import eventsData from '../../../_data/events.json';
import styles from './ballerina-tech-talk.module.css';

type TechTalkEvent = {
  date: string;
  day?: string;
  time?: string;
  expire: string;
  location: string;
  url: string;
  eventType: string;
  eventName: string;
  presenterTwitter?: string;
  presenter?: string;
  presenterDesignation?: string;
  videoURL?: string;
  buttonText?: string;
};

const suggestionFormUrl = 'https://resources.wso2.com/l/142131/2022-01-05/b3x767';

const techTalks = (eventsData.events as TechTalkEvent[])
  .filter((item) => item.eventType === 'Ballerina Tech Talk')
  .sort((a, b) => Date.parse(b.expire) - Date.parse(a.expire));

function formatSecondaryLine(item: TechTalkEvent) {
  if (item.day && item.time) {
    return `${item.day}, ${item.time}`;
  }

  if (item.day) {
    return item.day;
  }

  return '';
}

function presenterLabel(item: TechTalkEvent) {
  if (!item.presenter) {
    return null;
  }

  return (
    <>
      {item.presenterTwitter ? (
        <a href={item.presenterTwitter} target="_blank" rel="noreferrer">
          {item.presenter}
        </a>
      ) : (
        item.presenter
      )}
      {item.presenterDesignation ? `, ${item.presenterDesignation}` : ''}
    </>
  );
}

function TechTalkCard({item}: {item: TechTalkEvent}) {
  const watchUrl = item.videoURL || item.url;

  return (
    <article className={styles.talkCard}>
      <div className={styles.datePanel}>
        <div className={styles.datePrimary}>{item.date}</div>
        {formatSecondaryLine(item) ? (
          <div className={styles.dateSecondary}>{formatSecondaryLine(item)}</div>
        ) : null}
        <div className={styles.location}>{item.location}</div>
      </div>
      <div className={styles.contentPanel}>
        <div className={styles.kicker}>Monthly Tech Talk</div>
        <Heading as="h2" className={styles.talkTitle}>
          {item.eventName}
        </Heading>
        <p className={styles.presenterLine}>{presenterLabel(item)}</p>
      </div>
      <div className={styles.actionsPanel}>
        {watchUrl ? (
          <a className={styles.primaryButton} href={watchUrl} target="_blank" rel="noreferrer">
            {item.buttonText || 'Watch Tech Talk'}
          </a>
        ) : null}
        {item.url && item.videoURL && item.url !== item.videoURL ? (
          <a className={styles.secondaryButton} href={item.url} target="_blank" rel="noreferrer">
            Event page
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function CommunityTechTalkPage() {
  return (
    <Layout
      title="Ballerina Tech Talk"
      description="Join the regular Ballerina Tech Talk series to explore technical topics, upcoming features, and practical use cases with the team.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <BreadcrumbTrail
              items={[
                {label: 'Home', href: '/'},
                {label: 'Community', href: '/community/'},
                {label: 'Ballerina tech talk'},
              ]}
            />
            <div className={styles.heroContent}>
              <div className={styles.eyebrow}>Community</div>
              <Heading as="h1" className={styles.title}>
                Ballerina Tech Talk
              </Heading>
              <p className={styles.description}>
                Meet other Ballerina users and language specialists in our recurring Tech Talk
                series. These sessions explore technical topics, demonstrate practical
                Ballerina use cases, preview upcoming features, and leave space for live
                questions.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href={suggestionFormUrl} target="_blank" rel="noreferrer">
                  Suggest a topic
                </a>
                <a className={styles.secondaryButton} href="#past-tech-talks">
                  Browse past talks
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="past-tech-talks">
          <div className="container">
            <div className={styles.sectionIntro}>
              <div className={styles.sectionEyebrow}>Archive</div>
              <Heading as="h2" className={styles.sectionTitle}>
                Past Tech Talks
              </Heading>
              <p className={styles.sectionDescription}>
                Watch previous sessions from the community tech-talk series and catch up on
                Ballerina language features, tooling, APIs, persistence, AI support, and
                integration patterns.
              </p>
            </div>
            <div className={styles.talkList}>
              {techTalks.map((item) => (
                <TechTalkCard key={`${item.eventName}-${item.expire}`} item={item} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
