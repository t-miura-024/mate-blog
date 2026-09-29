# 実装計画（おなかのそと）

ラウンド 1〜6 のヒアリングで確定した決定に基づく実装計画。決定の根拠は `docs/adr/`、デザインの基準は `docs/design-system.md`、用語は `CONTEXT.md` を参照。公開作業の手順は `docs/deploy-guide.md`。

## 技術構成

- Astro 7 + React 19 + Tailwind CSS v4（`@tailwindcss/vite`）
- microCMS（記事コンテンツ、画像は imgix のまま配信）/ @astrojs/cloudflare 14
- Cloudflare Workers（静的アセット + プレビュー用 Worker）、Workers Builds でデプロイ
- pnpm / Node 24 系 / TypeScript strict
- oxlint + typescript-eslint（hybrid）+ oxfmt / Vitest + Testing Library / Storybook 10 / lefthook

## 実装状況

| マイルストーン      | 状態                | 内容                                                                                                |
| ------------------- | ------------------- | --------------------------------------------------------------------------------------------------- |
| M1 骨組み           | ✅ 完了             | Astro + React + Tailwind + デザイントークン + コンポーネント 23 種 + Storybook + テスト/lint ゲート |
| M2 コンテンツ接続   | ✅ 完了             | microCMS クライアント + マッピング（`src/lib/microcms.ts`）+ 記事一覧/詳細/カテゴリ/タグ            |
| M3 固定ページと SEO | ✅ 完了             | About / Contact / Privacy / 404 / sitemap / robots.txt / canonical / OGP / 構造化データ             |
| M4 プレビューと運用 | ✅ 完了             | プレビュー SSR ルート（draftKey + noindex）/ 目次自動生成 / 医療注記の出し分け                      |
| M5 公開             | ⏳ あなたの作業待ち | microCMS サービス作成・API キー、Cloudflare 接続（`docs/deploy-guide.md`）                          |

## microCMS スキーマ（実装済み仕様）

API エンドポイント: `articles`（リスト形式）

| フィールド ID     | 種類             | 備考                                                   |
| ----------------- | ---------------- | ------------------------------------------------------ |
| title             | テキスト         | 必須                                                   |
| body              | リッチエディタ   | 必須。h2 / h3 から目次を自動生成し、見出しに id を付与 |
| eyecatch          | 画像             | 任意。OGP 画像にも使用                                 |
| eyecatchAlt       | テキスト         | 任意。アイキャッチの alt                               |
| category          | セレクト（単一） | 値: `妊娠期` / `出産` / `育児期`                       |
| tags              | テキスト         | カンマ区切り（`つわり, 食事`）。タグページを自動生成   |
| showMedicalNotice | 真偽値           | true の記事に医療体験の定型注記を表示                  |

- 記事の抜粋は本文から自動生成（マイクロ CMS 側に excerpt フィールドは不要）
- タグは記事から収集。1 記事のみのタグページは `noindex`
- Webhook は「公開」「更新」のみ Deploy Hook へ（下書き保存では再ビルドしない）

## URL 構成

| パス                                                                   | 内容                                                                  |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `/`                                                                    | 最新記事 + カテゴリ導線                                               |
| `/articles/`                                                           | 記事一覧                                                              |
| `/articles/<contentId>/`                                               | 記事詳細（目次・関連記事・前後記事・シェア・AuthorBox・構造化データ） |
| `/categories/pregnancy/` `/categories/birth/` `/categories/childcare/` | カテゴリ別一覧                                                        |
| `/tags/<タグ名>/`                                                      | タグ別一覧（日本語 URL）                                              |
| `/about/` `/contact/` `/privacy/`                                      | 固定ページ（お問い合わせは mailto）                                   |
| `/preview/<contentId>?draftKey=...`                                    | 下書きプレビュー（SSR・noindex・検索避け）                            |
| `/robots.txt` `/sitemap-index.xml`                                     | SEO                                                                   |

## テスト・ゲート（実装済み）

- lefthook: pre-commit = oxfmt（stage_fixed）+ oxlint / eslint、pre-push = astro check + vitest（カバレッジ 90% 未満で push 不可）
- Vitest + Testing Library + axe（`src/test-utils/a11y.ts`）。対象は `src` の export 済み .ts/.tsx（ページ・レイアウト・scripts は対象外）
- 実測: Statements 100% / Functions 100% / Lines 100% / Branches 96.77%（164 テスト）

## 実装時に確認した事項

- oxfmt は `.astro` 非対応 → `.astro` は整形対象外（lefthook の glob に含めない）
- Storybook の Astro 公式サポートは無い → React コンポーネントのみカタログ化（ADR-0011）で運用
- Tailwind v4 トークンは Storybook の Vite 設定（`.storybook/main.ts` の viteFinal）で読み込み済み
- 画像は microCMS（imgix）配信。Cloudflare Images は `imageService: 'passthrough'` で無効化済み
- ローカル開発は `.dev.vars`（`astro dev` 用）。`astro preview` は `dist/server/.dev.vars` を参照するため、必要な場合のみコピーする
- 実 API キーなしでビルドを検証するための開発ツール: `scripts/microcms-fetch-stub.mjs` + `scripts/fixtures/microcms-articles.json`
  ```sh
  MICROCMS_SERVICE_DOMAIN=fixture MICROCMS_API_KEY=dummy SITE_URL=https://example.workers.dev \
  NODE_OPTIONS="--import ./scripts/microcms-fetch-stub.mjs" pnpm build
  ```
