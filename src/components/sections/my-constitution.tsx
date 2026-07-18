"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { INFRINGE_OPTIONS, NEED_OPTIONS, EVENT } from "@/lib/data";
import { josaEulReul, josaRo } from "@/lib/hangul";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/motion/blur-fade";
import { Mugunghwa, BrushPen } from "@/components/svg/motifs";

function buildClause(infringe: string[], need: string[]) {
  const inf = infringe.join(", ");
  const nd = need.join(", ");
  const infJosa = infringe.length ? josaRo(infringe[infringe.length - 1]) : "로";
  const ndJosa = need.length ? josaEulReul(need[need.length - 1]) : "을";
  return `나는 ${inf}${infJosa}부터 자유로울 권리를 가지며, ${nd}${ndJosa} 마땅히 누릴 권리를 가진다.`;
}

/** 타이핑 효과 (char-by-char, --ease-ink 리듬) */
function useTyped(text: string, active: boolean, reduced: boolean) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) {
      setOut("");
      return;
    }
    if (reduced) {
      setOut(text);
      return;
    }
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 24);
    return () => clearInterval(id);
  }, [text, active, reduced]);
  return out;
}

export function MyConstitution() {
  const reduced = !!useReducedMotion();
  const [infringe, setInfringe] = useState<string[]>([]);
  const [need, setNeed] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const clause = buildClause(infringe, need);
  const typed = useTyped(clause, generated, reduced);
  const typingDone = typed.length >= clause.length;

  const toggle = (list: string[], set: (v: string[]) => void, label: string) => {
    set(list.includes(label) ? list.filter((x) => x !== label) : [...list, label]);
    setGenerated(false);
    setSaved(false);
  };

  const canGenerate = infringe.length > 0 && need.length > 0;

  const handleSave = async () => {
    if (!cardRef.current) return;
    setSaving(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#f4efe4",
      });
      const link = document.createElement("a");
      link.download = "나의-행복헌법-717.png";
      link.href = dataUrl;
      link.click();
      setSaved(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section
      id="article-1"
      className="relative px-[var(--gutter,1.25rem)] py-[var(--spacing-40,10rem)]"
    >
      <div className="mx-auto grid max-w-[var(--container-wide)] grid-cols-1 gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
        {/* 좌측 프롬프트 */}
        <div>
          <BlurFade>
            <p className="font-mono text-[var(--text-caption)] uppercase tracking-[0.28em] text-navy/70">
              第一條 · Article 1
            </p>
            <h2 className="mt-3 font-display text-[var(--text-display)] font-extrabold leading-[0.95] tracking-tight text-navy">
              제1조
            </h2>
            <p className="mt-4 font-display text-[var(--text-h2)] font-bold tracking-tight text-ink">
              나의 행복헌법
            </p>
            <p className="mt-6 max-w-[36ch] text-[var(--text-body)] leading-[1.8] text-ink/80">
              행복은 당연히 주어지는 게 아니라, 내가 조항으로 선언하고 지켜내는 권리다.
              두 가지 질문에 답하고 <b className="font-semibold text-terracotta-deep">나만의 헌법 조항</b>을
              직접 제정해보세요.
            </p>
          </BlurFade>

          {/* 질문 1 */}
          <div className="mt-12">
            <p className="flex items-center gap-2 text-[var(--text-h4)] font-bold text-ink">
              <span className="font-mono text-[var(--text-small)] text-danger">Q1.</span>
              나의 행복을 침해하는 것은?
            </p>
            <p className="mt-1 text-[var(--text-caption)] text-muted-foreground">복수 선택 가능</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {INFRINGE_OPTIONS.map((o, i) => (
                <Chip
                  key={o.id}
                  label={o.label}
                  index={i}
                  selected={infringe.includes(o.label)}
                  onToggle={() => toggle(infringe, setInfringe, o.label)}
                  tone="navy"
                />
              ))}
            </div>
          </div>

          {/* 질문 2 */}
          <div className="mt-10">
            <p className="flex items-center gap-2 text-[var(--text-h4)] font-bold text-ink">
              <span className="font-mono text-[var(--text-small)] text-terracotta-deep">Q2.</span>
              나의 행복을 위해 필요한 것은?
            </p>
            <p className="mt-1 text-[var(--text-caption)] text-muted-foreground">복수 선택 가능</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {NEED_OPTIONS.map((o, i) => (
                <Chip
                  key={o.id}
                  label={o.label}
                  index={i}
                  selected={need.includes(o.label)}
                  onToggle={() => toggle(need, setNeed, o.label)}
                  tone="terracotta"
                />
              ))}
            </div>
          </div>

          <div className="mt-10">
            <Button
              variant="terracotta"
              magnetic
              disabled={!canGenerate}
              onClick={() => {
                setGenerated(true);
                setSaved(false);
              }}
              className="px-8 py-4 text-base"
            >
              {generated ? "다시 제정하기" : "나의 행복헌법 제정하기"}
            </Button>
            {!canGenerate && (
              <p className="mt-3 text-[var(--text-caption)] text-muted-foreground">
                각 질문에서 하나 이상 선택해주세요.
              </p>
            )}
          </div>
        </div>

        {/* 우측 결과 카드 */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <AnimatePresence mode="wait">
            {!generated ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mx-auto grid aspect-[4/5] w-full max-w-[420px] place-items-center rounded-[var(--radius-doc)] border border-dashed border-border bg-paper-light/60 p-8 text-center"
              >
                <div className="space-y-4 opacity-60">
                  <Mugunghwa className="mx-auto size-16 text-terracotta-soft" />
                  <p className="font-serif text-[var(--text-body)] text-muted-foreground">
                    선택을 마치면 이곳에
                    <br />
                    나의 행복헌법 조항이 새겨집니다.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="card"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.42, ease: [0.34, 1.4, 0.5, 1] }}
                className="mx-auto w-full max-w-[420px]"
              >
                {/* 캡처 대상 카드 */}
                <div
                  ref={cardRef}
                  className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-doc)] border border-border p-8 shadow-[var(--shadow-lift)]"
                  style={{ background: "var(--gradient-paper)" }}
                >
                  {/* 상단 색바 */}
                  <div
                    className="absolute inset-x-0 top-0 h-[3px]"
                    style={{ background: "linear-gradient(90deg,var(--color-navy),var(--color-terracotta))" }}
                  />
                  {/* 코너 스탬프 마크 */}
                  <span className="absolute left-3 top-3 size-4 border-l border-t border-border" aria-hidden />
                  <span className="absolute right-3 top-3 size-4 border-r border-t border-border" aria-hidden />

                  {/* 무궁화 워터마크 */}
                  <Mugunghwa className="pointer-events-none absolute -bottom-8 -right-8 size-52 text-terracotta-soft/15" />

                  <div className="relative flex h-full flex-col">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-terracotta-deep">
                      나의 행복헌법 · My Happiness Constitution
                    </p>
                    <p className="mt-4 font-display text-3xl font-extrabold tracking-tight text-navy">
                      제1조
                    </p>

                    <blockquote className="mt-5 flex-1 font-serif text-[1.35rem] leading-[1.65] text-ink [text-wrap:pretty]">
                      &ldquo;
                      <span className={!typingDone && !reduced ? "type-cursor" : ""}>{typed}</span>
                      {typingDone && "”"}
                    </blockquote>

                    <motion.div
                      className="mt-auto flex items-end justify-between border-t border-dashed border-border pt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: typingDone ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div>
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                          제정일 · Issued
                        </p>
                        <p className="tnum font-mono text-sm font-semibold text-ink">{EVENT.issueDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-hand text-2xl text-terracotta-deep">서명</span>
                        <BrushPen className="h-12 w-6 text-navy" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* 액션 */}
                <motion.div
                  className="mt-6 flex flex-wrap items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: typingDone ? 1 : 0, y: typingDone ? 0 : 10 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <Button variant="terracotta" onClick={handleSave} disabled={saving}>
                    {saving ? "저장 중…" : saved ? "저장 완료!" : "내 헌법 저장하기"}
                  </Button>
                  {saved && (
                    <span className="inline-flex items-center gap-1.5 text-[var(--text-small)] font-medium text-success">
                      <svg viewBox="0 0 16 16" className="size-4" fill="none">
                        <path d="M3 8.5 L6.5 12 L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      이미지로 저장되었어요
                    </span>
                  )}
                  <p className="w-full text-[var(--text-caption)] text-muted-foreground">
                    저장한 카드를 현장에서 보여주면 더 특별한 경험이 기다려요.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
