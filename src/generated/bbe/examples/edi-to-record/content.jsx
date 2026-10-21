import React, { useState, createRef } from "react";
import { Container, Row, Col, sanitizeHtml } from "@site/src/components/BbeRuntime";
import {copyToClipboard, extractOutput} from "@site/src/utils/bbe";
import Link from "@docusaurus/Link";

export const codeSnippetData = [`{
    "name": "SimpleOrder",
    "delimiters" : {"segment" : "~", "field" : "*", "component": ":", "repetition": "^"},
    "segments" : [
        {
            "code": "HDR",
            "tag" : "header",
            "minOccurances": 1,
            "fields" : [{"tag": "code"}, {"tag" : "orderId", "required": true}, {"tag" : "organization"}, {"tag" : "date"}]
        },
        {
            "code": "ITM",
            "tag" : "items",
            "maxOccurances" : -1,
            "fields" : [{"tag": "code"}, {"tag" : "item", "required": true}, {"tag" : "quantity", "required": true, "dataType" : "int"}]
        }
    ]
}
`,`HDR*ORDER_1201*ABC_Store*2008-01-01~
ITM*A-250*12~
ITM*A-45*100~
ITM*D-10*58~
ITM*K-80*250~
ITM*T-46*28~
`,`\$ bal new edi_to_record
\$ cd edi_to_record
\$ bal add sorder
`,`import ballerina/io;
import edi_to_record.sorder;

public function main() returns error? {
    string ediText = check io:fileReadString("resources/order.edi");
    sorder:SimpleOrder simpleOrder = check sorder:fromEdiString(ediText);
    io:println("Order Id: ", simpleOrder.header.orderId);

    foreach sorder:Items_Type item in simpleOrder.items {
        io:println("Item: ", item.item, ", Quantity: ", item.quantity);
    }
}
`];

export default function EdiToRecord({codeSnippets}) {
  const [codeClick1, updateCodeClick1] = useState(false);
const [codeClick2, updateCodeClick2] = useState(false);
const [codeClick3, updateCodeClick3] = useState(false);
const [codeClick4, updateCodeClick4] = useState(false);

  const [outputClick1, updateOutputClick1] = useState(false);
const ref1 = createRef()
const [outputClick2, updateOutputClick2] = useState(false);
const ref2 = createRef()
const [outputClick3, updateOutputClick3] = useState(false);
const ref3 = createRef()
const [outputClick4, updateOutputClick4] = useState(false);
const ref4 = createRef()

  const [btnHover, updateBtnHover] = useState([false, false]);

  return (
    <Container className="bbeBody d-flex flex-column h-100">
      <h1>EDI to record conversion</h1>


<p>EDI is a widely used message format for business-to-business (B2B) communications. Ballerina simplifies working with EDI data by converting them to Ballerina records, so that all operations related to Ballerina records can be applied on EDI data as well (e.g. transforming EDI data, writing EDI data to databases, transering EDI data over various network protocols, etc.).</p>


<p>First, it is necessary to write a schema for the EDI data type that needs to be processed. Below is a simple EDI schema for sales order data. According to the schema, data must begin with a <code>HDR</code> segment followed by zero or more <code>ITM</code> segments. <code>HDR</code> segment contains four fields: <code>code</code>, <code>orderId</code>, <code>organization</code>, and <code>date</code>. <code>ITM</code> segment has three fields: <code>code</code>, <code>item</code>, and <code>quantity</code>.</p>


<Row className="bbeCode mx-0 py-0 rounded 
      " 
      style={{ marginLeft: "0px" }}>
  <Col className="d-flex align-items-start" sm={12}>
    
    <a
      className="bg-transparent border-0 m-0 p-2 ms-auto"
      href="https://github.com/ballerina-platform/ballerina-distribution/tree/v2201.13.4/examples/edi-to-record"
      target="_blank"
      rel="noreferrer"
      aria-label="View code on GitHub"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-github"
        viewBox="0 0 16 16"
      >
        <title>View code on GitHub</title>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    </a>
    {codeClick1 ? (
      <button className="bg-transparent border-0 m-0 p-2 " 
        disabled aria-label="Copy to Clipboard Check">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#20b6b0"
          className="bi bi-check"
          viewBox="0 0 16 16"
        >
          <title>Copied</title>
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
        </svg>
      </button>
    ) : (
      <button
        className="bg-transparent border-0 m-0 p-2 "
        onClick={() => {
          updateCodeClick1(true);
          copyToClipboard(codeSnippetData[0]);
          setTimeout(() => {
            updateCodeClick1(false);
          }, 3000);
        }}
        aria-label="Copy to Clipboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          className="bi bi-clipboard"
          viewBox="0 0 24 24"
        >
          <title>Copy to Clipboard</title>
          <path
            d="M9 9.75A2.25 2.25 0 0 1 11.25 7.5h7.5A2.25 2.25 0 0 1 21 9.75v8.25a2.25 2.25 0 0 1-2.25 2.25h-7.5A2.25 2.25 0 0 1 9 18V9.75Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M15 7.5V6A2.25 2.25 0 0 0 12.75 3.75h-7.5A2.25 2.25 0 0 0 3 6v8.25a2.25 2.25 0 0 0 2.25 2.25H9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
        </svg>
      </button>
    )}
  </Col>
  <Col sm={12}>
    {codeSnippets[0] != undefined && (
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(codeSnippets[0]),
        }}
      />
    )}
  </Col>
