export type UseCaseLink = { label: string; href: string };
export type UseCaseTab = {
  label: string;
  code: string;
  language: string;
  highlightedHtml: string;
  image: string;
};
export type UseCaseCard = {
  title: string;
  body: string[];
  linkLabel: string;
  linkHref: string;
};
export type UseCaseGroupedItem = {
  id: string;
  title: string;
  descriptionHtml: string;
  image?: string;
  links: UseCaseLink[];
  code: string;
  language: string;
  highlightedHtml: string;
  tabs: UseCaseTab[];
};
export type UseCaseCompareItem = {
  id: string;
  title: string;
  descriptionHtml: string;
  leftLabel: string;
  leftCode: string;
  leftLanguage: string;
  leftHighlightedHtml: string;
  rightLabel: string;
  rightCode: string;
  rightLanguage: string;
  rightHighlightedHtml: string;
};
export type UseCaseCodeCompare = {
  leftLabel: string;
  leftCode: string;
  leftLanguage: string;
  leftHighlightedHtml: string;
  rightLabel: string;
  rightCode: string;
  rightLanguage: string;
  rightHighlightedHtml: string;
};
export type UseCaseSection = {
  type:
    | 'codeDiagramSplit'
    | 'singleCode'
    | 'tabbedCode'
    | 'imageTabs'
    | 'codeImageSplit'
    | 'challengeCards'
    | 'groupedBlades'
    | 'codeCompare'
    | 'comparisonPairs';
  id: string;
  title: string;
  descriptionHtml: string;
  image?: string;
  links: UseCaseLink[];
  code: string;
  language: string;
  highlightedHtml: string;
  tabs: UseCaseTab[];
  cards: UseCaseCard[];
  items: UseCaseGroupedItem[];
  compareItems: UseCaseCompareItem[];
  compare?: UseCaseCodeCompare;
};

export type UseCasePageData = {
  title: string;
  slug: string;
  description: string;
  hero: {
    eyebrow: string;
    body: string;
    image: string;
    ctaLabel: string;
    ctaHref: string;
  };
  sections: UseCaseSection[];
};

