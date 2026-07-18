"use client";

import { EVENT } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/motion/blur-fade";
import { CalendarIcon, DashDivider, Mugunghwa } from "@/components/svg/motifs";

const FACTS = [
  { label: "일시", value: EVENT.dateFull, sub: EVENT.timeRange },
  { label: "장소", value: EVENT.venueShort, sub: "서교플레이스(예정)" },
  { label: "체험비", value: EVENT.fee, sub: EVENT.feeNote },
];

function makeICS() {
  const dt = (d: string) => d;
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//happy-constitution-717//KR",
    "BEGIN:VEVENT",
    "UID:happy-constitution-717@ssalty",
    `DTSTART:${dt("20260717T140000")}`,
    `DTEND:${dt("20260717T180000")}`,
    "SUMMARY:행복헌법 717 시민 페스타",
    "DESCRIPTION:행복에도 헌법이 있다면? 헌법 제10조 행복추구권을 재해석하는 청년 문화 체험 페스타",
    "LOCATION:프레쉬엔지니어드 홍대점",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return "data:text/calendar;charset=utf-8," + encodeURIComponent(body);
}

export function Factsheet() {
  const mapUrl = "https://map.naver.com/p/search/" + encodeURIComponent("프레쉬엔지니어드 홍대점");

  return (
    <section id="factsheet" className="relative px-[var(--gutter,1.25rem)] py-[var(--spacing-40,10rem)]">
      <Mugunghwa className="pointer-events-none absolute -left-10 bottom-10 size-40 text-terracotta-soft/20 md:size-56" />

      <div className="mx-auto grid max-w-[var(--container-wide)] grid-cols-1 gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        {/* 좌측 대형 날짜 블록 */}
        <div>
          <BlurFade>
            <p className="font-mono text-[var(--text-caption)] uppercase tracking-[0.28em] text-terracotta-deep/80">
              參與 · Join Us
            </p>
            <div className="mt-6 flex items-start gap-4">
              <CalendarIcon className="mt-2 size-10 shrink-0 text-terracotta-deep" />
              <div>
                <p className="tnum font-mono text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.95] tracking-tight text-terracotta-deep">
                  {EVENT.dateShort}
                </p>
                <p className="tnum mt-2 font-mono text-[var(--text-h3)] font-medium text-ink/80">
                  {EVENT.timeRange}
                </p>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={makeICS()} download="행복헌법717.ics">
                <Button variant="terracotta" magnetic>
                  <CalendarIcon className="size-4" />
                  캘린더에 추가
                </Button>
              </a>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">지도 보기</Button>
              </a>
            </div>
          </BlurFade>
        </div>

        {/* 우측 상세 리스트 */}
        <div
          className="rounded-[var(--radius-doc)] border border-border p-8 md:p-10"
          style={{ background: "var(--gradient-paper)" }}
        >
          <div
            className="mb-6 h-[3px] w-16"
            style={{ background: "linear-gradient(90deg,var(--color-navy),var(--color-terracotta))" }}
          />
          {FACTS.map((f, i) => (
            <BlurFade key={f.label} delay={i * 0.06}>
              <div>
                {i > 0 && <DashDivider className="my-5" />}
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <p className="w-24 shrink-0 font-mono text-[var(--text-small)] font-semibold uppercase tracking-[0.12em] text-navy">
                    {f.label}
                  </p>
                  <div className="sm:text-right">
                    <p className="text-[var(--text-h4)] font-bold text-ink">{f.value}</p>
                    {f.sub && <p className="mt-0.5 text-[var(--text-small)] text-muted-foreground">{f.sub}</p>}
                  </div>
                </div>
              </div>
            </BlurFade>
          ))}

          <DashDivider className="my-6" />
          <p className="font-serif text-[var(--text-body)] leading-[1.8] text-ink/75 [text-wrap:pretty]">
            주최 <b className="font-sans font-semibold text-navy">{EVENT.host}</b> · 주관{" "}
            <b className="font-sans font-semibold text-terracotta-deep">{EVENT.organizer}</b>
          </p>
        </div>
      </div>
    </section>
  );
}
