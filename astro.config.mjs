import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://daewangampark.com',
  // Static-first: every page is still pre-rendered to plain HTML at build time.
  // Only the weather module opts into on-demand rendering (Server Island),
  // which is what the Cloudflare adapter provides at runtime.
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ko',
        locales: { ko: 'ko', en: 'en', zh: 'zh-CN', ja: 'ja' },
      },
      // Legal/settings pages are noindex — keep them out of the sitemap too.
      filter: (page) =>
        !/\/(privacy-policy|cookie-settings|terms-of-service)\/?$/.test(page),
    }),
  ],
  i18n: {
    defaultLocale: 'ko',
    locales: ['zh', 'en', 'ja', 'ko'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
