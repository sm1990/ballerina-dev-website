import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = process.cwd();
const targetRoot = process.cwd();

const sourceFile = path.join(sourceRoot, 'contributions', 'connector-contributor-guide.md');
const targetDir = path.join(targetRoot, 'contributions-docs');
const targetFile = path.join(targetDir, 'connector-contributor-guide.md');

function main() {
  fs.mkdirSync(targetDir, {recursive: true});
  let content = fs.readFileSync(sourceFile, 'utf8');
  content = content.replace(
    /^keywords:\s*(.+)$/m,
    (_, value) =>
      `keywords:\n${value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => `  - ${item}`)
        .join('\n')}`,
  );
  content = content.replace('/community/#contribute-and-get-rewarded', '/community/');
  fs.writeFileSync(targetFile, content);
  console.log('Imported contributions docs');
}

main();
