import React, {useCallback} from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './index.module.css';

type ChallengeTable = {
  title: string;
  rows: Array<{label: string; credits: string}>;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

type SupportCard = {
  title: string;
  body: string;
  href: string;
  label: string;
  tone: 'stack' | 'discord';
};

type RewardCard = {
  image: string;
  title: string;
};

type YearConfig = {
  year: '2025' | '2024' | '2023';
  title: string;
  description: string;
  socialImage: string;
  bodyClass: string;
  introClass: string;
  sectionClass: string;
  hero: React.ReactNode;
  challengeHeading: string;
  challengeIntro?: string;
  challengeTables?: ChallengeTable[];
  challengeCards?: React.ReactNode;
  supportCards?: SupportCard[];
  rewardsHeading: string;
  rewardsBody?: React.ReactNode;
  rewardCards?: RewardCard[];
  rewardGallery?: React.ReactNode;
  rulesHeading: string;
  rulesBody: React.ReactNode;
};

function AnchorHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const copyLink = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const url = new URL(window.location.href);
    url.hash = id;
    window.location.hash = id;
    navigator.clipboard?.writeText(url.toString()).catch(() => {});
    document.getElementById(id)?.scrollIntoView({behavior: 'smooth', block: 'start'});
  }, [id]);

  return (
    <h2 id={id} className={styles.anchorHeading}>
      {children}
      <button type="button" className={styles.anchorButton} onClick={copyLink} aria-label={`Copy link to ${id}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
          <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
        </svg>
      </button>
    </h2>
  );
}

function ChallengeTableCard({card, dark}: {card: ChallengeTable; dark?: boolean}) {
  return (
    <div className={clsx(styles.challengeCard, dark && styles.challengeCardDark)}>
      <div>
        <h3>{card.title}</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Type</th>
              <th className={styles.centered}>Credits</th>
            </tr>
          </thead>
          <tbody>
            {card.rows.map((row) => (
              <tr key={`${card.title}-${row.label}`}>
                <td>{row.label}</td>
                <td className={styles.centered}>{row.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.cardActions}>
        {card.primaryHref && card.primaryLabel ? (
          <a href={card.primaryHref} target="_blank" rel="noreferrer" className={styles.actionLink}>
            {card.primaryLabel}
          </a>
        ) : null}
        {card.secondaryHref && card.secondaryLabel ? (
          <a href={card.secondaryHref} target="_blank" rel="noreferrer" className={styles.actionLink}>
            {card.secondaryLabel}
          </a>
        ) : null}
      </div>
    </div>
  );
}

function SupportBlock({card, dark}: {card: SupportCard; dark?: boolean}) {
  return (
    <div
      className={clsx(
        styles.supportCard,
        card.tone === 'stack' ? styles.stackCard : styles.discordCard,
        dark && styles.supportCardDark,
      )}>
      <h3>{card.title}</h3>
      <p>{card.body}</p>
      <a href={card.href} target="_blank" rel="noreferrer" className={styles.supportLink}>
        {card.label}
      </a>
    </div>
  );
}

function renderYear(config: YearConfig) {
  const dark = config.year === '2025';
  return (
    <div className={clsx(styles.pageShell, styles[config.bodyClass])}>
      <section className={clsx(styles.heroSection, styles[config.introClass])}>
        <div className={styles.container}>{config.hero}</div>
      </section>

      <section className={clsx(styles.contentSection, styles[config.sectionClass])}>
        <div className={clsx(styles.container, dark && styles.glassCard)}>
          <AnchorHeading id="how-to-contribute">{config.challengeHeading}</AnchorHeading>
          {config.challengeIntro ? <p className={styles.sectionLead}>{config.challengeIntro}</p> : null}
          {config.challengeTables ? (
            <div className={styles.challengeGrid}>
              {config.challengeTables.map((card) => (
                <ChallengeTableCard key={card.title} card={card} dark={dark} />
              ))}
              {config.supportCards?.length ? (
                <div className={styles.supportColumn}>
                  {config.supportCards.map((card) => (
                    <SupportBlock key={card.title} card={card} dark={dark} />
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
          {config.challengeCards}
        </div>
      </section>

      <section className={clsx(styles.contentSection, styles[config.sectionClass])}>
        <div className={clsx(styles.container, dark && styles.glassCard)}>
          <AnchorHeading id={config.year === '2025' ? 'what-do-i-get' : 'rewards'}>{config.rewardsHeading}</AnchorHeading>
          {config.rewardsBody}
          {config.rewardCards?.length ? (
            <div className={styles.rewardGrid}>
              {config.rewardCards.map((card) => (
                <article key={card.title} className={clsx(styles.rewardCard, dark && styles.rewardCardDark)}>
                  <img src={card.image} alt="" />
                  <p>{card.title}</p>
                </article>
              ))}
            </div>
          ) : null}
          {config.rewardGallery}
        </div>
      </section>

      <section className={clsx(styles.contentSection, styles[config.sectionClass])}>
        <div className={clsx(styles.container, dark && styles.glassCard)}>
          <AnchorHeading id={config.year === '2025' ? 'what-are-the-rules' : 'rules'}>{config.rulesHeading}</AnchorHeading>
          <div className={styles.rulesContent}>{config.rulesBody}</div>
        </div>
      </section>
    </div>
  );
}

const swagItems = ['Bag', 'Bottles', 'Earbuds', 'Hat', 'Hoodie', 'Long-M', 'Shirt', 'Tote', 'Tumbler'];

const years: Record<'2025' | '2024' | '2023', YearConfig> = {
  '2025': {
    year: '2025',
    title: 'Ballerina - Hacktoberfest 2025 - The Ballerina programming language',
    description: 'Ballerina participates in Hacktoberfest 2025',
    socialImage: '/images/hacktoberfest/hack-2025-sm-banner.png',
    bodyClass: 'hack2025',
    introClass: 'hero2025',
    sectionClass: 'section2025',
    hero: (
      <>
        <div className={styles.logoRow2025}>
          <div className={styles.heroLogoBlock}>
            <a href="https://hacktoberfest.com" target="_blank" rel="noreferrer">
              <img src="/images/hacktoberfest/hacktoberfest-2025.svg" alt="Hacktoberfest" className={styles.hacktoberfestLogo2025} />
            </a>
          </div>
          <div className={styles.heroDividerBlock}>
            <img src="/img/body-bg1000.svg" alt="" className={styles.heroDivider} />
          </div>
          <div className={styles.heroLogoBlock}>
            <img src="/img/branding/ballerina_logo_white_m__svg.svg" alt="Ballerina" className={styles.ballerinaLogo2025} />
          </div>
        </div>
        <div className={styles.heroCopy2025}>
          <h1>Hacktoberfest 2025</h1>
          <p>
            We&apos;re thrilled to have you on board for{' '}
            <a href="https://hacktoberfest.com" target="_blank" rel="noreferrer">
              Hacktoberfest
            </a>{' '}
            and have some fantastic opportunities lined up for you. See the many ways you can support the open source
            community and contribute to Ballerina.
          </p>
        </div>
      </>
    ),
    challengeHeading: 'How to contribute?',
    challengeIntro:
      "We have organized several categories of open issues designed for everyone, from first-time contributors to seasoned developers. Whether you're just starting out or looking to take on more advanced challenges, there's something for you. There's no limit — you can contribute as much code as you want!",
    challengeTables: [
      {
        title: 'Code contributions',
        rows: [
          {label: 'Easy', credits: '+20'},
          {label: 'Medium', credits: '+30'},
          {label: 'Hard', credits: '+45'},
        ],
        primaryHref: 'https://github.com/orgs/ballerina-platform/projects/376/views/8',
        primaryLabel: 'View issues',
      },
      {
        title: 'No/Low Code contributions',
        rows: [
          {label: 'Blog/article', credits: '+20'},
          {label: 'Video tutorial', credits: '+40'},
        ],
      },
    ],
    supportCards: [
      {
        title: 'Stack Overflow',
        body: 'Got a technical question? Get expert help',
        href: 'https://stackoverflow.com/questions/tagged/ballerina',
        label: 'Ask on Stack Overflow',
        tone: 'stack',
      },
      {
        title: 'Discord',
        body: 'Connect, collaborate, and never miss an update',
        href: 'https://discord.com/channels/957996897782616114/1158350755967799336',
        label: 'Join the Ballerina Server',
        tone: 'discord',
      },
    ],
    rewardsHeading: 'What do I get?',
    rewardsBody: (
      <p className={styles.sectionLead}>
        The contributors who make the most significant contributions to Ballerina during Hacktoberfest will be rewarded
        with the following prizes:
      </p>
    ),
    rewardCards: [
      {
        title: 'Amazon vouchers equivalent to the credits you earn. Each credit is equal to US$1.',
        image: '/images/Graphics_amazon-voucher.svg',
      },
      {
        title: 'A goodie pack with exclusive Ballerina-branded swag.',
        image: '/images/Graphics_goodie-pack.svg',
      },
      {
        title: 'Free vouchers for WSO2 Practitioner and Developer certifications.',
        image: '/images/Graphics_certification-vouchers.svg',
      },
      {
        title: 'US$1,000 worth of credits for WSO2 cloud products — Choreo, Asgardeo, Devant, and Bijira.',
        image: '/images/Graphics_wso2-credits.svg',
      },
    ],
    rulesHeading: 'What are the rules?',
    rulesBody: (
      <div className={styles.ruleCardGrid}>
        <article className={clsx(styles.ruleCard, styles.ruleMist)}>
          <h3>{'</>'} For Code contributions</h3>
          <ul>
            <li>
              <b>Explore and pick issues:</b> Refer to the Hacktoberfest{' '}
              <a href="https://github.com/orgs/ballerina-platform/projects/376" target="_blank" rel="noreferrer">
                project board
              </a>{' '}
              and select an issue to work on.
            </li>
            <li>
              <b>Reserve your issue:</b> Once you start working on an issue, leave a comment stating that you&apos;re
              working on it to reserve it for yourself.
            </li>
            <li>
              <b>Submit your work:</b> When your work is ready, submit a pull request (PR). Address any review comments
              if needed and get your PR merged.
            </li>
            <li>
              <b>Submit the form:</b> After your PR is merged, fill out the{' '}
              <a href="https://forms.gle/rs5kBkk25ikhgHBg6" target="_blank" rel="noreferrer">
                form
              </a>{' '}
              with the PR details and other relevant information.
            </li>
            <li>
              <b>Bug reporting credits:</b> Earn 5 extra credits for reporting valid bugs, subject to the panel&apos;s
              review and approval.
            </li>
          </ul>
        </article>
        <article className={clsx(styles.ruleCard, styles.ruleInk)}>
          <h3>📝 For Low-code/No-code contributions</h3>
          <ul>
            <li>
              <b>Create content:</b> We accept any type of written or video content, such as tutorials, comparisons,
              introductory articles, and more.
            </li>
            <li>
              <b>Share your work:</b> Publish your content and submit the URLs via the{' '}
              <a href="https://forms.gle/rs5kBkk25ikhgHBg6" target="_blank" rel="noreferrer">
                form
              </a>.
            </li>
          </ul>
        </article>
        <article className={clsx(styles.ruleCard, styles.ruleTeal, styles.ruleCardWide)}>
          <h3>ℹ️ Important details</h3>
          <ul>
            <li>
              <b>Submission deadline:</b> The deadline to submit the{' '}
              <a href="https://forms.gle/rs5kBkk25ikhgHBg6" target="_blank" rel="noreferrer">
                form
              </a>{' '}
              is October 31, 2025, at 11:59 PM PST.
            </li>
            <li>
              <b>Ask questions on Stack Overflow:</b> Need any technical help? Raise all your questions in{' '}
              <a href="https://stackoverflow.com/questions/tagged/ballerina" target="_blank" rel="noreferrer">
                Stack Overflow
              </a>.
            </li>
            <li>
              <b>Stay updated on Discord:</b> All announcements will be held on Discord. Join our{' '}
              <a href="https://discord.com/channels/957996897782616114/1158350755967799336" target="_blank" rel="noreferrer">
                Discord
              </a>{' '}
              to stay updated on important information.
            </li>
            <li>
              <b>Contributor recognition:</b> Extra credits may be granted for exceptional contributions.
            </li>
            <li>
              <b>Final decisions:</b> All decisions made by the Ballerina Hacktoberfest panel are final, conclusive,
              and binding.
            </li>
          </ul>
        </article>
        <p className={styles.termsCopy}>
          By participating in this competition, you agree to our{' '}
          <a href="/hacktoberfest/Hacktoberfest_2025-Terms_and_Conditions.pdf" target="_blank" rel="noreferrer">
            terms &amp; conditions
          </a>.
        </p>
      </div>
    ),
  },
  '2024': {
    year: '2024',
    title: 'Ballerina - Hacktoberfest 2024 - The Ballerina programming language',
    description: 'Ballerina participates in Hacktoberfest 2024',
    socialImage: '/images/hacktoberfest/hack-2024.png',
    bodyClass: 'hack2024',
    introClass: 'hero2024',
    sectionClass: 'section2024',
    hero: (
      <div className={styles.hero2024Grid}>
        <div className={styles.heroText2024}>
          <h1>Hacktoberfest 2024</h1>
          <p>
            We&apos;re thrilled to have you on board for{' '}
            <a href="https://hacktoberfest.com" target="_blank" rel="noreferrer">
              Hacktoberfest
            </a>{' '}
            and have some fantastic opportunities lined up for you. See the many ways you can support the open source
            community and contribute to Ballerina.
          </p>
        </div>
        <div className={styles.heroLogos2024}>
          <a href="https://hacktoberfest.com" target="_blank" rel="noreferrer">
            <img src="/images/hacktoberfest/vertical_beige.svg" alt="Hacktoberfest" className={styles.verticalBeige} />
          </a>
          <img src="/img/body-bg.svg" alt="" className={styles.heroDividerTall} />
          <img src="/images/hacktoberfest/ballerina-icon-teal.svg" alt="Ballerina" className={styles.iconTall} />
        </div>
      </div>
    ),
    challengeHeading: 'How to contribute?',
    challengeTables: [
      {
        title: 'Code contributions',
        rows: [
          {label: 'Easy', credits: '+20'},
          {label: 'Medium', credits: '+30'},
          {label: 'Hard', credits: '+45'},
        ],
        primaryHref: 'https://github.com/orgs/ballerina-platform/projects/376/views/1',
        primaryLabel: 'View issues',
      },
      {
        title: 'No/Low Code contributions',
        rows: [
          {label: 'Blog/article', credits: '+20'},
          {label: 'Video tutorial', credits: '+40'},
        ],
      },
      {
        title: 'Connector projects',
        rows: [
          {label: 'Easy', credits: '+60'},
          {label: 'Medium', credits: '+80'},
          {label: 'Hard', credits: '+100'},
        ],
        primaryHref: '/contributions/connector-contributor-guide/',
        primaryLabel: 'Read the guide',
        secondaryHref: 'https://github.com/orgs/ballerina-platform/projects/376/views/5',
        secondaryLabel: 'View projects',
      },
    ],
    supportCards: [
      {
        title: 'Stack Overflow',
        body: 'Got a technical question? Get expert help',
        href: 'https://stackoverflow.com/questions/tagged/ballerina',
        label: 'Ask on Stack Overflow today',
        tone: 'stack',
      },
      {
        title: 'Discord',
        body: 'Join our Discord community',
        href: 'https://discord.gg/ballerinalang',
        label: 'Join the Ballerina Server',
        tone: 'discord',
      },
    ],
    rewardsHeading: 'Rewards',
    rewardGallery: (
      <div className={styles.rewards2024Layout}>
        <div className={styles.rewardTextCard}>
          <p>
            The contributors who make the most significant contributions to Ballerina during Hacktoberfest will be
            rewarded with the following prizes:
          </p>
          <ul className={styles.arrowList}>
            <li>
              Redeem your points to purchase exclusive Ballerina-branded items from the{' '}
              <a href="https://store.covver.io/wso2/collections/ballerina-swag-store" target="_blank" rel="noreferrer">
                swag store
              </a>
            </li>
            <li>
              Free vouchers for WSO2{' '}
              <a href="https://wso2.com/training/certification/" target="_blank" rel="noreferrer">
                practitioner and developer certifications
              </a>
            </li>
            <li>
              <a href="https://wso2.com/choreo/" target="_blank" rel="noreferrer">
                Choreo
              </a>{' '}
              credits (10 components for free for 3 months + $1,000 infrastructure credits)
            </li>
          </ul>
        </div>
        <div className={styles.swagGrid}>
          {swagItems.map((item) => (
            <div key={item} className={styles.swagCard}>
              <img src={`/images/hacktoberfest/swags-2024/${item}.jpeg`} alt={item} />
            </div>
          ))}
          <a
            href="https://store.covver.io/wso2/collections/ballerina-swag-store"
            target="_blank"
            rel="noreferrer"
            className={clsx(styles.swagCard, styles.storeCard)}>
            <span>Visit store</span>
            <img src="/images/arrow-right-white.svg" alt="" />
          </a>
        </div>
      </div>
    ),
    rulesHeading: 'Rules',
    rulesBody: (
      <>
        <div className={styles.ruleTextPanel}>
          <ul>
            <li>
              <h4>For Code and connector contributions:</h4>
              <ul>
                <li>
                  <b>Explore and pick issues:</b> Refer to the Hacktoberfest{' '}
                  <a href="https://github.com/orgs/ballerina-platform/projects/376" target="_blank" rel="noreferrer">
                    project board
                  </a>{' '}
                  and select an issue to work on.
                </li>
                <li>
                  <b>Reserve your issue:</b> Once you start working on an issue, leave a comment stating that
                  you&apos;re working on it to reserve it for yourself.
                </li>
                <li>
                  <b>Submit your work:</b> When your work is ready, submit a pull request (PR). Address any review
                  comments if needed and get your PR merged.
                </li>
                <li>
                  <b>Submit the form:</b> After your PR is merged, fill out the{' '}
                  <a href="https://forms.gle/517ebK579YwmPfRY6" target="_blank" rel="noreferrer">
                    form
                  </a>{' '}
                  with the PR details and other relevant information.
                </li>
              </ul>
            </li>
            <li>
              <h4>For Low-code/No-code contributions:</h4>
              <ul>
                <li>
                  <b>Create content:</b> We accept any type of written or video content, such as tutorials,
                  comparisons, introductory articles, and more.
                </li>
                <li>
                  <b>Share your work:</b> Publish your content and submit the URLs via the{' '}
                  <a href="https://forms.gle/517ebK579YwmPfRY6" target="_blank" rel="noreferrer">
                    form
                  </a>.
                </li>
              </ul>
            </li>
            <li>
              <h4>Extra contributions:</h4>
              <ul>
                <li>
                  <b>Bug reporting credits:</b> Earn 5 extra credits for reporting valid bugs, subject to the panel&apos;s
                  review and approval.
                </li>
                <li>
                  <b>Ambassador tasks:</b> Complete tasks from the{' '}
                  <a href="https://ballerina.io/community/ambassadors/" target="_blank" rel="noreferrer">
                    Ballerina Ambassador Program
                  </a>{' '}
                  to earn credits, with final points decided by the panel.
                </li>
              </ul>
            </li>
            <li>
              <h4>Important details:</h4>
              <ul>
                <li>
                  <b>Submission deadline:</b> The deadline to submit the{' '}
                  <a href="https://forms.gle/517ebK579YwmPfRY6" target="_blank" rel="noreferrer">
                    form
                  </a>{' '}
                  is October 31, 2024, at 11:59 PM PST.
                </li>
                <li>
                  <b>Ask questions on Stack Overflow:</b> Need any technical help? Raise all your questions in{' '}
                  <a href="https://stackoverflow.com/questions/tagged/ballerina" target="_blank" rel="noreferrer">
                    Stack Overflow
                  </a>.
                </li>
                <li>
                  <b>Stay updated on Discord:</b> All announcements will be held on Discord. Join our{' '}
                  <a href="https://discord.gg/ballerinalang" target="_blank" rel="noreferrer">
                    Discord
                  </a>{' '}
                  to stay updated on important information.
                </li>
                <li>
                  <b>Contributor recognition:</b> Extra credits may be granted for exceptional contributions.
                </li>
                <li>
                  <b>Final decisions:</b> All decisions made by the Ballerina Hacktoberfest panel are final,
                  conclusive, and binding.
                </li>
              </ul>
            </li>
          </ul>
          <p className={styles.termsCopyDark}>
            By participating in this competition, you agree to our{' '}
            <a href="/hacktoberfest/Hacktoberfest_2024-Terms_and_Conditions.pdf" target="_blank" rel="noreferrer">
              terms &amp; conditions
            </a>.
          </p>
        </div>
      </>
    ),
  },
  '2023': {
    year: '2023',
    title: 'Ballerina - Hacktoberfest 2023 - The Ballerina programming language',
    description: 'Ballerina participates in Hacktoberfest 2023',
    socialImage: '/images/hacktoberfest/ballerina-hacktoberfest-sm-banner.png',
    bodyClass: 'hack2023',
    introClass: 'hero2023',
    sectionClass: 'section2023',
    hero: (
      <div className={styles.hero2023Grid}>
        <div className={styles.heroText2023}>
          <h1>Hacktoberfest 2023</h1>
          <p>
            We&apos;re thrilled to have you on board for Hacktoberfest and have some fantastic opportunities lined up
            for you. See the many ways you can support the open source community and contribute to Ballerina.
          </p>
        </div>
        <div className={styles.heroImage2023}>
          <a href="https://hacktoberfest.com/" target="_blank" rel="noreferrer">
            <img src="/images/hacktoberfest/hacktoberfest-logo.png" alt="Hacktoberfest 2023" />
          </a>
        </div>
      </div>
    ),
    challengeHeading: 'How to contribute?',
    challengeCards: (
      <>
        <p className={styles.sectionLead}>
          We have prepared several categories of open issues that are ideal for first-time developers and low-code/no-code
          contributors. They fall into the following categories:
        </p>
        <div className={styles.simpleCardGrid}>
          <article className={styles.simpleCard}>
            <h3>Code contributions</h3>
            <p>
              If you&apos;re up for a coding challenge, take on tasks labeled with <code>Hacktoberfest</code> from our{' '}
              <a href="https://github.com/orgs/ballerina-platform/projects/362/views/1" target="_blank" rel="noreferrer">
                Ballerina Hacktoberfest 2023 project
              </a>.
            </p>
            <p>
              Refer to the{' '}
              <a
                href="https://github.com/ballerina-platform/ballerina-release/blob/master/CONTRIBUTING.md"
                target="_blank"
                rel="noreferrer">
                contributing guide
              </a>{' '}
              to get started, and leave a comment on the issue when you start working on it.
            </p>
          </article>
          <article className={styles.simpleCard}>
            <h3>Low/No Code contributions</h3>
            <p>
              Are you a content creator? Do you love sharing your knowledge and helping others learn? This is your
              chance to shine.
            </p>
            <p>Create informative and engaging videos or written content about Ballerina.</p>
            <p>Whether you&apos;re a seasoned expert or just getting started, your insights can make a difference.</p>
          </article>
        </div>
        <p className={styles.sectionLead}>
          Join the{' '}
          <a href="https://discord.gg/ballerinalang" target="_blank" rel="noreferrer">
            Ballerina Discord
          </a>{' '}
          server to connect with the Ballerina community.
        </p>
      </>
    ),
    rewardsHeading: 'Rewards',
    rewardsBody: (
      <>
        <p className={styles.sectionLead}>
          We will carefully evaluate all your contributions during Hacktoberfest, and you&apos;ll be rewarded
          accordingly. You will not only gain recognition for your work but also contribute to the growth and
          improvement of Ballerina.
        </p>
        <div className={styles.simpleCardGrid}>
          <article className={styles.simpleCard}>
            <h3>Code contributions</h3>
            <p>Any accepted PR fixing a Hacktoberfest issue will receive:</p>
            <ul>
              <li>A $25 Amazon voucher</li>
              <li>A Ballerina branded sticker pack</li>
              <li>
                Free vouchers for WSO2{' '}
                <a href="https://wso2.com/training/certification/" target="_blank" rel="noreferrer">
                  practitioner and developer certifications
                </a>
              </li>
              <li>
                <a href="https://wso2.com/choreo/" target="_blank" rel="noreferrer">
                  Choreo
                </a>{' '}
                credits (10 components for free for 3 months + $1,000 infrastructure credits)
              </li>
            </ul>
          </article>
          <article className={styles.simpleCard}>
            <h3>Low/No Code contributions</h3>
            <p>The top 3 contributions will receive Amazon vouchers valued at:</p>
            <ul>
              <li>1st Place: $300</li>
              <li>2nd Place: $200</li>
              <li>3rd Place: $100</li>
            </ul>
            <p>6 more winners will get Amazon vouchers valued at $50 USD.</p>
            <p>Additionally, all of the above will receive:</p>
            <ul>
              <li>A Ballerina T-shirt</li>
              <li>A Ballerina branded sticker pack</li>
              <li>
                Free vouchers for WSO2{' '}
                <a href="https://wso2.com/training/certification/" target="_blank" rel="noreferrer">
                  practitioner and developer certifications
                </a>
              </li>
              <li>
                <a href="https://wso2.com/choreo/" target="_blank" rel="noreferrer">
                  Choreo
                </a>{' '}
                credits (10 components for free for 3 months + $1,000 infrastructure credits)
              </li>
            </ul>
          </article>
        </div>
      </>
    ),
    rulesHeading: 'Rules',
    rulesBody: (
      <div className={styles.ruleTextPanelLight}>
        <ol>
          <li>
            For all code contributions,
            <ol type="a">
              <li>
                Refer to the Hacktoberfest{' '}
                <a href="https://github.com/orgs/ballerina-platform/projects/362/views/1" target="_blank" rel="noreferrer">
                  project board
                </a>{' '}
                and pick issues to work on.
              </li>
              <li>
                Once you start on the issue, leave a comment saying you are working on the issue. Then, that issue will
                be reserved for you.
              </li>
              <li>Once ready, submit the PR, address the review comments if there are any, and get it merged.</li>
              <li>
                If your PR is merged, submit the{' '}
                <a href="https://forms.gle/EuekCiRMrpqmJE6K6" target="_blank" rel="noreferrer">
                  form
                </a>{' '}
                with the PR details and other information.
              </li>
            </ol>
          </li>
          <li>
            For low-code/no-code contributions,
            <ol type="a">
              <li>Any type of written or video content is accepted. Tutorials, comparisons, introductory content, etc.</li>
              <li>
                Publish your content and share the URLs via the{' '}
                <a href="https://forms.gle/EuekCiRMrpqmJE6K6" target="_blank" rel="noreferrer">
                  form
                </a>.
              </li>
            </ol>
          </li>
          <li>
            The deadline to submit the{' '}
            <a href="https://forms.gle/EuekCiRMrpqmJE6K6" target="_blank" rel="noreferrer">
              form
            </a>{' '}
            is October 31, 2023, 11:59 PM PST.
          </li>
          <li>
            All the announcements and discussions will be done via Discord. Join our{' '}
            <a href="https://discord.gg/ballerinalang" target="_blank" rel="noreferrer">
              Discord
            </a>{' '}
            in order not to miss any important updates.
          </li>
          <li>All decisions made by the Ballerina Hacktoberfest panel shall be deemed final, conclusive, and binding.</li>
        </ol>
        <p className={styles.termsCopyLight}>
          By participating in this competition, you agree to our{' '}
          <a href="/hacktoberfest/ballerina-hacktoberfest-2023-terms-and-onditions.pdf" target="_blank" rel="noreferrer">
            Terms &amp; Conditions
          </a>.
        </p>
      </div>
    ),
  },
};

export default function HacktoberfestPage({edition}: {edition: '2025' | '2024' | '2023'}) {
  const config = years[edition];

  return (
    <Layout title={config.title} description={config.description}>
      <Head>
        <meta name="keywords" content="ballerina, hacktoberfest, integration, hackathon" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:image" content={`https://ballerina.io${config.socialImage}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ballerinalang" />
        <meta name="twitter:creator" content="@ballerinalang" />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:description" content={config.description} />
        <meta name="twitter:image" content={`https://ballerina.io${config.socialImage}`} />
      </Head>
      {renderYear(config)}
    </Layout>
  );
}
