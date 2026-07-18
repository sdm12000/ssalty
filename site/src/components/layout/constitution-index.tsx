"use client";

import { useEffect, useState } from "react";
import { INDEX_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * 좌측 sticky 조문 인덱스 (데스크탑) + 상단 프로그레스 바 (모바일).
 * 현재 조항 톤이 네이비→테라코타로 스크롤 위치에 따라 이동.
 */
export function ConstitutionIndex() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ids: string[] = INDEX_ITEMS.map((i) => i.id);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = ids.indexOf(e.target.id);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // 진행도에 따른 마커 색 (네이비→테라코타)
  const markerColor = progress < 0.5 ? "var(--color-navy)" : "var(--color-terracotta)";

  return (
    <>
      {/* 데스크탑 좌측 인덱스 */}
      <nav
        aria-label="조문 목차"
        className="pointer-events-none fixed left-[max(1rem,2.2vw)] top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      >
        {INDEX_ITEMS.map((item, i) => {
          const isActive = i === active;
          return (
            <button
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
              className="pointer-events-auto group flex items-center gap-3"
            >
              <span
                className="block h-[2px] rounded-full transition-all duration-500 ease-[var(--ease-out-expo)]"
                style={{
                  width: isActive ? 28 : 12,
                  backgroundColor: isActive ? markerColor : "var(--color-border)",
                }}
              />
              <span
                className={cn(
                  "font-mono text-[0.7rem] tracking-[0.1em] transition-all duration-500",
                  isActive
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-70"
                )}
                style={{ color: isActive ? markerColor : "var(--color-muted-foreground)" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* 모바일 상단 프로그레스 바 */}
      <div className="fixed inset-x-0 top-0 z-[45] h-[3px] lg:hidden" aria-hidden>
        <div
          className="h-full origin-left transition-transform duration-150"
          style={{
            transform: `scaleX(${progress})`,
            background: "linear-gradient(90deg, var(--color-navy), var(--color-terracotta))",
          }}
        />
      </div>
    </>
  );
}
