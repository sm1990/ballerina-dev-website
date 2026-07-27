import {useState} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import BreadcrumbTrail from '../../components/BreadcrumbTrail';
import styles from './resources.module.css';

type ResourceItem = {
  title: string;
  author?: string;
  date?: string;
  href: string;
  description?: string;
};

type ResourceTab = 'articles' | 'blogs' | 'videos' | 'other';

const featuredArticles: ResourceItem[] = [
  {
    title: 'Data Manipulation with Functional Programming and Queries in Ballerina',
    author: 'Yehonathan Sharvit',
    date: '11 Aug 2022',
    href: 'https://www.infoq.com/articles/ballerina-data-functional-programming/',
  },
  {
    title: 'How MOSIP Uses Ballerina WebSubHub for Event-Driven Integration',
    author: 'Dakshitha Ratnayake',
    date: '28 June 2022',
    href: 'https://thenewstack.io/how-mosip-uses-ballerina-websubhub-for-event-driven-integration/',
  },
  {
    title: 'Ballerina for Full-Stack Developers: a Guide to Creating Backend APIs',
    author: 'Imesha Sudasingha',
    date: '14 March 2022',
    href: 'https://www.infoq.com/articles/ballerina-fullstack-rest-api/',
  },
];

const articles: ResourceItem[] = [
  {title: 'Ballerina: A Programming Language for the Cloud', author: 'Martin Heller', date: '8 March 2023', href: 'https://www.infoworld.com/article/3688921/ballerina-a-programming-language-for-the-cloud.html'},
  {title: 'Data Manipulation with Functional Programming and Queries in Ballerina', author: 'Yehonathan Sharvit', date: '11 Aug 2022', href: 'https://www.infoq.com/articles/ballerina-data-functional-programming/'},
  {title: 'Using GraphQL and Ballerina with Multiple Data Sources', author: 'Anupama Pathirage', date: '1 July 2022', href: 'https://www.infoq.com/articles/graphql-ballerina/'},
  {title: 'How MOSIP Uses Ballerina WebSubHub for Event-Driven Integration', author: 'Dakshitha Ratnayake', date: '28 June 2022', href: 'https://thenewstack.io/how-mosip-uses-ballerina-websubhub-for-event-driven-integration/'},
  {title: 'Ballerina: A Data-Oriented Programming Language', author: 'Yehonathan Sharvit', date: '10 May 2022', href: 'https://www.infoq.com/articles/ballerina-data-oriented-language/'},
  {title: 'Why Should You Program with Ballerina?', author: 'Vishva Ahangama', date: '21 April 2022', href: 'https://thenewstack.io/why-should-you-program-with-ballerina'},
  {title: 'Ballerina for Full-Stack Developers: A Guide to Creating Backend APIs', author: 'Imesha Sudasingha', date: '14 March 2022', href: 'https://www.infoq.com/articles/ballerina-fullstack-rest-api/'},
  {title: 'How to use Ballerina Local Repository', author: 'Pramodya Mendis', date: '10 Dec 2021', href: 'https://dzone.com/articles/how-to-use-ballerina-local-repository'},
  {title: 'Real-Time Stock Data Updates with WebSockets Using Ballerina', author: 'Anupama Pathirage', date: '23 Nov 2021', href: 'https://dzone.com/articles/real-time-stock-data-updates-with-websockets-using'},
  {title: 'Deploying Ballerina Code on the Cloud', author: 'Sumudu Nissanka', date: '18 Nov 2021', href: 'https://dzone.com/articles/deploying-ballerina-code-to-cloud'},
  {title: 'Proper OpenAPI Documentation for Ballerina Resource APIs', author: 'Sumudu Nissanka', date: '17 Nov 2021', href: 'https://dzone.com/articles/proper-openapi-documentation-ballerina-resource-apis'},
  {title: 'Concurrency-Safe Execution Using Ballerina Isolation', author: 'Hinduja Balasubramaniyam', date: '7 Nov 2021', href: 'https://dzone.com/articles/concurrency-safe-execution-ballerina-isolation'},
  {title: 'Binding Patterns in Ballerina', author: 'Suleka Helmini', date: '19 Oct 2021', href: 'https://dzone.com/articles/binding-patterns-in-ballerina'},
  {title: 'gRPC Compression Support in Go, Java, and Ballerina', author: 'Buddhi Kothalawala', date: '13 Oct 2021', href: 'https://dzone.com/articles/grpc-compression-support-in-go-java-and-ballerina-1'},
  {title: 'How to Configure, Customize, and use Ballerina Logs', author: 'Madhuka Wickramapala', date: '9 Oct 2021', href: 'https://dzone.com/articles/how-to-configure-customize-and-utilize-ballerina-logs'},
  {title: 'Event-Driven APIs with Webhook and WebSub', author: 'Anupama Pathirage', date: '21 Sep 2021', href: 'https://dzone.com/articles/event-driven-apis-with-webhook-and-websub'},
  {title: 'Quickstart OpenAPI with Ballerina', author: 'Anupama Pathirage', date: '16 Sep 2021', href: 'https://dzone.com/articles/quickstart-openapi-with-ballerina'},
  {title: 'Ballerina Swan Lake: 10 Compelling Language Characteristics for Cloud Native Programming', author: 'Dakshitha Ratnayake', date: '15 Sep 2021', href: 'https://www.infoq.com/articles/ballerina-cloud-native-programming/'},
  {title: 'gRPC: A Deep Dive into the Communication Pattern', author: 'Danesh Kuruppu', date: '31 Aug 2021', href: 'https://thenewstack.io/grpc-a-deep-dive-into-the-communication-pattern/'},
];

