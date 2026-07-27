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

const useCaseB2bData = {
  "title": "Ballerina for B2B integrations",
  "slug": "b2b",
  "description": "Ballerina is the only language with native support for B2B integrations.",
  "hero": {
    "eyebrow": "Ballerina is the only language with native support for B2B integrations.",
    "body": "It enables a seamless exchange of business data with partner networks using standard formats like X12, EDIFACT, or even custom EDI formats. Ballerina's powerful EDI data mapping and processing capabilities facilitate interoperability among data formats and simplify the use of EDI data within business apps.",
    "image": "/images/edi-intro.png",
    "ctaLabel": "Download Ballerina",
    "ctaHref": "/downloads/"
  },
  "sections": [
    {
      "type": "codeImageSplit",
      "id": "ballerina-is-edi",
      "title": "EDI? Ballerina is EDI",
      "descriptionHtml": "<p>EDI data can be loaded into Ballerina records using the built-in EDI handling capabilities. This allows developers to manipulate EDI data using the usual Ballerina syntax. Ballerina also supports the conversion of records back into EDI formats, making it possible to exchange processed data seamlessly with partner networks. With Ballerina, working with EDI data becomes as straightforward as working with any other Ballerina data type.</p>\n",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-guides/b2b-samples/blob/main/simple-edi-schema/main.bal"
        }
      ],
      "code": "import simple_edi_schema.hmart;\nimport ballerina/io;\n\npublic function main() returns error? {\n   string ediText = check io:fileReadString(\"resources/in-message.edi\");\n   hmart:HMartOrder hmartOrder = check hmart:fromEdiString(ediText);\n   foreach hmart:Items_Type item in hmartOrder.items {\n       io:println(string `Item: ${item.name}, Quantity: ${item.quantity}`);\n   }\n   hmartOrder.items[0].quantity = 5;\n   string outputEdi = check hmart:toEdiString(hmartOrder);\n   io:println(outputEdi);\n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">import</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> simple_edi_schema.hmart;</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">import</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> ballerina/io;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">public</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> main</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">   string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> ediText </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">fileReadString</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"resources/in-message.edi\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">   hmart</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">HMartOrder hmartOrder </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> hmart</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">fromEdiString</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">ediText</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">   foreach </span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">hmart</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Items_Type item </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">in</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> hmartOrder.items {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">       io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">println</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">string</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> `Item: ${</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">item</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">.</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">name</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">}, Quantity: ${</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">item</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">.</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">quantity</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">}`</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">   }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">   hmartOrder.items[</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">0</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">].quantity </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 5</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">   string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> outputEdi </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> hmart</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">toEdiString</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">hmartOrder</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">   io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">println</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">outputEdi</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "edi-business-apps",
      "title": "Unlock EDI data for business apps",
      "descriptionHtml": "<p>Developers can create Ballerina apps that perform actions on EDI data, such as calling external services with relevant EDI fields, making intelligent decisions, storing extracted data in databases, and performing data manipulations like filtering, replacing, and enrichment. These capabilities empower organizations to effectively utilize EDI data, enabling the implementation of data-driven processes and enhancing overall operational efficiency.</p>\n",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-guides/b2b-samples/blob/main/edi-in-business-apps/main.bal"
        }
      ],
      "code": "import edi_in_business_apps.hmart;\nimport ballerina/http;\nimport ballerina/io;\n\nhttp:Client salesEp = check new (url = \"http://kwLogistics\");\n\npublic function main() returns error? {\n   string ediText = check io:fileReadString(\"inFolder/message.edi\");\n   hmart:HMartOrder hmartOrder = check hmart:fromEdiString(ediText);\n   int totalQuantity = 0;\n   foreach hmart:Items_Type item in hmartOrder.items {\n       totalQuantity += item.quantity;\n   }\n   if totalQuantity > 100 {\n       json response = check salesEp->/largeOrders.post(\n           {salesOrder: hmartOrder, totalQuantity});\n       io:println(response);\n   } else {\n       json response = check salesEp->/orders.post(\n           {salesOrder: hmartOrder});\n       io:println(response);\n   }  \n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">import</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> edi_in_business_apps.hmart;</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">import</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> ballerina/http;</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">import</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> ballerina/io;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">http</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Client salesEp </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> new</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> (</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">url</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> =</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> \"http://kwLogistics\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">public</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> main</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">   string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> ediText </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">fileReadString</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"inFolder/message.edi\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">   hmart</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">HMartOrder hmartOrder </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> hmart</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">fromEdiString</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">ediText</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">   int</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> totalQuantity </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 0</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">;</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">   foreach </span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">hmart</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Items_Type item </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">in</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> hmartOrder.items {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">       totalQuantity </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">+=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> item.quantity;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">   }</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">   if</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> totalQuantity </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">></span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 100</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">       json</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> response </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> salesEp</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">->/</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">largeOrders.</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">post</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">           {salesOrder</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> hmartOrder, totalQuantity});</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">       io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">println</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">response</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">   } </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">else</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">       json</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> response </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> salesEp</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">->/</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">orders.</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">post</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">           {salesOrder</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> hmartOrder});</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">       io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">println</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">response</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">   }  </span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "edi-transform",
      "title": "Transform EDI data to any format",
      "descriptionHtml": "<p>With its powerful and graphical data mapping capabilities, Ballerina enables the seamless transformation of EDI data into formats such as JSON, XML, CSV, and more. This allows organizations to effortlessly navigate complex EDI structures and accurately perform transformations, ensuring smooth integration with both internal and external applications.</p>\n",
      "image": "/images/edi-data-mapping.png",
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
      "id": "ballerina-is-x12",
      "title": "X12? Ballerina is X12",
      "descriptionHtml": "<p>Ballerina's built-in support for X12 messages empowers organizations to seamlessly work with their partner networks using the widely adopted X12 standard. Developers can easily process, parse, and generate X12 messages, ensuring efficient data exchange between partner systems.</p>\n",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-guides/b2b-samples/blob/main/ballerina-x12/main.bal"
        }
      ],
      "code": "import ballerina/io;\nimport ballerinax/x12.supplychain.v004010.m850;\n\npublic function main() returns error? {\n    string ediText = check io:fileReadString(\"resources/messages/850_sample1.edi\");\n    m850:EDI_850_Purchase_Order purchaseOrder = check m850:fromEdiString(ediText);\n    m850:PO1_Loop_GType[] items = purchaseOrder.PO1_Loop;\n    float orderValue = 0;\n    foreach m850:PO1_Loop_GType item in items {\n        float? itemValue = item.Baseline_Item_Data?.Unit_Price * \n                item.Baseline_Item_Data?.Quantity_Ordered;\n        if itemValue is float {\n            orderValue += itemValue;\n        }\n    }\n    io:println(io:println(\"Total order value: \" + orderValue.toString()));\n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">import</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> ballerina/io;</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">import</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> ballerinax/x12.supplychain.v004010.m850;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">public</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> main</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> ediText </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">fileReadString</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"resources/messages/850_sample1.edi\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    m850</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">EDI_850_Purchase_Order purchaseOrder </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> m850</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">fromEdiString</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">ediText</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    m850</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">PO1_Loop_GType[] items </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> purchaseOrder.PO1_Loop;</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    float</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> orderValue </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 0</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">;</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    foreach </span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">m850</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">PO1_Loop_GType item </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">in</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> items {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">        float</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">? itemValue </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> item.Baseline_Item_Data?.Unit_Price </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">*</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> </span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">                item.Baseline_Item_Data?.Quantity_Ordered;</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        if</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> itemValue </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">is</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> float</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">            orderValue </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">+=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> itemValue;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">println</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">println</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"Total order value: \"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> +</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> orderValue.</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">toString</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">()));</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "ballerina-is-edifact",
      "title": "EDIFACT? Ballerina is EDIFACT",
      "descriptionHtml": "<p>With Ballerina's built-in support for EDIFACT, organizations can easily handle EDIFACT messages, process complex data structures, and exchange information with partner networks. By leveraging Ballerina's intuitive features, developers can streamline EDIFACT integration, ensuring smooth communication with trading partners.</p>\n",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-guides/b2b-samples/blob/main/ballerina-edifact/main.bal"
        }
      ],
      "code": "import ballerina/io;\nimport ballerinax/edifact.finance.d96a.mINVOIC;\n\npublic function main() returns error? {\n    string ediText = check io:fileReadString(\"resources/invoice_message_in.edi\");\n    mINVOIC:EDI_INVOIC_Invoice_message invoice = check mINVOIC:fromEdiString(ediText);\n    string? paymentMethod = \n            invoice?.PAYMENT_INSTRUCTIONS?.PAYMENT_INSTRUCTION_DETAILS?.Payment_means;\n    if paymentMethod != \"42\" {\n        return;\n    }\n    foreach mINVOIC:Segment_group_15_GType allowance in invoice.Segment_group_15 {\n        if allowance.ALLOWANCE_OR_CHARGE.Allowance_or_charge_qualifier != \"A\" ||\n            allowance.ALLOWANCE_OR_CHARGE.Settlement != \"6\" {\n                continue;\n        }\n        mINVOIC:Segment_group_19_GType[] amounts = allowance.Segment_group_19;\n        foreach mINVOIC:Segment_group_19_GType amount in amounts {\n            string? sAmount = amount.MONETARY_AMOUNT_2.MONETARY_AMOUNT_1.Monetary_amount;\n            if sAmount is string {\n                decimal dAmount = check decimal:fromString(sAmount);\n                dAmount += dAmount * <decimal>.1;\n                amount.MONETARY_AMOUNT_2.MONETARY_AMOUNT_1.Monetary_amount = dAmount.toString();\n            }\n        }\n    }\n    io:println(invoice.toJson());\n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">import</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> ballerina/io;</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">import</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> ballerinax/edifact.finance.d96a.mINVOIC;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">public</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> main</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> ediText </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">fileReadString</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"resources/invoice_message_in.edi\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    mINVOIC</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">EDI_INVOIC_Invoice_message invoice </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> mINVOIC</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">fromEdiString</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">ediText</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">? paymentMethod </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> </span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">            invoice?.PAYMENT_INSTRUCTIONS?.PAYMENT_INSTRUCTION_DETAILS?.Payment_means;</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    if</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> paymentMethod </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">!=</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> \"42\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        return</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    foreach </span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">mINVOIC</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Segment_group_15_GType allowance </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">in</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> invoice.Segment_group_15 {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        if</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> allowance.ALLOWANCE_OR_CHARGE.Allowance_or_charge_qualifier </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">!=</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> \"A\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> ||</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">            allowance.ALLOWANCE_OR_CHARGE.Settlement </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">!=</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> \"6\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">                continue</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        mINVOIC</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Segment_group_19_GType[] amounts </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> allowance.Segment_group_19;</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        foreach </span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">mINVOIC</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Segment_group_19_GType amount </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">in</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> amounts {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">            string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">? sAmount </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> amount.MONETARY_AMOUNT_2.MONETARY_AMOUNT_1.Monetary_amount;</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">            if</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> sAmount </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">is</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">                decimal</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> dAmount </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> decimal</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">fromString</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">sAmount</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">                dAmount </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">+=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> dAmount </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">*</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> &#x3C;</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">decimal</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">></span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">.</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">1</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">                amount.MONETARY_AMOUNT_2.MONETARY_AMOUNT_1.Monetary_amount </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> dAmount.</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">toString</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">();</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">            }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">println</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(invoice.</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">toJson</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">());</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "spec-deviations",
      "title": "Partners don't follow standards? No problem!",
      "descriptionHtml": "<p>Ballerina accommodates partner-specific EDI variations. Developers can convert them to organizations' standard formats using Ballerina's robust tools, ensuring effective collaboration with partners, regardless of their specific variations.</p>\n",
      "image": "/images/EDI-schema-variations.png",
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
      "id": "custom-edi",
      "title": "Go beyond standards and work with custom EDI formats",
      "descriptionHtml": "<p>Ballerina empowers organizations to create tailored EDI schemas with custom message structures and constraints. Its robust tools generate code to seamlessly handle these custom EDI schemas, facilitating the representation and communication of data beyond standard EDIs formats.</p>\n",
      "image": "/images/custom-edi.png",
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
      "id": "apis-are-new-dll",
      "title": "Extra! Start integrating with the partner network instantly with Ballerina + WSO2 Integration Platform",
      "descriptionHtml": "<p>Unlock instant partner integration with Ballerina’s EDI support and WSO2 Integration Platform. Build, deploy, and manage Ballerina apps with production-ready deployment, CI/CD pipelines, multi-environment support, and robust monitoring. Accelerate your EDI-based partner integration journey with the combined power of Ballerina and an AI-powered cloud-native integration platform.</p>\n",
      "image": "/images/devant-ipaas.png",
      "links": [
        {
          "label": "View code on GitHub",
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

export default useCaseB2bData;
