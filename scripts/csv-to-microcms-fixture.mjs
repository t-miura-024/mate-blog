import { readFileSync, writeFileSync } from 'node:fs';

const DEFAULT_OUTPUT = 'scripts/fixtures/microcms-articles.json';
const CATEGORY_VALUES = new Set(['妊娠期', '出産', '育児期']);

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (inQuotes) {
      if (char === '"') {
        if (text[index + 1] === '"') {
          field += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }
    if (char === ',') {
      row.push(field);
      field = '';
      continue;
    }
    if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      continue;
    }
    if (char === '\r') {
      continue;
    }
    field += char;
  }

  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((line) => line.some((cell) => cell.trim() !== ''));
}

function stripTags(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildPublishedAt(index) {
  const base = Date.UTC(2026, 8, 28, 9, 0, 0);
  const day = 3 * 24 * 60 * 60 * 1000;
  return new Date(base - index * day).toISOString();
}

function toFixtureRow(
  { contentId, title, body, eyecatch, eyecatchAlt, category, tags, showMedicalNotice },
  index,
) {
  if (!title || !body) {
    throw new Error(`title / body が空の行があります（${index + 1} 行目）`);
  }
  if (!CATEGORY_VALUES.has(category)) {
    throw new Error(`category が不正です: "${category}"（${index + 1} 行目）`);
  }
  if (!['true', 'false'].includes(showMedicalNotice)) {
    throw new Error(
      `showMedicalNotice は true / false が必要です: "${showMedicalNotice}"（${index + 1} 行目）`,
    );
  }

  const publishedAt = buildPublishedAt(index);
  const row = {
    id: contentId === '' ? `sample-${String(index + 1).padStart(3, '0')}` : contentId,
    title,
    body,
    category: [category],
    tags,
    showMedicalNotice: showMedicalNotice === 'true',
    publishedAt,
    createdAt: publishedAt,
    updatedAt: publishedAt,
    revisedAt: publishedAt,
  };

  if (eyecatch !== '') {
    row.eyecatch = { url: eyecatch, width: 1200, height: 630 };
    row.eyecatchAlt = eyecatchAlt;
  }

  return row;
}

function main() {
  const [inputPath, outputPath = DEFAULT_OUTPUT] = process.argv.slice(2);

  if (!inputPath) {
    throw new Error('使い方: node scripts/csv-to-microcms-fixture.mjs <input.csv> [output.json]');
  }

  const rows = parseCsv(readFileSync(inputPath, 'utf8'));
  const [header, ...dataRows] = rows;

  if (!header || header.length !== 8) {
    throw new Error(`ヘッダーの列数が想定と違います（${header ? header.length : 0} 列）`);
  }

  const contents = dataRows.map((row, index) => {
    if (row.length !== 8) {
      throw new Error(`${index + 2} 行目の列数が ${row.length} です（8 列必要）`);
    }
    const [contentId, title, body, eyecatch, eyecatchAlt, category, tags, showMedicalNotice] = row;
    return toFixtureRow(
      { contentId, title, body, eyecatch, eyecatchAlt, category, tags, showMedicalNotice },
      index,
    );
  });

  writeFileSync(outputPath, `${JSON.stringify({ contents }, null, 2)}\n`);

  const bodyLengths = contents.map((article) => stripTags(article.body).length);
  const categoryCounts = new Map();
  for (const article of contents) {
    const category = article.category[0];
    categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + 1);
  }

  console.log(`${contents.length} 件を ${outputPath} に書き出しました`);
  console.log(`本文文字数: 最小 ${Math.min(...bodyLengths)} / 最大 ${Math.max(...bodyLengths)}`);
  console.log(
    `カテゴリ内訳: ${[...categoryCounts.entries()]
      .map(([category, count]) => `${category} ${count}件`)
      .join(' / ')}`,
  );
}

main();
