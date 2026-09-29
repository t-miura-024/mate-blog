// @ts-check
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  integrations: [react(), sitemap()],
  // 静的ページの事前生成は Node ランタイムで行う（ビルドの再現性のため）
  // 画像は microCMS（imgix）配信、セッションは未使用のため Cloudflare 側の bindings は有効化しない
  adapter: cloudflare({ prerenderEnvironment: 'node', imageService: 'passthrough' }),
  session: false,
  env: {
    schema: {
      MICROCMS_SERVICE_DOMAIN: envField.string({ context: 'server', access: 'public' }),
      MICROCMS_API_KEY: envField.string({ context: 'server', access: 'secret' }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
