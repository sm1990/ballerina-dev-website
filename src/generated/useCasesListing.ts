export type UseCaseListingItem = {
  slug: string;
  title: string;
  description: string;
  logo: string;
  href: string;
  external: boolean;
};

const useCasesListing = [
  {
    "slug": "integration",
    "title": "Ballerina for integration",
    "description": "Just write the code using the only language with integration-friendly abstractions.",
    "logo": "/images/integration_diagram.png",
    "href": "/use-cases/integration/",
    "external": false
  },
  {
    "slug": "ai",
    "title": "Ballerina for AI",
    "description": "Ballerina is the best language to write your AI-powered applications that consume LLMs and other generative models.",
    "logo": "/images/Vectors-05.png",
    "href": "/use-cases/ai/",
    "external": false
  },
  {
    "slug": "healthcare",
    "title": "Ballerina for healthcare",
    "description": "Write code with healthcare-friendly abstractions.",
    "logo": "/images/health-intro.png",
    "href": "/use-cases/healthcare/",
    "external": false
  },
  {
    "slug": "data-oriented-programming",
    "title": "Data-oriented programming with Ballerina",
    "description": "With its robust support, seamless integration with data constructs, and powerful features make Ballerina the top choice for efficient data handling and processing.",
    "logo": "/images/usecases/integration/dop-banner.png",
    "href": "/use-cases/data-oriented-programming/",
    "external": false
  },
  {
    "slug": "eda",
    "title": "Ballerina for Event-Driven Architecture (EDA)",
    "description": "Event-driven architecture provides loose coupling, scalability, responsiveness, extensibility, and fault tolerance. Remarkably, Ballerina can produce and consume events like no other.",
    "logo": "/images/eda1.png",
    "href": "/use-cases/eda/",
    "external": false
  },
  {
    "slug": "b2b",
    "title": "Ballerina for B2B integrations",
    "description": "Ballerina is the only language with native support for B2B integrations.",
    "logo": "/images/edi-intro.png",
    "href": "/use-cases/b2b/",
    "external": false
  },
  {
    "slug": "etl",
    "title": "Ballerina for ETL",
    "description": "Write code with integration-friendly abstractions.",
    "logo": "/images/etl-sm-banner.png",
    "href": "/use-cases/etl/",
    "external": false
  },
  {
    "slug": "microservices",
    "title": "Ballerina for microservices",
    "description": "The ultimate toolset for seamless microservices development.",
    "logo": "/images/msa-intro.png",
    "href": "/use-cases/microservices/",
    "external": false
  },
  {
    "slug": "bff",
    "title": "Ballerina for developing back-ends for modern front-ends",
    "description": "Ballerina's support for various protocols, availability of connectors, built-in security features, and advanced data transformation capabilities make it the ideal choice for developing back-ends for modern front-ends.",
    "logo": "/images/bff-intro.png",
    "href": "/use-cases/bff/",
    "external": false
  },
  {
    "slug": "salesforce",
    "title": "Ballerina for implementing integrations with Salesforce",
    "description": "Write code with salesforce-friendly abstractions.",
    "logo": "/images/Salesforce_Integrations.png",
    "href": "/use-cases/salesforce/",
    "external": false
  }
];

export default useCasesListing;