const featuredBlogs: ResourceItem[] = [
  {title: 'Ballerina WebSocket Service — The Anatomy', author: 'Bhashinee Nirmali', date: '24 May 2022', href: 'https://medium.com/ballerina-techblog/understanding-ballerina-websocket-service-4babb128f9a5'},
  {title: 'Intuitive REST APIs and JSON Handling With Ballerina Programming Language', author: 'Dakshitha Ratnayake', date: '5 May 2022', href: 'https://betterprogramming.pub/intuitive-rest-apis-and-json-handling-with-ballerina-a-detailed-walkthrough-c5c7c48aa0de'},
  {title: 'Why Ballerina is a language', author: 'James Clark', date: '4 May 2022', href: 'https://blog.jclark.com/2022/05/why-ballerina-is-language.html'},
];

const blogs: ResourceItem[] = [
  {title: 'Ballerina WebSocket Service — The Anatomy', author: 'Bhashinee Nirmali', date: '24 May 2022', href: 'https://medium.com/ballerina-techblog/understanding-ballerina-websocket-service-4babb128f9a5'},
  {title: 'Intuitive REST APIs and JSON Handling with Ballerina Programming Language', author: 'Dakshitha Ratnayake', date: '5 May 2022', href: 'https://betterprogramming.pub/intuitive-rest-apis-and-json-handling-with-ballerina-a-detailed-walkthrough-c5c7c48aa0de'},
  {title: 'Why Ballerina is a Language', author: 'James Clark', date: '4 May 2022', href: 'https://blog.jclark.com/2022/05/why-ballerina-is-language.html'},
  {title: 'A Practical Guide for Language Server Protocol', author: 'Malintha Ranasinghe', date: '11 Dec 2021', href: 'https://medium.com/ballerina-techblog/practical-guide-for-the-language-server-protocol-3091a122b750'},
  {title: 'Real-Time Stock Data Updates with WebSockets Using Ballerina', author: 'Anupama Pathirage', date: '27 Nov 2021', href: 'https://medium.com/ballerina-techblog/real-time-stock-data-updates-with-websockets-using-ballerina-7ecb2d4dcfa9'},
  {title: 'Event-Driven APIs with Webhook and WebSub', author: 'Anupama Pathirage', date: '8 Nov 2021', href: 'https://medium.com/ballerina-techblog/event-driven-apis-with-webhook-and-websub-83b0834f08f3'},
  {title: 'Connecting to and Using Google’s Cloud SQL with Ballerina', author: 'Kaneel Dias', date: '21 Oct 2021', href: 'https://medium.com/@kaneeldias/connecting-to-and-using-googles-cloud-sql-with-ballerina-13e2d6594686'},
  {title: 'Immutability in Ballerina — Part I', author: 'Maryam Ziyad', date: '26 Sep 2021', href: 'https://medium.com/ballerina-techblog/immutability-in-ballerina-part-i-e6c607ced627'},
  {title: 'Uncovering Interesting 2020 Olympics Stats with Ballerina Language-integrated Queries', author: 'Imesha Sudasingha', date: '17 Sep 2021', href: 'https://medium.com/geekculture/uncovering-interesting-2020-olympics-stats-with-ballerina-language-integrated-queries-7d5d0995b112'},
  {title: 'Overview of Manipulating Data in Ballerina with Different APIs', author: 'Dulaj Dilshan', date: '7 Sep 2021', href: 'https://medium.com/ballerina-techblog/overview-of-manipulating-data-in-ballerina-with-different-apis-paypal-api-and-randomuser-me-720828919fab'},
  {title: 'Introduction to OpenAPI with Ballerina', author: 'Anupama Pathirage', date: '4 Sep 2021', href: 'https://medium.com/ballerina-techblog/introduction-to-openapi-with-ballerina-5b3212bd71a8'},
  {title: 'Introduction to gRPC on Ballerina', author: 'Anupama Pathirage', date: '28 Aug 2021', href: 'https://medium.com/ballerina-techblog/introduction-to-grpc-on-ballerina-7819d98c4e2b'},
  {title: 'Get started with Service Testing Using Ballerina Test Framework', author: 'Fathima Dilhasha', date: '17 Aug 2021', href: 'https://medium.com/ballerina-techblog/get-started-with-service-testing-using-ballerina-test-framework-18e3b907a33'},
  {title: 'Unit Test Ballerina Integration with Mock Backends', author: 'Aquib Zulfikar', date: '17 Aug 2021', href: 'https://medium.com/ballerina-techblog/unit-test-ballerina-integration-with-mock-backends-ffff790edb9f'},
  {title: 'Microservices Security with Ballerina', author: 'Chanaka Lakmal', date: '3 Aug 2021', href: 'https://medium.com/ballerina-techblog/microservices-security-with-ballerina-e9d430f05373'},
  {title: 'Go Real-Time with Ballerina WebSockets', author: 'Bhashinee Nirmali', date: '28 July 2021', href: 'https://medium.com/ballerina-techblog/go-real-time-with-ballerina-websockets-58c40ac11d6'},
  {title: 'Make your Own Ballerina Client Connector Using the Ballerina OpenAPI Tool', author: 'Sumudu Nissanka', date: '23 July 2021', href: 'https://medium.com/ballerina-techblog/make-your-own-ballerina-client-connector-using-ballerina-openapi-tool-3b375d89882'},
  {title: 'REST is History, Let’s Do GraphQL (with Ballerina)', author: 'Thisaru Guruge', date: '29 June 2021', href: 'https://medium.com/ballerina-techblog/rest-is-history-lets-do-graphql-with-ballerina-dce7510b61e8'},
  {title: 'Single Liner Payload Read…', author: 'Chamil Elladeniya', date: '6 June 2021', href: 'https://medium.com/ballerina-techblog/single-liner-payload-read-85a16e3265fc'},
  {title: 'Ballerina: Integration Programming Language', author: 'Ayesh Almeida', date: '9 May 2021', href: 'https://medium.com/ballerina-techblog/ballerina-integration-programming-language-5d8e1b52e582'},
  {title: 'How Ballerina OpenAPI Tool Addresses your Code-First and Design-First API Approaches', author: 'Sumudu Nissanka', date: '4 April 2021', href: 'https://medium.com/ballerina-techblog/how-ballerina-addresses-your-code-first-and-design-first-api-approaches-3b9b0086fda9'},
  {title: 'A Practical Guide to Ballerina Remote Debugging', author: 'Praveen Nadarajah', date: '31 March 2021', href: 'https://praveennadarajah.medium.com/a-practical-guide-to-ballerina-remote-debugging-b3f8e2f9309'},
  {title: 'Ballerina Shell REPL — Implementation Overview', author: 'Sunera Avinash', date: '1 March 2021', href: 'https://medium.com/ballerina-techblog/ballerina-shell-repl-implementation-overview-ee7e909da20c'},
  {title: 'Ballerina Concurrency Model and Non-Blocking I/O', author: 'Anjana Fernando', date: '23 Feb 2021', href: 'https://medium.com/ballerina-techblog/ballerina-concurrency-model-and-non-blocking-i-o-14c6bed595f4'},
  {title: 'Introduction to GraphQL with Ballerina', author: 'Anjana Fernando', date: '10 Feb 2021', href: 'https://medium.com/ballerina-techblog/graphql-made-easy-with-ballerina-5ca04d9536d0'},
  {title: 'HTTP Deep-Dive with Ballerina: Services', author: 'Anjana Fernando', date: '29 Jan 2021', href: 'https://medium.com/ballerina-techblog/http-deep-dive-with-ballerina-services-7a6e69af2fbb'},
  {title: '[Ballerina] Working with JSON — JSON to Record Conversion', author: 'Maryam Ziyad', date: '27 Jan 2021', href: 'https://medium.com/ballerina-techblog/ballerina-working-with-json-part-i-json-to-record-conversion-1e810b0a30f0'},
  {title: 'Super Cool Feature for your Ballerina Service from Ballerina OpenAPI Tool', author: 'Sumudu Nissanka', date: '7 Nov 2020', href: 'https://medium.com/ballerina-techblog/super-cool-feature-for-your-ballerina-service-from-ballerina-openapi-tool-ac2cce9cedfb'},
  {title: 'Practical Serverless: Long-Running Workflows with Human Interactions Using Step Functions and Ballerina', author: 'Anjana Fernando', date: '28 Sep 2020', href: 'https://medium.com/ballerina-techblog/practical-serverless-long-running-workflows-with-human-interactions-using-step-functions-and-dd6fbcb42f29'},
  {title: 'Practical Serverless: Integrating Amazon S3 and Rekognition with Ballerina', author: 'Anjana Fernando', date: '31 Aug 2020', href: 'https://medium.com/ballerina-techblog/practical-serverless-integrating-amazon-s3-and-rekognition-with-ballerina-f338cdf6015c'},
  {title: 'Practical Serverless: A Scalable OCR Solution in 10 Minutes', author: 'Anjana Fernando', date: '3 Aug 2020', href: 'https://medium.com/ballerina-techblog/practical-serverless-a-scalable-ocr-solution-in-10-minutes-af9f88c6b008'},
  {title: 'Introduction to Azure Functions in Ballerina', author: 'Anjana Fernando', date: '23 July 2020', href: 'https://medium.com/ballerina-techblog/introduction-to-azure-functions-in-ballerina-ffc774eae034'},
  {title: 'Redesigning of Ballerina Cache', author: 'Chanaka Lakmal', date: '27 June 2020', href: 'https://medium.com/ballerina-techblog/redesigning-of-ballerina-cache-a2cf59b0fee1'},
  {title: 'Authenticate a Shopify App Using OAuth — The Ballerina Way', author: 'Thisaru Guruge', date: '3 June 2020', href: 'https://medium.com/ballerina-techblog/authenticate-a-shopify-app-using-oauth-the-ballerina-way-f827ab99f576'},
];

