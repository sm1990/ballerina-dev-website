import React, { useState, createRef } from "react";
import { Container, Row, Col, sanitizeHtml } from "@site/src/components/BbeRuntime";
import {copyToClipboard, extractOutput} from "@site/src/utils/bbe";
import Link from "@docusaurus/Link";

export const codeSnippetData = [`import ballerina/io;
import ballerina/time;

public function main() returns error? {
    // Event recorded in UTC (2022-01-29 22:48:00).
    time:Utc eventUtcTime = check time:utcFromString("2022-01-29T22:48:00Z");
    io:println("Event time in UTC: ", eventUtcTime);

    // Load the system's default time zone.
    time:Zone systemZone = check new time:TimeZone();
    // Convert UTC event time to the system's local time.
    time:Civil eventInSystemZone = systemZone.utcToCivil(eventUtcTime);
    io:println("Event time in system's local time: " + eventInSystemZone.toString());

    // Print the event time in 'Europe/London' time zone.
    printZoneTimeFromUtc(eventUtcTime, "Europe/London");

    // Print the event time in 'Asia/Tokyo' time zone.
    printZoneTimeFromUtc(eventUtcTime, "Asia/Tokyo");
}

function printZoneTimeFromUtc(time:Utc utcTime, string zoneId) {
    time:Zone? zone = time:getZone(zoneId);
    if zone is time:Zone {
        time:Civil timeInZone = zone.utcToCivil(utcTime);
        io:println(string \`Event time in \${zoneId} time zone: \${timeInZone.toString()}\`);
    } else {
        io:println(string \`Failed to load the '\${zoneId}' time zone.\`);
    }
}
`];

export default function TimeZone({codeSnippets}) {
  const [codeClick1, updateCodeClick1] = useState(false);

  const [outputClick1, updateOutputClick1] = useState(false);
const ref1 = createRef()

  const [btnHover, updateBtnHover] = useState([false, false]);

  return (
    <Container className="bbeBody d-flex flex-column h-100">
      <h1>Time Zone</h1>


<p>The Ballerina <code>time</code> library provides APIs for managing and converting time across different time zones. It supports loading system time zone, retrieving specific time zones based on the time zone ID, and enables seamless conversion between UTC and local times across different regions.</p>


<p>For more information on the underlying module, see the <a href="https://lib.ballerina.io/ballerina/time/latest/"><code>time</code> module</a>.</p>


<Row className="bbeCode mx-0 py-0 rounded 
      " 
      style={{ marginLeft: "0px" }}>
  <Col className="d-flex align-items-start" sm={12}>
    
    <a
      className="bg-transparent border-0 m-0 p-2 ms-auto"
      href="https://github.com/ballerina-platform/ballerina-distribution/tree/v2201.13.4/examples/time-zone"
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

<p>To run this sample, use the <code>bal run</code> command.</p>


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
      <code className="d-flex flex-column"><span>{`\$ bal run time_zone.bal`}</span>
<span>{`Event time in UTC: [1643496480,0]`}</span>
<span>{`Event time in system's local time: {"timeAbbrev":"Asia/Colombo","dayOfWeek":0,"year":2022,"month":1,"day":30,"hour":4,"minute":18,"second":0}`}</span>
<span>{`Event time in Europe/London time zone: {"timeAbbrev":"Europe/London","dayOfWeek":6,"year":2022,"month":1,"day":29,"hour":22,"minute":48,"second":0}`}</span>
<span>{`Event time in Asia/Tokyo time zone: {"timeAbbrev":"Asia/Tokyo","dayOfWeek":0,"year":2022,"month":1,"day":30,"hour":7,"minute":48,"second":0}`}</span>
</code></pre>
          </Col>
        </Row>

      <Row className="mt-auto mb-5">
        <Col sm={6}>
      <Link
        title="Time formatting/parsing"
        to="/learn/by-example/time-formatting-and-parsing/"
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
              Time formatting/parsing
            </span>
          </div>
        </div>
      </Link>
    </Col>
        <Col sm={6}>
      <Link
        title="Cache basics"
        to="/learn/by-example/cache-basics/"
      >
        <div className="btnContainer d-flex align-items-center ms-auto">
          <div className="d-flex flex-column me-4">
            <span className="btnNext">Next</span>
            <span
              className={btnHover[1] ? "btnTitleHover" : "btnTitle"}
              onMouseEnter={() => updateBtnHover([false, true])}
              onMouseOut={() => updateBtnHover([false, false])}
            >
              Cache basics
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