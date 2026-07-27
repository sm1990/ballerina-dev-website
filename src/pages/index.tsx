import {useMemo, useState} from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import BallerinaInAction from '@site/src/components/BallerinaInAction';
import articlesData from '@site/_data/articles.json';
import eventsData from '@site/_data/events.json';

import styles from './index.module.css';

type Feature = {
  title: string;
  description: string;
  image: string;
  href: string;
};

type Logo = {
  name: string;
  href: string;
  src?: string;
  wide?: boolean;
  className?: string;
  width?: number;
  composite?: {
    iconSrc: string;
    text: string;
  };
};

type VideoItem = {
  title: string;
  thumbnail: string;
  href: string;
};

type EventItem = {
  date: string;
  day: string;
  time?: string;
  expire: string;
  location: string;
  eventType: string;
  eventName: string;
  presenter?: string;
  presenterDesignation?: string;
  url: string;
  buttonText: string;
};

type EventsDataset = {
  events: EventItem[];
};

const heroPoints = [
  'Open source, cloud-native programming language optimized for integration',
  'Batteries included: Rich ecosystem of network protocols, data formats, and connectors',
  'Edit or view source textually or graphically as sequence diagrams and flowcharts',
  'Built-in, efficient concurrency with sequence diagrams and safety primitives',
];

const whyBallerina: Feature[] = [
  {
    title: 'Cloud native',
    description:
      'Network primitives in the language make it simpler to write services and run them in the cloud.',
    image: '/images/home-page/icons/cloud-native.svg',
    href: 'https://ballerina.io/why-ballerina/cloud-native/',
  },
  {
    title: 'Flexibly typed',
    description:
      'Structural types with support for openness are used both for static typing and describing service interfaces.',
    image: '/images/home-page/icons/flexible-typing.svg',
    href: 'https://ballerina.io/why-ballerina/flexibly-typed/',
  },
  {
    title: 'Data oriented',
    description:
      'Type-safe, declarative processing of JSON, XML, and tabular data with language-integrated queries.',
    image: '/images/home-page/icons/data-transformation.svg',
    href: 'https://ballerina.io/why-ballerina/data-oriented/',
  },
  {
    title: 'Graphical',
    description:
      'Programs have both a textual syntax and an equivalent graphical form based on sequence diagrams.',
    image: '/images/home-page/icons/graphical.svg',
    href: 'https://ballerina.io/why-ballerina/graphical/',
  },
  {
    title: 'Concurrent',
    description:
      'Easy and efficient concurrency with language-managed workers instead of complicated async orchestration.',
    image: '/images/home-page/icons/concurrent.svg',
    href: 'https://ballerina.io/why-ballerina/concurrent/',
  },
  {
    title: 'Reliable, maintainable',
    description:
      'Explicit error handling, static types, and concurrency safety make programs easier to trust and evolve.',
    image: '/images/home-page/icons/reliable-maintainable.svg',
    href: 'https://ballerina.io/why-ballerina/reliable-maintainable/',
  },
];

const userLogos: Logo[] = [
  {
    name: 'WSO2',
    src: '/images/home-page/user-logos/wso2.svg',
    href: '/case-studies/wso2',
    wide: true,
    width: 280,
  },
  {
    name: 'Ballerina Central',
    src: '/images/home-page/user-logos/ballerina-central.svg',
    href: '/case-studies/ballerina-central',
    wide: true,
    className: 'logoBallerinaCentral',
    width: 340,
  },
  {
    name: 'Developer Platform',
    src: '/images/home-page/user-logos/choreo.svg',
    href: '/case-studies/wso2',
    wide: true,
    className: 'logoDeveloperPlatform',
    width: 270,
  },
  {
    name: 'Fat Tuesday',
    src: '/images/home-page/user-logos/fat-tuesday.svg',
    href: '/case-studies/fat-tuesday',
    width: 150,
  },
  {
    name: 'MOSIP',
    src: '/images/home-page/user-logos/mosip.png',
    href: '/case-studies/mosip',
    wide: true,
    width: 280,
  },
  {
    name: 'QHAna',
    src: '/images/home-page/user-logos/qhana.png',
    href: '/case-studies/qhana',
    width: 230,
  },
  {
    name: 'Redcross Elixir',
    src: '/images/home-page/user-logos/redcross-elixir.png',
    href: '/case-studies/redcross-elixir',
    wide: true,
    width: 280,
  },
  {
    name: 'RAAPID',
    src: '/images/home-page/user-logos/raapid-ai.png',
    href: '/case-studies/raapid-ai',
    wide: true,
    width: 320,
  },
  {
    name: 'Tech Venturas',
    src: '/images/home-page/user-logos/tech-venturas.png',
    href: 'https://techventuras.com/',
    wide: true,
    className: 'logoTechVenturas',
    width: 300,
  },
  {
    name: 'Visualize HR',
    src: '/images/home-page/user-logos/visualize-hr.png',
    href: 'https://wso2.com/library/conference/2024/05/less-is-more-utilizing-ballerina-to-architect-a-cloud-data-platform/',
    width: 230,
  },
  {
    name: 'Avinya Foundation',
    src: '/images/home-page/user-logos/avinya-foundation.webp',
    href: '/case-studies/avinya-foundation',
    wide: true,
    width: 280,
  },
];

