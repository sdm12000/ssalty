"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scale, Gavel, Books, BrushPen, Mugunghwa } from "@/components/svg/motifs";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SCALE_IDS = {
  base: "sc-base",
  column: "sc-col",
  beam: "sc-beam",
  panL: "sc-panL",
  panR: "sc-panR",
};

export function ScaleMoment() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const q = gsap.utils.selector(root);

      if (reduced) {
        gsap.set(
          [
            `#${SCALE_IDS.base}`,
            `#${SCALE_IDS.column}`,
            `#${SCALE_IDS.beam}`,
            `#${SCALE_IDS.panL}`,
            `#${SCALE_IDS.panR}`,
            "#obj-gavel",
            "#obj-books",
            "#obj-pen",
            ".final-copy",
          ].flatMap((s) => q(s)),
          { clearProps: "all", autoAlpha: 1 }
        );
        return;
      }

      const mm = gsap.matchMedia();

      // 초기 상태 (공통)
      const setInitial = () => {
        gsap.set([q(`#${SCALE_IDS.base}`), q(`#${SCALE_IDS.column}`)], { y: 90, autoAlpha: 0 });
        gsap.set(q(`#${SCALE_IDS.beam}`), { y: -18, autoAlpha: 0 });
        gsap.set(q(`#${SCALE_IDS.panL}`), { x: -140, autoAlpha: 0 });
        gsap.set(q(`#${SCALE_IDS.panR}`), { x: 140, autoAlpha: 0 });
        gsap.set(q("#obj-books"), { x: -130, y: 90, autoAlpha: 0 });
        gsap.set(q("#obj-gavel"), { x: -120, y: 90, rotate: -24, autoAlpha: 0 });
        gsap.set(q("#obj-pen"), { y: -300, autoAlpha: 0, rotate: -10 });
        gsap.set(q(".final-copy"), { y: 34, autoAlpha: 0, filter: "blur(8px)" });
      };

      // 데스크탑 — pin + scrub
      mm.add("(min-width: 1024px)", () => {
        setInitial();
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: q(".scale-stage")[0],
            start: "top top",
            end: "+=220%",
            pin: q(".scale-stage")[0],
            scrub: 1,
            anticipatePin: 1,
          },
        });

        tl.to([q(`#${SCALE_IDS.base}`), q(`#${SCALE_IDS.column}`)], { y: 0, autoAlpha: 1, duration: 1.2 })
          .to(q(`#${SCALE_IDS.beam}`), { y: 0, autoAlpha: 1, duration: 0.8 }, ">-0.2")
          .to([q(`#${SCALE_IDS.panL}`), q(`#${SCALE_IDS.panR}`)], { x: 0, autoAlpha: 1, duration: 1 }, "<0.1")
          .to(q(".scale-svg"), { rotation: 2.5, duration: 0.25, transformOrigin: "50% 30%" })
          .to(q(".scale-svg"), { rotation: -1.5, duration: 0.25 })
          .to(q(".scale-svg"), { rotation: 0, duration: 0.3 })
          .to(q("#obj-books"), { x: 0, y: 0, autoAlpha: 1, duration: 0.9 }, ">-0.1")
          .to(q("#obj-gavel"), { x: 0, y: 0, rotate: 0, autoAlpha: 1, duration: 0.9 }, "<0.1")
          .to(q("#obj-pen"), { y: 0, autoAlpha: 1, rotate: 0, duration: 1.4, ease: "back.out(1.5)" })
          .to(q(".final-copy"), { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1 }, ">-0.3");
      });

      // 모바일/태블릿 — pin 없이 3단계 인뷰 조립
      mm.add("(max-width: 1023px)", () => {
        setInitial();
        gsap.set(q(".scale-svg"), { rotation: 0 });
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: q(".scale-stage")[0], start: "top 70%" },
        });
        tl.to(
          [
            q(`#${SCALE_IDS.base}`),
            q(`#${SCALE_IDS.column}`),
            q(`#${SCALE_IDS.beam}`),
            q(`#${SCALE_IDS.panL}`),
            q(`#${SCALE_IDS.panR}`),
          ].flat(),
          { x: 0, y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 }
        )
          .to([q("#obj-books"), q("#obj-gavel")].flat(), { x: 0, y: 0, rotate: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1 }, "-=0.3")
          .to(q("#obj-pen"), { y: 0, autoAlpha: 1, rotate: 0, duration: 0.8, ease: "back.out(1.4)" }, "-=0.2")
          .to(q(".final-copy"), { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.7 }, "-=0.3");
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="scale" ref={root} className="relative">
      <div className="scale-stage relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-[var(--gutter,1.25rem)]">
        <p className="mb-2 font-mono text-[var(--text-caption)] uppercase tracking-[0.28em] text-terracotta-deep/80">
          第六條 · The Scale
        </p>

        {/* 오브제 스테이지 */}
        <div className="relative mx-auto flex h-[52vh] w-full max-w-[560px] items-center justify-center">
          {/* 저울 */}
          <div className="scale-svg relative z-10 w-[min(72vw,440px)] text-navy">
            <Scale className="w-full" ids={SCALE_IDS} />
          </div>

          {/* 책 더미 (좌하단) */}
          <div
            id="obj-books"
            className="absolute bottom-[8%] left-[4%] z-0 w-[min(34vw,190px)] text-terracotta-deep"
          >
            <Books className="w-full" />
          </div>

          {/* 법봉 (좌하단, 책 위) */}
          <div
            id="obj-gavel"
            className="absolute bottom-[20%] left-[14%] z-20 w-[min(26vw,150px)] text-terracotta"
          >
            <Gavel className="w-full" />
          </div>

          {/* 붓펜 깃털 (위에서 저울 중앙으로) */}
          <div
            id="obj-pen"
            className="absolute left-1/2 top-[2%] z-30 h-[46%] -translate-x-1/2"
          >
            <BrushPen className="h-full w-auto text-navy" />
          </div>

          {/* 무궁화 배경 */}
          <Mugunghwa className="pointer-events-none absolute -bottom-6 right-0 -z-0 size-40 text-terracotta-soft/15 md:size-56" />
        </div>

        <p
          className="final-copy mt-6 text-center font-display text-[var(--text-h1)] font-extrabold tracking-tight text-terracotta-deep"
        >
          내가 쓰는, 나의 헌법.
        </p>
        <p className="final-copy mt-3 max-w-[40ch] text-center text-[var(--text-body)] text-ink/70">
          정의의 저울 위에 나의 붓을 얹는 순간, 행복은 비로소 나의 권리가 됩니다.
        </p>
      </div>
    </section>
  );
}
