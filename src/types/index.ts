export interface Booth {
  article: string; // 제2조
  articleNo: number;
  title: string; // 나를 알 권리
  space: string; // 나를 이해하고 돌아보는 공간
  icon: "person" | "brush" | "star" | "people";
  lead?: boolean;
}

export interface ChoiceOption {
  id: string;
  label: string;
}

export interface FactItem {
  label: string;
  value: string;
  sub?: string;
}
