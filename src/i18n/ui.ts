import zh from './zh.json';
import en from './en.json';
import ja from './ja.json';
import ko from './ko.json';

export const defaultLang = 'ko';
export const languagesList = ['zh', 'en', 'ja', 'ko'] as const;

export const languages: Record<string, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
  ko: '한국어',
};

const ui: Record<string, any> = { zh, en, ja, ko };

export function getLangFromUrl(url: URL): string {
  const seg = url.pathname.split('/').filter(Boolean);
  const lang = seg[0];
  return (languagesList as readonly string[]).includes(lang) ? lang : defaultLang;
}

export function getI18n(url: URL) {
  const lang = getLangFromUrl(url);
  const messages = ui[lang];
  const t = (key: string): string => {
    const found = key
      .split('.')
      .reduce<any>((o, i) => (o == null ? undefined : o[i]), messages);
    return found ?? '';
  };
  return { lang, messages, t };
}

export function buildAlternates(path = ''): Record<string, string> {
  const base = 'https://daewangampark.com';
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const mk = (l: string) => `${base}/${l}${clean ? '/' + clean : ''}`;
  return {
    zh: mk('zh'),
    en: mk('en'),
    ja: mk('ja'),
    ko: mk('ko'),
    // English is the fallback for every unmatched language or region: it is the
    // site's largest audience by far, so it beats sending those users to Korean.
    xDefault: mk('en'),
  };
}

export function htmlLangAttr(lang: string): string {
  if (lang === 'zh') return 'zh-CN';
  return lang;
}

/** BCP-47 locale tag used for server-side date/number formatting. */
export function intlLocale(lang: string): string {
  if (lang === 'zh') return 'zh-CN';
  if (lang === 'ja') return 'ja-JP';
  if (lang === 'ko') return 'ko-KR';
  return 'en-US';
}

/** Resolve a message catalogue directly from a language code. */
export function getMessagesByLang(lang: string): any {
  return ui[(languagesList as readonly string[]).includes(lang) ? lang : defaultLang];
}
