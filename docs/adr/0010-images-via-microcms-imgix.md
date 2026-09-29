# 画像最適化は microCMS（imgix）に一本化する

画像の変換・配信は microCMS の画像 API（imgix）に一本化し、Cloudflare / Astro での再変換は行わない。多重最適化は画質・課金・キャッシュの乱れを招くため避ける。表示サイズは URL パラメータと srcset で指定する。microCMS の転送量上限（Hobby プラン 20GB/月）に近づいた場合は、Cloudflare 側キャッシュ（Transformations）への切り替えを再検討する。
