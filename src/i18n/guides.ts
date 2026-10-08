// Multilingual content for the three practical guide pages:
//   /{lang}/suspension-bridge/  /{lang}/how-to-get-there/  /{lang}/photos/
// Kept separate from the homepage catalog so the guides stay focused and
// easy to extend to more topics or languages.

export type GuideTopic = 'suspension-bridge' | 'how-to-get-there' | 'photos';
export type GuideLang = 'zh' | 'en' | 'ja' | 'ko';

export interface GuideFact {
  label: string;
  value: string;
}

export interface GuideBullet {
  strong: string;
  text: string;
}

export interface GuideSection {
  heading: string;
  body?: string[];
  list?: GuideBullet[];
}

export interface GuideFaq {
  q: string;
  a: string;
}

export interface GuideContent {
  title: string;
  description: string;
  intro: string;
  facts?: GuideFact[];
  sections: GuideSection[];
  faqs: GuideFaq[];
}

export const guideTopics: GuideTopic[] = [
  'suspension-bridge',
  'how-to-get-there',
  'photos',
];

// Card labels used on the homepage strip and in the "Related guides" block.
export const guideNav: Record<
  GuideLang,
  Record<GuideTopic, { label: string; desc: string; icon: string }>
> = {
  en: {
    'suspension-bridge': {
      label: 'Suspension Bridge',
      desc: 'Hours, length, what it connects & photo spots.',
      icon: '🌉',
    },
    'how-to-get-there': {
      label: 'How to Get There',
      desc: 'Bus, train, parking & walking directions.',
      icon: '🚌',
    },
    photos: {
      label: 'Photos & Viewpoints',
      desc: 'Best spots and light for shooting.',
      icon: '📸',
    },
  },
  ko: {
    'suspension-bridge': {
      label: '출렁다리',
      desc: '운영시간·길이·연결 구간·사진 명소.',
      icon: '🌉',
    },
    'how-to-get-there': {
      label: '가는 길',
      desc: '버스·기차·주차·도보 경로.',
      icon: '🚌',
    },
    photos: {
      label: '사진 명소',
      desc: '추천 전망점과 빛·타이밍.',
      icon: '📸',
    },
  },
  zh: {
    'suspension-bridge': {
      label: '海上悬索桥',
      desc: '开放时间、长度、连接位置与拍摄机位。',
      icon: '🌉',
    },
    'how-to-get-there': {
      label: '交通与路线',
      desc: '公交、火车、停车与步行路线。',
      icon: '🚌',
    },
    photos: {
      label: '拍照机位',
      desc: '最佳视角与光线时段。',
      icon: '📸',
    },
  },
  ja: {
    'suspension-bridge': {
      label: '海上ブリッジ',
      desc: '営業時間・長さ・接続区間・撮影スポット。',
      icon: '🌉',
    },
    'how-to-get-there': {
      label: 'アクセス',
      desc: 'バス・電車・駐車・徒歩ルート。',
      icon: '🚌',
    },
    photos: {
      label: '写真スポット',
      desc: 'おすすめ展望と光のタイミング。',
      icon: '📸',
    },
  },
};

export const guideUi: Record<
  GuideLang,
  { back: string; keyFacts: string; faq: string; related: string; stripHeading: string; stripSubtitle: string }
> = {
  en: {
    back: '← Back to Daewangam Park guide',
    keyFacts: 'Key facts',
    faq: 'FAQ',
    related: 'Related guides',
    stripHeading: 'Practical guides',
    stripSubtitle: 'Deeper, focused articles for planning your visit.',
  },
  ko: {
    back: '← 대왕암공원 가이드로 돌아가기',
    keyFacts: '핵심 정보',
    faq: '자주 묻는 질문',
    related: '관련 가이드',
    stripHeading: '실용 가이드',
    stripSubtitle: '방문 계획에 도움이 되는 심층 안내.',
  },
  zh: {
    back: '← 返回大王岩公园攻略',
    keyFacts: '关键信息',
    faq: '常见问题',
    related: '相关攻略',
    stripHeading: '实用攻略',
    stripSubtitle: '更深入、聚焦的游玩规划文章。',
  },
  ja: {
    back: '← 大王岩公園ガイドへ戻る',
    keyFacts: '基本情報',
    faq: 'よくある質問',
    related: '関連ガイド',
    stripHeading: '実用ガイド',
    stripSubtitle: '訪問計画に役立つ掘り下げ記事。',
  },
};

