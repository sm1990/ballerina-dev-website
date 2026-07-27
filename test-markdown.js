const md = require("markdown-it")({ 
  xhtmlOut: true,
  html: true,
  linkify: true,
  typographer: true
});

// Test heading rendering
const testMarkdown = `## Configuring File Rotation

This is a test.

## How Rotation Works

Another test.`;

const result = md.render(testMarkdown);
console.log("Result:");
console.log(result);
