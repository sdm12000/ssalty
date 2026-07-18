const CHO = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const JUNG = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
const JONG = ["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

/** 마지막 글자에 받침이 있는지 (0=없음, 그 외=종성 인덱스) */
export function finalConsonant(word: string): number {
  if (!word) return 0;
  const ch = word[word.length - 1];
  const code = ch.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return 0;
  return code % 28;
}

/** 을/를 조사 */
export function josaEulReul(word: string): string {
  return finalConsonant(word) > 0 ? "을" : "를";
}

/** (으)로 조사 — 받침이 없거나 ㄹ이면 '로', 그 외 '으로' */
export function josaRo(word: string): string {
  const j = finalConsonant(word);
  return j === 0 || j === 8 ? "로" : "으로";
}

/** 한 음절을 초성·중성·종성 자소로 분해 */
export function decomposeSyllable(ch: string): string[] {
  const code = ch.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return [ch];
  const cho = Math.floor(code / 588);
  const jung = Math.floor((code % 588) / 28);
  const jong = code % 28;
  const parts = [CHO[cho], JUNG[jung]];
  if (jong > 0) parts.push(JONG[jong]);
  return parts;
}
