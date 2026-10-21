import React, { useState, createRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DOMPurify from "dompurify";
import {
  copyToClipboard,
  extractOutput,
} from "../../../utils/bbe";
import Link from "next/link";

export const codeSnippetData = [`import ballerina/io;

// The \`fn\` function accepts an argument that belongs to \`int:Unsigned32\`
// and prints the result of performing the bitwise \`&\` operation with 
// the \`int:Unsigned16\` maximum value.
function fn(int:Unsigned32 val) {
    int:Unsigned16 max = 65535;

    // Bitwise operations have special typing. Since using \`&\` with operands
    // of types \`int:Unsigned32\` and \`int:Unsigned16\` will result in a value
    // that belongs to \`int:Unsigned16\`, the static type of \`val & max\` is 
    // considered to be \`int:Unsigned16\`, which allows the following.
    int:Unsigned16 res = val & max;
    io:println(res);
}

public function main() {
    // Since \`72\` belongs to \`int:Unsigned32\`, it can directly be passed as
    // an argument to the \`fn\` function.
    fn(72);

    // The cast done in the \`intFn\` function will be successful since \`43543\`
    // belongs to \`int:Unsigned32\`.
    intFn(43543);

    // The cast to \`int:Unsigned32\` panics since \`4294967296\` is out of range.
    intFn(4294967296);
}

function intFn(int m) {
    // Since an argument of type \`int\` cannot be passed to the \`fn\` function 
    // which only accepts values that belong to \`int:Unsigned32\`, a cast is attempted
    // before passing \`m\` as an argument to \`fn\`. The cast attempt will panic if the 
    // value is out of range for \`int:Unsigned32\`.
    fn(<int:Unsigned32> m);
}
`];

export function BuiltInIntegerSubtypes({codeSnippets}) {
  const [codeClick1, updateCodeClick1] = useState(false);

  const [outputClick1, updateOutputClick1] = useState(false);
const ref1 = createRef()

  const [btnHover, updateBtnHover] = useState([false, false]);

  return (
    <Container className="bbeBody d-flex flex-column h-100">
      <h1>Built-in integer subtypes</h1>


<p>Ballerina has one integer type (<code>int</code>), which is a 64-bit, signed type.</p>


<p>The <code>ballerina/lang.int</code> lang library defines the following built-in subtypes of this <code>int</code> type.</p>


<ul style={{ marginLeft: "0px" 
                      }} >
                        <li>
                            <span>&#8226;&nbsp;</span>
                            <span><code>int:Signed32</code></span>
                        </li>
                    </ul>
<ul style={{ marginLeft: "0px" 
                      }} >
                        <li>
                            <span>&#8226;&nbsp;</span>
                            <span><code>int:Unsigned32</code></span>
                        </li>
                    </ul>
<ul style={{ marginLeft: "0px" 
                      }} >
                        <li>
                            <span>&#8226;&nbsp;</span>
                            <span><code>int:Signed16</code></span>
                        </li>
                    </ul>
<ul style={{ marginLeft: "0px" 
                      }} >
                        <li>
                            <span>&#8226;&nbsp;</span>
                            <span><code>int:Unsigned16</code></span>
                        </li>
                    </ul>
<ul style={{ marginLeft: "0px" 
                      }} >
                        <li>
                            <span>&#8226;&nbsp;</span>
                            <span><code>int:Signed8</code></span>
                        </li>
                    </ul>
<ul style={{ marginLeft: "0px" 
                      }} >
                        <li>
                            <span>&#8226;&nbsp;</span>
                            <span><code>int:Unsigned8</code> (same as <code>byte</code>)</span>
                        </li>
                    </ul>

<p>The runtime behavior of operations on these subtypes are the same as for the <code>int</code> type. Bitwise operations with operands of these types have special typing, which allows using a more specific type for the operation.</p>


<p>Integer subtypes are useful for interfacing with external systems that use these types. They also allow implementations to optimize storage, particularly for arrays.</p>


<Row className="bbeCode mx-0 py-0 rounded 
      " 
      style={{ marginLeft: "0px" }}>
  <Col className="d-flex align-items-start" sm={12}>
    
    <a
      className="bg-transparent border-0 m-0 p-2 ms-auto"
      href="https://github.com/ballerina-platform/ballerina-distribution/tree/v2201.13.4/examples/built-in-integer-subtypes"
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
      <code className="d-flex flex-column"><span>{`\$ bal run built_in_integer_subtypes.bal`}</span>
<span>{`72`}</span>
<span>{`43543`}</span>
<span>{`error: {ballerina}NumberConversionError {"message":"'int' value '4,294,967,296' cannot be converted to 'lang.int:Unsigned32'"}`}</span>
<span>{`        at built_in_integer_subtypes:intFn(built_in_integer_subtypes.bal:35)`}</span>
<span>{`           built_in_integer_subtypes:main(built_in_integer_subtypes.bal:27)`}</span>
</code></pre>
          </Col>
        </Row>

      <Row className="mt-auto mb-5">
        <Col sm={6}>
      <Link
        title="Type inference"
        href="/learn/by-example/type-inference/"
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
              Type inference
            </span>
          </div>
        </div>
      </Link>
    </Col>
        <Col sm={6}>
      <Link
        title="Built-in string subtype"
        href="/learn/by-example/built-in-string-subtype/"
      >
        <div className="btnContainer d-flex align-items-center ms-auto">
          <div className="d-flex flex-column me-4">
            <span className="btnNext">Next</span>
            <span
              className={btnHover[1] ? "btnTitleHover" : "btnTitle"}
              onMouseEnter={() => updateBtnHover([false, true])}
              onMouseOut={() => updateBtnHover([false, false])}
            >
              Built-in string subtype
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