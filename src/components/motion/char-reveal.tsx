"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
};
const charV: Variants = {
  hidden: { opacity: 0, y: 20, rotate: 2 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/** 조항 제목 char-by-char reveal */
export function CharReveal({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      aria-label={text}
    >
      {Array.from(text).map((c, i) => (
        <motion.span key={i} variants={charV} className="inline-block" aria-hidden>
          {c === " " ? " " : c}
        </motion.span>
      ))}
    </motion.span>
  );
}