const featuredVideos: ResourceItem[] = [
  {title: 'Simplifying Cloud Native Application Development with Ballerina', author: 'Eric Newcomer and Darryl Taft', date: '8 June 2022', href: 'https://youtu.be/Pal5QZJyloY'},
  {title: 'Data-oriented Programming with Ballerina', author: 'James Clark Interviewed by Yehonathan Sharvit', date: '27 April 2022', href: 'https://youtu.be/8yRDvhMBj_E'},
  {title: 'Why should you start programming with Ballerina?', author: 'Sanjiva Weerawarana', date: '2 March 2022', href: 'https://youtu.be/My_uqtHvXV8'},
];

const videos: ResourceItem[] = [
  {title: 'Simplifying Cloud Native Application Development with Ballerina', author: 'Eric Newcomer and Darryl Taft', date: '8 June 2022', href: 'https://youtu.be/Pal5QZJyloY'},
  {title: 'Data-oriented Programming with Ballerina', author: 'James Clark Interviewed by Yehonathan Sharvit', date: '27 April 2022', href: 'https://youtu.be/8yRDvhMBj_E'},
  {title: 'Why should you start programming with Ballerina?', author: 'Sanjiva Weerawarana', date: '2 March 2022', href: 'https://youtu.be/NYrKeElltg8'},
  {title: 'Ballerina Swan Lake: The Open Source Cloud Native Programming Language Revamped', author: 'Imesha Sudasingha', date: '15 Dec 2021', href: 'https://youtu.be/QlS_8-yaN68'},
  {title: 'How Ballerina Handles Network Interaction, Data, and Concurrency', author: 'James Clark & Charles Humble', date: '11 Nov 2021', href: 'https://www.infoq.com/podcasts/james-clark-ballerina-language-network-data-concurrency/'},
  {title: 'Ballerina Type System', author: 'James Clark', date: '26 Oct 2021', href: 'https://youtu.be/_4x5v4rGUOw'},
  {title: 'Creating a Service in Ballerina - Tutorial', author: 'Manuranga Perera', date: '1 June 2021', href: 'https://youtu.be/NxyIKoHl3Dw'},
  {title: 'Familiar Subset - Ballerina Language, Swan Lake (Part 1)', author: 'James Clark', date: '31 May 2021', href: 'https://youtu.be/My_uqtHvXV8'},
  {title: 'Network and Data - Ballerina Language Swan Lake: Part 2a', author: 'James Clark', date: '31 May 2021', href: 'https://youtu.be/leFnR6xh100'},
  {title: 'Query, Tables, and XML - Ballerina Language Swan Lake: Part 2b', author: 'James Clark', date: '31 May 2021', href: 'https://youtu.be/BvU9fB-x8eE'},
  {title: 'Concurrency - Ballerina Language Swan Lake: Part 2c', author: 'James Clark', date: '31 May 2021', href: 'https://youtu.be/C1kj3Lc9MP8'},
  {title: 'Completing the Picture - Ballerina Language Swan Lake: Part 3', author: 'James Clark', date: '31 May 2021', href: 'https://youtu.be/dAQs8_jAyGU'},
];

