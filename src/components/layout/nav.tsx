"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { EVENT } from "@/lib/data";
import { Button } from "@/components/ui/button";

const LINKS = [
  { id: "article-1", label: "나의 헌법" },
  { id: "booths", label: "부스 4존" },
  { id: "photozone", label: "포토존" },
  { id: "factsheet", label: "참여 안내" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-expo)]",
          scrolled
            ? "border-b border-border/60 bg-paper/80 backdrop-blur-xl shadow-[var(--shadow-paper)]"
            : "bg-transparent"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[var(--container-wide)] items-center justify-between px-[var(--gutter,1.25rem)] transition-all",
            scrolled ? "h-14 md:h-16" : "h-16 md:h-20"
          )}
        >
          <button
            onClick={() => go("preamble")}
            className="flex items-baseline gap-2 font-display font-extrabold tracking-tight"
          >
            <span
              className={cn(
                "text-[1.15rem] transition-colors duration-500 md:text-[1.35rem]",
                scrolled ? "text-terracotta-deep" : "text-navy"
              )}
            >
              행복헌법
            </span>
            <span className="font-mono text-[0.8rem] font-bold tracking-[0.14em] text-muted-foreground">
              717
            </span>
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="group text-[var(--text-small)] font-medium text-ink/80 transition-colors hover:text-navy"
              >
                <span className="underline-draw">{l.label}</span>
              </button>
            ))}
            <Button variant="terracotta" magnetic onClick={() => go("factsheet")} className="px-5 py-2.5">
              참여 신청
            </Button>
          </nav>

          <button
            onClick={() => setOpen((o) => !o)}
            className="relative z-50 flex size-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-label="메뉴"
            aria-expanded={open}
          >
            <span className={cn("h-[2px] w-6 bg-ink transition-all duration-300", open && "translate-y-[7px] rotate-45")} />
            <span className={cn("h-[2px] w-6 bg-ink transition-all duration-300", open && "opacity-0")} />
            <span className={cn("h-[2px] w-6 bg-ink transition-all duration-300", open && "-translate-y-[7px] -rotate-45")} />
          </button>
        </div>
      </header>

      {/* 모바일 풀스크린 오버레이 */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-center bg-paper px-8 transition-all duration-500 ease-[var(--ease-out-expo)] lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav className="flex flex-col gap-5">
          {[{ id: "preamble", label: "전문" }, ...LINKS].map((l, i) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={cn(
                "text-left font-display text-4xl font-extrabold tracking-tight text-navy transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
            >
              {l.label}
            </button>
          ))}
          <div
            className={cn("mt-6 transition-all duration-500", open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}
            style={{ transitionDelay: open ? "360ms" : "0ms" }}
          >
            <Button variant="terracotta" onClick={() => go("factsheet")} className="w-full py-4 text-base">
              참여 신청하기
            </Button>
          </div>
        </nav>
        <p className="mt-10 font-mono text-xs tracking-[0.14em] text-muted-foreground">
          {EVENT.dateShort} · {EVENT.timeRange}
        </p>
      </div>
    </>
  );
}