const useCaseIntegrationData = {
  "title": "Ballerina for integration",
  "slug": "integration",
  "description": "Just write the code using the only language with integration-friendly abstractions.",
  "hero": {
    "eyebrow": "Integration is development. Why make life harder for developers to write integrations by giving them restricted drag-and-drop tools / DSLs or generic languages?",
    "body": "Just write the code using the only language with integration-friendly abstractions.",
    "image": "/images/integration_diagram.png",
    "ctaLabel": "Download Ballerina",
    "ctaHref": "/downloads/"
  },
  "sections": [
    {
      "type": "challengeCards",
      "id": "solve-any-integration-challenge",
      "title": "Solve any integration challenge",
      "descriptionHtml": "",
      "links": [],
      "code": "",
      "tabs": [],
      "cards": [
        {
          "title": "Automate anything",
          "body": [
            "Automation is just code after all - write a main() and do whatever you want.",
            "Use the Ballerina library to connect to any system, speak any protocol, process any data, and run it anywhere (on a VM, in Kubernetes, or just as a script).",
            "Powerful data transformations that can be simultaneously programmed graphically and as code makes data integration a breeze."
          ],
          "linkLabel": "See sample automation: GitHub to Google Sheets",
          "linkHref": "https://github.com/ballerina-guides/integration-samples/blob/main/github-pull-requests-to-gsheets/main.bal"
        },
        {
          "title": "Event-driven integrations",
          "body": [
            "Events are core to the responsive enterprise. Ballerina makes it simple to consume or produce events.",
            "Subscribe to any kind of event source, including WebHooks, Kafka, GraphQL, gRPC, AMQP, email, or react to system events such as file upload and do whatever you want in a type-safe development model with subscription, data binding, and error handling is already taken care of for you.",
            "Be an event producer in any protocol you like."
          ],
          "linkLabel": "See sample event integration: Google Calendar to Trello Card",
          "linkHref": "https://github.com/ballerina-guides/integration-samples/blob/main/gcalendar-new-event-to-trello-card/main.bal"
        },
        {
          "title": "Integrations as APIs",
          "body": [
            "Ballerina's service creation abstractions make it simple to take any integration and make it reusable as an API.",
            "Use Ballerina service types for HTTP services, WebSockets, GraphQL, gRPC, and more to take your integration code, parameterize it and make it a reusable integration.",
            "APIs are the new DLLs. Exposing your integrations as APIs is how your integrated capability adds new value to your business."
          ],
          "linkLabel": "See sample integration as an API: Azure Cosmos DB data as a REST API",
          "linkHref": "https://github.com/ballerina-guides/integration-samples/blob/main/azure-cosmosdb-data-as-rest-api/main.bal"
        }
      ],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "edit-debug-run-in-vscode",
      "title": "Edit, debug, and run in VSCode",
      "descriptionHtml": "<p>Tired of disjointed toolchains disrupting your workflow? Take control of your integration development with Ballerina. Realize your ideas in VSCode, use your favorite tools, and store them in Git.</p>\n",
      "image": "/images/edit-debug-diagraam-v4.png",
      "links": [],
      "code": "",
      "language": "",
      "highlightedHtml": "",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "network-data-program-data",
      "title": "Network data == program data",
      "descriptionHtml": "<p>Processing data coming or going over the wire is a no-brainer with Ballerina. Seamlessly and selectively map network data into domain types for a range of formats, including JSON, EDI, and XML.</p>\n",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-guides/integration-samples/blob/main/github-pull-requests-to-stdout/main.bal#L22"
        }
      ],
      "code": "configurable string githubPAT = ?;\n\ntype PR record {\n    string url;\n    string title;\n    string state;\n    string created_at;\n    string updated_at;\n};\n\npublic function main() returns error? {\n    http:Client github = check new (\"https://api.github.com/repos\");\n    map<string> headers = {\n        \"Accept\": \"application/vnd.github.v3+json\",\n        \"Authorization\": \"token \" + githubPAT\n    };\n    \n    // Network data == program data\n    PR[] prs = check github->/octocat/Hello\\-World/pulls(headers);\n    io:println(prs);\n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">configurable</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> githubPAT </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> ?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">type</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> PR</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> record</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> url;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> title;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> state;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> created_at;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> updated_at;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">};</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">public</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> main</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    http</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Client github </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> new</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> (</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"https://api.github.com/repos\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    map&#x3C;</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">string</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">></span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> headers </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">        \"Accept\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> \"application/vnd.github.v3+json\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">,</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">        \"Authorization\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> \"token \"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> + githubPAT</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    };</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    </span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // Network data == program data</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    PR[] prs </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> github</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">->/</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">octocat</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">/</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Hello\\</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">-</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">World</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">/</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">pulls</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">headers</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">println</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">prs</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "incredible-data-transformations",
      "title": "Incredible data transformations",
      "descriptionHtml": "<p>Ballerina has cracked the challenge of mapping one kind of data value to another kind of data value, simultaneously as code and picture, so that both are simple, powerful, and boundless.</p>\n",
      "image": "/images/data-transformation.png",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-guides/integration-samples/blob/main/clientary_invoices_to_quickbooks_online_invoices/main.bal#L75"
        }
      ],
      "code": "",
      "language": "",
      "highlightedHtml": "",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "github-copilot",
      "title": "GitHub Copilot, your artificially intelligent pair programmer",
      "descriptionHtml": "<p>GitHub Copilot knows Ballerina. Why do all the work? Let Copilot do at least half of it.</p>\n",
      "image": "/images/github-copilot.png",
      "links": [],
      "code": "",
      "language": "",
      "highlightedHtml": "",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "resilience-engineering-built-in",
      "title": "Resilience engineering, built-in",
      "descriptionHtml": "<p>The built-in language features and Ballerina library features make programming in the failure-is-normal world of distributed systems as easy for every developer.</p>\n",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-guides/integration-samples/blob/main/gcalendar-new-event-to-trello-card/main.bal#L18"
        }
      ],
      "code": "http:RetryConfig retryConfig = {\n    interval: 3,\n    count: 3,\n    backOffFactor: 2.0,\n    maxWaitInterval: 20\n};\nfinal trello:Client trello = check new (apiKeyConfig, {retryConfig});\n\nservice calendar:CalendarService on calendarListener {\n    remote function onNewEvent(calendar:Event payload) returns error? {\n        // Mapping from Google Calendar Event to Trello Card\n        trello:Cards card = transform(payload);\n\n        // Add the card to the Trello list\n        var _ = check trello->addCards(card);\n    }\n\n    remote function onEventDelete(calendar:Event payload) returns error? {\n    }\n\n    remote function onEventUpdate(calendar:Event payload) returns error? {\n    }\n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">http</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">RetryConfig retryConfig </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    interval</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 3</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">,</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    count</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 3</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">,</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    backOffFactor</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 2.0</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">,</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    maxWaitInterval</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 20</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">};</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">final</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> trello</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Client trello </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> new</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> (</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">apiKeyConfig</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, {retryConfig});</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">service</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> calendar:CalendarService </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">on</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> calendarListener {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    remote</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> onNewEvent</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">calendar</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Event payload) </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">        // Mapping from Google Calendar Event to Trello Card</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        trello</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Cards card </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> transform</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">payload</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">        // Add the card to the Trello list</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">        var</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> _ </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> trello</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">-></span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">addCards</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">card</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    remote</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> onEventDelete</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">calendar</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Event payload) </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    remote</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> onEventUpdate</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">calendar</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Event payload) </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "built-in-transactions",
      "title": "Built-in transactions",
      "descriptionHtml": "<p>Eventual consistency in Data integration is nice and all, but if you really need to make sure your distributed data integrations run transactionally, then Ballerina makes that effortless and mistake-free for developers with compile-time support.</p>\n",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-guides/integration-samples/blob/main/mysql-client-with-transactions/main.bal#L22"
        }
      ],
      "code": "type Order record {|\n    string id;\n    string orderDate;\n    string productId;\n    int quantity;\n|};\n\nfinal mysql:Client db = check new (host, user, password, database, port);\n\nfunction createOrder(Order 'order) returns error? {\n    // Start a transaction.\n    transaction {\n        // Insert into `sales_order` table.\n        _ = check db->execute(`INSERT INTO sales_orders VALUES (${'order.id}, \n                ${'order.orderDate}, ${'order.productId}, ${'order.quantity})`);\n\n        // Update product quantity as per the order.\n        sql:ExecutionResult inventoryUpdate = check db->execute(`UPDATE inventory SET \n                quantity = quantity - ${'order.quantity} WHERE id = ${'order.productId}`);\n\n        // If the product is not found, rollback or else commit the transaction.\n        if inventoryUpdate.affectedRowCount == 0 {\n            rollback;\n            return error(string `Product ${'order.productId} not found.`);\n        } else {\n            check commit;\n        }\n    } on fail error e {\n        // In case of error, the transaction block is rolled back automatically.\n        return error(string `Error occurred while processing the order: ${'order.id}.`, e);\n    }\n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">type</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> Order</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> record</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">|</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> id;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> orderDate;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> productId;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    int</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> quantity;</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">|</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">};</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">final</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> mysql</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Client db </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> new</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> (</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">host</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">user</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">password</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">database</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">port</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> createOrder</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">Order</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> 'order) </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // Start a transaction.</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    transaction</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">        // Insert into `sales_order` table.</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        _ </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> db</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">-></span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">execute</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">`INSERT INTO sales_orders VALUES (${</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">'order</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">.</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">id</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">}, </span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">                ${</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">'order</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">.</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">orderDate</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">}, ${</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">'order</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">.</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">productId</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">}, ${</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">'order</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">.</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">quantity</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">})`</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">        // Update product quantity as per the order.</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        sql</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">ExecutionResult inventoryUpdate </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> db</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">-></span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">execute</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">`UPDATE inventory SET </span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">                quantity = quantity - ${</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">'order</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">.</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">quantity</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">} WHERE id = ${</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">'order</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">.</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">productId</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">}`</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">        // If the product is not found, rollback or else commit the transaction.</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        if</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> inventoryUpdate.affectedRowCount </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">==</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 0</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">            rollback</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">;</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">            return</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">string</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> `Product ${</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">'order</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">.</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">productId</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">} not found.`</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        } </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">else</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">            check</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> commit</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    } </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">on</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> fail</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> e {</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">        // In case of error, the transaction block is rolled back automatically.</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        return</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">string</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> `Error occurred while processing the order: ${</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">'order</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">.</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">id</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">}.`</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">e</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "concurrent-programming-made-simple",
      "title": "Concurrent programming made simple",
      "descriptionHtml": "<p>Sequence diagrams have been used to model concurrency for decades. Ballerina’s concurrent programming model is sequence diagrams along with various concurrency control capabilities that make concurrent programming visual and accessible to all.</p>\n",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-guides/integration-samples/blob/main/pattern-scatter-gather/main.bal#L23"
        }
      ],
      "code": "type Quote record {\n    string customerName;\n    string product;\n    int quantity;\n    decimal price;\n};\n\nfunction findBestQuote(QuoteRequest quoteReq) returns Quote {\n    // The fork statement starts with one or more named workers, \n    //  which run in parallel with each other \n    fork {\n        worker venderA returns Quote|error {\n            http:Client venderAEP = check new (venderAURL);\n            return venderAEP -> /quote.get(p = quoteReq.product, q = quoteReq.quantity);\n        }\n\n        worker venderB returns Quote|error {\n            http:Client venderBEP = check new (venderBURL);\n            return venderBEP -> /quote.get(p = quoteReq.product, q = quoteReq.quantity);\n        }\n\n        worker venderC returns Quote|error {\n            http:Client venderCEP = check new (venderCURL);\n            return venderCEP -> /quote.get(p = quoteReq.product, q = quoteReq.quantity);\n        }\n    }\n\n    // Wait for all the workers to finish and collect the results.\n    map<Quote|error> quotes = wait {venderA, venderB, venderC};\n    return bestQuote(quotes);\n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">type</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> Quote</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> record</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> customerName;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> product;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    int</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> quantity;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    decimal</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> price;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">};</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> findBestQuote</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">QuoteRequest</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\"> quoteReq</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">) </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> Quote {</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // The fork statement starts with one or more named workers, </span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    //  which run in parallel with each other </span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    fork</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        worker</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> venderA </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> Quote</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">|error</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">            http</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Client venderAEP </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> new</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> (</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">venderAURL</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">            return</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> venderAEP </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">-></span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> /</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">quote.</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">get</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">p</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> =</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> quoteReq.product, </span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">q</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> =</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> quoteReq.quantity);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        worker</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> venderB </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> Quote</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">|error</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">            http</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Client venderBEP </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> new</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> (</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">venderBURL</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">            return</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> venderBEP </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">-></span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> /</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">quote.</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">get</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">p</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> =</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> quoteReq.product, </span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">q</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> =</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> quoteReq.quantity);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        worker</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> venderC </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> Quote</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">|error</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">            http</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Client venderCEP </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> new</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> (</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">venderCURL</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">            return</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> venderCEP </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">-></span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> /</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">quote.</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">get</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">p</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> =</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> quoteReq.product, </span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">q</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> =</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> quoteReq.quantity);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // Wait for all the workers to finish and collect the results.</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    map&#x3C;</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Quote</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">|error></span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> quotes </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> wait</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {venderA, venderB, venderC};</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    return</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> bestQuote</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">quotes</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "code-is-the-picture-picture-is-the-code",
      "title": "Code is the picture / picture is the code",
      "descriptionHtml": "<p>Instead of deciphering lines of code, Ballerina programs can be viewed and edited as sequence diagrams with flow charts. This makes maintaining and understanding integration applications a breeze. Code never goes out of sync with the picture and vice versa.</p>\n",
      "image": "/images/code-is-picture.png",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-guides/integration-samples/blob/main/github-pull-requests-to-gsheets/main.bal#L18"
        }
      ],
      "code": "",
      "language": "",
      "highlightedHtml": "",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "built-in-observability",
      "title": "Built-in observability",
      "descriptionHtml": "<p>Every Ballerina program is automatically observable by any Open Telemetry tool, giving you complete control and visibility into the code’s behavior and performance.</p>\n",
      "image": "/images/screenshots-collage-final-image-transparent-v5.png",
      "links": [],
      "code": "",
      "language": "",
      "highlightedHtml": "",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "graphql-ballerina-is-graphql",
      "title": "GraphQL? Ballerina is GraphQL",
      "descriptionHtml": "<p>When you go beyond just toy GraphQL applications where you simply map GraphQL queries to database queries, Ballerina gives you first-class concepts to write any code that executes as part of the GraphQL query. <br/><br/> No GraphQL service is out of reach with Ballerina. It can create a custom-tailored, typed GraphQL client for your unique queries with ease.</p>\n",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-guides/integration-samples/tree/main/graphql_bookstore_service/main.bal"
        }
      ],
      "code": "final http:Client bookEp = check new (\"https://www.googleapis.com\");\n\nservice class Book {\n    private final readonly & BookData bookData;\n\n    function init(BookData bookData) {\n        self.bookData = bookData.cloneReadOnly();\n    }\n\n    resource function get isbn() returns string {\n        return self.bookData.isbn;\n    }\n\n    resource function get title() returns string {\n        return self.bookData.title;\n    }\n\n    resource function get reviews() returns Review|error {\n        string isbn = self.bookData.isbn;\n        GoogleBook googleBook = check bookEp->/books/v1/volumes.get(q=string `isbn:${isbn}`);\n        return let var volInfo = googleBook.items[0].volumeInfo in {\n                averageRating: volInfo.averageRating,\n                ratingsCount: volInfo.ratingsCount,\n                maturityRating: volInfo.maturityRating\n            };\n    }\n}\n\nservice /graphql on new graphql:Listener(9090) {\n    resource function get book(string isbn) returns Book? {\n        BookData? data = books[isbn];\n        return data is BookData ? new Book(data) : ();\n    }\n\n    resource function get allBooks() returns Book[] {\n        return from var bookData in books\n            select new Book(bookData);\n    }\n\n    remote function addBook(BookData bookData) returns Book|error {\n        books.add(bookData);\n        return new Book(bookData);\n    }\n}",
      "language": "sql",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">final </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">http</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">:Client bookEp </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> new (</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"https://www.googleapis.com\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">service</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> class Book {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    private</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> final </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">readonly</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> &#x26; BookData bookData;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    function</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> init</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(BookData bookData) {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">        self</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">.</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">bookData</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> =</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> bookData</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">.</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">cloneReadOnly</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">();</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    resource</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> get</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> isbn() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> string {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        return</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> self</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">.</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">bookData</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">.isbn;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    resource</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> get</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> title() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> string {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        return</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> self</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">.</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">bookData</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">.title;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    resource</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> get</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> reviews() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> Review|error {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        string isbn </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> self</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">.</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">bookData</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">.isbn;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        GoogleBook googleBook </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> bookEp</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">->/</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">books</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">/</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">v1</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">/</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">volumes</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">.</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">get</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(q</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">string </span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">`isbn:${isbn}`</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        return</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> let var volInfo </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> googleBook</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">.</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">items</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">[0].volumeInfo </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">in</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">                averageRating: </span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">volInfo</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">.</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">averageRating</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">,</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">                ratingsCount: </span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">volInfo</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">.</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">ratingsCount</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">,</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">                maturityRating: </span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">volInfo</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">.</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">maturityRating</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">            };</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">service</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> /</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">graphql </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">on</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> new graphql:Listener(</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">9090</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">) {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    resource</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> get</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> book(string isbn) </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> Book? {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        BookData? </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">data</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> =</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> books[isbn];</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        return</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> data</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> is</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> BookData ? new Book(</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">data</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">) : ();</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    resource</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> get</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> allBooks() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> Book[] {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        return</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> from</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> var bookData </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">in</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> books</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">            select</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> new Book(bookData);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    remote</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> addBook(BookData bookData) </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> Book|error {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">        books</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">.</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">add</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(bookData);</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        return</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> new Book(bookData);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "json-ballerina-is-json",
      "title": "JSON? Ballerina is JSON",
      "descriptionHtml": "<p>Javascript is JSON, and so is Ballerina. Plain data in Ballerina bear a natural resemblance to JSON values, simplifying the manipulation of JSON data. You can use the in-built <code>json</code> type if that’s your thing! Otherwise, convert to domain types for type-safe handling.</p>\n",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-guides/integration-samples/tree/main/working_with_json/ballerina/main.bal"
        }
      ],
      "code": "type InvoiceItem record {\n    string id;\n    decimal price;\n    boolean taxable;\n};\n\ntype Customer record {\n    string id;\n    string name;\n};\n\ntype Invoice record {\n    string id;\n    Customer customer;\n    InvoiceItem[] items;\n};\n\npublic function main() returns error?{\n    json invoiceData = check io:fileReadJson(\"./invoice.json\");\n\n    // Enjoy lax static typing here!\n    // Fails at runtime if the key is not present or the value is not a string.\n    string id = check invoiceData.id;\n\n    // Fails at runtime if the key is not present.\n    json items = check invoiceData.items;\n\n    // Converts to the domain type.\n    // Fails at runtime if the json value does not match the type.\n    Invoice invoice = check invoiceData.fromJsonWithType();\n\n    // Enjoy type-safe handling of json values.\n    id = invoice.id;\n    InvoiceItem[] invoiceItems = invoice.items;\n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">type</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> InvoiceItem</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> record</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> id;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    decimal</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> price;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    boolean</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> taxable;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">};</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">type</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> Customer</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> record</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> id;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> name;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">};</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">type</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> Invoice</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> record</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> id;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    Customer customer;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    InvoiceItem[] items;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">};</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">public</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> main</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">{</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    json</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> invoiceData </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">fileReadJson</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"./invoice.json\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // Enjoy lax static typing here!</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // Fails at runtime if the key is not present or the value is not a string.</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> id </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> invoiceData.id;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // Fails at runtime if the key is not present.</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    json</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> items </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> invoiceData.items;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // Converts to the domain type.</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // Fails at runtime if the json value does not match the type.</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    Invoice invoice </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> invoiceData.</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">fromJsonWithType</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">();</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // Enjoy type-safe handling of json values.</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    id </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> invoice.id;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    InvoiceItem[] invoiceItems </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> invoice.items;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "http-ballerina-is-http",
      "title": "HTTP? Ballerina is HTTP",
      "descriptionHtml": "<p>“Ballerina is HTTP on steroids.” Network abstractions in Ballerina provide a natural way to describe and consume HTTP services, allowing developers to focus on a business logic instead of boilerplate code.</p>\n",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-guides/integration-samples/tree/main/restful_api/main.bal"
        }
      ],
      "code": "configurable int port = 8080;\n\ntype Album readonly & record {|\n    string id;\n    string title;\n    string artist;\n    decimal price;\n|};\n\nservice / on new http:Listener(port) {\n    resource function get albums() returns Album[] {\n        return albums.toArray();\n    }\n\n    resource function get albums/[string id]() returns Album|http:NotFound {\n        Album? album = albums[id];\n        if album is () {\n            return http:NOT_FOUND;\n        } else {\n            return album;\n        }\n    }\n\n    resource function post albums(@http:Payload Album album) returns Album {\n        albums.add(album);\n        return album;\n    }\n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">configurable</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> int</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> port </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 8080</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">type</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> Album</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> readonly</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> &#x26;</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> record</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">|</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> id;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> title;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> artist;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    decimal</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> price;</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">|</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">};</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">service</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> / </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">on</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> new</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> http:Listener(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">port</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">) {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    resource</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> get</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> albums</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> Album[] {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        return</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> albums.</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">toArray</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">();</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    resource</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> get</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> albums</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">/[</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">string</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\"> id</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">]() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> Album</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">|</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">http</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">NotFound {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        Album</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> album </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> albums[id];</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        if</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> album </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">is</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> () {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">            return</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> http</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">NOT_FOUND;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        } </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">else</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">            return</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> album;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    resource</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> post</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> albums</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(@</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">http</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">:</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">Payload</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\"> Album</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\"> album</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">) </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> Album {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        albums.</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">add</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">album</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        return</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> album;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "connect-with-anything",
      "title": "Connect with Anything",
      "descriptionHtml": "<p>Access thousands of connectors for HTTP APIs (OpenAPI), event APIs (AsyncAPI), GraphQL services, legacy systems, and data stores, allowing seamless data transfer to and from any system, anywhere.</p>\n",
      "image": "/images/powerful-connectivity.png",
      "links": [],
      "code": "",
      "language": "",
      "highlightedHtml": "",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "12-factor-apps-for-integration-problems",
      "title": "12 Factor Apps for Integration Problems",
      "descriptionHtml": "<p>Just write integration applications like any other code. Do all 12 factors (and 3 more if you like) with all your usual tools, and don’t fear.</p>\n",
      "image": "/images/twelve-factor-apps-ballerina-integratio-grey-bg.png",
      "links": [],
      "code": "",
      "language": "",
      "highlightedHtml": "",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "open-source-zero-lock-in",
      "title": "Open Source, Zero Lock-In",
      "descriptionHtml": "<p>Being an open-source programming language, Ballerina offers the flexibility to view, modify, and run code in any environment, thus enabling seamless migration of integration code across platforms without the need for re-implementation.<br/><br/>Why get stuck with lock-in integration platforms?</p>\n",
      "image": "/images/open-source-zero-lock-in-image-transparent-bg.png",
      "links": [],
      "code": "",
      "language": "",
      "highlightedHtml": "",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "unleash-the-power-of-ai",
      "title": "Unleash the power of AI",
      "descriptionHtml": "<p>With the built-in language features and Ballerina library features, incorporating AI into your integrations can be done in a matter of seconds, enabling you to quickly build intelligent and efficient workflows.</p>\n",
      "image": "/images/Vectors-05.png",
      "links": [
        {
          "label": "Ballerina for AI",
          "href": "/use-cases/ai/"
        }
      ],
      "code": "",
      "language": "",
      "highlightedHtml": "",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "trivial-hosting-in-wso2-choreo-ipaas",
      "title": "(Extra!) Trivial hosting in WSO2 Integration Platform",
      "descriptionHtml": "<p>Manual integrations? Scheduled integrations (cron jobs)? Triggered integrations? Integrations as APIs? No problem! Write the code, attach the repo to WSO2 Integration Platform, and let it do the rest.</p>\n",
      "image": "/images/devant-ipaas.png",
      "links": [
        {
          "label": "Get started with WSO2 Integration Platform for free",
          "href": "https://wso2.com/integration-platform/"
        }
      ],
      "code": "",
      "language": "",
      "highlightedHtml": "",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    }
  ]
};

export default useCaseIntegrationData;
