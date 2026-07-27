import fs from 'node:fs';
import path from 'node:path';

const sourcePath = path.resolve(process.cwd(), '_data/articles.json');
const targetPath = path.resolve(process.cwd(), '_data/articles.json');

function main() {
  const raw = fs.readFileSync(sourcePath, 'utf8');
  const source = JSON.parse(raw);

  fs.mkdirSync(path.dirname(targetPath), {recursive: true});
  fs.writeFileSync(targetPath, JSON.stringify(source, null, 2) + '\n');

  console.log(`Imported ${source.articles.length} news articles -> _data/articles.json`);
}

main();