const logoRows: Logo[][] = [
  [userLogos[0], userLogos[6], userLogos[3], userLogos[4], userLogos[5]],
  [userLogos[1], userLogos[7], userLogos[2]],
  [userLogos[8], userLogos[9], userLogos[10]],
];

const newsItems = articlesData.articles.map((article) => ({
  title: article.title,
  source: article.source,
  author: article.author || undefined,
  date: article.date,
  href: article.url,
}));

const newsSlides = (() => {
  const slides: typeof newsItems[] = [];
  for (let i = 0; i < newsItems.length; i += 3) {
    slides.push(newsItems.slice(i, i + 3));
  }
  return slides;
})();

const videos: VideoItem[] = [
  {
    title: 'Why should you start programming with Ballerina?',
    thumbnail: '/images/why-should-start-programming-with-ballerina-video-thumbnail-v2.png',
    href: 'https://www.youtube.com/watch?v=NYrKeElltg8',
  },
  {
    title: 'Tutorial: Creating a service in Ballerina',
    thumbnail: '/images/tutorial-creating-a-service-in-ballerinathumbnail-v2.png',
    href: 'https://www.youtube.com/watch?v=NxyIKoHl3Dw',
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <Heading as="h2" className={styles.sectionTitle}>
        {title}
      </Heading>
      {description ? <p className={styles.sectionDescription}>{description}</p> : null}
    </div>
  );
}

