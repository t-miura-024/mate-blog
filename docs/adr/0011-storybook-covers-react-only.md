# Storybook は React コンポーネントを対象にし、Astro はカタログ対象外とする

Storybook に Astro の公式サポートはなく、コミュニティ製 framework は追随リスクがある。カタログ対象を React コンポーネント（UI 部品・操作要素）に限定し、Storybook・Vitest・Testing Library を公式サポート範囲で運用する。Astro コンポーネントはレイアウトとページの薄い組み立てに限定し、Storybook では扱わない。「カタログに載る単位 = テスト対象 = 実装単位」を一致させる。
