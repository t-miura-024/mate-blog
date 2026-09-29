# エージェント向け開発ガイド

妊娠・出産・育児ブログ「おなかのそと」（mate-blog）。設計の背景は `docs/` と `CONTEXT.md` を読むこと。

## コマンド

- `pnpm dev` / `pnpm build` / `pnpm preview`
- `pnpm typecheck`（astro check）/ `pnpm lint`（oxlint + eslint）/ `pnpm format`（oxfmt）
- `pnpm test` / `pnpm exec vitest run --coverage`
- `pnpm storybook` / `pnpm build-storybook`

## 守るべき規約

- テストファイル（`*.test.tsx`）と Story（`*.stories.tsx`）は対象コンポーネントと同一ディレクトリに置く
- `src` 内は default export 禁止（`*.stories.*` と設定ファイルは例外）
- 依存方向は `src/lib` ← `src/components` ← `src/layouts` / `src/pages`（逆流禁止。no-restricted-imports で担保）
- React コンポーネントは named export、Props 型を export、戻り値は `ReactNode`
- 色・余白・角丸・影はデザイントークン（`src/styles/global.css` の `@theme`）を使う。生の hex 禁止
- `as` による型アサーション禁止 / else・switch 禁止（テストファイルは一部緩和）
- カバレッジ 90%（lines / functions / branches / statements）を維持する。pre-push の lefthook が強制する

## 構成

```
src/lib/         データ・ドメインロジック（純関数 + テスト）
src/components/  React UI コンポーネント（.tsx / .test.tsx / .stories.tsx を同居）
src/layouts/     Astro レイアウト
src/pages/       Astro ページ（ルーティング）
docs/            design-system.md / adr / implementation-plan.md
```

## 現在の状態

- M1〜M4 完了（コンポーネント / Storybook / 品質ゲート / microCMS 接続 / SEO / プレビュー SSR）
- 公開（M5）はユーザーの作業待ち。手順は `docs/deploy-guide.md`
- ビルドには `MICROCMS_SERVICE_DOMAIN` / `MICROCMS_API_KEY` / `SITE_URL` が必要（`.env.example` 参照）
- API キーなしでビルドを検証する場合は `scripts/microcms-fetch-stub.mjs` を使う（`docs/implementation-plan.md` 参照）
