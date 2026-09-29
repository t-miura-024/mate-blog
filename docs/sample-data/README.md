# サンプル記事データ（microCMS インポート用）

## これは何か

microCMS にインポートできる形式の**サンプル記事 CSV**。テーマは「札幌市西区での妊娠・出産・育児」で、妊娠期 / 出産 / 育児期の 3 カテゴリにまたがる 30 件。

- ファイル: `nishi-ku-articles.csv`
- 形式: `docs/../` の microCMS インポートテンプレート（8 列）
  `コンテンツID, title, body, eyecatch, eyecatchAlt, category, tags, showMedicalNotice`
- body は HTML（h2 / h3 を含むため、インポート後に記事ページの目次が自動生成されます）

## 重要な注意

- **内容は架空の体験談です**。実在の人物・医療機関の話ではありません
- 公開前に必ず推敲・事実確認をしてください（公共施設の名称、制度、手続きは変更されることがあります）
- 医療・健康に関わる記述は「個人の体験」に留めてあります。判断を促す表現を足す場合はご注意ください
- `eyecatch`（画像 URL）は空にしてあります。画像は microCMS 上で設定してください

## インポート手順

1. microCMS の管理画面で API `articles` を開く
2. 「コンテンツ一覧」→「インポート」を選択
3. `nishi-ku-articles.csv` をアップロード
4. フィールドのマッピングを確認（ヘッダーがフィールド ID と一致していれば自動で対応します）
5. 実行（可能なら**下書きとしてインポート**し、内容を確認してから公開するのがおすすめです）

## インポート後の確認ポイント

- 記事ページの**目次**が本文の見出しから生成されていること
- カテゴリページ（妊娠期 / 出産 / 育児期）とタグページが生成されていること
- `showMedicalNotice` が true の記事に「医療体験の注記」が表示されること
- アイキャッチを設定した記事で、記事ページ上部に画像が表示されること

## ローカルでの検証（任意）

microCMS にインポートせずとも、CSV をローカルのフィクスチャに変換してビルド確認できます:

```sh
node scripts/csv-to-microcms-fixture.mjs docs/sample-data/nishi-ku-articles.csv
MICROCMS_SERVICE_DOMAIN=fixture MICROCMS_API_KEY=dummy SITE_URL=http://localhost:4321 \
NODE_OPTIONS="--import ./scripts/microcms-fetch-stub.mjs" pnpm build
```
