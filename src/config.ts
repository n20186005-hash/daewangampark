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

/**
 * Single-attraction SEO entity binding.
 * Every value below maps 1:1 to the placeholder table of the
 * "单景点 SEO 实体绑定配置变量表", so the site can be re-pointed to
 * another attraction by editing only this object.
 */
export const place = {
  domain: 'daewangampark.com',
  baseUrl: 'https://daewangampark.com',
  // {{ATTRACTION_FULL_NAME}} / {{ATTRACTION_SHORT_NAME}}
  fullName: 'Daewangam Park',
  fullNameLocal: '대왕암공원',
  shortName: 'Daewangam Park',
  // {{CITY_NAME}} / {{STATE_PROVINCE}} / {{COUNTRY_NAME}}
  city: 'Ulsan',
  cityLocal: '울산',
  stateProvince: 'Ulsan Metropolitan City',
  country: 'South Korea',
  countryCode: 'KR',
  // {{POSTAL_CODE}}
  postalCode: '44058',
  // {{LATITUDE}} / {{LONGITUDE}}
  latitude: 35.4924,
  longitude: 129.4396,
  plusCode: 'FCRQ+XR Ulsan, South Korea',
  streetAddress: '95 Deungdae-ro, Dong-gu',
  telephone: '+82-52-209-3738',
  // {{MAPS_SHARE_URL}} / {{MAPS_EMBED_SRC}}
  mapsShareUrl: 'https://maps.app.goo.gl/VzccMpX7nCxzrbFdA',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m5!3m3!1m2!1s0x3567ce31fb98275d%3A0x7e120e16b9bd1099!2sDaewangam%20Park!5e1!3m2!1sen!2s!4v1789189952266!5m2!1sen!2s',
  // {{GOVT_TOURISM_URL}} - authoritative .go.kr / .or.kr portals
  govtTourismUrl: 'https://www.ulsan.go.kr',
  govtTourismUrlLocal: 'https://daewangam.donggu.ulsan.kr/',
  govtTourismUrlEn: 'https://english.visitkorea.or.kr',
  // Open Graph / schema hero image
  heroImage: 'https://daewangampark.com/gallery/daewangam-park-ulsan-1.jpg',
  heroImageAlt: 'Daewangam Park (대왕암공원) in Ulsan, South Korea',
  heroImageWidth: 1600,
  heroImageHeight: 1067,
  // Google Analytics 4
  ga4Id: 'G-HXM22WWPKP',
  themeColor: '#0f2015',
} as const;

/**
 * Photo naming convention: <site>-<place>-<city>-<index>.jpg
 * The gallery holds `galleryCount` consecutive files starting at 1.
 * Always build photo paths through these helpers so renaming the set
 * only ever requires touching one place.
 */
export const galleryCount = 24;
export const galleryFile = (n: number | string) => `/gallery/daewangam-park-ulsan-${n}.jpg`;
export const galleryUrl = (n: number | string) => `${place.baseUrl}${galleryFile(n)}`;
export const galleryFiles = () =>
  Array.from({ length: galleryCount }, (_, i) => galleryFile(i + 1));

/** {{NEARBY_LANDMARK_1}} / {{NEARBY_LANDMARK_2}} semantic cluster. */
export const nearbyLandmarks = [
  {
    id: 'ulgi-lighthouse',
    name: 'Ulgi Lighthouse (울기등대)',
    url: 'https://www.donggu.ulsan.kr/tour/tourBBS/SA1/view.do?nttId=94',
    image: '/gallery/daewangam-park-ulsan-8.jpg',
  },
  {
    id: 'ilsan-beach',
    name: 'Ilsan Beach (일산해수욕장)',
    url: 'https://www.ulsan.go.kr/tour/kor/unit/attrctn/view.ulsan?mId=001002001000000000&unqId=27',
    image: '/gallery/daewangam-park-ulsan-15.jpg',
  },
  {
    id: 'donggu-coast',
    name: 'Donggu Coastal Trail (동구 해안 산책로)',
    url: 'https://daewangam.donggu.ulsan.kr/',
    image: '/gallery/daewangam-park-ulsan-5.jpg',
  },
] as const;

/** Image credits - all imagery belongs to the original photographers. */
export const imageCredits = {
  provider: 'Daewangam Park Visitor Guide',
  licenceUrl: 'https://daewangampark.com',
} as const;