function HeroSection() {
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>The Ballerina programming language</p>
          <Heading as="h1" className={styles.heroTitle}>
            Flexible, Powerful, Beautiful
            <br />
            Integrations as Code with Ballerina
          </Heading>
          <ul className={styles.heroList}>
            {heroPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className={styles.heroActions}>
            <a
              className="button button--secondary button--lg"
              href="/downloads/">
              Download
            </a>
            <a
              className={clsx('button button--lg', styles.heroSecondaryButton)}
              href="/learn/by-example/">
              Examples
            </a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroVisualFrame}>
            <img
              src="/images/home-page/from-code-to-cloud.png"
              alt="Ballerina from code to cloud"
            />
          </div>
          <div className={styles.heroBadge}>
            <span>Built for integration</span>
            <strong>Code, visualize, connect, deploy</strong>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const [newsSlideIndex, setNewsSlideIndex] = useState(0);
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return ((eventsData as EventsDataset).events ?? [])
      .filter((event) => {
        const eventTime = Date.parse(event.expire ?? '');
        return Number.isFinite(eventTime) && eventTime >= now.getTime();
      })
      .sort((left, right) => Date.parse(left.expire) - Date.parse(right.expire))
      .slice(0, 2);
  }, []);
  const currentNewsSlide = useMemo(
    () => newsSlides[newsSlideIndex] ?? [],
    [newsSlideIndex],
  );

  const showPreviousNewsSlide = () => {
    setNewsSlideIndex((currentIndex) =>
      currentIndex === 0 ? newsSlides.length - 1 : currentIndex - 1,
    );
  };

  const showNextNewsSlide = () => {
    setNewsSlideIndex((currentIndex) =>
      currentIndex === newsSlides.length - 1 ? 0 : currentIndex + 1,
    );
  };

  return (
    <Layout
      title={siteConfig.title}
      description="Open source, cloud-native programming language optimized for integration.">
      <HeroSection />
      <main className={styles.homepage}>
        <section className={styles.section}>
          <div className={clsx('container', styles.integrationGrid)}>
            <div className={styles.integrationCopy}>
              <SectionHeading
                title="Ballerina fills the Integration Gap"
                description="Integration problems have traditionally been solved either with restricted drag-and-drop tools or with general-purpose languages that do not understand the structure of integrations."
              />
              <p className={styles.integrationLead}>
                Ballerina is the programming language designed specifically for
                integration work.
              </p>
            </div>
            <div className={styles.diagramCard}>
              <img src="/images/integration_diagram.png" alt="Position Ballerina" />
            </div>
          </div>
        </section>

        <BallerinaInAction />

        <section className={clsx(styles.section, styles.altSection)}>
          <div className="container">
            <SectionHeading
              title="Why Ballerina"
              description="The language combines strong typing, network-aware syntax, graphical views, and safe concurrency into one developer-friendly toolchain."
            />
            <div className={styles.featureGrid}>
              {whyBallerina.map((feature) => (
                <article key={feature.title} className={styles.featureCard}>
                  <img src={feature.image} alt="" className={styles.featureIcon} />
                  <Heading as="h3" className={styles.featureTitle}>
                    {feature.title}
                  </Heading>
                  <p className={styles.featureDescription}>{feature.description}</p>
                  <a
                    className={styles.featureLink}
                    href={feature.href}
                    target="_blank"
                    rel="noreferrer">
                    More info
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <SectionHeading
              title="Who uses Ballerina?"
              description="Teams use Ballerina to power APIs, cloud integrations, data pipelines, and developer platforms."
            />
            <div className={styles.logoRows}>
              {logoRows.map((row, rowIndex) => (
                <div
                  key={`logo-row-${rowIndex}`}
                  className={clsx(
                    styles.logoRow,
                    rowIndex === 0 && styles.logoRowPrimary,
                    rowIndex > 0 && styles.logoRowCompact,
                  )}>
                  {row.map((logo) => (
                    <a
                      key={logo.name}
                      className={clsx(
                        styles.logoCard,
                        logo.wide && styles.logoCardWide,
                        logo.className && styles[logo.className],
                      )}
                      href={logo.href}
                      target={logo.href.startsWith('http') ? '_blank' : undefined}
                      rel={logo.href.startsWith('http') ? 'noreferrer' : undefined}>
                      {logo.composite ? (
                        <span className={styles.logoComposite}>
                          <img src={logo.composite.iconSrc} alt="" aria-hidden="true" />
                          <span className={styles.logoCompositeText}>{logo.composite.text}</span>
                        </span>
                      ) : (
                        <img
                          src={logo.src}
                          alt={logo.name}
                          style={logo.width ? {width: `${logo.width}px`} : undefined}
                        />
                      )}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.altSection)}>
          <div className="container">
            <SectionHeading
              title="Ballerina in the news"
              description="A sample of the coverage and industry mentions highlighted on the current ballerina.io homepage."
            />
            <div className={styles.newsCarousel}>
              <div className={styles.newsGrid}>
                {currentNewsSlide.map((item) => (
                  <a
                    key={item.title}
                    className={styles.newsCard}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer">
                    <Heading as="h3" className={styles.newsTitle}>
                      {item.title}
                    </Heading>
                    <p className={styles.newsMeta}>
                      {item.author ? `By ${item.author} in ${item.source}` : `In ${item.source}`}
                    </p>
                    <p className={styles.newsDate}>{item.date}</p>
                  </a>
                ))}
              </div>
              <div className={styles.newsCarouselFooter}>
                <div className={styles.newsCarouselDots}>
                  {newsSlides.map((_, index) => (
                    <button
                      key={`news-slide-${index}`}
                      type="button"
                      className={clsx(
                        styles.newsCarouselDot,
                        index === newsSlideIndex && styles.newsCarouselDotActive,
                      )}
                      onClick={() => setNewsSlideIndex(index)}
                      aria-label={`Go to news slide ${index + 1}`}
                    />
                  ))}
                </div>
                <div className={styles.newsCarouselControls}>
                  <button
                    type="button"
                    className={styles.newsCarouselButton}
                    onClick={showPreviousNewsSlide}
                    aria-label="Show previous news articles">
                    <span aria-hidden="true">‹</span>
                  </button>
                  <button
                    type="button"
                    className={styles.newsCarouselButton}
                    onClick={showNextNewsSlide}
                    aria-label="Show next news articles">
                    <span aria-hidden="true">›</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <SectionHeading
              title="Featured videos"
              description="Short, prominent videos that mirror the kind of educational content shown on ballerina.io."
            />
            <div className={styles.videoGrid}>
              {videos.map((video) => (
                <a
                  key={video.title}
                  className={styles.videoCard}
                  href={video.href}
                  target="_blank"
                  rel="noreferrer">
                  <img src={video.thumbnail} alt={video.title} className={styles.videoThumbnail} />
                  <div className={styles.videoBody}>
                    <Heading as="h3" className={styles.videoTitle}>
                      {video.title}
                    </Heading>
                    <span className={styles.videoLink}>Watch on YouTube</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {upcomingEvents.length > 0 ? (
          <section className={clsx(styles.section, styles.altSection)}>
            <div className="container">
              <SectionHeading
                title="Upcoming Events"
                description="A quick look at near-term community and ecosystem events highlighted for Ballerina developers."
              />
              <div className={styles.eventsList}>
                {upcomingEvents.map((event) => (
                  <article key={`${event.eventName}-${event.date}`} className={styles.eventRow}>
                    <div className={styles.eventDatePanel}>
                      <div className={styles.eventDatePrimary}>{event.date}</div>
                      <div className={styles.eventDateSecondary}>{event.day}</div>
                      <div className={styles.eventLocation}>{event.time ?? event.location}</div>
                    </div>
                    <div className={styles.eventContentPanel}>
                      <a
                        className={styles.eventType}
                        href={event.url}
                        target="_blank"
                        rel="noreferrer">
                        {event.eventType}
                      </a>
                      <Heading as="h3" className={styles.eventTitle}>
                        {event.eventName}
                      </Heading>
                      {event.presenter ? (
                        <p className={styles.eventPresenter}>
                          <span className={styles.eventPresenterName}>{event.presenter}</span>
                          {event.presenterDesignation
                            ? `, ${event.presenterDesignation}`
                            : ''}
                        </p>
                      ) : null}
                    </div>
                    <div className={styles.eventActionPanel}>
                      <a
                        className={styles.eventActionButton}
                        href={event.url}
                        target="_blank"
                        rel="noreferrer">
                        {event.buttonText}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </Layout>
  );
}
