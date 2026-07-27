export type PrebuiltIntegrationSummary = {
  name: string;
  description: string;
  tags: string[];
  slug: string;
};

export type PrebuiltIntegrationDetail = {
  slug: string;
  title: string;
  metaDescription: string;
  paragraphs: string[];
  flowDiagram: string | null;
  sequenceDiagram: string | null;
  githubUrl: string | null;
  code: string;
};

export const prebuiltIntegrationItems: PrebuiltIntegrationSummary[] = [
  {
    "name": "Google Sheets to Salesforce integration",
    "description": "Create a new contact in Salesforce for each new row added to a Google Sheet",
    "tags": [
      "Google Sheets",
      "Salesforce",
      "Integration",
      "CRM"
    ],
    "slug": "google-sheets-to-salesforce-integration"
  },
  {
    "name": "GitHub to email integration",
    "description": "Generate a GitHub issue summary report and email it to a specified email address",
    "tags": [
      "GitHub",
      "Integration",
      "Email"
    ],
    "slug": "github-to-email-integration"
  },
  {
    "name": "Google Drive to OneDrive integration",
    "description": "Sync Google Drive files to Microsoft OneDrive",
    "tags": [
      "OneDrive",
      "Integration",
      "Google Drive"
    ],
    "slug": "google-drive-to-onedrive-integration"
  },
  {
    "name": "MySQL to Salesforce integration",
    "description": "Create a new product in Salesforce for each new record added to a MySQL table",
    "tags": [
      "Salesforce",
      "Integration",
      "CRM",
      "MySQL"
    ],
    "slug": "mysql-to-salesforce-integration"
  },
  {
    "name": "Gmail to Salesforce integration",
    "description": "Create a lead for each new marketing email in Gmail",
    "tags": [
      "Salesforce",
      "Integration",
      "CRM",
      "Gmail",
      "OpenAI"
    ],
    "slug": "gmail-to-salesforce-integration"
  },
  {
    "name": "News API to email integration",
    "description": "Fetch BBC top headlines and send as an email to the recipient",
    "tags": [
      "NewsAPI",
      "Integration",
      "Email"
    ],
    "slug": "news-api-to-email-integration"
  },
  {
    "name": "Shopify to Outlook integration",
    "description": "Send a welcome email using Microsoft Outlook to new Shopify customers",
    "tags": [
      "Outlook",
      "Integration",
      "Shopify"
    ],
    "slug": "shopify-to-outlook-integration"
  },
  {
    "name": "Kafka to Salesforce integration",
    "description": "Update price book in Salesforce for each new message in Kafka",
    "tags": [
      "Kafka",
      "Salesforce",
      "Integration",
      "CRM"
    ],
    "slug": "kafka-to-salesforce-integration"
  },
  {
    "name": "Salesforce to Twilio integration",
    "description": "Send an SMS for each new lead in Salesforce",
    "tags": [
      "Salesforce",
      "Integration",
      "CRM",
      "Twilio"
    ],
    "slug": "salesforce-to-twilio-integration"
  },
  {
    "name": "HubSpot contacts to Google Contacts integration",
    "description": "Sync HubSpot Contacts with Google Contacts",
    "tags": [
      "HubSpot",
      "Integration",
      "Google Contacts"
    ],
    "slug": "hubspot-contacts-to-google-contacts-integration"
  },
  {
    "name": "FTP EDI message to Salesforce Opportunity",
    "description": "Read EDI files from a given FTP location and create a Salesforce Opportunity",
    "tags": [
      "FTP",
      "EDI",
      "Salesforce",
      "Integration",
      "CRM"
    ],
    "slug": "ftp-edi-message-to-salesforce-opportunity"
  }
] as const;