</Row>

<p>Below is an example EDI text that can be parsed using the above schema.</p>


<Row className="bbeCode mx-0 py-0 rounded 
      " 
      style={{ marginLeft: "0px" }}>
  <Col className="d-flex align-items-start" sm={12}>
    
    <a
      className="bg-transparent border-0 m-0 p-2 ms-auto"
      href="https://github.com/ballerina-platform/ballerina-distribution/tree/v2201.13.4/examples/edi-to-record"
      target="_blank"
      rel="noreferrer"
      aria-label="View code on GitHub"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-github"
        viewBox="0 0 16 16"
      >
        <title>View code on GitHub</title>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    </a>
    {codeClick2 ? (
      <button className="bg-transparent border-0 m-0 p-2 " 
        disabled aria-label="Copy to Clipboard Check">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#20b6b0"
          className="bi bi-check"
          viewBox="0 0 16 16"
        >
          <title>Copied</title>
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
        </svg>
      </button>
    ) : (
      <button
        className="bg-transparent border-0 m-0 p-2 "
        onClick={() => {
          updateCodeClick2(true);
          copyToClipboard(codeSnippetData[1]);
          setTimeout(() => {
            updateCodeClick2(false);
          }, 3000);
        }}
        aria-label="Copy to Clipboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          className="bi bi-clipboard"
          viewBox="0 0 24 24"
        >
          <title>Copy to Clipboard</title>
          <path
            d="M9 9.75A2.25 2.25 0 0 1 11.25 7.5h7.5A2.25 2.25 0 0 1 21 9.75v8.25a2.25 2.25 0 0 1-2.25 2.25h-7.5A2.25 2.25 0 0 1 9 18V9.75Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M15 7.5V6A2.25 2.25 0 0 0 12.75 3.75h-7.5A2.25 2.25 0 0 0 3 6v8.25a2.25 2.25 0 0 0 2.25 2.25H9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
        </svg>
      </button>
    )}
  </Col>
  <Col sm={12}>
    {codeSnippets[1] != undefined && (
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(codeSnippets[1]),
        }}
      />
    )}
  </Col>
</Row>

<p>Create a new Ballerina project named <code>edi_to_record</code> and create a module named <code>sorder</code> inside that project by using the below commands.</p>


<Row className="bbeCode mx-0 py-0 rounded 
      " 
      style={{ marginLeft: "0px" }}>
  <Col className="d-flex align-items-start" sm={12}>
    
    <a
      className="bg-transparent border-0 m-0 p-2 ms-auto"
      href="https://github.com/ballerina-platform/ballerina-distribution/tree/v2201.13.4/examples/edi-to-record"
      target="_blank"
      rel="noreferrer"
      aria-label="View code on GitHub"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-github"
        viewBox="0 0 16 16"
      >
        <title>View code on GitHub</title>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    </a>
    {codeClick3 ? (
      <button className="bg-transparent border-0 m-0 p-2 " 
        disabled aria-label="Copy to Clipboard Check">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#20b6b0"
          className="bi bi-check"
          viewBox="0 0 16 16"
        >
          <title>Copied</title>
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
        </svg>
      </button>
    ) : (
      <button
        className="bg-transparent border-0 m-0 p-2 "
        onClick={() => {
          updateCodeClick3(true);
          copyToClipboard(codeSnippetData[2]);
          setTimeout(() => {
            updateCodeClick3(false);
          }, 3000);
        }}
        aria-label="Copy to Clipboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          className="bi bi-clipboard"
          viewBox="0 0 24 24"
        >
          <title>Copy to Clipboard</title>
          <path
            d="M9 9.75A2.25 2.25 0 0 1 11.25 7.5h7.5A2.25 2.25 0 0 1 21 9.75v8.25a2.25 2.25 0 0 1-2.25 2.25h-7.5A2.25 2.25 0 0 1 9 18V9.75Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M15 7.5V6A2.25 2.25 0 0 0 12.75 3.75h-7.5A2.25 2.25 0 0 0 3 6v8.25a2.25 2.25 0 0 0 2.25 2.25H9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
        </svg>
      </button>
    )}
  </Col>
  <Col sm={12}>
    {codeSnippets[2] != undefined && (
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(codeSnippets[2]),
        }}
      />
    )}
  </Col>