export const guides: Record<GuideTopic, Record<GuideLang, GuideContent>> = {
  'suspension-bridge': {
    en: {
      title: 'Daewangam Suspension Bridge: Hours, Length & Photography',
      description:
        "Daewangam Park's 303 m sea suspension bridge (출렁다리) in Ulsan: operating hours 09:00–18:00, last entry 17:40, 2nd-Tuesday closure, free crossing, how to reach it and the best photo positions.",
      intro:
        'The 303 m sea suspension bridge is the most photographed feature of Daewangam Park in Ulsan. This guide clears up the most common confusion — its real operating hours, what it actually connects, and where to shoot it.',
      facts: [
        { label: 'Length', value: "303 m — Ulsan's first sea-crossing pedestrian bridge." },
        { label: 'Operating hours', value: '09:00–18:00 (last entry 17:40).' },
        { label: 'Regular closure', value: 'every 2nd Tuesday of the month.' },
        { label: 'Fee', value: 'free — no ticket or reservation.' },
        {
          label: 'What it connects',
          value: 'the coastal trail between Hatgaebi and Surubang inside the park — not Daewangam islet.',
        },
      ],
      sections: [
        {
          heading: 'How to reach the bridge',
          body: [
            'From the main entrance, follow the pine-forest trail downhill toward the coast. The bridge is signed and sits between the Hatgaebi and Surubang sections of the coastal trail — about a 10–15 minute walk from the entrance. The deck sways gently with the sea breeze, and the East Sea opens beneath you.',
            'Because the bridge has its own daytime hours, arrive before 17:40 if you want to walk it. The park itself is open 24 hours, so you can still enjoy the coastal trail and sunrise even when the bridge is closed.',
          ],
        },
        {
          heading: 'Best photo positions',
          list: [
            { strong: 'Mid-bridge & sea-side railing:', text: 'the classic “bridge + East Sea + Daewangam” frame.' },
            { strong: 'From the shore at sunrise:', text: 'the rocks catch the first light — shoot from land, since the bridge opens at 09:00.' },
            { strong: 'Ulgi Lighthouse overlook:', text: 'a wider view of the bridge, coast and sea.' },
          ],
        },
        {
          heading: 'Weather & safety',
          body: [
            'The bridge may close temporarily in strong wind, heavy rain or thunderstorms. Coastal decks and rocks get slippery when wet — wear non-slip shoes and keep a safe distance from railings.',
          ],
        },
      ],
      faqs: [
        { q: 'How long is the Daewangam suspension bridge?', a: 'The sea bridge (출렁다리) is 303 m long — Ulsan’s first sea-crossing pedestrian bridge. Crossing is free.' },
        { q: 'What are the bridge operating hours?', a: 'It runs 09:00–18:00, with last entry at 17:40. It is closed on the 2nd Tuesday of every month for maintenance.' },
        { q: 'Is the bridge free?', a: 'Yes. The park and the bridge are both free to enter; there is no ticket or reservation.' },
        { q: 'Does the bridge connect to Daewangam islet?', a: 'No. The bridge spans the coastal trail between Hatgaebi and Surubang inside the park. Daewangam rock is a separate seaside formation you view from the shore and trails.' },
        { q: 'Can I photograph the bridge at sunrise?', a: 'Sunrise shots are best taken from the shore, not on the bridge, since the bridge opens at 09:00. Plan bridge photography within operating hours.' },
        { q: 'When is the bridge closed?', a: 'Beyond the monthly 2nd-Tuesday closure, it may temporarily close in strong wind, heavy rain or thunderstorms for safety. Check on-site notices before going.' },
      ],
    },
    ko: {
      title: '대왕암 출렁다리: 운영시간·길이·사진 명소',
      description:
        '울산 대왕암공원의 303m 바다 출렁다리(해상 현수교): 운영시간 09:00–18:00, 입장 마감 17:40, 매월 둘째 주 화요일 휴무, 무료 통행, 찾아가는 길과 사진 명소.',
      intro:
        '303m 바다 출렁다리는 대왕암공원에서 가장 사진에 많이 담기는 명물입니다. 이 안내는 혼동되기 쉬운 실제 운영시간, 다리가 실제로 연결하는 곳, 그리고 어디서 찍는 게 좋은지 정리했습니다.',
      facts: [
        { label: '길이', value: '303m — 울산 최초의 해상 인도교.' },
        { label: '운영시간', value: '09:00–18:00 (입장 마감 17:40).' },
        { label: '정기 휴무', value: '매월 둘째 주 화요일.' },
        { label: '요금', value: '무료 — 표나 예약 불필요.' },
        { label: '연결 구간', value: '공원 내 학개비(Hatgaebi)와 수루방(Surubang) 해안 산책로 — 대왕암 바위섬이 아님.' },
      ],
      sections: [
        {
          heading: '출렁다리까지 가는 길',
          body: [
            '주 출입구에서 소나무 숲 길을 따라 해안 쪽으로 내려가면 안내 표지가 있고, 학개비와 수루방 해안 산책로 사이에 위치합니다. 출입구에서 도보 약 10–15분입니다. 바람에 데크가 살랑거리고, 발 아래로 동해가 펼쳐집니다.',
            '다리는 낮 시간에만 운영하므로 건너려면 17:40 전에 도착하세요. 공원 자체는 24시간 개방이라, 다리가 닫아도 해안 산책로와 일출 감상은 가능합니다.',
          ],
        },
        {
          heading: '사진 명소',
          list: [
            { strong: '다리 중앙·바다 쪽 난간:', text: '"다리 + 동해 + 대왕암"의 정석 구도.' },
            { strong: '해변에서 일출:', text: '바위가 첫 햇살을 받습니다. 다리는 09:00 개방이니 육지에서 촬영하세요.' },
            { strong: '울기등대 전망대:', text: '다리·해안·바다를 한눈에 담는 넓은 뷰.' },
          ],
        },
        {
          heading: '날씨·안전',
          body: [
            '강풍·폭우·뇌우 시 임시 통제될 수 있습니다. 비 오면 데크와 바위가 미끄러우니 미끄럼 방지 신발을 신고 난간과 안전거리를 유지하세요.',
          ],
        },
      ],
      faqs: [
        { q: '대왕암 출렁다리 길이는?', a: '바다 출렁다리(출렁다리)는 303m로 울산 최초의 해상 인도교이며, 무료로 건널 수 있습니다.' },
        { q: '운영시간은?', a: '09:00–18:00, 입장 마감 17:40, 매월 둘째 주 화요일 정기 휴무입니다.' },
        { q: '무료인가요?', a: '네. 공원과 다리 모두 무료이며 표나 예약이 필요 없습니다.' },
        { q: '다리가 대왕암 섬과 연결되나요?', a: '아니요. 공원 내 학개비(Hatgaebi)와 수루방(Surubang) 해안 산책로를 연결합니다. 대왕암 바위는 별도의 해안 암석으로 해변·탐방로에서 조망합니다.' },
        { q: '일출 사진을 다리 위에서 찍을 수 있나요?', a: '다리는 09:00에 개방하므로 일출은 해변에서 담는 게 좋습니다.' },
        { q: '언제 닫히나요?', a: '매월 둘째 주 화요일 정기 휴무 외에 강풍·폭우·뇌우 시 안전을 위해 임시 통제될 수 있습니다. 현장 안내를 확인하세요.' },
      ],
    },
    zh: {
      title: '大王岩海上悬索桥：开放时间、长度与拍照',
      description:
        '蔚山大王岩公园 303 米海上悬索桥（출렁다리）：运营时间 09:00–18:00、最晚入场 17:40、每月第二个星期二休桥、免费通行、如何到达与最佳拍摄机位。',
      intro:
        '303 米海上悬索桥是大王岩公园出镜率最高的地标。本攻略厘清最容易混淆的几件事——它真实的运营时间、实际连接的位置，以及在哪里拍最好看。',
      facts: [
        { label: '长度', value: '303 米——蔚山首座海上人行桥。' },
        { label: '运营时间', value: '09:00–18:00（最晚入场 17:40）。' },
        { label: '定期休息', value: '每月第二个星期二。' },
        { label: '费用', value: '免费——无需购票或预约。' },
        { label: '连接位置', value: '公园内 Hatgaebi 与 Surubang 两段海岸步道——并非大王岩礁岛。' },
      ],
      sections: [
        {
          heading: '如何到达吊桥',
          body: [
            '从主入口沿松林步道下坡走向海岸，沿途有指引，吊桥位于 Hatgaebi 与 Surubang 海岸步道之间，从入口步行约 10–15 分钟。桥面随海风轻晃，脚下即东海。',
            '吊桥有日间运营时间，想走桥请在 17:40 前到达；公园本身 24 小时开放，闭桥时仍可走海岸步道、看日出。',
          ],
        },
        {
          heading: '最佳拍摄机位',
          list: [
            { strong: '桥中段的海侧栏杆：', text: '“桥 + 东海 + 大王岩”的经典构图的画面。' },
            { strong: '日出时在岸上：', text: '礁岩迎来第一缕光——因桥 09:00 才开，请在陆地拍摄。' },
            { strong: '蔚岐灯塔观景台：', text: '俯瞰吊桥、海岸与大海的更开阔视角。' },
          ],
        },
        {
          heading: '天气与安全',
          body: [
            '强风、大雨或雷雨时可能临时封闭；湿滑时桥面与礁石易打滑，请穿防滑鞋并与栏杆保持安全距离。',
          ],
        },
      ],
      faqs: [
        { q: '吊桥有多长？', a: '海上悬索桥（출렁다리）长 303 米，是蔚山首座海上人行桥，可免费通行。' },
        { q: '开放时间？', a: '09:00–18:00，最晚入场 17:40，每月第二个星期二休桥。' },
        { q: '免费吗？', a: '公园与吊桥均免费，无需购票或预约。' },
        { q: '吊桥连到大王岩礁岛吗？', a: '不。它连接公园内 Hatgaebi 与 Surubang 两段海岸步道；大王岩是独立的海边礁岩，从岸边与步道远观。' },
        { q: '能在日出时站桥上拍吗？', a: '吊桥 09:00 才开，日出请在岸上拍。' },
        { q: '何时封闭？', a: '除每月第二个星期二外，强风、大雨或雷雨为安全可能临时封闭，请以现场公告为准。' },
      ],
    },
    ja: {
      title: '大王岩の海上ブリッジ：営業時間・長さ・撮影スポット',
      description:
        '蔚山・大王岩公園の 303m の海上ブリッジ（출렁다리）：営業 09:00–18:00、最終入場 17:40、毎月第2火曜休み、無料通行、行き方とおすすめ撮影ポイント。',
      intro:
        '303m の海上ブリッジは大王岩公園で最も写真に撮られる名物です。このガイドでは、よく混同される実際の営業時間、橋がつないでいる場所、どこから撮るのが良いかを整理します。',
      facts: [
        { label: '長さ', value: '303m — 蔚山初の海上歩道橋。' },
        { label: '営業時間', value: '09:00–18:00（最終入場 17:40）。' },
        { label: '定期休業', value: '毎月第2火曜日。' },
        { label: '料金', value: '無料 — チケット・予約不要。' },
        { label: '接続', value: '公園内の Hatgaebi と Surubang の海岸遊歩道 — 大王岩の岩礁ではない。' },
      ],
      sections: [
        {
          heading: 'ブリッジへの行き方',
          body: [
            '正面入口から松林の遊歩道を海へ下ると案内があり、Hatgaebi と Surubang の海岸遊歩道の間に位置します。入口から徒歩約 10–15 分です。風でデッキが揺れ、足元に東海が広がります。',
            'ブリッジは昼間のみ営業するため、渡るには 17:40 までに到着を。公園は 24 時間開放なので、閉鎖時も海岸遊歩道や日の出の散策は可能です。',
          ],
        },
        {
          heading: 'おすすめ撮影スポット',
          list: [
            { strong: '橋中央・海側手すり：', text: '"ブリッジ＋東海＋大王岩"の定番構図。' },
            { strong: '海岸からの日の出：', text: '岩が朝日を浴びます。ブリッジは 09:00 開場なので陸から撮影を。' },
            { strong: '蔚岐灯台の展望台：', text: 'ブリッジ・海岸・海を広く捉える視点。' },
          ],
        },
        {
          heading: '天候・安全',
          body: [
            '強風・大雨・雷雨で一時閉鎖の場合があります。濡れるとデッキや岩が滑るため、滑り止め靴を履き手すりから安全距離を保ってください。',
          ],
        },
      ],
      faqs: [
        { q: 'ブリッジの長さは？', a: '海上ブリッジ（출렁다리）は 303m で、蔚山初の海上歩道橋。無料で渡れます。' },
        { q: '営業時間は？', a: '09:00–18:00、最終入場 17:40、毎月第2火曜休みです。' },
        { q: '無料ですか？', a: 'はい。公園もブリッジも無料で、チケット・予約は不要です。' },
        { q: 'ブリッジは大王岩島とつながっていますか？', a: 'いいえ、公園内の Hatgaebi～Surubang 海岸遊歩道をつなぎます。大王岩の岩は別の海岸岩で、海岸・遊歩道から望みます。' },
        { q: '日の出はブリッジの上から撮れますか？', a: 'ブリッジは 09:00 開場なので、日の出は海岸から撮影してください。' },
        { q: 'いつ閉鎖しますか？', a: '月1回の第2火曜のほか、強風・大雨・雷雨時に安全のため一時閉鎖します。現地案内をご確認ください。' },
      ],
    },
  },

  'how-to-get-there': {
    en: {
      title: 'How to Get to Daewangam Park, Ulsan: Bus, Train, Parking & Directions',
      description:
        'Directions to Daewangam Park in Ulsan from the city centre, Ulsan Station, Taehwagang and Busan — plus parking, the walking route and bus tips.',
      intro:
        'Daewangam Park sits on the East Sea in Dong-gu, Ulsan (95 Deungdae-ro). The park is free and open 24 hours. Here is how to reach it from the city, the stations and Busan.',
      sections: [
        {
          heading: 'From central Ulsan',
          body: [
            'Take a Ulsan city bus toward Ilsan (일산), then walk about 15–20 minutes to the entrance. A taxi from the city centre is typically 10–20 minutes. Bus timetables change, so confirm the live schedule on the day.',
          ],
        },
        {
          heading: 'From Ulsan Station / Taehwagang Station',
          body: [
            'Both stations connect to the city bus network toward Ilsan; from there it is a short walk. A taxi is the easiest door-to-door option with luggage, kids or seniors.',
          ],
        },
        {
          heading: 'From Busan',
          body: [
            'The KTX or intercity bus to Ulsan is the classic approach. From Ulsan it is a further bus or taxi ride to the coast. Plan at least a half day including travel time.',
          ],
        },
        {
          heading: 'Parking',
          body: [
            'Attached parking near the park is mostly paid. It fills early on weekends and fine-weather days, so arrive in the morning. Accessible parking and a flat, barrier-free path to the coastal deck are available.',
          ],
        },
        {
          heading: 'Walking route',
          body: [
            'From the entrance, the pine-forest trail leads down to the coastal deck and the 303 m suspension bridge (출렁다리). If you are already at Ilsan Beach or the East Sea Road, walking in is the most relaxed way to reach the greenbelt.',
          ],
        },
      ],
      faqs: [
        { q: 'How do I get to Daewangam Park from Ulsan Station?', a: 'From Ulsan Station (or Taehwagang Station) take a Ulsan city bus toward Ilsan (일산), then walk about 15–20 minutes to the park entrance. A taxi is around 10–20 minutes depending on traffic.' },
        { q: 'Can I visit from Busan?', a: 'Yes. Take the KTX or intercity bus to Ulsan, then a city bus or taxi to the park. Allow a half day including travel.' },
        { q: 'Where do I park?', a: 'There is attached parking near the park (mostly paid). On weekends and fine-weather days it fills early, so arriving in the morning helps.' },
        { q: 'Is the park walkable from Ilsan Beach?', a: 'Yes. If you are already at Ilsan Beach or the East Sea Road, walking is the most natural way to reach the greenbelt and the pine landmark.' },
        { q: 'Do I need a car?', a: 'No. Public buses and taxis cover the trip well; a car mainly helps with luggage, kids, seniors or a wider Ulsan tour.' },
      ],
    },
    ko: {
      title: '울산 대왕암공원 가는 길: 버스·기차·주차·길안내',
      description:
        '울산 대왕암공원 행법 — 시내·울산역·태화강역·부산에서 오는 방법과 주차, 도보 경로, 버스 팁.',
      intro:
        '대왕암공원은 울산 동구 동해안(등대로 95)에 있습니다. 공원은 무료·24시간 개방입니다. 시내·역·부산에서 오는 방법을 정리했습니다.',
      sections: [
        {
          heading: '울산 시내에서',
          body: [
            '울산 시내버스를 일산(일산) 방면으로 이용한 뒤 출입구까지 도보 15–20분. 시내에서 택시는 보통 10–20분입니다. 배차는 변동하니 당일 실시간 표를 확인하세요.',
          ],
        },
        {
          heading: '울산역·태화강역에서',
          body: [
            '두 역 모두 일산 방면 시내버스로 환승할 수 있고, 그곳에서 단축 도보. 짐이 있거나 아이·노약자가 함께면 택시가 가장 편리합니다.',
          ],
        },
        {
          heading: '부산에서',
          body: [
            'KTX 또는 시외버스로 울산 도착 후, 다시 버스나 택시로 해안까지. 이동 시간을 포함해 반나절 정도 잡으세요.',
          ],
        },
        {
          heading: '주차',
          body: [
            '공원 인접 주차장(대부분 유료)이 있습니다. 주말·날씨 좋은 날은 일찍 만차가 되니 아침에 도착하는 게 좋습니다. 장애인 주차와 해안 데크까지 평탄한 무장애 동선도 마련돼 있습니다.',
          ],
        },
        {
          heading: '도보 경로',
          body: [
            '출입구에서 소나무 숲 길을 따라 해안 데크와 303m 출렁다리(출렁다리)까지. 일산 해수욕장이나 동해안로에 있다면 걸어서 녹지와 소나무 명소로 접근하는 게 가장 여유롭습니다.',
          ],
        },
      ],
      faqs: [
        { q: '울산역에서 대왕암공원 어떻게 가요?', a: '울산역(또는 태화강역)에서 일산(일산) 방면 울산 시내버스를 타고 하차 후 공원 출입구까지 도보 약 15–20분. 택시는 교통 상황에 따라 10–20분입니다.' },
        { q: '부산에서 갈 수 있나요?', a: '네. KTX나 시외버스로 울산에 도착한 뒤 시내버스나 택시로 공원까지. 이동을 포함해 반나절을 잡으세요.' },
        { q: '주차는 어디에?', a: '공원 인접 주차장이 있습니다(대부분 유료). 주말·날씨 좋은 날은 일찍 만차되니 아침 도착이 유리합니다.' },
        { q: '일산 해수욕장에서 걸어갈 수 있나요?', a: '네. 일산 해수욕장이나 동해안로에 있다면 걸어서 녹지와 소나무 명소로 가는 게 가장 자연스럽습니다.' },
        { q: '차가 필요한가요?', a: '아니요. 시내버스와 택시로 충분합니다. 차는 짐·아이·노약자 동반이나 울산 일대 투어 때 도움이 됩니다.' },
      ],
    },
    zh: {
      title: '蔚山大王岩公园交通：公交、火车、停车与路线',
      description:
        '蔚山大王岩公园怎么去——从市区、蔚山站、太和江站与釜山出发的方式，外加停车、步行路线与公交提示。',
      intro:
        '大王岩公园位于蔚山东区东海之滨（等대로 95）。公园免费、24 小时开放。下面是从市区、各车站与釜山前往的方式。',
      sections: [
        {
          heading: '从蔚山市区',
          body: [
            '乘蔚山公交往日山（일산）方向，再步行 15–20 分钟到入口。从市区打车约 10–20 分钟。公交班次会有变动，请当天确认实时时刻表。',
          ],
        },
        {
          heading: '从蔚山站 / 太和江站',
          body: [
            '两站都可转乘往日山方向的市内公交，下车后步行不远即到。带行李、小孩或老人时，打车是最省心的门到门选择。',
          ],
        },
        {
          heading: '从釜山',
          body: [
            '经典路线是乘 KTX 或长途巴士到蔚山，再转公交或出租前往海岸。含车程在内，建议预留半日。',
          ],
        },
        {
          heading: '停车',
          body: [
            '公园附近有配套停车场（多为收费），周末与晴好天气很早满位，建议上午到达。也设有无障碍车位与通往海岸甲板的平坦无台阶动线。',
          ],
        },
        {
          heading: '步行路线',
          body: [
            '从入口沿松林步道走向海岸甲板与 303 米海上悬索桥（출렁다리）。若已在日山海滩或东海路，步行即是最从容地抵达绿地带与松林地标的方式。',
          ],
        },
      ],
      faqs: [
        { q: '从蔚山站怎么去大王岩公园？', a: '在蔚山站（或太和江站）乘往日山（일산）方向的市内公交，下车后步行约 15–20 分钟到公园入口；打车视路况约 10–20 分钟。' },
        { q: '可以从釜山过去吗？', a: '可以。乘 KTX 或长途巴士到蔚山，再转市内公交或出租到公园；含车程建议预留半日。' },
        { q: '车停在哪里？', a: '公园附近有配套停车场（多为收费），周末与晴好天气很早满位，上午到达更从容。' },
        { q: '从日山海滩能步行过去吗？', a: '能。若已在日山海滩或东海路，步行是最自然抵达绿地带与松林地标的方式。' },
        { q: '需要开车吗？', a: '不需要。公交与出租都能顺畅到达；开车主要在带行李、小孩、老人或顺游蔚山多地时更方便。' },
      ],
    },
    ja: {
      title: '大王岩公園へのアクセス：バス・電車・駐車・道順',
      description:
        '蔚山・大王岩公園への行き方 — 市内・蔚山駅・太和江駅・釜山からのアクセス、駐車、徒歩ルート、バスのコツ.',
      intro:
        '大王岩公園は蔚山広域市東区の東海沿い（等台路 95）にあります。公園は無料・24 時間開放です。市内・駅・釜山からの行き方をまとめました。',
      sections: [
        {
          heading: '蔚山市内から',
          body: [
            '蔚山の市バスで日山(일산)方面へ、その後徒歩 15–20 分で入口へ。市内からタクシーは通常 10–20 分。ダイヤは変動するため、当日のリアルタイム時刻表を確認してください。',
          ],
        },
        {
          heading: '蔚山駅・太和江駅から',
          body: [
            '両駅から日山方面の市バスに接続し、そこから短く徒歩。荷物・子供・高齢者がいる場合はタクシーが最も楽です。',
          ],
        },
        {
          heading: '釜山から',
          body: [
            'KTX または高速バスで蔚山へ着き、さらにバスかタクシーで海岸まで。移動時間を含め半日ほど見込みます。',
          ],
        },
        {
          heading: '駐車',
          body: [
            '公園隣接駐車場(主に有料)があります。週末・好天は早く満車になるため、午前中の到着がおすすめ。障害者用駐車と海岸デッキまでの平坦なバリアフリー動線も整っています。',
          ],
        },
        {
          heading: '徒歩ルート',
          body: [
            '入口から松林遊歩道を海岸デッキと 303m の海上ブリッジ(출렁다리)へ。日山海水浴場や東海路にいれば、歩いて緑地帯と松林のランドマークへ向かうのが最もゆったりします。',
          ],
        },
      ],
      faqs: [
        { q: '蔚山駅から大王岩公園への行き方は？', a: '蔚山駅(または太和江駅)から日山(일산)方面の蔚山の市バスに乗り、降車後公園入口まで徒歩約 15–20 分。タクシーは交通状況により 10–20 分です。' },
        { q: '釜山から行けますか？', a: 'はい。KTX または高速バスで蔚山へ着き、さらに市バスかタクシーで公園へ。移動を含め半日見込みで。' },
        { q: '駐車場はどこ？', a: '公園隣接の駐車場(主に有料)があります。週末・好天は早く満車になり、午前中の到着が有利です。' },
        { q: '日山海水浴場から歩けますか？', a: 'はい。日山海水浴場や東海路にいれば、歩いて緑地帯と松林のランドマークへ向かうのが最も自然です。' },
        { q: '車は必要ですか？', a: 'いいえ。市バスやタクシーで十分です。車は荷物・子供・高齢者同伴や蔚山一帯の周遊に役立ちます。' },
      ],
    },
  },

  photos: {
    en: {
      title: 'Daewangam Park Photos & Best Viewpoints (Ulsan)',
      description:
        'The best photo spots at Daewangam Park in Ulsan: pine forest, the 303 m sea bridge, Ulgi Lighthouse, Daewangam rock and sunrise positions, plus light and timing tips.',
      intro:
        'From the pine forest to the sea bridge and the lighthouse, here are the most photogenic spots at Daewangam Park and when to catch the best light.',
      sections: [
        {
          heading: 'Top viewpoints',
          list: [
            { strong: 'Pine forest trail', text: 'Sunlight through the pines framing the sea — best in the soft morning or late-afternoon light.' },
            { strong: 'Sea suspension bridge (출렁다리)', text: 'The 303 m bridge over the East Sea. Shoot from mid-bridge and the sea-side railing; go within operating hours (09:00–18:00).' },
            { strong: 'Ulgi Lighthouse (울기등대)', text: 'One of Korea’s earliest modern lighthouses and a classic East-Sea and sunrise overlook.' },
            { strong: 'Daewangam rock & sea-eroded forms', text: 'The Hat Rock and Phallus Rock with the legend of the twin guardian dragons. Rocks are slippery — keep to hard ground.' },
            { strong: 'Sunrise position', text: 'The park faces the East Sea; the first light on the rocks and cables is the golden window. Winter mornings are cold — mind the sea breeze.' },
          ],
        },
        {
          heading: 'Light & timing',
          body: [
            'The park faces the sea on three sides and is wide open. Afternoon to dusk gives the warmest light; mornings are best for the East-Sea sunrise. On weekends or fine weather, allow extra buffer for crowds.',
          ],
        },
      ],
      faqs: [
        { q: 'When is the best light for photos?', a: 'Morning for the East-Sea sunrise and soft bridge-cable shots; late afternoon to dusk for the warmest light. Weekdays are quieter.' },
        { q: 'Can I photograph the bridge at sunrise?', a: 'Sunrise shots are from the shore — the bridge opens at 09:00, so plan bridge photography during operating hours.' },
        { q: 'Any image-naming tips for SEO?', a: 'Use descriptive file names and alt text (e.g. "daewangam-park-bridge-ulsan.jpg") and compress images so pages load fast on mobile.' },
      ],
    },
    ko: {
      title: '대왕암공원 사진 명소와 추천 전망점 (울산)',
      description:
        '울산 대왕암공원의 추천 사진 명소 — 소나무 숲, 303m 바다 출렁다리, 울기등대, 대왕암 바위와 일출 포인트, 빛과 타이밍 팁.',
      intro:
        '소나무 숲부터 바다 브리지와 등대까지, 대왕암공원에서 가장 사진에 잘 나오는 명소와 좋은 빛을 잡는 시기를 정리했습니다.',
      sections: [
        {
          heading: '추천 전망점',
          list: [
            { strong: '소나무 숲 길', text: '소나무 사이로 바다를 담는 빛 — 부드러운 아침이나 늦은 오후 빛에 가장 좋음.' },
            { strong: '바다 출렁다리(출렁다리)', text: '동해 위 303m 브리지. 다리 중앙과 바다 쪽 난간에서 촬영, 운영시간(09:00–18:00) 내에.' },
            { strong: '울기등대', text: '한국의 초기 근대 등대 중 하나이자 동해와 일출의 정석 전망대.' },
            { strong: '대왕암 바위와 해식 암석', text: '쌍룡 호국 전설의 갓바위·남근바위. 바위는 미끄러우니 단단한 길로.' },
            { strong: '일출 포인트', text: '공원은 동해를 향해 열려 있어, 바위와 케이블의 첫 빛이 황금 시간. 겨울 아침은 춥고 바닷바람에 주의.' },
          ],
        },
        {
          heading: '빛과 타이밍',
          body: [
            '공원은 삼면이 바다를 향해 열려 있습니다. 오후~해질녘에 가장 따뜻한 빛, 아침은 동해 일출에 최고. 주말·날씨 좋은 날은 인파 여유 시간을 두세요.',
          ],
        },
      ],
      faqs: [
        { q: '사진에 가장 좋은 빛은 언제?', a: '동해 일출과 부드러운 브리지 케이블은 아침, 가장 따뜻한 빛은 오후~해질녘. 평일이 한적합니다.' },
        { q: '일출 사진을 다리에서 찍을 수 있나요?', a: '일출은 해변에서 담으세요. 다리는 09:00 개방이니 운영시간 내에 촬영하세요.' },
        { q: 'SEO를 위한 이미지 작명 팁?', a: '설명형 파일명과 alt 텍스트(예: "daewangam-park-bridge-ulsan.jpg")를 쓰고, 모바일 빠른 로딩을 위해 이미지를 압축하세요.' },
      ],
    },
    zh: {
      title: '大王岩公园拍照机位与最佳视角（蔚山）',
      description:
        '蔚山大王岩公园最佳拍摄点：松林、303 米海上悬索桥、蔚岐灯塔、大王岩与日出机位，附光线与时段建议。',
      intro:
        '从松林到海上吊桥与灯塔，这里整理大王岩公园最出片的机位，以及什么时候光线最好。',
      sections: [
        {
          heading: '最佳视角',
          list: [
            { strong: '松林步道', text: '松隙间的光把海框住——清晨或午后柔和光线最佳。' },
            { strong: '海上悬索桥（출렁다리）', text: '东海之上 303 米的桥。从桥中段与海侧栏杆拍；请在运营时段（09:00–18:00）内。' },
            { strong: '蔚岐灯塔（울기등대）', text: '韩国最早的近代灯塔之一，也是东海岸与日出的经典观景点。' },
            { strong: '大王岩与海蚀地貌', text: '戴冠岩、남근바위与双龙护国传说相关。礁石湿滑，请走坚实路面。' },
            { strong: '日出机位', text: '公园面朝东海，礁岩与缆索迎来第一缕光是最金贵的时刻；冬日清晨寒冷，留意海风。' },
          ],
        },
        {
          heading: '光线与时段',
          body: [
            '公园三面临海、视野开阔。午后至黄昏光线最暖；清晨最适合拍东海日出。周末或晴好天气请为人群预留更多时间。',
          ],
        },
      ],
      faqs: [
        { q: '什么时候光线最好？', a: '清晨拍东海日出与柔和的桥索；午后至黄昏光线最暖。工作日更清静。' },
        { q: '能在日出时拍桥吗？', a: '日出请在岸上拍——桥 09:00 才开，桥上拍摄请安排在其运营时段内。' },
        { q: '图片命名有什么 SEO 建议？', a: '使用描述性文件名与 alt 文本（如 "daewangam-park-bridge-ulsan.jpg"），并压缩图片以提升移动端加载速度。' },
      ],
    },
    ja: {
      title: '大王岩公園の写真スポットとおすすめ展望点 (蔚山)',
      description:
        '蔚山・大王岩公園のおすすめ撮影スポット — 松林、303m の海上ブリッジ、蔚岐灯台、大王岩と日の出ポイント、光とタイミングのヒント.',
      intro:
        '松林から海上ブリッジ、灯台まで、大王岩公園で最も写真映えする名所と良い光の時間帯をまとめました。',
      sections: [
        {
          heading: 'おすすめ展望スポット',
          list: [
            { strong: '松林の遊歩道', text: '松の間から海を切り取る光 — やわらかい朝や夕方の光が最も良い。' },
            { strong: '海上ブリッジ(출렁다리)', text: '東海の上の 303m ブリッジ。橋中央・海側手すりから。営業時間(09:00–18:00)内に。' },
            { strong: '蔚岐灯台', text: '韓国の初期近代灯台の一つで、東海と日の出の定番展望台。' },
            { strong: '大王岩と海食地形', text: '双龍護国伝説の갓바위・남근바위。岩は滑るので硬い道を。' },
            { strong: '日の出ポイント', text: '公園は東海に開け、岩とケーブルに差す朝日が黄金時間。冬の朝は寒く、海風に注意。' },
          ],
        },
        {
          heading: '光とタイミング',
          body: [
            '公園は三方海に面して開けています。午後〜夕暮れが最も暖かい光、朝は東海の日の出に最適。週末・好天は混雑の余裕を持って。',
          ],
        },
      ],
      faqs: [
        { q: '写真に良い光はいつ？', a: '東海の日の出と柔らかいブリッジケーブルは朝、最も暖かい光は午後〜夕暮れ。平日が静かです。' },
        { q: '日の出はブリッジで撮れますか？', a: '日の出は海岸から。ブリッジは 09:00 開場なので、撮影は営業時間内に。' },
        { q: 'SEO のための画像命名のコツは？', a: '説明的なファイル名と alt テキスト(例: "daewangam-park-bridge-ulsan.jpg")を使い、モバイル高速表示のため画像を圧縮してください。' },
      ],
    },
  },
};
