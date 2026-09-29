# テスト対象は src の export 済み .ts/.tsx に限定し、カバレッジ 90% を lefthook で強制する

「public なコンポーネントと関数」= src 配下で export された UI コンポーネントとロジック（.ts / .tsx）と定義する。Astro のページ・レイアウトは薄い組み立てに限定して対象外とする。カバレッジは lines / functions / branches / statements の 4 指標すべて 90% を必須とし、pre-push の vitest 実行で強制する。ゲートは lefthook（pre-commit: format + lint / pre-push: typecheck + test + coverage）で行い、GitHub Actions は設けない。ローカルのみのゲートであることは受け入れる。テストファイルと Story ファイルは対象コードと同一ディレクトリに置く。
