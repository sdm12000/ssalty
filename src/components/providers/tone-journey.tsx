"use client";

import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

/**
 * 톤 여정 — 페이지 최하단 고정 배경 레이어.
 * 스크롤 진행도(0→1)에 따라 5단계 색을 연속 보간(background-color만 변경).
 * reduced-motion에서도 상태 변화이므로 유지(무해).
 */
const STAGES = ["#eae6dc", "#ede7d9", "#f1eada", "#f2e7d3", "#f0ddc6"];

export function ToneJourney() {
  const { scrollYProgress } = useScroll();
  const bg = useTransform(
    scrollYProgress,
    [0, 0.22, 0.45, 0.7, 1],
    STAGES
  );

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 -z-10"
      style={{ backgroundColor: bg }}
    />
  );
}

/** 스크롤 진행도를 구독해 문자열 stage(0~4)를 반환하는 훅용 컴포넌트 (nav/index 톤 전이용) */
export function useToneStage() {
  const { scrollYProgress } = useScroll();
  const [stage, setStage] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const s = Math.min(4, Math.floor(v / 0.2));
    setStage(s);
  });
  return stage;
}