const otherResources: ResourceItem[] = [
  {
    title: 'Language introduction slides',
    description: 'A high-level overview of the Ballerina language',
    href: '/community/slides/Ballerina_Language_Presentation-2021-03-08.pdf',
  },
  {
    title: 'Ballerina type system slides',
    description: 'An introduction to the type system of the Ballerina language',
    date: '1 June 2021',
    href: '/community/slides/ballerina-type-system.pdf',
  },
];

const tabConfig: {key: ResourceTab; label: string}[] = [
  {key: 'articles', label: 'Articles'},
  {key: 'blogs', label: 'Blog posts'},
  {key: 'videos', label: 'Videos & podcasts'},
  {key: 'other', label: 'Other resources'},
];

function ResourceCard({item}: {item: ResourceItem}) {
  return (
    <article className={styles.resourceCard}>
      <a href={item.href} target="_blank" rel="noreferrer" className={styles.cardLink}>
        <Heading as="h3" className={styles.cardTitle}>
          {item.title}
        </Heading>
      </a>
      {item.author ? <p className={styles.cardMeta}>By {item.author}</p> : null}
      {item.description ? <p className={styles.cardDescription}>{item.description}</p> : null}
      {item.date ? <p className={styles.cardDate}>{item.date}</p> : null}
    </article>
  );
}

