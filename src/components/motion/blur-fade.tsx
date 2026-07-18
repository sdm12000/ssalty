"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const base: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

/** 조문 낭독 blur-fade-up */
export function BlurFade({
  children,
  delay = 0,
  className,
  as = "div",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "p" | "li";
  once?: boolean;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={base}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};
const word: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/** 단어 단위 blur-fade stagger (낭독 리듬) */
export function WordReveal({
  text,
  className,
  wordClassName,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
}) {
  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {text.split(" ").map((w, i) => (
        <motion.span key={i} variants={word} className={`inline-block ${wordClassName ?? ""}`}>
          {w}
          {i < text.split(" ").length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
