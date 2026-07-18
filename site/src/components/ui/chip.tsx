"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/** '나의 행복헌법' 선택 칩 — 손으로 집는 감각 (예외적 캡슐) */
export function Chip({
  label,
  selected,
  onToggle,
  tone = "navy",
  index = 0,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
  tone?: "navy" | "terracotta";
  index?: number;
}) {
  const selectedBg = tone === "navy" ? "bg-navy" : "bg-terracotta";
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group inline-flex items-center gap-2 rounded-[var(--radius-chip)] border-[1.5px] px-5 py-2.5 text-[var(--text-small)] font-medium",
        "transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-expo)]",
        selected
          ? cn(selectedBg, "border-transparent text-paper shadow-[var(--shadow-press)]")
          : "border-border bg-paper-light text-ink hover:border-navy hover:-translate-y-0.5 hover:shadow-[var(--shadow-paper)]"
      )}
    >
      <span
        className={cn(
          "grid size-4 place-items-center rounded-full border transition-all",
          selected ? "border-paper bg-paper/20" : "border-border"
        )}
        aria-hidden
      >
        {selected && (
          <svg viewBox="0 0 12 12" className="size-2.5" fill="none">
            <path d="M2 6.5 L5 9 L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </motion.button>
  );
}
