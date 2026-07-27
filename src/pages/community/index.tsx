import type {ReactNode} from 'react';

import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import BreadcrumbTrail from '../../components/BreadcrumbTrail';
import styles from './index.module.css';

type CommunityLink = {
  title: string;
  description: string;
  href: string;
  external?: boolean;
  badge?: string;
  id?: string;
};

type SocialLink = {
  name: string;
  href: string;
  icon: string;
};

type ContributionTrack = {
  title: string;
  details: string[];
  href?: string;
  hrefLabel?: string;
  external?: boolean;
};

const spotlightLinks: CommunityLink[] = [
  {
    title: 'Newsletter',
    description:
      'Catch the latest language updates, releases, ecosystem work, and community highlights.',
    href: '/community/ballerina-newsletter/',
    badge: 'Migrated',
  },
  {
    title: 'Active proposals',
    description:
      'Review open proposals across the Ballerina GitHub repositories and track ongoing design work.',
    href: '/community/active-proposals/',
    badge: 'Migrated',
  },
  {
    title: 'Events',
    description:
      'Follow talks, workshops, and meetups where the team and community share practical Ballerina use cases.',
    href: '/community/events/',
    badge: 'Migrated',
  },
  {
    title: 'Tech talks',
    description:
      'Watch the recurring Ballerina Tech Talk series for deep dives into language features, tooling, and integration patterns.',
    href: '/community/ballerina-tech-talk/',
    badge: 'Migrated',
  },
  {
    title: 'Resources',
    description:
      'Explore community-created articles, blogs, training material, and video tutorials.',
    href: '/community/resources/',
    badge: 'Migrated',
  },
];

const socialLinks: SocialLink[] = [
  {
    name: 'Discord',
    href: 'https://discord.gg/ballerinalang',
    icon: '/images/sm-icons/Discord_logo.svg',
  },
  {
    name: 'Stack Overflow',
    href: 'https://stackoverflow.com/questions/tagged/ballerina',
    icon: '/images/sm-icons/Stack_Overflow_logo.svg',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/ballerina-platform',
    icon: '/images/sm-icons/github-black.svg',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/c/Ballerinalang?reload=9',
    icon: '/images/sm-icons/yt_logo_rgb_light.png',
  },
  {
    name: 'X',
    href: 'https://twitter.com/ballerinalang',
    icon: '/images/sm-icons/twitter-x-black.png',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/showcase/ballerinalang/',
    icon: '/images/sm-icons/LI-Logo.png',
  },
  {
    name: 'Meetup',
    href: 'https://www.meetup.com/ballerinalang-community/',
    icon: '/images/sm-icons/logo--mSwarm.svg',
  },
];

const involvementLinks: CommunityLink[] = [
  {
    title: 'Report issues',
    description:
      'Open issues in the relevant Ballerina GitHub repositories when you run into bugs or want to suggest improvements.',
    href: 'https://github.com/ballerina-platform/ballerina-lang/issues/new/choose',
    external: true,
  },
  {
    title: 'Contribute to the source code',
    description:
      'Read the contribution guide and start improving the language, tooling, and ecosystem.',
    href: 'https://github.com/ballerina-platform/ballerina-lang/blob/master/CONTRIBUTING.md',
    external: true,
  },
  {
    title: 'Publish to Ballerina Central',
    description:
      'Share reusable modules with the ecosystem by creating and publishing packages to Central.',
    href: 'https://ballerina.io/learn/publish-packages-to-ballerina-central/',
    external: true,
  },
  {
    title: 'Host a Ballerina event',
    description:
      'Want to organize a local meetup or workshop? Reach out and the team will help you get started.',
    href: 'mailto:contact@ballerina.io',
  },
];

const contributionTracks: ContributionTrack[] = [
  {
    title: 'Code contributions',
    details: ['Easy: +20 points', 'Medium: +30 points', 'Hard: +45 points'],
    href: 'https://github.com/orgs/ballerina-platform/projects/376/views/1',
    hrefLabel: 'View issues',
    external: true,
  },
  {
    title: 'No/low-code contributions',
    details: ['Blog/article: +20 points', 'Video tutorial: +40 points'],
  },
  {
    title: 'Connector contributions',
    details: ['Category 1: +60 points', 'Category 2: +80 points', 'Category 3: +100 points'],
    href: 'https://ballerina.io/contributions/connector-contributor-guide/',
    hrefLabel: 'Read the guide',
    external: false,
  },
];

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.sectionIntro}>
      {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}
      <Heading as="h2" className={styles.sectionTitle}>
        {title}
      </Heading>
      <p className={styles.sectionDescription}>{description}</p>
    </div>
  );
}

