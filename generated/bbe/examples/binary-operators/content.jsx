import React, { useState, createRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DOMPurify from "dompurify";
import {
  copyToClipboard,
  extractOutput,
} from "../../../utils/bbe";
import Link from "next/link";

export const codeSnippetData = [`import ballerina/io;

public function main() {
    int a = 10;
    int b = 20;

    // Perform integer addition.
    int sum = a + b;
    io:println(sum);

    // Perform integer subtraction.
    int difference = a - b;
    io:println(difference);

    // Perform integer multiplication.
    int product = a * b;
    io:println(product);

    // Perform integer division.
    int quotient = b / a;
    io:println(quotient);

    // Perform integer remainder.
    int remainder = b % a;
    io:println(remainder);

    // \`>\`, \`<\`, \`>=\` and \`<=\` are used to test the relative order of two values.
    // Check if \`a\` is less than \`b\`.
    boolean isLessThan = a < b;
    io:println(isLessThan);

    // Check if \`a\` is greater than or equal to \`b\`.
    boolean isGreaterThanOrEqual = a >= b;
    io:println(isGreaterThanOrEqual);

    float e = 10.5;
    float f = 20.5;

    // Perform floating-point addition.
    float floatSum = e + f;
    io:println(floatSum);

    // Perform floating-point subtraction.
    float floatDifference = e - f;
    io:println(floatDifference);

    // Perform floating-point multiplication.
    float floatProduct = e * f;
    io:println(floatProduct);

    // Perform floating-point division.
    float floatQuotient = e / f;
    io:println(floatQuotient);

    // Check if \`e\` is less than or equal to \`f\`.
    boolean isLessOrEqual = e <= f;
    io:println(isLessOrEqual);

    // Check if \`e\` is greater than \`f\`.
    boolean isGreaterThan = e > f;
    io:println(isGreaterThan);

    boolean c = true;
    boolean d = false;

    // Perform the logical AND operation between two boolean values.
    boolean logicalAnd = c && d;
    io:println(logicalAnd);

    // Perform logical OR between two boolean values.
    boolean logicalOr = c || d;
    io:println(logicalOr);

    // For the \`<\` operator, \`d < c\` evaluates to \`true\` when \`d\` is \`false\` and \`c\` is \`true\`.
    boolean isLessThanBoolean = d < c;
    io:println(isLessThanBoolean);

    int g = 10;
    int h = 20;

    // Perform bitwise AND between two integers.
    int bitwiseAnd = g & h;
    io:println(bitwiseAnd);

    // Perform bitwise OR between two integers.
    int bitwiseOr = g | h;
    io:println(bitwiseOr);

    // Perform bitwise XOR between two integers.
    int bitwiseXor = g ^ h;
    io:println(bitwiseXor);

    // Left shift an integer by 2 bits.
    int leftShift = g << 2;
    io:println(leftShift);

    // Right shift an integer by 2 bits (signed).
    int signedRightShift = g >> 2;
    io:println(signedRightShift);

    // Right shift an integer by 2 bits (unsigned).
    int unsignedRightShift = g >>> 2;
    io:println(unsignedRightShift);

    string i = "Hello";
    string j = "Ballerina";

    // Concatenate two strings.
    string concatenatedString = i + " " + j;
    io:println(concatenatedString);

    // Check if \`i\` is lexicographically greater than \`j\` in Unicode code point order.
    boolean isGreaterThanString = i > j;
    io:println(isGreaterThanString);
}
`];

export function BinaryOperators({codeSnippets}) {
  const [codeClick1, updateCodeClick1] = useState(false);

  const [outputClick1, updateOutputClick1] = useState(false);
const ref1 = createRef()

  const [btnHover, updateBtnHover] = useState([false, false]);

  return (
    <Container className="bbeBody d-flex flex-column h-100">
      <h1>Binary operators</h1>


<p>Ballerina provides several binary operators to perform operations on values of various types such as integers, floats, booleans, and strings. Binary arithmetic operators (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, and <code>%</code>) allow basic mathematical calculations between two values. The operators to compare values (<code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, and <code>&gt;=</code>) produce a boolean result.</p>


<p>Ballerina also supports binary logical operators (<code>&amp;&amp;</code> and <code>||</code>) to perform logical operations on boolean values and bitwise operators (<code>&amp;</code>, <code>|</code>, <code>^</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code>, and <code>&gt;&gt;&gt;</code>) to manipulate bits in integer values.</p>


<Row className="bbeCode mx-0 py-0 rounded 
      " 
      style={{ marginLeft: "0px" }}>
  <Col className="d-flex align-items-start" sm={12}>
    
    <a
      className="bg-transparent border-0 m-0 p-2 ms-auto"
      href="https://github.com/ballerina-platform/ballerina-distribution/tree/v2201.13.4/examples/binary-operators"
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
          __html: DOMPurify.sanitize(codeSnippets[0]),
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
      <code className="d-flex flex-column"><span>{`\$ bal run binary_operators.bal`}</span>
<span>{`30`}</span>
<span>{`-10`}</span>
<span>{`200`}</span>
<span>{`2`}</span>
<span>{`0`}</span>
<span>{`true`}</span>
<span>{`false`}</span>
<span>{`31.0`}</span>
<span>{`-10.0`}</span>
<span>{`215.25`}</span>
<span>{`0.5121951219512195`}</span>
<span>{`true`}</span>
<span>{`false`}</span>
<span>{`false`}</span>
<span>{`true`}</span>
<span>{`true`}</span>
<span>{`0`}</span>
<span>{`30`}</span>
<span>{`30`}</span>
<span>{`40`}</span>
<span>{`2`}</span>
<span>{`2`}</span>
<span>{`Hello Ballerina`}</span>
<span>{`true`}</span>
</code></pre>
          </Col>
        </Row>

      <Row className="mt-auto mb-5">
        <Col sm={6}>
      <Link
        title="Strings"
        href="/learn/by-example/strings/"
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
              fill-rule="evenodd"
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
              Strings
            </span>
          </div>
        </div>
      </Link>
    </Col>
        <Col sm={6}>
      <Link
        title="Unary operators"
        href="/learn/by-example/unary-operators/"
      >
        <div className="btnContainer d-flex align-items-center ms-auto">
          <div className="d-flex flex-column me-4">
            <span className="btnNext">Next</span>
            <span
              className={btnHover[1] ? "btnTitleHover" : "btnTitle"}
              onMouseEnter={() => updateBtnHover([false, true])}
              onMouseOut={() => updateBtnHover([false, false])}
            >
              Unary operators
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
              fill-rule="evenodd"
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