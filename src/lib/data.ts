import type { Booth, ChoiceOption } from "@/types";

export const EVENT = {
  title: "행복헌법 717 시민 페스타",
  subtitle: "행복에도 헌법이 있다면?",
  dateShort: "2026. 7. 17 – 18",
  dateFull: "2026년 7월 17일(금) – 18일(토)",
  timeRange: "14:00 – 18:00",
  venue: "서교플레이스(예정) · 프레쉬엔지니어드 홍대점",
  venueShort: "프레쉬엔지니어드 홍대점",
  fee: "5,000원",
  feeNote: "현장 납부",
  target: "청년 · 부녀 섭외자",
  host: "이어온",
  hostSlogan: "세대를 잇는 가치",
  organizer: "SSalty",
  organizerSlogan: "청년 문화 플랫폼",
  issueDate: "2026. 7. 17",
} as const;

// 헌법 제10조 원문 (명조 낭독)
export const ARTICLE_10 =
  "모든 국민은 인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다.";

// 부스 4존 = 제2~5조
export const BOOTHS: Booth[] = [
  {
    article: "제2조",
    articleNo: 2,
    title: "나를 알 권리",
    space: "나를 이해하고 돌아보는 공간",
    icon: "person",
    lead: true,
  },
  {
    article: "제3조",
    articleNo: 3,
    title: "나를 표현할 권리",
    space: "나의 생각과 감정을 표현하는 공간",
    icon: "brush",
  },
  {
    article: "제4조",
    articleNo: 4,
    title: "취향을 선택할 권리",
    space: "나만의 취향을 발견하고 선택하는 공간",
    icon: "star",
  },
  {
    article: "제5조",
    articleNo: 5,
    title: "연결될 권리",
    space: "다른 사람들과 연결되고 소통하는 공간",
    icon: "people",
  },
];

// '나의 행복헌법' — 침해 요소 6지
export const INFRINGE_OPTIONS: ChoiceOption[] = [
  { id: "compare", label: "끝없는 비교" },
  { id: "time", label: "빼앗기는 시간" },
  { id: "noise", label: "쏟아지는 소음" },
  { id: "pressure", label: "타인의 기대" },
  { id: "money", label: "돈 걱정" },
  { id: "lonely", label: "외로움" },
];

// 필요한 것 6지
export const NEED_OPTIONS: ChoiceOption[] = [
  { id: "rest", label: "충분한 쉼" },
  { id: "self", label: "나다움" },
  { id: "connect", label: "따뜻한 연결" },
  { id: "choice", label: "선택할 자유" },
  { id: "express", label: "표현할 용기" },
  { id: "safe", label: "안전한 일상" },
];

// 좌측 조문 인덱스
export const INDEX_ITEMS = [
  { id: "preamble", label: "전문", short: "前" },
  { id: "declaration", label: "선언", short: "宣" },
  { id: "article-1", label: "제1조", short: "1" },
  { id: "booths", label: "제2–5조", short: "2" },
  { id: "photozone", label: "포토존", short: "鏡" },
  { id: "scale", label: "저울", short: "衡" },
  { id: "factsheet", label: "참여", short: "參" },
  { id: "footer", label: "부칙", short: "附" },
] as const;
