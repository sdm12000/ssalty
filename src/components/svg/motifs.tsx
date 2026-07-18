import type { SVGProps } from "react";

/* ────────────────────────────────────────────────────────────
   포스터 DNA 벡터 재해석 — 전부 라인 스타일, stroke-dashoffset draw-on 대응
   무궁화 · 저울 · 붓펜 깃털 · 법봉 · 책 더미 · 부스 픽토그램 · 캘린더
   ──────────────────────────────────────────────────────────── */

/** 무궁화 (로즈 오브 샤론) — 5판 라인아트 + 중앙 술 */
export function Mugunghwa({
  className,
  drawClass,
  ...props
}: SVGProps<SVGSVGElement> & { drawClass?: string }) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden {...props}>
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {petals.map((deg) => (
          <path
            key={deg}
            className={drawClass}
            style={{ ["--len" as string]: 220 }}
            transform={`rotate(${deg} 100 100)`}
            d="M100 100 C 78 74, 74 40, 100 26 C 126 40, 122 74, 100 100 Z"
          />
        ))}
        {/* 중앙 술 */}
        <circle className={drawClass} style={{ ["--len" as string]: 60 }} cx="100" cy="100" r="9" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <line
            key={`s${deg}`}
            className={drawClass}
            style={{ ["--len" as string]: 22 }}
            x1="100"
            y1="100"
            x2="100"
            y2="80"
            transform={`rotate(${deg} 100 100)`}
          />
        ))}
      </g>
    </svg>
  );
}

/** 저울 (정의) — 기둥·받침·양팔·접시. 부품별 class로 조립 애니메이션 대응 */
export function Scale({
  className,
  ids,
  ...props
}: SVGProps<SVGSVGElement> & {
  ids?: { base?: string; column?: string; beam?: string; panL?: string; panR?: string };
}) {
  const st = { stroke: "currentColor", strokeWidth: 4, fill: "none" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 400 380" className={className} aria-hidden {...props}>
      {/* 받침 */}
      <g id={ids?.base} {...st}>
        <path d="M150 350 H250" />
        <path d="M175 350 C185 320, 215 320, 225 350" />
        <line x1="200" y1="325" x2="200" y2="120" />
      </g>
      {/* 기둥 상단 고리 */}
      <g id={ids?.column} {...st}>
        <circle cx="200" cy="112" r="9" />
      </g>
      {/* 양팔 */}
      <g id={ids?.beam} {...st}>
        <line x1="90" y1="140" x2="310" y2="140" />
        <line x1="200" y1="120" x2="90" y2="140" />
        <line x1="200" y1="120" x2="310" y2="140" />
      </g>
      {/* 왼쪽 접시 */}
      <g id={ids?.panL} {...st}>
        <line x1="90" y1="140" x2="65" y2="205" />
        <line x1="90" y1="140" x2="115" y2="205" />
        <path d="M55 205 C 70 250, 110 250, 125 205 Z" />
      </g>
      {/* 오른쪽 접시 */}
      <g id={ids?.panR} {...st}>
        <line x1="310" y1="140" x2="285" y2="205" />
        <line x1="310" y1="140" x2="335" y2="205" />
        <path d="M275 205 C 290 250, 330 250, 345 205 Z" />
      </g>
    </svg>
  );
}

/** 붓펜 깃털 — 네이비 강조. 저울 중앙에 꽂히는 상징 */
export function BrushPen({ className, id, ...props }: SVGProps<SVGSVGElement> & { id?: string }) {
  return (
    <svg viewBox="0 0 120 300" className={className} aria-hidden {...props}>
      <g id={id} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* 깃대 */}
        <line x1="60" y1="30" x2="60" y2="270" stroke="currentColor" strokeWidth="3.5" />
        {/* 깃털 좌 */}
        <path
          d="M60 40 C 30 60, 22 110, 30 165 C 44 150, 56 120, 60 90"
          stroke="currentColor"
          strokeWidth="2.6"
        />
        {/* 깃털 우 */}
        <path
          d="M60 40 C 90 60, 98 110, 90 165 C 76 150, 64 120, 60 90"
          stroke="currentColor"
          strokeWidth="2.6"
        />
        {/* 깃결 */}
        {[70, 95, 120, 145].map((y, i) => (
          <g key={y} stroke="currentColor" strokeWidth="1.6" opacity="0.8">
            <line x1="60" y1={y} x2={44 - i * 2} y2={y - 8} />
            <line x1="60" y1={y} x2={76 + i * 2} y2={y - 8} />
          </g>
        ))}
        {/* 펜촉 */}
        <path d="M60 270 L54 250 L66 250 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" />
      </g>
    </svg>
  );
}