export const prebuiltIntegrationDetails: Record<string, PrebuiltIntegrationDetail> = {
  "ftp-edi-message-to-salesforce-opportunity": {
    "slug": "ftp-edi-message-to-salesforce-opportunity",
    "title": "FTP EDI message to Salesforce Opportunity",
    "metaDescription": "Read EDI files from a given FTP location and create a Salesforce Opportunity",
    "paragraphs": [
      "Interactions between businesses, such as sending purchase orders and invoices, usually occur over EDI-based B2B channels. On the other hand, sales and customer details related to such transactions are maintained in Salesforce. Therefore, it's critical to bridge Salesforce with B2B channels in order to automate the sales processes. For example, it is possible to update the status and details of opportunities in Salesforce based on the exchange of EDI messages like `EDIFACT REQOTE` (Request for quotation), `EDIFACT QUOTES` (Quotation response), `EDIFACT ORDERS` (Purchase order), etc. Such integrations will eliminate the delays and inconsistencies in updating Salesforce and provide up-to-date information for sales staff and decision makers.",
      "The code sample below reads `EDIFACT REQOTE` EDI files from a given FTP location and creates a Salesforce Opportunity."
    ],
    "flowDiagram": "/images/pre-built/flow_diagrams/ftp-edi-message-to-salesforce-opportunity.png",
    "sequenceDiagram": "/images/pre-built/sequence-diagrams/ftp-edi-message-to-salesforce-opportunity.png",
    "githubUrl": "https://github.com/ballerina-guides/integration-samples/tree/main/ftp-edi-message-to-salesforce-opportunity",
    "code": ""
  },
  "github-to-email-integration": {
    "slug": "github-to-email-integration",
    "title": "GitHub to email integration",
    "metaDescription": "Generate a GitHub issue summary report and email it to a specified email address",
    "paragraphs": [
      "By periodically sending GitHub issue summaries directly to email through seamless integration, team members can stay informed about the project's progress without the need to constantly visit the GitHub platform. This integration also ensures that crucial issue updates are never missed, enhancing responsiveness and facilitating prompt issue resolution.",
      "The example below demonstrates how to get a GitHub issues summary as an email using Ballerina integration features."
    ],
    "flowDiagram": "/images/pre-built/flow_diagrams/github-to-gmail-integration.png",
    "sequenceDiagram": "/images/pre-built/sequence-diagrams/github-to-email-integration.png",
    "githubUrl": "https://github.com/ballerina-guides/integration-samples/tree/main/github-issue-summary-to-email",
    "code": ""
  },
  "gmail-to-salesforce-integration": {
    "slug": "gmail-to-salesforce-integration",
    "title": "Gmail to Salesforce integration",
    "metaDescription": "Create a lead for each new marketing email in Gmail",
    "paragraphs": [
      "In today's fast-paced business landscape, effective customer relationship management (CRM) has become a linchpin of success. Salesforce, a leading CRM platform, empowers organizations to streamline their sales, marketing, and customer support efforts, providing invaluable insights into customer interactions. However, to truly harness the full potential of Salesforce, seamless integration with essential communication tools like email clients is imperative.",
      "The example below demonstrates how to integrate Gmail and Salesforce to create new leads in Salesforce for each new marketing email."
    ],
    "flowDiagram": "/images/pre-built/flow_diagrams/gmail-to-salesforce-integration.png",
    "sequenceDiagram": "/images/pre-built/sequence-diagrams/gmail-to-salesforce-integration.png",
    "githubUrl": "https://github.com/ballerina-guides/integration-samples/tree/main/gmail-to-salesforce-lead",
    "code": ""
  },
  "google-drive-to-onedrive-integration": {
    "slug": "google-drive-to-onedrive-integration",
    "title": "Google Drive to OneDrive integration",
    "metaDescription": "Sync Google Drive files to Microsoft OneDrive",
    "paragraphs": [
      "In an increasingly interconnected digital landscape, individuals and businesses often use multiple cloud storage services to cater to diverse needs. Synchronizing data across such storages is essential for ensuring that all interested parties access the latest versions of relevant data.",
      "The example below demonstrates how to sync OneDrive and Google Drive files using Ballerina integration features."
    ],
    "flowDiagram": "/images/pre-built/flow_diagrams/google-drive-to-onedrive-integration.png",
    "sequenceDiagram": "/images/pre-built/sequence-diagrams/google-drive-to-onedrive-integration.png",
    "githubUrl": "https://github.com/ballerina-guides/integration-samples/tree/main/gdrive-files-to-microsoft-onedrive-files",
    "code": ""
  },
  "google-sheets-to-salesforce-integration": {
    "slug": "google-sheets-to-salesforce-integration",
    "title": "Google Sheets to Salesforce integration",
    "metaDescription": "Create a new contact in Salesforce for each new row added to a Google Sheet",
    "paragraphs": [
      "Office productivity tools like Google Sheets are vital for employees' daily tasks, including capturing customer and sales data. This data must be pumped into Salesforce to maintain up-to-date records, often requiring validation and cleansing due to the ad-hoc nature of entering data. Ballerina can streamline this process by fetching data from these tools, performing necessary data processing, and pushing updates to Salesforce, either periodically or by listening to changes.",
      "The example below demonstrates an integration scenario in which contact details added to Google Sheets get synced with the Salesforce Contacts."
    ],
    "flowDiagram": "/images/pre-built/flow_diagrams/google-sheets-to-salesforce-integration.png",
    "sequenceDiagram": "/images/pre-built/sequence-diagrams/google-sheets-to-salesforce-integration.png",
    "githubUrl": "https://github.com/ballerina-guides/integration-samples/tree/main/gsheet-new-row-to-salesforce-new-contact",
    "code": ""
  },
  "hubspot-contacts-to-google-contacts-integration": {
    "slug": "hubspot-contacts-to-google-contacts-integration",
    "title": "HubSpot contacts to Google Contacts integration",
    "metaDescription": "Sync HubSpot Contacts with Google Contacts",
    "paragraphs": [
      "Synchronizing contact storages across platforms like smartphones, emails, and social networks ensures seamless organization and communication. By keeping contacts updated and consistent, synchronization saves time and prevents errors, enabling quick and reliable interactions with friends, colleagues, and clients.",
      "The example below demonstrates how to sync HubSpot and Google Contacts using Ballerina integration features."
    ],
    "flowDiagram": "/images/pre-built/flow_diagrams/hubspot-contacts-to-google-contacts-integration.png",
    "sequenceDiagram": "/images/pre-built/sequence-diagrams/hubspot-contacts-to-google-contacts-integration.png",
    "githubUrl": "https://github.com/ballerina-guides/integration-samples/tree/main/hubspot-contacts-to-google-contacts",
    "code": ""
  },
  "kafka-to-salesforce-integration": {
    "slug": "kafka-to-salesforce-integration",
    "title": "Kafka to Salesforce integration",
    "metaDescription": "Update price book in Salesforce for each new message in Kafka",
    "paragraphs": [
      "In enterprises, business data like inventory levels, order statuses, or product prices change constantly, and multiple entities require access to these updates. Utilizing messaging systems like Kafka enables the real-time consumption of this information by multiple parties. Keeping Salesforce updated with frequently changing information such as current pricing is vital for the sales staff. Ballerina's connectors and streaming capabilities facilitate this integration, allowing seamless connections between Salesforce and streaming data sources. It ensures that transformed and filtered data is constantly pushed to Salesforce, keeping all relevant information current and accessible.",
      "The example below demonstrates how to update Salesforce price books in real-time based on the prices published to a Kafka topic."
    ],
    "flowDiagram": "/images/pre-built/flow_diagrams/kafka-to-salesforce-integration.png",
    "sequenceDiagram": null,
    "githubUrl": "https://github.com/ballerina-guides/integration-samples/tree/main/kafka_salesforce_integration",
    "code": ""
  },
  "mysql-to-salesforce-integration": {
    "slug": "mysql-to-salesforce-integration",
    "title": "MySQL to Salesforce integration",
    "metaDescription": "Create a new product in Salesforce for each new record added to a MySQL table",
    "paragraphs": [
      "Data about products, customers, and sales transactions are often scattered across various systems, databases, and business units. Extracting this information and integrating it into Salesforce is essential for a unified view. Ballerina, with its rich set of connectors and data handling capabilities, can connect to multiple data sources and fetch data in any format. By linking disparate data, Ballerina aids in enriching Salesforce with relevant information, making it the single source for all customer information.",
      "The example below demonstrates how to create Salesforce products based on newly added MySQL records."
    ],
    "flowDiagram": "/images/pre-built/flow_diagrams/mysql-to-salesforce-integration.png",
    "sequenceDiagram": "/images/pre-built/sequence-diagrams/mysql-to-salesforce-integration.png",
    "githubUrl": "https://github.com/ballerina-guides/integration-samples/tree/main/mysql-record-to-salesforce-new-product",
    "code": ""
  },
  "news-api-to-email-integration": {
    "slug": "news-api-to-email-integration",
    "title": "News API to email integration",
    "metaDescription": "Fetch BBC top headlines and send as an email to the recipient",
    "paragraphs": [
      "Integrating news headlines directly into Gmail through the News API and email integration carries significant advantages in today's fast-paced information landscape. By seamlessly delivering relevant and timely news updates within the familiar interface of Gmail, users can effortlessly stay informed without the need to toggle between multiple platforms.",
      "The example below demonstrates how to integrate the News API to receive an email containing BBC headlines."
    ],
    "flowDiagram": "/images/pre-built/flow_diagrams/news-api-to-email-integration.png",
    "sequenceDiagram": "/images/pre-built/sequence-diagrams/news-api-to-email-integration.png",
    "githubUrl": "https://github.com/ballerina-guides/integration-samples/tree/main/newsapi_headlines-to-email",
    "code": ""
  },
  "salesforce-to-twilio-integration": {
    "slug": "salesforce-to-twilio-integration",
    "title": "Salesforce to Twilio integration",
    "metaDescription": "Send an SMS for each new lead in Salesforce",
    "paragraphs": [
      "Sales-related events need to be acted upon as soon as possible. For example, when a new lead is received, the sales staff need to evaluate it and get in contact with the lead immediately. When an opportunity is won, the support staff need to be informed about it so that they can attend to any issues reported by the new customers without any delay. As all customer-related events are captured in Salesforce, it is the best place to look for such events. Ballerina can listen for any interested events in Salesforce and notify relevant employees over their preferred channels, ensuring that all customer events are attended in a timely manner.",
      "The example below demonstrates how to listen for new leads in Salesforce and send an SMS to the sales staff upon receiving one."
    ],
    "flowDiagram": "/images/pre-built/flow_diagrams/salesforce-to-twilio-integration.png",
    "sequenceDiagram": null,
    "githubUrl": "https://github.com/ballerina-guides/integration-samples/tree/main/salesforce-new-contact-to-twilio-sms",
    "code": ""
  },
  "shopify-to-outlook-integration": {
    "slug": "shopify-to-outlook-integration",
    "title": "Shopify to Outlook integration",
    "metaDescription": "Send a welcome email using Microsoft Outlook to new Shopify customers",
    "paragraphs": [
      "In modern e-commerce, customer interactions are pivotal. Effective email communication enables businesses to offer targeted support, updates, and recommendations. By integrating Shopify with email platforms, companies can automate essential communications like order confirmations and shipping updates while also personalizing product suggestions.",
      "The example below demonstrates how to integrate Shopify and Outlook to send automatic welcome emails to new customers."
    ],
    "flowDiagram": "/images/pre-built/flow_diagrams/shopify-to-outlook-integration.png",
    "sequenceDiagram": "/images/pre-built/sequence-diagrams/shopify-to-outlook-integration.png",
    "githubUrl": "https://github.com/ballerina-guides/integration-samples/tree/main/shopify-new-customers-to-outlook-mail",
    "code": ""
  }
} as const;
