import {useMemo, useState} from 'react';

import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import BreadcrumbTrail from '../../components/BreadcrumbTrail';
import eventsData from '../../../_data/events.json';
import styles from './events.module.css';

type Presenter = {
  name: string;
  twitter?: string;
  designation?: string;
};

type EventItem = {
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
  otherInfo?: string;
  videoURL?: string;
  buttonText: string;
  presenters?: Presenter[];
};

type EventTab = 'upcoming' | 'past';

const allEvents = (eventsData.events as EventItem[]).slice();

function parseEventTime(item: EventItem): number {
  return Date.parse(item.expire);
}

function getPastWeekday(item: EventItem): string {
  const eventDate = new Date(item.expire);
  eventDate.setDate(eventDate.getDate() - 1);
  return eventDate.toLocaleString('default', {weekday: 'long'});
}

function renderPresenterInfo(item: EventItem) {
  if (item.presenters && item.presenters.length > 0) {
    return item.presenters.map((presenter, index) => (
      <span key={`${presenter.name}-${index}`}>
        {presenter.twitter ? (
          <a href={presenter.twitter} target="_blank" rel="noreferrer">
            {presenter.name}
          </a>
        ) : (
          presenter.name
        )}
        {presenter.designation ? ` - ${presenter.designation}` : ''}
        {index + 1 < item.presenters.length ? ', ' : ''}
      </span>
    ));
  }

  if (item.presenter && item.presenter !== '') {
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

  return item.otherInfo ?? null;
}

function EventCard({item, past = false}: {item: EventItem; past?: boolean}) {
  const secondaryDate = past
    ? getPastWeekday(item)
    : item.day && item.time
      ? `${item.day}, ${item.time}`
      : item.day || '';
  const actionHref = past && item.videoURL ? item.videoURL : item.url;

  return (
    <article className={styles.eventCard}>
      <div className={styles.datePanel}>
        <div className={styles.datePrimary}>{item.date}</div>
        {secondaryDate ? <div className={styles.dateSecondary}>{secondaryDate}</div> : null}
        <div className={styles.location}>{item.location}</div>
      </div>
      <div className={styles.contentPanel}>
        <a className={styles.eventType} href={item.url} target="_blank" rel="noreferrer">
          {item.eventType}
        </a>
        <Heading as="h2" className={styles.eventTitle}>
          {item.eventName}
        </Heading>
        <p className={styles.presenterLine}>{renderPresenterInfo(item)}</p>
      </div>
      <div className={styles.actionPanel}>
        <a className={styles.actionButton} href={actionHref} target="_blank" rel="noreferrer">
          {item.buttonText}
        </a>
      </div>
    </article>
  );
}

export default function CommunityEventsPage() {
  const now = Date.now();
  const upcomingEvents = useMemo(
    () => allEvents.filter((item) => now < parseEventTime(item)).sort((a, b) => parseEventTime(a) - parseEventTime(b)),
    [now],
  );
  const pastEvents = useMemo(
    () => allEvents.filter((item) => now > parseEventTime(item)).sort((a, b) => parseEventTime(b) - parseEventTime(a)),
    [now],
  );
  const [activeTab, setActiveTab] = useState<EventTab>(upcomingEvents.length > 0 ? 'upcoming' : 'past');

  return (
    <Layout
      title="Events"
      description="Ballerina offers a variety of events that can help you learn more and connect with experts.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <BreadcrumbTrail
              items={[
                {label: 'Home', href: '/'},
                {label: 'Community', href: '/community/'},
                {label: 'Events'},
              ]}
            />
            <div className={styles.heroContent}>
              <div className={styles.eyebrow}>Community</div>
              <Heading as="h1" className={styles.title}>
                Events
              </Heading>
              <p className={styles.description}>
                Want to connect with other Ballerina users or language experts? We host and
                participate in talks, meetups, workshops, and conferences where the team
                shares practical Ballerina features, updates, and real-world integration use
                cases.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className="container">
            <div className={styles.tabBar} role="tablist" aria-label="Event timeline">
              {upcomingEvents.length > 0 ? (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'upcoming'}
                  className={`${styles.tabButton} ${activeTab === 'upcoming' ? styles.tabButtonActive : ''}`}
                  onClick={() => setActiveTab('upcoming')}>
                  Upcoming
                </button>
              ) : null}
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'past'}
                className={`${styles.tabButton} ${activeTab === 'past' ? styles.tabButtonActive : ''}`}
                onClick={() => setActiveTab('past')}>
                Past
              </button>
            </div>

            {activeTab === 'upcoming' ? (
              <div className={styles.list}>
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((item) => (
                    <EventCard key={`${item.eventName}-${item.expire}`} item={item} />
                  ))
                ) : (
                  <p className={styles.emptyState}>No upcoming events for this month.</p>
                )}
              </div>
            ) : (
              <div className={styles.list}>
                {pastEvents.map((item) => (
                  <EventCard key={`${item.eventName}-${item.expire}`} item={item} past />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