</Row>

<p>Create a new folder named <code>resources</code> in the root of the project and copy the schema file into it. At this point, directory structure of the project would look like below:</p>


<Row className="bbeOutput mx-0 py-0 rounded " 
          style={{ marginLeft: "0px" }}>
  <Col sm={12} className="d-flex align-items-start">
    {outputClick1 ? (
      <button
        className="bg-transparent border-0 m-0 p-2 ms-auto"
        aria-label="Copy to Clipboard Check"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#20b6b0"
          className="output-btn bi bi-check"
          viewBox="0 0 16 16"
        >
          <title>Copied</title>
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
        </svg>
      </button>
    ) : (
      <button
        className="bg-transparent border-0 m-0 p-2 ms-auto"
        onClick={() => {
          updateOutputClick1(true);
          const extractedText = extractOutput(ref1.current.innerText);
          copyToClipboard(extractedText);
          setTimeout(() => {
            updateOutputClick1(false);
          }, 3000);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          className="output-btn bi bi-clipboard"
          viewBox="0 0 24 24"
          aria-label="Copy to Clipboard"
        >
          <title>Copy to Clipboard</title>
          <path
            d="M9 9.75A2.25 2.25 0 0 1 11.25 7.5h7.5A2.25 2.25 0 0 1 21 9.75v8.25a2.25 2.25 0 0 1-2.25 2.25h-7.5A2.25 2.25 0 0 1 9 18V9.75Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M15 7.5V6A2.25 2.25 0 0 0 12.75 3.75h-7.5A2.25 2.25 0 0 0 3 6v8.25a2.25 2.25 0 0 0 2.25 2.25H9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
        </svg>
      </button>
    )}
  </Col>
  <Col sm={12}>
    <pre ref={ref1}>
      <code className="d-flex flex-column"><span>{`└── edi_to_record`}</span>
<span>{`    ├── Ballerina.toml`}</span>
<span>{`    ├── Dependencies.toml`}</span>
<span>{`    ├── main.bal`}</span>
<span>{`    ├── modules`}</span>
<span>{`    │   └── sorder`}</span>
<span>{`    │       ├── Module.md`}</span>
<span>{`    │       ├── resources`}</span>
<span>{`    │       ├── sorder.bal`}</span>
<span>{`    │       └── tests`}</span>
<span>{`    │           └── lib_test.bal`}</span>
<span>{`    └── resources`}</span>
<span>{`        └── simple_order_schema.json`}</span>
</code></pre>
          </Col>
        </Row>

<p>Get the EDI tool from the Ballerina central using the below command:</p>


<Row className="bbeOutput mx-0 py-0 rounded " 
          style={{ marginLeft: "0px" }}>
  <Col sm={12} className="d-flex align-items-start">
    {outputClick2 ? (
      <button
        className="bg-transparent border-0 m-0 p-2 ms-auto"
        aria-label="Copy to Clipboard Check"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#20b6b0"
          className="output-btn bi bi-check"
          viewBox="0 0 16 16"
        >
          <title>Copied</title>
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
        </svg>
      </button>
    ) : (
      <button
        className="bg-transparent border-0 m-0 p-2 ms-auto"
        onClick={() => {
          updateOutputClick2(true);
          const extractedText = extractOutput(ref2.current.innerText);
          copyToClipboard(extractedText);
          setTimeout(() => {
            updateOutputClick2(false);
          }, 3000);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          className="output-btn bi bi-clipboard"
          viewBox="0 0 24 24"
          aria-label="Copy to Clipboard"
        >
          <title>Copy to Clipboard</title>
          <path
            d="M9 9.75A2.25 2.25 0 0 1 11.25 7.5h7.5A2.25 2.25 0 0 1 21 9.75v8.25a2.25 2.25 0 0 1-2.25 2.25h-7.5A2.25 2.25 0 0 1 9 18V9.75Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M15 7.5V6A2.25 2.25 0 0 0 12.75 3.75h-7.5A2.25 2.25 0 0 0 3 6v8.25a2.25 2.25 0 0 0 2.25 2.25H9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
        </svg>
      </button>
    )}
  </Col>
  <Col sm={12}>
    <pre ref={ref2}>
      <code className="d-flex flex-column"><span>{`\$ bal tool pull edi`}</span>
</code></pre>
          </Col>
        </Row>

<p>Run the below command from the project root directory to generate the Ballerina parser for the above schema.</p>


<Row className="bbeOutput mx-0 py-0 rounded " 
          style={{ marginLeft: "0px" }}>
  <Col sm={12} className="d-flex align-items-start">
    {outputClick3 ? (
      <button
        className="bg-transparent border-0 m-0 p-2 ms-auto"
        aria-label="Copy to Clipboard Check"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#20b6b0"
          className="output-btn bi bi-check"
          viewBox="0 0 16 16"
        >
          <title>Copied</title>
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
        </svg>
      </button>
    ) : (
      <button
        className="bg-transparent border-0 m-0 p-2 ms-auto"
        onClick={() => {
          updateOutputClick3(true);
          const extractedText = extractOutput(ref3.current.innerText);
          copyToClipboard(extractedText);
          setTimeout(() => {
            updateOutputClick3(false);
          }, 3000);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          className="output-btn bi bi-clipboard"
          viewBox="0 0 24 24"
          aria-label="Copy to Clipboard"
        >
          <title>Copy to Clipboard</title>
          <path
            d="M9 9.75A2.25 2.25 0 0 1 11.25 7.5h7.5A2.25 2.25 0 0 1 21 9.75v8.25a2.25 2.25 0 0 1-2.25 2.25h-7.5A2.25 2.25 0 0 1 9 18V9.75Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M15 7.5V6A2.25 2.25 0 0 0 12.75 3.75h-7.5A2.25 2.25 0 0 0 3 6v8.25a2.25 2.25 0 0 0 2.25 2.25H9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
        </svg>
      </button>
    )}
  </Col>
  <Col sm={12}>
    <pre ref={ref3}>
      <code className="d-flex flex-column"><span>{`\$ bal edi codegen -i resources/simple_order_schema.json -o modules/sorder/sorder.bal`}</span>
</code></pre>
          </Col>
        </Row>

<blockquote>
<p>Note that it is recommended to place generated code for each EDI schema in a separate module in order to avoid conflicts.</p>
</blockquote>


<p>Write a Ballerina program by using generated methods and records to work with EDI data.</p>


<Row className="bbeCode mx-0 py-0 rounded 
      " 
      style={{ marginLeft: "0px" }}>
  <Col className="d-flex align-items-start" sm={12}>
    
    <a
      className="bg-transparent border-0 m-0 p-2 ms-auto"
      href="https://github.com/ballerina-platform/ballerina-distribution/tree/v2201.13.4/examples/edi-to-record"
      target="_blank"
      rel="noreferrer"
      aria-label="View code on GitHub"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-github"
        viewBox="0 0 16 16"
      >
        <title>View code on GitHub</title>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    </a>
    {codeClick4 ? (
      <button className="bg-transparent border-0 m-0 p-2 " 
        disabled aria-label="Copy to Clipboard Check">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#20b6b0"
          className="bi bi-check"
          viewBox="0 0 16 16"
        >
          <title>Copied</title>
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
        </svg>
      </button>
    ) : (
      <button
        className="bg-transparent border-0 m-0 p-2 "
        onClick={() => {
          updateCodeClick4(true);
          copyToClipboard(codeSnippetData[3]);
          setTimeout(() => {
            updateCodeClick4(false);
          }, 3000);
        }}
        aria-label="Copy to Clipboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          className="bi bi-clipboard"
          viewBox="0 0 24 24"
        >
          <title>Copy to Clipboard</title>
          <path
            d="M9 9.75A2.25 2.25 0 0 1 11.25 7.5h7.5A2.25 2.25 0 0 1 21 9.75v8.25a2.25 2.25 0 0 1-2.25 2.25h-7.5A2.25 2.25 0 0 1 9 18V9.75Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M15 7.5V6A2.25 2.25 0 0 0 12.75 3.75h-7.5A2.25 2.25 0 0 0 3 6v8.25a2.25 2.25 0 0 0 2.25 2.25H9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
        </svg>
      </button>
    )}
  </Col>
  <Col sm={12}>
    {codeSnippets[3] != undefined && (
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(codeSnippets[3]),
        }}
      />
    )}
  </Col>
</Row>

<p>Run the program using the command below:</p>


<Row className="bbeOutput mx-0 py-0 rounded " 
          style={{ marginLeft: "0px" }}>
  <Col sm={12} className="d-flex align-items-start">
    {outputClick4 ? (
      <button
        className="bg-transparent border-0 m-0 p-2 ms-auto"
        aria-label="Copy to Clipboard Check"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#20b6b0"
          className="output-btn bi bi-check"
          viewBox="0 0 16 16"
        >
          <title>Copied</title>
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
        </svg>
      </button>
    ) : (
      <button
        className="bg-transparent border-0 m-0 p-2 ms-auto"
        onClick={() => {
          updateOutputClick4(true);
          const extractedText = extractOutput(ref4.current.innerText);
          copyToClipboard(extractedText);
          setTimeout(() => {
            updateOutputClick4(false);
          }, 3000);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          className="output-btn bi bi-clipboard"
          viewBox="0 0 24 24"
          aria-label="Copy to Clipboard"
        >
          <title>Copy to Clipboard</title>
          <path
            d="M9 9.75A2.25 2.25 0 0 1 11.25 7.5h7.5A2.25 2.25 0 0 1 21 9.75v8.25a2.25 2.25 0 0 1-2.25 2.25h-7.5A2.25 2.25 0 0 1 9 18V9.75Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M15 7.5V6A2.25 2.25 0 0 0 12.75 3.75h-7.5A2.25 2.25 0 0 0 3 6v8.25a2.25 2.25 0 0 0 2.25 2.25H9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
        </svg>
      </button>
    )}
  </Col>
  <Col sm={12}>
    <pre ref={ref4}>
      <code className="d-flex flex-column"><span>{`\$ bal run`}</span>
<span>{`Order Id: ORDER_1201`}</span>
<span>{`Item: A-250, Quantity: 12`}</span>
<span>{`Item: A-45, Quantity: 100`}</span>
<span>{`Item: D-10, Quantity: 58`}</span>
<span>{`Item: K-80, Quantity: 250`}</span>
<span>{`Item: T-46, Quantity: 28`}</span>
</code></pre>
          </Col>
        </Row>

      <Row className="mt-auto mb-5">
        <Col sm={6}>
      <Link
        title="Sensitive data logging"
        to="/learn/by-example/sensitive-data-logging/"
      >
        <div className="btnContainer d-flex align-items-center me-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#3ad1ca"
            className={`${
              btnHover[0] ? "btnArrowHover" : "btnArrow"
            } bi bi-arrow-right`}
            viewBox="0 0 16 16"
            onMouseEnter={() => updateBtnHover([true, false])}
            onMouseOut={() => updateBtnHover([false, false])}
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          <div className="d-flex flex-column ms-4">
            <span className="btnPrev">Previous</span>
            <span
              className={btnHover[0] ? "btnTitleHover" : "btnTitle"}
              onMouseEnter={() => updateBtnHover([true, false])}
              onMouseOut={() => updateBtnHover([false, false])}
            >
              Sensitive data logging
            </span>
          </div>
        </div>
      </Link>
    </Col>
        <Col sm={6}>
      <Link
        title="Record to EDI conversion"
        to="/learn/by-example/record-to-edi/"
      >
        <div className="btnContainer d-flex align-items-center ms-auto">
          <div className="d-flex flex-column me-4">
            <span className="btnNext">Next</span>
            <span
              className={btnHover[1] ? "btnTitleHover" : "btnTitle"}
              onMouseEnter={() => updateBtnHover([false, true])}
              onMouseOut={() => updateBtnHover([false, false])}
            >
              Record to EDI conversion
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#3ad1ca"
            className={`${
              btnHover[1] ? "btnArrowHover" : "btnArrow"
            } bi bi-arrow-right`}
            viewBox="0 0 16 16"
            onMouseEnter={() => updateBtnHover([false, true])}
            onMouseOut={() => updateBtnHover([false, false])}
          >
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
            />
          </svg>
        </div>
      </Link>
    </Col>
      </Row> 
    </Container>
  )
}