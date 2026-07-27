export function copyToClipboard(text: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text);
  }
}

export function extractOutput(text: string) {
  return text
    .split(/\r?\n/)
    .filter((line) => !line.trimStart().startsWith('$ '))
    .join('\n')
    .trim();
}