/** 법봉 */
export function Gavel({ className, id, ...props }: SVGProps<SVGSVGElement> & { id?: string }) {
  const st = { stroke: "currentColor", strokeWidth: 4, fill: "none" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden {...props}>
      <g id={id} {...st} transform="rotate(-32 100 80)">
        {/* 머리 */}
        <rect x="55" y="30" width="90" height="42" rx="6" />
        <line x1="72" y1="30" x2="72" y2="72" />
        <line x1="128" y1="30" x2="128" y2="72" />
        {/* 손잡이 */}
        <line x1="100" y1="72" x2="100" y2="140" />
        <rect x="90" y="132" width="20" height="14" rx="3" />
      </g>
    </svg>
  );
}

/** 책 더미 (법전) */
export function Books({ className, id, ...props }: SVGProps<SVGSVGElement> & { id?: string }) {
  const st = { stroke: "currentColor", strokeWidth: 3.5, fill: "none" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 240 140" className={className} aria-hidden {...props}>
      <g id={id} {...st}>
        <rect x="30" y="96" width="180" height="30" rx="4" />
        <rect x="44" y="66" width="152" height="30" rx="4" />
        <rect x="58" y="36" width="124" height="30" rx="4" />
        <line x1="44" y1="111" x2="196" y2="111" opacity="0.5" />
        <line x1="58" y1="81" x2="182" y2="81" opacity="0.5" />
      </g>
    </svg>
  );
}

/** 부스 픽토그램 — 네이비 원형 안 라인 (포스터 계승) */
export function BoothIcon({
  type,
  className,
  drawClass,
}: {
  type: "person" | "brush" | "star" | "people";
  className?: string;
  drawClass?: string;
}) {
  const inner: Record<string, React.ReactNode> = {
    person: (
      <>
        <circle className={drawClass} style={{ ["--len" as string]: 90 }} cx="50" cy="40" r="13" />
        <path className={drawClass} style={{ ["--len" as string]: 120 }} d="M28 74 C28 58, 72 58, 72 74" />
      </>
    ),
    brush: (
      <>
        <path className={drawClass} style={{ ["--len" as string]: 90 }} d="M62 30 L40 52 L48 60 L70 38 Z" />
        <path className={drawClass} style={{ ["--len" as string]: 80 }} d="M40 52 C 30 62, 28 70, 30 74 C 36 74, 44 70, 48 60" />
      </>
    ),
    star: (
      <path
        className={drawClass}
        style={{ ["--len" as string]: 200 }}
        d="M50 26 L57 42 L74 44 L61 56 L65 73 L50 64 L35 73 L39 56 L26 44 L43 42 Z"
      />
    ),
    people: (
      <>
        <circle className={drawClass} style={{ ["--len" as string]: 70 }} cx="38" cy="40" r="10" />
        <circle className={drawClass} style={{ ["--len" as string]: 70 }} cx="64" cy="40" r="10" />
        <path className={drawClass} style={{ ["--len" as string]: 90 }} d="M22 72 C22 58, 54 58, 54 72" />
        <path className={drawClass} style={{ ["--len" as string]: 90 }} d="M48 72 C48 58, 80 58, 80 72" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
      <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {inner[type]}
      </g>
    </svg>
  );
}

/** 캘린더 아이콘 (포스터 계승) */
export function CalendarIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  const st = { stroke: "currentColor", strokeWidth: 3, fill: "none" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden {...props}>
      <rect x="8" y="12" width="44" height="40" rx="5" {...st} />
      <line x1="8" y1="24" x2="52" y2="24" {...st} />
      <line x1="20" y1="8" x2="20" y2="18" {...st} />
      <line x1="40" y1="8" x2="40" y2="18" {...st} />
      <g fill="currentColor">
        <circle cx="20" cy="34" r="2.6" />
        <circle cx="30" cy="34" r="2.6" />
        <circle cx="40" cy="34" r="2.6" />
        <circle cx="20" cy="44" r="2.6" />
        <circle cx="30" cy="44" r="2.6" />
      </g>
    </svg>
  );
}

/** 점선 디바이더 */
export function DashDivider({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        height: 0,
        borderTop: "1.5px dashed var(--color-border)",
      }}
      aria-hidden
    />
  );
}
