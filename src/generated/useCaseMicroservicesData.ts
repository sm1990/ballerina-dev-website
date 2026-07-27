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

const useCaseMicroservicesData = {
  "title": "Ballerina for microservices",
  "slug": "microservices",
  "description": "The ultimate toolset for seamless microservices development.",
  "hero": {
    "eyebrow": "With its visionary design and cutting-edge features, Ballerina empowers developers to create robust, scalable, and easily maintainable microservices architectures.",
    "body": "The Ballerina programming language effortlessly facilitates the construction and seamless deployment of microservices, making the process remarkably straightforward for developers.",
    "image": "/images/msa-intro.png",
    "ctaLabel": "Download Ballerina",
    "ctaHref": "/downloads/"
  },
  "sections": [
    {
      "type": "codeImageSplit",
      "id": "purposefully-built",
      "title": "Purposefully crafted for microservices integration",
      "descriptionHtml": "<p>Ballerina is specifically engineered to thrive in the domain of distributed systems. Every facet of Ballerina, from its syntax to its constructs and abstractions, is thoughtfully designed to streamline the integration, development, deployment, and management of microservices.</p>\n",
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
      "id": "data-persistence",
      "title": "Robust data persistence",
      "descriptionHtml": "<p>Ballerina's data persistence capabilities streamline microservices development by providing a simple, language-native approach to different data stores. With built-in connectors, Ballerina facilitates seamless communication with various data sources, reducing integration complexities. Also the bal persist CLI tool allows users to use the defined data model to generate client API to access the data in the given data store. This type-safe client API ensures data consistency and error handling, enhancing reliability. Ballerina's data orchestration features enable efficient data transformations and manipulation, crucial for microservices processing diverse data formats. Ballerina's robust data persistence capabilities empower microservices to efficiently manage and interact with data, simplifying development and ensuring data integrity in complex distributed systems.</p>\n",
      "image": "/images/bal-persist-diagram.png",
      "links": [
        {
          "label": "Learn how to manage data persistence using bal persist",
          "href": "https://ballerina.io/learn/manage-data-persistence-with-bal-persist/"
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
      "id": "natively-concurrent",
      "title": "Native support for concurrency",
      "descriptionHtml": "<p>Ballerina combines the benefits of static typing and native support for concurrency. By catching errors early during development, the language ensures greater reliability and stability in microservices systems. Additionally, Ballerina's concurrency support enables developers to handle concurrent operations efficiently, improving the performance and responsiveness of their microservices.</p>\n",
      "links": [
        {
          "label": "View on Ballerina Central",
          "href": "https://central.ballerina.io/ballerina/lang.concurrent/latest"
        }
      ],
      "code": "import ballerina/http;\n\ntype Person record {|\n    string name;\n    boolean employed;\n|};\n\ntype Summary record {|\n    int count;\n    int average;\n|};\n\nint[] tasks = [1, 4, 5, 2, 7, 4];\n\nservice on new http:Listener(8080) {\n    resource function post person\\-tasks(Person[] members) returns Summary {\n        return process(members, tasks);\n    }\n}\n\nfunction process(Person[] members, int[] tasks) returns Summary {\n    worker w1 {\n        Person[] employedMembers = from Person p in members where p.employed select p;\n        int count = employedMembers.length();\n        count -> w2;\n        count -> function;\n    }\n\n    worker w2 {\n        int total = int:sum(...tasks);\n        int employedCount = <- w1;\n        int avg = employedCount == 0 ? 0 : total / employedCount;\n        avg -> function;\n    }\n\n    int count = <- w1;\n    int average = <- w2;\n    return {count, average};\n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">import</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> ballerina/http;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">type</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> Person</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> record</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">|</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> name;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    boolean</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> employed;</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">|</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">};</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">type</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> Summary</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> record</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">|</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    int</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> count;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    int</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> average;</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">|</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">};</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">int</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">[] tasks </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> [</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">1</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">4</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">5</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">2</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">7</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">4</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">];</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">service</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> on</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> new</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> http:Listener(</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">8080</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">) {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    resource</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> post</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> person</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">\\-tasks(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">Person</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">[] </span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">members</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">) </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> Summary {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        return</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> process</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">members</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">tasks</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> process</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">Person</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">[] </span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">members</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">int</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">[] </span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">tasks</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">) </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> Summary {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    worker</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> w1 {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        Person[] employedMembers </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> from</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> Person p </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">in</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> members </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">where</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> p.employed </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">select</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> p;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">        int</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> count </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> employedMembers.</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">length</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">();</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        count </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">-></span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> w2;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        count </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">-></span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    worker</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> w2 {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">        int</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> total </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> int</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">sum</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(...</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">tasks</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">        int</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> employedCount </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> &#x3C;-</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> w1;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">        int</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> avg </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> employedCount </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">==</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 0</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> ?</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 0</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> :</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> total / employedCount;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        avg </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">-></span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    int</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> count </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> &#x3C;-</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> w1;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    int</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> average </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> &#x3C;-</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> w2;</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    return</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {count, average};</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "type-safe",
      "title": "Type-safe",
      "descriptionHtml": "<p>Ballerina emphasizes type safety in inter-service communication. This enables compile-time checks, reducing errors and enhancing code quality. Additionally, it simplifies maintenance and acts as clear documentation for microservices. As a result, services interact seamlessly with precise data types, preventing data mismatches and ensuring robust communication between microservices in a type-safe manner, improving reliability and maintainability of the microservices architecture.</p>\n",
      "links": [],
      "code": "import ballerina/http;\n\ntype UserRecord record {\nstring userId;\nstring username;\nint age;\n};\n\n// In-memory store for user data\nmap<UserRecord> userStore = {};\n\n// HTTP service to manage users\nservice / on new http:Listener(8080) {\n\n    // UserRecord record type guarantees that the payload sent to user endpoint with a POST\n    // method is always of shape UserRecord\n    resource function post user(UserRecord user) returns json {\n        userStore[user.userId] = user;\n        json response = {\"message\": \"User created successfully\"};\n        return response;\n    }\n\n    // UserRecord record type guarantees that the response sent back to client  with a GET\n    // method is always of shape UserRecord\n    resource function get user(string userId) returns UserRecord? {\n        UserRecord? user = userStore[userId];\n        return user;\n    }\n}\n```",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">import</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> ballerina/http;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">type</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> UserRecord</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> record</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> userId;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> username;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">int</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> age;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">};</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">// In-memory store for user data</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">map&#x3C;</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">UserRecord</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">></span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> userStore </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {};</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">// HTTP service to manage users</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">service</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> / </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">on</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> new</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> http:Listener(</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">8080</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">) {</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // UserRecord record type guarantees that the payload sent to user endpoint with a POST</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // method is always of shape UserRecord</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    resource</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> post</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> user</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">UserRecord</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\"> user</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">) </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> json</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        userStore[user.userId] </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> user;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">        json</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> response </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"message\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> \"User created successfully\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">};</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        return</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> response;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // UserRecord record type guarantees that the response sent back to client  with a GET</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // method is always of shape UserRecord</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    resource</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> get</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> user</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">string</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\"> userId</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">) </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> UserRecord</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        UserRecord</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> user </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> userStore[userId];</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        return</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> user;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">```</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "designed-for-failure",
      "title": "Designed for failure",
      "descriptionHtml": "<p>By incorporating proven patterns and best practices, Ballerina equips you with the tools to proactively address failure scenarios, ensuring system stability and minimizing downtime and offering a revolutionary approach to microservices development that is inherently <code>designed for failure</code> with its built-in fault-tolerance mechanisms and circuit-breaking capabilities.</p>\n",
      "links": [
        {
          "label": "Learn about the service resiliency",
          "href": "https://ballerina.io/learn/service-resiliency/"
        }
      ],
      "code": "string title;\n    string artist;\n};\n\npublic function main() returns error? {\n    http:Client albumClient = check new (\"localhost:9090\",\n        circuitBreaker = {\n            // The failure calculation window measures how long the circuit breaker keeps the\n            // statistics for the operations.\n            rollingWindow: {\n                // The period is in seconds for which the failure threshold is calculated.\n                timeWindow: 10,\n                // The granularity (in seconds) at which the time window slides.\n                // The rolling window is divided into buckets and slides by these increments.\n                bucketSize: 2,\n                // The minimum number of requests in the rolling window that trips the circuit.\n                requestVolumeThreshold: 0\n            },\n            // The threshold for request failures. When this threshold exceeds, the circuit trips.\n            // This is the ratio between failures and total requests. The ratio is calculated using\n            // the requests received within the given rolling window.\n            failureThreshold: 0.2,\n            // The period (in seconds) to wait before attempting to make another request to the upstream service.\n            resetTime: 10,\n            // HTTP response status codes that are considered as failures\n            statusCodes: [400, 404, 500]\n\n        }\n    );\n    Album[] payload = check albumClient->/albums;\n    io:println(payload);\n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> title;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> artist;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">};</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">public</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> main</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    http</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Client albumClient </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> new</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> (</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"localhost:9090\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">,</span></span>\n<span class=\"line\"><span style=\"color:#E36209;--shiki-dark:#FFAB70\">        circuitBreaker</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> =</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">            // The failure calculation window measures how long the circuit breaker keeps the</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">            // statistics for the operations.</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">            rollingWindow</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">                // The period is in seconds for which the failure threshold is calculated.</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">                timeWindow</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 10</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">,</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">                // The granularity (in seconds) at which the time window slides.</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">                // The rolling window is divided into buckets and slides by these increments.</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">                bucketSize</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 2</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">,</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">                // The minimum number of requests in the rolling window that trips the circuit.</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">                requestVolumeThreshold</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 0</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">            },</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">            // The threshold for request failures. When this threshold exceeds, the circuit trips.</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">            // This is the ratio between failures and total requests. The ratio is calculated using</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">            // the requests received within the given rolling window.</span></span>\n<span class=\"line\"><span style=\"color:#E36209;--shiki-dark:#FFAB70\">            failureThreshold</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 0.2</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">,</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">            // The period (in seconds) to wait before attempting to make another request to the upstream service.</span></span>\n<span class=\"line\"><span style=\"color:#E36209;--shiki-dark:#FFAB70\">            resetTime</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 10</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">,</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">            // HTTP response status codes that are considered as failures</span></span>\n<span class=\"line\"><span style=\"color:#E36209;--shiki-dark:#FFAB70\">            statusCodes</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> [</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">400</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">404</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">500</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">]</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    );</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    Album[] payload </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> albumClient</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">->/</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">albums;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">println</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">payload</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "test-framework",
      "title": "Harnessing Ballerina's test framework for success",
      "descriptionHtml": "<p>Ballerina's test framework is a powerful asset for microservices development, ensuring top-notch quality and reliability. With support for unit, integration, and functional testing, developers can cover all critical aspects of their microservices. The framework seamlessly integrates with Ballerina, eliminating complexity and enabling easy execution within the development environment.</p>\n",
      "links": [
        {
          "label": "Learn how to use Ballerina test framework",
          "href": "https://ballerina.io/learn/test-ballerina-code/test-a-simple-function/"
        }
      ],
      "code": "// Sends an email to the specified email addresses\n// and returns an error if found.\nfunction sendNotification(string[] emailIds) returns error? {\n    email:Message msg = {\n        'from: \"builder@abc.com\",\n        subject: \"Error Alert ...\",\n        to: emailIds,\n        body: \"\"\n    };\n    return smtpClient -> sendMessage(msg);\n}\n\n@test:Config { }\nfunction testSendNotification() {\n    smtpClient = test:mock(email:SmtpClient);\n    // Stubs the `send` method of the `mockSmtpClient` to do nothing.\n    // This is used for functions with an optional or no return type.\n    test:prepare(smtpClient).when(\"sendMessage\").doNothing();\n    string[] emailIds = [\"user1@test.com\", \"user2@test.com\"];\n    error? err = sendNotification(emailIds);\n    test:assertEquals(err, ());\n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">// Sends an email to the specified email addresses</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">// and returns an error if found.</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> sendNotification</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">[] </span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">emailIds</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">) </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    email</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Message msg </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        'from</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> \"builder@abc.com\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">,</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        subject</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> \"Error Alert ...\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">,</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        to</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> emailIds,</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        body</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> \"\"</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    };</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    return</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> smtpClient </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">-></span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> sendMessage</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">msg</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">@</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">test</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">:</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">Config</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> { }</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> testSendNotification</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">() {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    smtpClient </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> test</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">mock</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">email</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">SmtpClient);</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // Stubs the `send` method of the `mockSmtpClient` to do nothing.</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // This is used for functions with an optional or no return type.</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    test</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">prepare</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">smtpClient</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">).</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">when</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"sendMessage\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">).</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">doNothing</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">();</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">[] emailIds </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> [</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"user1@test.com\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"user2@test.com\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">];</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> err </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> sendNotification</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">emailIds</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    test</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">assertEquals</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">err</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, ());</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "network-awareness",
      "title": "Network-awareness for seamless integration",
      "descriptionHtml": "<p>Microservices communicate extensively over networks, making integration a crucial aspect of their design. Ballerina shines in this area with its built-in network awareness. It seamlessly integrates with various protocols (HTTP, gRPC, and more) and data formats (JSON, XML) commonly used in microservices architectures.</p>\n",
      "image": "/images/network-awareness.png",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-guides/integration-samples/blob/main/graphql_bookstore_service/main.bal"
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
      "id": "integration-capabilities",
      "title": "Powerful integration capabilities",
      "descriptionHtml": "<p>Unlocking the power of seamless integration, Ballerina shines with its exceptional capability to connect and interact with a vast array of external systems and services. With an extensive range of connectors at its disposal, Ballerina effortlessly integrates with databases, message brokers, web services, and more.</p>\n",
      "links": [
        {
          "label": "Learn how to consume messages with Kafka",
          "href": "https://ballerina.io/learn/by-example/kafka-service-consume-message/"
        }
      ],
      "code": "public type Order readonly & record {\n    int orderId;\n    string productName;\n    decimal price;\n    boolean isValid;\n};\n\nlistener kafka:Listener orderListener = new (kafka:DEFAULT_URL, {\n    groupId: \"order-group-id\",\n    topics: \"order-topic\"\n});\n\nservice on orderListener {\n\n    remote function onConsumerRecord(Order[] orders) returns error? {\n        // The set of orders received by the service are processed one by one.\n        check from Order 'order in orders\n            where 'order.isValid\n            do {\n                log:printInfo(string `Received valid order for ${'order.productName}`);\n            };\n    }\n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">public</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> type</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> Order</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> readonly</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> &#x26;</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> record</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    int</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> orderId;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> productName;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    decimal</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> price;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    boolean</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> isValid;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">};</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">listener</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> kafka</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Listener orderListener </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> new</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> (</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">kafka</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">DEFAULT_URL, {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    groupId</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> \"order-group-id\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">,</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    topics</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> \"order-topic\"</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">});</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">service</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> on</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> orderListener {</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    remote</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> onConsumerRecord</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">Order</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">[] </span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">orders</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">) </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">        // The set of orders received by the service are processed one by one.</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        check</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> from</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> Order 'order </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">in</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> orders</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">            where</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> 'order.isValid</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">            do</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">                log</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">printInfo</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">string</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> `Received valid order for ${</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">'order</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">.</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">productName</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">}`</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">            };</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "http2-native",
      "title": "Ballerina's native HTTP/2 support",
      "descriptionHtml": "<p>Revolutionize your microservices architecture with Ballerina's cutting-edge native support for HTTP/2. Say goodbye to latency and embrace lightning-fast communication between your services through the power of multiplexing. Experience optimal resource utilization and bandwidth efficiency with advanced features such as server push and stream prioritization.</p>\n",
      "image": "/images/http2-ballerina.png",
      "links": [
        {
          "label": "View on Ballerina Central",
          "href": "https://central.ballerina.io/ballerina/http/latest"
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
      "id": "ballerina-with-graalvm",
      "title": "Ballerina and GraalVM fuel microservices with lightning-fast performance",
      "descriptionHtml": "<p>With this duo, your microservices will reach new heights of efficiency and responsiveness, leaving competitors in the dust. Ballerina's seamless integration with GraalVM harnesses the power of just-in-time compilation and native image generation, resulting in optimized execution and unparalleled performance. Stay ahead of the game with Ballerina and GraalVM, and experience microservices performance like never before.</p>\n",
      "image": "/images/graalvm-ballerina.png",
      "links": [
        {
          "label": "Learn how to build a native executable",
          "href": "/learn/graalvm-executable-overview/"
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
      "id": "bottom-up-top-down",
      "title": "Blend of top-down and bottom-up development",
      "descriptionHtml": "<p>Ballerina revolutionizes microservices development by offering unparalleled support for both top-down and bottom-up approaches. Developers can effortlessly design their microservices architecture with Ballerina's intuitive syntax and design tools, allowing for clear architectural vision and easier collaboration. Alternatively, they can build individual microservices with precision and speed, seamlessly integrating them into a cohesive architecture.</p>\n",
      "image": "/images/architecture-view.png",
      "links": [
        {
          "label": "Go to the documentation of Architecture View",
          "href": "/learn/vs-code-extension/implement-the-code/ballerina-visualizer-view/"
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
      "id": "devops-agility",
      "title": "Accelerating DevOps agility",
      "descriptionHtml": "<p>Ballerina promotes DevOps practices by offering seamless integration with popular container platforms like Docker and Kubernetes. It supports containerization and provides native support for deployment on container orchestration platforms, facilitating efficient scaling and management of microservices.</p>\n",
      "image": "/images/devops-agility.png",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-platform/ballerina-distribution/blob/v2201.5.0/examples/c2c-k8s-deployment/Cloud.toml"
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
      "id": "msa-tracing",
      "title": "Ballerina enables seamless monitoring of microservices",
      "descriptionHtml": "<p>Ballerina's tracing capabilities go beyond basic monitoring. With seamless integration with popular tracing frameworks like Jaeger and OpenTelemetry, developers can effortlessly instrument their microservices with tracing spans, enabling end-to-end tracing and analysis of complex transaction flows.</p>\n",
      "image": "/images/screenshots-collage-final-image-transparent-v5.png",
      "links": [
        {
          "label": "Learn how to observe Ballerina programs",
          "href": "/learn/overview-of-ballerina-observability/"
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

export default useCaseMicroservicesData;