function ActionLink({
  href,
  children,
  external,
  className,
  id,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}>
      {children}
    </a>
  );
}

export default function CommunityPage() {
  return (
    <Layout
      title="Community"
      description="Join the Ballerina community and use the available channels to ask questions, find answers, share feedback, and get involved.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <BreadcrumbTrail items={[{label: 'Home', href: '/'}, {label: 'Community'}]} />
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <div className={styles.heroEyebrow}>Community</div>
                <Heading as="h1" className={styles.heroTitle}>
                  Build, learn, and contribute with the Ballerina community.
                </Heading>
                <p className={styles.heroDescription}>
                  Welcome to the Ballerina community. Use these channels to ask questions,
                  find answers, share feedback, and help shape Ballerina as a truly
                  community-owned resource.
                </p>
                <div className={styles.heroActions}>
                  <a className={styles.primaryButton} href="#join-us">
                    Join our community
                  </a>
                  <a className={styles.secondaryButton} href="#get-involved">
                    Get involved
                  </a>
                </div>
              </div>
              <div className={styles.heroMosaic} aria-hidden="true">
                <img src="/images/community/2.jpg" alt="" />
                <img src="/images/community/5.jpg" alt="" />
                <img src="/images/community/6.jpg" alt="" />
                <img src="/images/community/7.jpg" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <SectionIntro
              eyebrow="Explore"
              title="Start with the right community channel"
              description="The original community page is a directory of ways to participate. This first pass keeps that shape intact while routing the already migrated sections locally."
            />
            <div className={styles.cardGrid}>
              {spotlightLinks.map((item) => (
                <ActionLink
                  key={item.title}
                  href={item.href}
                  external={item.external}
                  className={styles.featureCard}>
                  <div className={styles.featureHeader}>
                    <Heading as="h3" className={styles.featureTitle}>
                      {item.title}
                    </Heading>
                    {item.badge ? <span className={styles.badge}>{item.badge}</span> : null}
                  </div>
                  <p className={styles.featureDescription}>{item.description}</p>
                  <span className={styles.featureLink}>
                    {item.external ? 'Open page' : 'Explore section'}
                  </span>
                </ActionLink>
              ))}
            </div>
          </div>
        </section>

        <section id="join-us" className={styles.sectionAlt}>
          <div className="container">
            <SectionIntro
              eyebrow="Join us"
              title="Meet the community where it already gathers"
              description="From quick support questions to longer discussions and talks, these are the main places where Ballerina users and contributors connect."
            />
            <div className={styles.socialGrid}>
              {socialLinks.map((item) => (
                <ActionLink
                  key={item.name}
                  href={item.href}
                  external
                  className={styles.socialCard}>
                  <div className={styles.socialLogoWrap}>
                    <img src={item.icon} alt={item.name} className={styles.socialLogo} />
                  </div>
                  <span className={styles.socialName}>{item.name}</span>
                </ActionLink>
              ))}
            </div>
          </div>
        </section>

        <section id="report-issues" className={styles.section}>
          <div className="container">
            <span id="get-involved" className={styles.anchorOffset} aria-hidden="true" />
            <SectionIntro
              eyebrow="Get involved"
              title="Help grow the language and the ecosystem"
              description="The community page also acts as an on-ramp for contributors. This section restores the key pathways, including the legacy report-issues anchor used elsewhere on the site."
            />
            <div className={styles.cardGrid}>
              {involvementLinks.map((item) => (
                <ActionLink
                  key={item.title}
                  href={item.href}
                  external={item.external}
                  className={styles.featureCard}>
                  <Heading as="h3" className={styles.featureTitle}>
                    {item.title}
                  </Heading>
                  <p className={styles.featureDescription}>{item.description}</p>
                  <span className={styles.featureLink}>Open</span>
                </ActionLink>
              ))}
            </div>
          </div>
        </section>

        <section id="contribute-and-get-rewarded" className={styles.sectionAlt}>
          <div className="container">
            <SectionIntro
              eyebrow="Contribute"
              title="Contribute and get rewarded"
              description="Whether you improve the language, publish tutorials, or build connectors, the contribution program recognizes that effort and turns it into swag credits."
            />
            <div className={styles.tracksGrid}>
              {contributionTracks.map((track) => (
                <div key={track.title} className={styles.trackCard}>
                  <Heading as="h3" className={styles.trackTitle}>
                    {track.title}
                  </Heading>
                  <ul className={styles.trackList}>
                    {track.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  {track.href && track.hrefLabel ? (
                    <ActionLink
                      href={track.href}
                      external={track.external}
                      className={styles.inlineAction}>
                      {track.hrefLabel}
                    </ActionLink>
                  ) : null}
                </div>
              ))}
            </div>
            <div className={styles.rewardBanner}>
              <div>
                <Heading as="h3" className={styles.rewardTitle}>
                  Redeem points for Ballerina swag
                </Heading>
                <p className={styles.rewardText}>
                  Redeem points to purchase exclusive Ballerina-branded items from the swag
                  store, then submit your credits through the claim form.
                </p>
                <div className={styles.rewardActions}>
                  <ActionLink
                    href="https://store.covver.io/wso2/collections/ballerina-swag-store"
                    external
                    className={styles.primaryButton}>
                    Open swag store
                  </ActionLink>
                  <ActionLink
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfMm4jUFszfAtG0ykPX0LvvkHU7Y8Y95uJiZG1xnZqGnsuKrA/viewform"
                    external
                    className={styles.secondaryButton}>
                    Claim your credits
                  </ActionLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="resources" className={styles.section}>
          <div className="container">
            <SectionIntro
              eyebrow="Resources"
              title="Learn from community-created content"
              description="The original page featured a quick visual jump into community-maintained learning material. Those destinations are preserved here while the deeper routes are migrated."
            />
            <div className={styles.resourceGrid}>
              <ActionLink
                href="https://youtube.com/playlist?list=PL7JOecNWBb0JAdYWqeGmD35MjE0KTjHXU&si=zIc_Kha48qV4aEvM"
                external
                className={styles.resourceCard}>
                <img src="/images/community/ballerina-community-tech-talks.png" alt="Tech talks" />
              </ActionLink>
              <ActionLink
                href="https://lms.wso2.com/collections/ballerina"
                external
                className={styles.resourceCard}>
                <img src="/images/community/ballerina-community-training.png" alt="Training" />
              </ActionLink>
              <ActionLink
                href="https://medium.com/ballerina-techblog"
                external
                className={styles.resourceCard}>
                <img src="/images/community/ballerina-community-medium.png" alt="Medium tech blog" />
              </ActionLink>
              <ActionLink
                href="https://blog.ballerina.io/"
                external
                className={styles.resourceCard}>
                <img src="/images/community/ballerina-community-blog.png" alt="Ballerina blog" />
              </ActionLink>
            </div>
          </div>
        </section>

        <section id="student-engagement-program" className={styles.sectionAlt}>
          <div className="container">
            <div className={styles.calloutGrid}>
              <div className={styles.calloutCard}>
                <div>
                  <div className={styles.eyebrow}>Students</div>
                  <Heading as="h2" className={styles.sectionTitle}>
                    Student engagement program
                  </Heading>
                  <p className={styles.sectionDescription}>
                    University students can build practical programming skills through
                    workshops, hackathons, open-source contributions, and other
                    hands-on opportunities.
                  </p>
                  <ActionLink
                    href="https://ballerina.io/community/student-program/"
                    external
                    className={styles.inlineAction}>
                    Learn more
                  </ActionLink>
                </div>
                <img
                  src="/images/community/ballerina-student-engagement-program-banner.png"
                  alt="Student engagement program"
                />
              </div>
              <div
                id="wso2-certified-ballerina-developer-swan-lake"
                className={styles.calloutCard}>
                <div>
                  <div className={styles.eyebrow}>Certification</div>
                  <Heading as="h2" className={styles.sectionTitle}>
                    WSO2 Certified Ballerina Developer - Swan Lake
                  </Heading>
                  <p className={styles.sectionDescription}>
                    Validate your Ballerina skills and strengthen your ability to design,
                    implement, and deploy integration applications with confidence.
                  </p>
                  <ActionLink
                    href="https://wso2.com/training/certification/certified-ballerina-developer-swan-lake/"
                    external
                    className={styles.inlineAction}>
                    Get certified
                  </ActionLink>
                </div>
                <img
                  src="/images/community/certified-ballerina-developer-swan-lake-logo.png"
                  alt="WSO2 Certified Ballerina Developer - Swan Lake"
                  className={styles.certificationLogo}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="contact-us" className={styles.section}>
          <div className="container">
            <div className={styles.contactBanner}>
              <div>
                <div className={styles.eyebrow}>Contact us</div>
                <Heading as="h2" className={styles.sectionTitle}>
                  Need help getting started?
                </Heading>
                <p className={styles.sectionDescription}>
                  If you have questions, want to get involved, or need help with your
                  first Ballerina use case, the team is happy to help.
                </p>
              </div>
              <ActionLink href="mailto:contact@ballerina.io" className={styles.primaryButton}>
                Email contact@ballerina.io
              </ActionLink>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
