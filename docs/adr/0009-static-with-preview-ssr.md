# 公開ページは静的生成、プレビューだけ Worker 上でオンデマンド表示する

公開ページはビルド時に microCMS から取得して静的生成する（速度・コスト・障害耐性）。下書きプレビューは draftKey 付き URL を Worker 上でオンデマンドレンダリングして表示し、noindex にする。公開反映は microCMS Webhook → Cloudflare Deploy Hook による再ビルドで行う。Webhook はリトライや順序保証がないため、取りこぼし対策として定期再ビルドを併用する。全ページ SSR はリクエストごとの API 呼び出し（レート制限・コスト）を招くため採用しない。
