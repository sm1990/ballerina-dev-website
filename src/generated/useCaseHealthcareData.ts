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

const useCaseHealthcareData = {
  "title": "Ballerina for healthcare",
  "slug": "healthcare",
  "description": "Write code with healthcare-friendly abstractions.",
  "hero": {
    "eyebrow": "Ballerina is the only integration language built for healthcare.",
    "body": "With its native support for healthcare standards like FHIR, HL7, and X12, Ballerina enables rapid health tech application development. Develop your healthcare solutions with Ballerina and make a difference in the healthcare sector today.",
    "image": "/images/health-intro.png",
    "ctaLabel": "Download Ballerina",
    "ctaHref": "/downloads/"
  },
  "sections": [
    {
      "type": "codeImageSplit",
      "id": "why-ballerina-for-healthcare-apps",
      "title": "What makes Ballerina the ideal choice for developing healthcare applications?",
      "descriptionHtml": "<p>Java and <a href=\"https://hapifhir.io/\">HAPI</a> have long been the de facto for health app development. However, cloud-native healthcare application development goes beyond dealing with objects and frameworks. This domain needs a fresh architecture and technology that treats healthcare standards like FHIR and HL7 as first-class citizens in the language, alongside concepts like JSON and APIs.<br/><br/></p>\n",
      "image": "/images/health-bal-pkgs.png",
      "links": [
        {
          "label": "View on Ballerina Central",
          "href": "https://central.ballerina.io/ballerinax?q=health&page=1"
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
      "id": "ballerina-is-fhir",
      "title": "FHIR? Ballerina is FHIR",
      "descriptionHtml": "<p>With built-in support for FHIR (Fast Healthcare Interoperability Resources), Ballerina makes it easy to develop and deploy healthcare applications that can exchange and process FHIR resources. Ballerina's native FHIR capabilities enable healthcare developers to build scalable and flexible healthcare solutions that can adapt to changing healthcare needs and standards.</p>\n",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-guides/healthcare-samples/blob/main/working-with-fhir/working_with_fhir_parsing.bal"
        }
      ],
      "code": "public function main() returns error? {\n    // The following example is a simple serialized Patient resource to parse\n    json input = {\n        \"resourceType\": \"Patient\",\n        \"name\": [\n            {\n                \"family\": \"Simpson\"\n            }\n        ]\n    };\n\n    // Parse it - you can pass the input (as a string or a json) and the\n    // type of the resource you want to parse.\n    international401:Patient patient = check fhirParser:parse(input).ensureType();\n\n    // Access the parsed data\n    fhir:HumanName[]? names = patient.name;\n    if names is () || names.length() == 0 {\n        return error(\"Failed to parse the names\");\n    }\n    io:println(\"Family Name: \", names[0]);\n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">public</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> main</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // The following example is a simple serialized Patient resource to parse</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    json</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> input </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">        \"resourceType\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> \"Patient\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">,</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">        \"name\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> [</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">            {</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">                \"family\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> \"Simpson\"</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">            }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        ]</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    };</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // Parse it - you can pass the input (as a string or a json) and the</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // type of the resource you want to parse.</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    international401</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Patient patient </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> fhirParser</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">parse</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">input</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">).</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">ensureType</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">();</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // Access the parsed data</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    fhir</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">HumanName[]? names </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> patient.name;</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    if</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> names </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">is</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> () </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">||</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> names.</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">length</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">==</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 0</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        return</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"Failed to parse the names\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">println</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"Family Name: \"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">names</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">[</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">0</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">]);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "ballerina-is-hl7",
      "title": "HL7?  Ballerina is HL7",
      "descriptionHtml": "<p>Ballerina offers built-in support for the HL7 messaging standard, which is still the most commonly used standard in the healthcare industry to facilitate the exchange of information between different systems. With Ballerina, parsing HL7 messages is a breeze, simplifying the processing and exchange of healthcare data.</p>\n",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-guides/healthcare-samples/blob/main/working-with-hl7/working_with_hl7_parsing.bal"
        }
      ],
      "code": "// The following example is a simple serialized HL v2.3 ADT A01 message.\nfinal string msg = \"MSH|^~\\\\&|ADT1|GOOD HEALTH HOSPITAL|GHH LAB, INC.|GOOD HEALTH HOSPITAL|\" +\n\"198808181126|SECURITY|ADT^A01^ADT_A01|MSG00001|P|2.3||\\rEVN|A01|200708181123||\" +\n\"\\rPID|1||PATID1234^5^M11^ADT1^MR^GOOD HEALTH HOSPITAL~123456789^^^USSSA^SS||\" +\n\"BATMAN^ADAM^A^III||19610615|M||C|2222 HOME STREET^^GREENSBORO^NC^27401-1020|GL|\" +\n\"(555) 555-2004|(555)555-2004||S||PATID12345001^2^M10^ADT1^AN^A|444333333|987654^NC|\" +\n\"\\rNK1|1|NUCLEAR^NELDA^W|SPO^SPOUSE||||NK^NEXT OF KIN$\\rPV1|1|I|2000^2012^01||||\" +\n\"004777^ATTEND^AARON^A|||SUR||||ADM|A0|\";\n\npublic function main() returns error? {\n    // This message, ADT^A01 is an HL7 data type consisting of several components, so we\n    // will cast it as such. The ADT_A01 class extends from Message, providing specialized\n    // accessors for ADT^A01's segments.\n    //  \n    // Ballerina HL7 provides several versions of the ADT_A01 record type, each in a\n    // different package (note the import statement above) corresponding to the HL7\n    // version for the message.\n    hl7v23:ADT_A01 adtMsg = check hl7:parse(msg).ensureType(hl7v23:ADT_A01);\n    hl7v23:XPN[] patientName = adtMsg.pid.pid5;\n    io:println(\"Family Name: \", patientName[0].xpn1);\n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">// The following example is a simple serialized HL v2.3 ADT A01 message.</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">final</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> msg </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> \"MSH|^~</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">\\\\</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">&#x26;|ADT1|GOOD HEALTH HOSPITAL|GHH LAB, INC.|GOOD HEALTH HOSPITAL|\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> +</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"198808181126|SECURITY|ADT^A01^ADT_A01|MSG00001|P|2.3||</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">\\r</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">EVN|A01|200708181123||\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> +</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">\\r</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">PID|1||PATID1234^5^M11^ADT1^MR^GOOD HEALTH HOSPITAL~123456789^^^USSSA^SS||\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> +</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"BATMAN^ADAM^A^III||19610615|M||C|2222 HOME STREET^^GREENSBORO^NC^27401-1020|GL|\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> +</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"(555) 555-2004|(555)555-2004||S||PATID12345001^2^M10^ADT1^AN^A|444333333|987654^NC|\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> +</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">\\r</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">NK1|1|NUCLEAR^NELDA^W|SPO^SPOUSE||||NK^NEXT OF KIN$</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">\\r</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">PV1|1|I|2000^2012^01||||\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> +</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"004777^ATTEND^AARON^A|||SUR||||ADM|A0|\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">public</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> main</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // This message, ADT^A01 is an HL7 data type consisting of several components, so we</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // will cast it as such. The ADT_A01 class extends from Message, providing specialized</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // accessors for ADT^A01's segments.</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    //  </span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // Ballerina HL7 provides several versions of the ADT_A01 record type, each in a</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // different package (note the import statement above) corresponding to the HL7</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // version for the message.</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    hl7v23</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">ADT_A01 adtMsg </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> hl7</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">parse</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">msg</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">).</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">ensureType</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">hl7v23</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">ADT_A01);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    hl7v23</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">XPN[] patientName </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> adtMsg.pid.pid5;</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">println</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"Family Name: \"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">patientName</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">[</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">0</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">].xpn1);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "powerful-health-data-mapping",
      "title": "Powerful health data mapping",
      "descriptionHtml": "<p>Ballerina makes data mapping seamless through its pre-built HL7v2.x to FHIR transformation functionalities, making short work of healthcare data mapping tasks. Ballerina has cracked the challenge of mapping one kind of data value to another kind of data value, simultaneously as code and picture, so that both are simple, powerful, and boundless.</p>\n",
      "image": "/images/health-data-mapping.png",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-guides/healthcare-samples/blob/main/hl7v2-to-fhir/main.bal"
        }
      ],
      "code": "final string msg =\n\"MSH|^~\\\\&|ADT1|GOOD HEALTH HOSPITAL|GHH LAB, INC.|GOOD HEALTH\" +\n\"HOSPITAL|198808181126|SECURITY|ADT^A01^ADT_A01|MSG00001|P|2.3||\\rEVN|A01|\" +\n\"200708181123||\\rPID|1||PATID1234^5^M11^ADT1^MR^GOOD HEALTH HOSPITAL~123456789^^^USSSA^SS||\" +\n\"BATMAN^ADAM^A^III||19610615|M||C|2222 HOME STREET^^GREENSBORO^NC^27401-1020|GL|\" +\n\"(555)555-2004|(555)555-2004||S||PATID12345001^2^M10^ADT1^AN^A|444333333|987654^NC|\" +\n\"\\rNK1|1|NUCLEAR^NELDA^W|SPO^SPOUSE||||NK^NEXT OF KIN$\\rPV1|1|I|2000^2012^01||||\" +\n\"004777^ATTEND^AARON^A|||SUR||||ADM|A0|\";\n\npublic function main() returns error? {\n    // Transform HL7v2 message to FHIR R4.\n    // You can pass a HL7v2 message and get a FHIR R4 Bundle based on\n    // the mappings defined at\n    // https://build.fhir.org/ig/HL7/v2-to-fhir/branches/master/datatype_maps.html.\n    json v2tofhirResult = check v2tofhirr4:v2ToFhir(msg);\n    io:println(\"Transformed FHIR message: \", v2tofhirResult.toString());\n\n    // v2tofhirr4 library exposes these low level functions as well,\n    // In this case, by using stringToHl7 function you can pass a HL7v2 message string and get a parsed HL7v2 message model.\n    hl7:Message hl7msg = check v2tofhirr4:stringToHl7(msg);\n    if (hl7msg is hl7v23:ADT_A01) {\n        // if you want to work with HL7v2 segments directly.\n        // Transform HL7v2 PID to FHIR R4 Patient Name.\n        r4:HumanName[]? patientName = v2tofhirr4:pidToPatientName(hl7msg.pid.pid5,\n                hl7msg.pid.pid9);\n        if patientName is r4:HumanName[] {\n            io:println(\"HL7v23 PID Patient Name: \", patientName[0].toString());\n        }\n    }\n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">final</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> msg </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"MSH|^~</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">\\\\</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">&#x26;|ADT1|GOOD HEALTH HOSPITAL|GHH LAB, INC.|GOOD HEALTH\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> +</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"HOSPITAL|198808181126|SECURITY|ADT^A01^ADT_A01|MSG00001|P|2.3||</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">\\r</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">EVN|A01|\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> +</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"200708181123||</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">\\r</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">PID|1||PATID1234^5^M11^ADT1^MR^GOOD HEALTH HOSPITAL~123456789^^^USSSA^SS||\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> +</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"BATMAN^ADAM^A^III||19610615|M||C|2222 HOME STREET^^GREENSBORO^NC^27401-1020|GL|\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> +</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"(555)555-2004|(555)555-2004||S||PATID12345001^2^M10^ADT1^AN^A|444333333|987654^NC|\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> +</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">\\r</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">NK1|1|NUCLEAR^NELDA^W|SPO^SPOUSE||||NK^NEXT OF KIN$</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">\\r</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">PV1|1|I|2000^2012^01||||\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> +</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"004777^ATTEND^AARON^A|||SUR||||ADM|A0|\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">public</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> main</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // Transform HL7v2 message to FHIR R4.</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // You can pass a HL7v2 message and get a FHIR R4 Bundle based on</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // the mappings defined at</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // https://build.fhir.org/ig/HL7/v2-to-fhir/branches/master/datatype_maps.html.</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    json</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> v2tofhirResult </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> v2tofhirr4</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">v2ToFhir</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">msg</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">println</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"Transformed FHIR message: \"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, v2tofhirResult.</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">toString</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">());</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // v2tofhirr4 library exposes these low level functions as well,</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // In this case, by using stringToHl7 function you can pass a HL7v2 message string and get a parsed HL7v2 message model.</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    hl7</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">Message hl7msg </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> v2tofhirr4</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">stringToHl7</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">msg</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">    if</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> (hl7msg </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">is</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> hl7v23</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">ADT_A01) {</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">        // if you want to work with HL7v2 segments directly.</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">        // Transform HL7v2 PID to FHIR R4 Patient Name.</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        r4</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">HumanName[]? patientName </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> v2tofhirr4</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">pidToPatientName</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(hl7msg.pid.pid5,</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">                hl7msg.pid.pid9);</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">        if</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> patientName </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">is</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> r4</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">HumanName[] {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">            io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">println</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"HL7v23 PID Patient Name: \"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">patientName</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">[</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">0</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">].</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">toString</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">());</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "connect-to-emrs",
      "title": "Connect to EMRs, EHRs, data sources and more",
      "descriptionHtml": "<p>Ballerina has 100s of connectors for well-known Health Systems such as Epic, Cerner, athenahealth, and non-healthcare systems such as Salesforce, and can connect to any backend that has a FHIR, HL7, or OpenAPI interface. Additionally, Ballerina allows you to go below the hood and connect directly to a database if that is the only way to fetch data.</p>\n",
      "links": [
        {
          "label": "View code on GitHub",
          "href": "https://github.com/ballerina-guides/healthcare-samples/blob/main/working-with-fhir-connector/working_with_fhir_connector.bal"
        }
      ],
      "code": "// Create a FHIR client configuration\nfhirClient:FHIRConnectorConfig cernerConfig = {\n    baseURL: base,\n    mimeType: fhirClient:FHIR_JSON,\n    authConfig: {\n        tokenUrl: tokenUrl,\n        clientId: clientId,\n        clientSecret: clientSecret,\n        scopes: scopes\n    }\n};\n\n// Create a FHIR client\nfinal fhirClient:FHIRConnector fhirConnectorObj = check new (cernerConfig);\n\npublic function main() returns error? {\n    // Get a patient resource by id\n    fhirClient:FHIRResponse fhirResponse = check fhirConnectorObj->getById(\"Patient\", \"12724067\");\n    io:println(\"Cerner EMR response: \", fhirResponse.'resource);\n\n    // Search for patients who has the given name \"John\" and birthdate greater than 2000-01-01\n    fhirClient:FHIRResponse searchResponse = check fhirConnectorObj->search(\"Patient\", {\n        \"given\": \"John\",\n        \"birthdate\": \"gt2000-01-01\"\n    });\n    io:println(\"Cerner EMR search response: \", searchResponse.'resource);\n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">// Create a FHIR client configuration</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">fhirClient</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">FHIRConnectorConfig cernerConfig </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    baseURL</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> base,</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    mimeType</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> fhirClient:FHIR_JSON,</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    authConfig</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        tokenUrl</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> tokenUrl,</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        clientId</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> clientId,</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        clientSecret</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> clientSecret,</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">        scopes</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> scopes</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    }</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">};</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">// Create a FHIR client</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">final</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> fhirClient</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">FHIRConnector fhirConnectorObj </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> new</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> (</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">cernerConfig</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">public</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> main</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // Get a patient resource by id</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    fhirClient</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">FHIRResponse fhirResponse </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> fhirConnectorObj</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">-></span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">getById</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"Patient\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"12724067\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">println</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"Cerner EMR response: \"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, fhirResponse.'resource);</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D;--shiki-dark:#6A737D\">    // Search for patients who has the given name \"John\" and birthdate greater than 2000-01-01</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    fhirClient</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">FHIRResponse searchResponse </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> fhirConnectorObj</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">-></span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">search</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"Patient\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, {</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">        \"given\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> \"John\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">,</span></span>\n<span class=\"line\"><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">        \"birthdate\"</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> \"gt2000-01-01\"</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    });</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">println</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"Cerner EMR search response: \"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, searchResponse.'resource);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "powerful-edi-for-claims",
      "title": "Powerful EDI for claims",
      "descriptionHtml": "<p>Ballerina has powerful support for Electronic Data Interchange (EDI) formats. In healthcare, this means out-of-the-box handling of X12, 834s, 837s, and more region-specific standards via native schema mapping. Go from EDI formats to Ballerina records and back; do data mapping on that, and you’re off to the races!</p>\n",
      "image": "/images/health-edi-claims.png",
      "links": [],
      "code": "public function main() returns error? {\n    string enrollmentRequest = check io:fileReadString(\"enrollments/E0_1.edi\");\n    m834:EDI_834_Benefit_Enrollment_and_Maintenance enrollment =\n         check hmart:read(enrollmentRequest, hmart:EDI_834).ensureType();\n    io:println(enrollment.Monetary_Amount_Information[0].Monetary_Amount);\n}",
      "language": "ballerina",
      "highlightedHtml": "<pre class=\"shiki shiki-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">public</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> function</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\"> main</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">() </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">returns</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> error?</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">    string</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> enrollmentRequest </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">fileReadString</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\">\"enrollments/E0_1.edi\"</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    m834</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">EDI_834_Benefit_Enrollment_and_Maintenance enrollment </span><span style=\"color:#D73A49;--shiki-dark:#F97583\">=</span></span>\n<span class=\"line\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">         check</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\"> hmart</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">read</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(</span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">enrollmentRequest</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">, </span><span style=\"color:#E36209;--shiki-dark:#FFAB70\">hmart</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">EDI_834).</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">ensureType</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">();</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">    io</span><span style=\"color:#D73A49;--shiki-dark:#F97583\">:</span><span style=\"color:#6F42C1;--shiki-dark:#B392F0\">println</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">(enrollment.Monetary_Amount_Information[</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">0</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">].Monetary_Amount);</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">}</span></span></code></pre>",
      "tabs": [],
      "cards": [],
      "items": [],
      "compareItems": []
    },
    {
      "type": "codeImageSplit",
      "id": "ai-pair-programming",
      "title": "AI pair programming for your code",
      "descriptionHtml": "<p>AI-powered coding assistants like GitHub Copilot know Ballerina. Ballerina knows healthcare. Why do all the work? Let AI do at least half of it for you!</p>\n",
      "image": "/images/health-ai-pair-programming.png",
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
      "title": "(Extra!) APIs are the new DLLs on Choreo",
      "descriptionHtml": "<p>Deploy healthcare accelerator code into WSO2 Choreo as APIs and access accelerator functionality not only from Ballerina but also other languages such as Java, .Net, and Python as internal APIs, or from other systems as external APIs. Bring your own code to the party on Choreo.</p>\n",
      "image": "/images/health-apis-are-new-dll.png",
      "links": [
        {
          "label": "Get started with Choreo IDevP for free",
          "href": "https://wso2.com/choreo/internal-developer-platform"
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

export default useCaseHealthcareData;
