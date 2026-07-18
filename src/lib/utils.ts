import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 스크롤 진행도(0~1)에 따라 두 색을 oklch 인지 균일 보간에 가깝게 rgb 선형 보간 */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}
