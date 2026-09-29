# おなかのそと デザインシステム

白基調・やさしい余白（Soft Airy）を基本に、妊娠・出産・育児の体験を静かに読めることを最優先する。ダークモードは提供せず、白基調をブランドとして保つ。アクセシビリティは WCAG 2.2 AA を目標とする。

## 原則

- 白と余白が主役。装飾は最小限にする
- 写真は大きめに、角丸でやわらかく（顔なし写真が前提）
- 色数は絞り、意味を持つ色だけを使う
- 読み物としての可読性（行長・行間・コントラスト）を最優先する
- 動きは控えめに（フェードと軽い移動のみ、prefers-reduced-motion を尊重）

## トークン

### 色

| トークン         | 値      | 用途                                 |
| ---------------- | ------- | ------------------------------------ |
| base             | #FFFFFF | 背景                                 |
| surface          | #FAFAF8 | カード・セクション背景（生成り）     |
| surface-emphasis | #F1EFE9 | 強調背景・タグ地                     |
| text             | #2E3230 | 本文                                 |
| text-subtle      | #5F6A63 | 補助テキスト（日付・キャプション）   |
| border           | #E6E4DD | 罫線・区切り                         |
| accent           | #7C9A82 | 装飾・アイコン（テキスト用途は不可） |
| accent-strong    | #4F6F57 | リンク・ボタン文字など文字に使う濃色 |
| accent-soft      | #E9F0EA | タグ・バッジ背景                     |
| focus            | #4F6F57 | フォーカスリング                     |

コントラストは WCAG AA（通常テキスト 4.5:1 / 大テキスト 3:1）を満たすことを実装時に自動検証で確定させる。本文・補助テキスト・accent-strong は満たす想定。

### タイポグラフィ

- 見出し: Zen Maru Gothic（500 / 700）
- 本文: Noto Sans JP（400 / 500 / 700）
- 本文の行間は広め（line-height 1.9）、1 行 30〜40 字を目安にする

| トークン     | サイズ / 行間  | 用途                     |
| ------------ | -------------- | ------------------------ |
| text-display | 2rem / 1.4     | ページタイトル           |
| text-h2      | 1.5rem / 1.5   | セクション見出し         |
| text-h3      | 1.25rem / 1.6  | 小見出し                 |
| text-body    | 1rem / 1.9     | 本文                     |
| text-small   | 0.875rem / 1.7 | 日付・キャプション・補助 |

本文フォントは日本語サブセットを自己ホストし、preload と font-display: swap で CLS / LCP に配慮する。

### 余白（4px 基準）

space-1: 4px / space-2: 8px / space-3: 12px / space-4: 16px / space-6: 24px / space-8: 32px / space-12: 48px / space-16: 64px / space-24: 96px

### 角丸

- radius-sm: 6px（タグ・小さな要素）
- radius-md: 12px（カード・ボタン）
- radius-lg: 20px（写真・大きな面）

### 影

- shadow-soft: `0 1px 2px rgb(46 50 48 / 0.04), 0 8px 24px rgb(46 50 48 / 0.06)`
- 影は控えめに。多用しない

### レイアウト

- 記事本文の最大幅: 720px
- サイト全体の最大幅: 1080px
- ブレークポイント: sm 640 / md 768 / lg 1024 / xl 1280（Tailwind 既定）
- モバイルファースト（読者はスマートフォン中心）

### モーション

- 標準 150ms / ゆっくり 250ms、ease-out
- フェードと 8px 程度の移動まで。`prefers-reduced-motion: reduce` で無効化

### 写真

- 大きく表示し、角丸 radius-lg、キャプション付き
- alt は写真の内容を描写する（実名・場所など特定情報は書かない）
- アイキャッチは任意。ない場合でも余白とタイポグラフィで成立させる
- microCMS の画像 URL パラメータで必要なサイズを指定する（多重最適化を避ける）

## コンポーネント一覧

### レイアウト

- SiteHeader / SiteFooter / Container / PageTitle / Breadcrumbs

### 導線

- CategoryNav / TagList / Pagination / Toc（目次）

### 記事

- ArticleCard / ArticleHeader / ArticleBody（本文タイポ） / ArticleMeta / PhotoFigure / RelatedArticles / PrevNextNavigation / ShareButtons / AuthorBox / MedicalNotice（定型注記）

### 基本要素

- Button（primary / text） / Tag / TextLink / Notice / EmptyState

### フォーム

- ContactForm（お問い合わせ）と各フィールド

アイコンは必要最小限（シェア・外部リンク・矢印程度）とし、lucide を用いる。

## アクセシビリティ

- WCAG 2.2 AA を目標。axe による自動チェックをテストに含める
- フォーカスリングは常に可視（2px + offset）
- 画像 alt は必須（装飾のみ `alt=""`）
- タップターゲットは 44px 以上
- 見出し階層（h1 は各ページ 1 つ）とランドマークを守る

## 対象外（やらないこと）

- ダークモード
- 広告枠・アフィリエイト枠
- コメント欄
- 動画・過剰なアニメーション
