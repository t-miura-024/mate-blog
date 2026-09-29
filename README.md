# おなかのそと（mate-blog）

妊娠・出産・育児の体験を、母親の視点で書く公開ブログ。同じ境遇のママに向けて発信する。

## 技術構成

- Astro 7 + React 19 + Tailwind CSS v4
- microCMS（コンテンツ管理。画像は imgix）
- Cloudflare Workers（配信）/ Workers Builds（デプロイ）
- pnpm / TypeScript strict / oxlint + typescript-eslint + oxfmt / Vitest + Testing Library / Storybook / lefthook

## コマンド

| コマンド               | 内容                                                     |
| ---------------------- | -------------------------------------------------------- |
| `pnpm dev`             | 開発サーバー                                             |
| `pnpm build`           | 本番ビルド（`dist/` に静的出力）                         |
| `pnpm preview`         | ビルド結果のプレビュー                                   |
| `pnpm typecheck`       | 型チェック（astro check）                                |
| `pnpm lint`            | oxlint + eslint                                          |
| `pnpm format`          | oxfmt で整形                                             |
| `pnpm test`            | Vitest（カバレッジは `pnpm exec vitest run --coverage`） |
| `pnpm storybook`       | Storybook 起動（カタログ）                               |
| `pnpm build-storybook` | Storybook の静的ビルド                                   |

## 品質ゲート（lefthook）

- pre-commit: format（oxfmt, 自動修正）+ lint
- pre-push: typecheck + test + カバレッジ 90%（lines / functions / branches / statements）

## ドキュメント

- `CONTEXT.md` — ユビキタス言語（用語集）
- `docs/design-system.md` — デザイントークンとコンポーネント一覧
- `docs/adr/` — 設計判断の記録
- `docs/implementation-plan.md` — 実装計画・実装状況・microCMS スキーマ
- `docs/deploy-guide.md` — 公開までの手順（microCMS / Cloudflare のセットアップ）

## 環境変数

`.env.example` をコピーして設定してください（ビルド時に必要）。

- `MICROCMS_SERVICE_DOMAIN` / `MICROCMS_API_KEY` — microCMS の接続情報
- `SITE_URL` — sitemap / canonical / OGP に使う絶対 URL
