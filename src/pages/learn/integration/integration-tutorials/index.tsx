import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const tutorials = [
  {
    title: 'Sending a message to a service',
    href: '/learn/sending-a-message-to-a-service/',
    description:
      'Build a simple service that receives requests, calls a backend service, and responds with the result.',
  },
  {
    title: 'Sending emails from a service',
    href: '/learn/sending-emails-from-a-service/',
    description:
      'Create a service that coordinates backend calls and sends confirmation emails using SMTP.',
  },
  {
    title: 'Service orchestration',
    href: '/learn/service-orchestration/',
    description:
      'Orchestrate several backend services behind a single REST endpoint.',
  },
  {
    title: 'Content-based message routing',
    href: '/learn/content-based-message-routing/',
    description:
      'Route incoming requests to different downstream services based on the payload content.',
  },
  {
    title: 'Transforming message formats',
    href: '/learn/transforming-message-formats/',
    description:
      'Transform requests from one shape to another before forwarding them to a backend service.',
  },
];

export default function IntegrationTutorialsPage(): React.JSX.Element {
  return (
    <Layout
      title="Integration tutorials"
      description="Explore guided Ballerina integration tutorials covering service calls, orchestration, routing, messaging, and transformation."
    >
      <main className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <Heading as="h1">Integration tutorials</Heading>
            <p>
              Explore guided Ballerina integration tutorials covering service calls,
              orchestration, routing, messaging, and transformation.
            </p>
          </div>
          <div className={styles.grid}>
            {tutorials.map((tutorial) => (
              <Link key={tutorial.href} className={styles.card} to={tutorial.href}>
                <Heading as="h2" className={styles.cardTitle}>
                  {tutorial.title}
                </Heading>
                <p>{tutorial.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
