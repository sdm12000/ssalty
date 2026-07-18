"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 자식 SVG의 .draw-path 요소에 인뷰 시 is-drawn 클래스를 부여해 stroke draw-on.
 */
export function DrawInView({
  children,
  className,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setDrawn(true);
            if (once) io.disconnect();
          } else if (!once) {
            setDrawn(false);
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll(".draw-path").forEach((p) => {
      p.classList.toggle("is-drawn", drawn);
    });
  }, [drawn]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
