import React, { useState, createRef } from "react";
import { Container, Row, Col, sanitizeHtml } from "@site/src/components/BbeRuntime";
import {copyToClipboard, extractOutput} from "@site/src/utils/bbe";
import Link from "@docusaurus/Link";

export const codeSnippetData = [`import ballerina/io;
import ballerina/lang.regexp;

public function main() returns error? {
    string[] productCodes = ["ELEC-1234", "FURN-5678", "CLOT-1111", "FOOD-3333", "BAR-123"];

    // Regular expression to match and validate product codes.
    // Format: [PRODUCT_TYPE]-[UNIQUE_ID]
    string:RegExp productCodePattern = re \`^([A-Z]{4})-(\\d{4})\$\`;

    foreach string productCode in productCodes {
        // Check if the product code fully matches the expected format.
        boolean isValidProductCode = productCodePattern.isFullMatch(productCode);
        io:println(string \`Product Code: \${productCode}, Valid: \${isValidProductCode}\`);

        // If the product code is invalid, skip further processing.
        if !isValidProductCode {
            continue;
        }

        // For a valid product code, extract the product type and unique ID from the match groups.
        regexp:Groups? matchGroups = productCodePattern.fullMatchGroups(productCode);
        if matchGroups is regexp:Groups {
            // The first member in the \`matchGroups\` tuple is the entire matched string.
            // The subsequent members represent the captured groups
            // corresponding to product type and unique ID respectively.
            io:println("Product Type: ",
                    (check matchGroups[1].ensureType(regexp:Span)).substring());
            io:println("Unique ID: ",
                    (check matchGroups[2].ensureType(regexp:Span)).substring());
        }
    }

    // Match product code from a specific starting index in the string.
    regexp:Span? productCode = productCodePattern.matchAt(
            "Product code: FURN-5678, Product code: CLOT-1234", 39);
    if productCode is regexp:Span {
        io:println("Matched product: ", productCode.substring());
    }

    // Regular expression to extract the time in the format \`HH:MM\` from a log string.
    string:RegExp timePattern = re \`([01][0-9]|2[0-3]):([0-5][0-9])\`;

    // Find groups of the matching string from a specified starting index.
    regexp:Groups? timeMatchGroups = timePattern.matchGroupsAt(
            "Production time: 14:35, Production time: 16:15", 41);
    if timeMatchGroups is regexp:Groups {
        string hour = (check timeMatchGroups[1].ensureType(regexp:Span)).substring();
        string minutes = (check timeMatchGroups[2].ensureType(regexp:Span)).substring();
        io:println("Production hour: ", hour);
        io:println("Production minutes: ", minutes);
    }
}
`];

export default function RegexpMatchOperations({codeSnippets}) {
  const [codeClick1, updateCodeClick1] = useState(false);

  const [outputClick1, updateOutputClick1] = useState(false);
const ref1 = createRef()

  const [btnHover, updateBtnHover] = useState([false, false]);

  return (
    <Container className="bbeBody d-flex flex-column h-100">
      <h1>RegExp match operations</h1>


<p>The <code>RegExp</code> type supports a set of langlib functions to match patterns in strings and enable operations such as finding, validating, grouping, and extracting data based on regular expressions.</p>


<Row className="bbeCode mx-0 py-0 rounded 
      " 
      style={{ marginLeft: "0px" }}>
  <Col className="d-flex align-items-start" sm={12}>
    
    <a
      className="bg-transparent border-0 m-0 p-2 ms-auto"
      href="https://github.com/ballerina-platform/ballerina-distribution/tree/v2201.13.4/examples/regexp-match-operations"
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
      <code className="d-flex flex-column"><span>{`\$ bal run regexp_match_operations.bal`}</span>
<span>{`Product Code: ELEC-1234, Valid: true`}</span>
<span>{`Product Type: ELEC`}</span>
<span>{`Unique ID: 1234`}</span>
<span>{`Product Code: FURN-5678, Valid: true`}</span>
<span>{`Product Type: FURN`}</span>
<span>{`Unique ID: 5678`}</span>
<span>{`Product Code: CLOT-1111, Valid: true`}</span>
<span>{`Product Type: CLOT`}</span>
<span>{`Unique ID: 1111`}</span>
<span>{`Product Code: FOOD-3333, Valid: true`}</span>
<span>{`Product Type: FOOD`}</span>
<span>{`Unique ID: 3333`}</span>
<span>{`Product Code: BAR-123, Valid: false`}</span>
<span>{`Matched product: CLOT-1234`}</span>
<span>{`Production hour: 16`}</span>
<span>{`Production minutes: 15`}</span>
</code></pre>
          </Col>
        </Row>

<h2>Related links</h2>

<ul style={{ marginLeft: "0px" 
                      }} class="relatedLinks">
                        <li>
                            <span>&#8226;&nbsp;</span>
                            <span><a href="/learn/by-example/regexp-type/">RegExp type</a></span>
                        </li>
                    </ul>
<ul style={{ marginLeft: "0px" 
                      }} class="relatedLinks">
                        <li>
                            <span>&#8226;&nbsp;</span>
                            <span><a href="https://lib.ballerina.io/ballerina/lang.regexp">RegExp API Docs</a></span>
                        </li>
                    </ul>
<ul style={{ marginLeft: "0px" 
                      }} class="relatedLinks">
                        <li>
                            <span>&#8226;&nbsp;</span>
                            <span><a href="https://lib.ballerina.io/ballerina/lang.string">string API Docs</a></span>
                        </li>
                    </ul><span style={{marginBottom:'20px'}}></span>

      <Row className="mt-auto mb-5">
        <Col sm={6}>
      <Link
        title="RegExp find operations"
        to="/learn/by-example/regexp-find-operations/"
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
              RegExp find operations
            </span>
          </div>
        </div>
      </Link>
    </Col>
        <Col sm={6}>
      <Link
        title="Documentation"
        to="/learn/by-example/documentation/"
      >
        <div className="btnContainer d-flex align-items-center ms-auto">
          <div className="d-flex flex-column me-4">
            <span className="btnNext">Next</span>
            <span
              className={btnHover[1] ? "btnTitleHover" : "btnTitle"}
              onMouseEnter={() => updateBtnHover([false, true])}
              onMouseOut={() => updateBtnHover([false, false])}
            >
              Documentation
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