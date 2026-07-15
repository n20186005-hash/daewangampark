export const siteConfig = {
  name: 'Daewangam Park',
  baseUrl: 'https://daewangampark.com',
  slug: 'daewangam-park',
  locales: ['zh', 'en', 'ja', 'ko'] as const,
};

export const ogLocale: Record<string, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  ja: 'ja_JP',
  ko: 'ko_KR',
};