function ResourceColumns({
  featuredTitle,
  featuredItems,
  listTitle,
  items,
}: {
  featuredTitle: string;
  featuredItems: ResourceItem[];
  listTitle: string;
  items: ResourceItem[];
}) {
  return (
    <div className={styles.columns}>
      <section className={styles.featuredColumn}>
        <Heading as="h2" className={styles.columnTitle}>
          {featuredTitle}
        </Heading>
        <div className={styles.columnStack}>
          {featuredItems.map((item) => (
            <ResourceCard key={`${featuredTitle}-${item.title}`} item={item} />
          ))}
        </div>
      </section>
      <section className={styles.listColumn}>
        <Heading as="h2" className={styles.columnTitle}>
          {listTitle}
        </Heading>
        <div className={styles.columnStack}>
          {items.map((item) => (
            <ResourceCard key={`${listTitle}-${item.title}`} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

function OtherResourcesSection() {
  return (
    <section className={styles.otherSection}>
      <Heading as="h2" className={styles.columnTitle}>
        Other resources
      </Heading>
      <div className={styles.columnStack}>
        {otherResources.map((item) => (
          <ResourceCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}

export default function CommunityResourcesPage() {
  const [activeTab, setActiveTab] = useState<ResourceTab>('articles');

  return (
    <Layout
      title="Resources"
      description="Below is an extensive list of community-maintained articles, blogs, and videos to get you up to speed with Ballerina.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <BreadcrumbTrail
              items={[
                {label: 'Home', href: '/'},
                {label: 'Community', href: '/community/'},
                {label: 'Resources'},
              ]}
            />
            <div className={styles.heroContent}>
              <div>
                <div className={styles.eyebrow}>Community</div>
                <Heading as="h1" className={styles.title}>
                  Resources
                </Heading>
                <p className={styles.description}>
                  Below is an extensive list of community-maintained articles, blogs, and
                  videos to get you up to speed with Ballerina.
                </p>
                <p className={styles.description}>
                  This list is curated to recognize the efforts made by our community and
                  encourage anyone to contribute towards Ballerina content.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <div className="container">
            <div className={styles.tabs} role="tablist" aria-label="Resource categories">
              {tabConfig.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.key}
                  className={`${styles.tabButton}${activeTab === tab.key ? ` ${styles.tabButtonActive}` : ''}`}
                  onClick={() => setActiveTab(tab.key)}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className={styles.panel}>
              {activeTab === 'articles' ? (
                <ResourceColumns
                  featuredTitle="Featured articles"
                  featuredItems={featuredArticles}
                  listTitle="Articles"
                  items={articles}
                />
              ) : null}

              {activeTab === 'blogs' ? (
                <ResourceColumns
                  featuredTitle="Featured blog posts"
                  featuredItems={featuredBlogs}
                  listTitle="Blog posts"
                  items={blogs}
                />
              ) : null}

              {activeTab === 'videos' ? (
                <ResourceColumns
                  featuredTitle="Featured videos & podcasts"
                  featuredItems={featuredVideos}
                  listTitle="Videos & podcasts"
                  items={videos}
                />
              ) : null}

              {activeTab === 'other' ? <OtherResourcesSection /> : null}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
