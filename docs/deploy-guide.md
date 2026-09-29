# 公開までの手順（あなたが行う作業）

実装側（M1〜M4）は完了済み。以下は microCMS と Cloudflare のセットアップ手順です。上から順に進めれば公開まで到達できます。

## 1. microCMS のセットアップ

### 1-1. サービス作成

1. https://microcms.io/ にログイン（アカウントがなければ作成）
2. サービスを新規作成（サービス名の例: `mate-blog`）。プランは Hobby（無料）で開始
3. サービスドメイン（`xxxx.microcms.io` の `xxxx` 部分）を控える

### 1-2. API の作成

「API を作成」→「自分で決める」で、エンドポイントを **`articles`**（リスト形式）にして以下のフィールドを作成:

| フィールド ID       | 種類               | 内容                                             | 必須 |
| ------------------- | ------------------ | ------------------------------------------------ | ---- |
| `title`             | テキストフィールド | 記事タイトル                                     | 必須 |
| `body`              | リッチエディタ     | 本文                                             | 必須 |
| `eyecatch`          | 画像               | アイキャッチ（任意）                             | 任意 |
| `eyecatchAlt`       | テキストフィールド | アイキャッチの説明（alt 属性）                   | 任意 |
| `category`          | セレクトフィールド | 選択肢: `妊娠期` / `出産` / `育児期`（単一選択） | 必須 |
| `tags`              | テキストフィールド | タグをカンマ区切りで入力（例: `つわり, 食事`）   | 任意 |
| `showMedicalNotice` | 真偽値             | 医療体験の注記を表示する                         | 任意 |

フィールド ID は上記のとおり正確に入力してください（コードがこの ID で読み取ります）。

### 1-3. API キーの発行

1. API 設定 → API キー → 追加
2. 権限は「GET」のみで OK
3. 発行されたキーを控える

### 1-4. テスト投稿

1. 記事を 2〜3 件作成して公開（カテゴリ・タグを設定）
2. 本文に見出し（h2 / h3）を使うと目次が自動生成されます

## 2. Cloudflare へのデプロイ

### 2-1. Workers プロジェクトの作成

1. Cloudflare ダッシュボード → Workers & Pages → 新しいアプリケーション → Workers を作成（Git に接続）
2. リポジトリ `t-miura-024/mate-blog` を選択
3. Build 設定:
   - Build command: `pnpm build`
   - Deploy command: `pnpm exec wrangler deploy`
4. 環境変数（Build variables and secrets）に以下を追加:
   - `MICROCMS_SERVICE_DOMAIN` = 1-1 で控えたドメイン（例: `mate-blog`）
   - `MICROCMS_API_KEY` = 1-3 で発行したキー（Secret として追加）
   - `SITE_URL` = デプロイ後の URL（例: `https://mate-blog.<アカウント名>.workers.dev`）
5. 保存して最初のデプロイを実行

> メモ: `SITE_URL` は canonical / OGP / sitemap に使われます。初回は workers.dev の URL を設定し、独自ドメインを当てたら変更してください。

### 2-2. workers.dev サブドメイン

Workers の設定 → サブドメイン（初回のみ）で `<アカウント名>.workers.dev` を設定していない場合は設定します。

### 2-3. プレビュー URL を microCMS に登録

microCMS → API 設定 → 画面プレビュー:

- `https://<デプロイURL>/preview/{CONTENT_ID}?draftKey={DRAFT_KEY}`

記事の編集画面から「プレビュー」を押すと、下書き状態の記事を実サイトのレイアウトで確認できます。

### 2-4. 公開を自動反映（Webhook）

1. Cloudflare ダッシュボード → Workers → mate-blog → Settings → Builds → Deploy Hooks でフック URL を発行
2. microCMS → API 設定 → Webhook で「カスタム通知」を追加:
   - URL: 上で発行した Deploy Hooks URL
   - タイミング: **「公開」と「更新」のみ**にチェック（下書き保存は再ビルド不要）
3. Webhook は取りこぼし（リトライなし）があるため、保険として Cloudflare の Cron Trigger から同じ Deploy Hook を 1 日 1 回叩く Worker を後で追加してもよいです（未実装・必要になったら相談）

## 3. 公開後の設定

### 3-1. アクセス解析

1. Cloudflare ダッシュボード → Web Analytics → mate-blog を有効化（Cookie なし・同意バナー不要）
2. Google Search Console でプロパティ追加 → HTML ファイル検証を選び、認証ファイルを `public/` に置いて再デプロイ（または DNS 検証が可能になるのは独自ドメイン移行後）
3. Search Console に sitemap（`https://<URL>/sitemap-index.xml`）を登録

### 3-2. 置き換えが必要な仮の値

- `src/lib/site.ts` の `AUTHOR_NAME`（現在「（ペンネーム未定）」）→ パートナーのペンネーム
- `src/lib/site.ts` の `CONTACT_EMAIL`（現在 `contact@example.com`）→ 実際の連絡先メール

### 3-3. 独自ドメイン（後回しで可）

独自ドメインを取得したら、Workers の Custom Domains に追加し、`SITE_URL` を更新して再デプロイしてください（旧 URL からのリダイレクトは Cloudflare の Redirect Rules で設定）。

## 開発時の環境変数

ローカルでは `.env`（`pnpm dev` / `pnpm build` 用）と `.dev.vars`（workerd ランタイム用）に設定します。

```sh
cp .env.example .env
cp .env.example .dev.vars
# MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY / SITE_URL を記入
```

- `pnpm dev`: `.dev.vars`（プロジェクト直下）を読みます
- `pnpm preview`（ビルド成果物のローカル確認）: `pnpm build` 後に `cp .dev.vars dist/server/.dev.vars` してから実行します

## microCMS のプラン注意点

- Hobby（無料）: 転送量 20GB/月を超えると翌月まで API が停止します。画像を多く使う場合は Team 以上への変更を検討してください
- 権限管理（ロール）は Business 以上です。執筆者と開発者の 2 人運用なら Hobby で十分です
