import { EVENT } from "@/lib/data";
import { Mugunghwa, DashDivider } from "@/components/svg/motifs";
import { BlurFade } from "@/components/motion/blur-fade";

/** 부칙(附則) / 푸터 — 헌법 부칙 형식 크레딧 */
export function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden px-[var(--gutter,1.25rem)] pb-16 pt-[var(--spacing-40,10rem)]"
    >
      <Mugunghwa
        className="pointer-events-none absolute -right-16 -top-10 size-64 text-terracotta-soft/30 md:size-96"
        drawClass=""
      />

      <div className="mx-auto max-w-[var(--container-content)]">
        <BlurFade>
          <p className="font-mono text-[var(--text-caption)] uppercase tracking-[0.22em] text-terracotta-deep">
            附則 · Addenda
          </p>
          <h2 className="mt-3 font-display text-[var(--text-h2)] font-extrabold tracking-tight text-terracotta-deep">
            부칙
          </h2>
        </BlurFade>

        <DashDivider className="my-8" />

        <div className="grid gap-10 md:grid-cols-2">
          <BlurFade delay={0.05}>
            <div className="space-y-6 font-serif text-[var(--text-body)] leading-[1.9] text-ink">
              <p>
                <span className="font-mono text-[var(--text-small)] font-semibold tracking-wide text-terracotta-deep">
                  제1조
                </span>{" "}
                이 사이트는 <b className="font-sans font-semibold">행복헌법 717 시민 페스타</b>를 알리기 위해
                제정되었으며, 모든 방문자는 자신의 행복을 조항으로 선언할 권리를 가진다.
              </p>
              <p>
                <span className="font-mono text-[var(--text-small)] font-semibold tracking-wide text-terracotta-deep">
                  제2조
                </span>{" "}
                이 페스타는 제헌절의 의미를 우리의 일상과 행복의 관점에서 재해석하며,
                그 효력은 <span className="tnum">{EVENT.dateShort}</span> 발효한다.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.1}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-mono text-[var(--text-caption)] uppercase tracking-[0.18em] text-muted-foreground">
                  주최 · Host
                </p>
                <p className="mt-2 font-display text-2xl font-extrabold tracking-tight text-navy">
                  {EVENT.host}
                </p>
                <p className="mt-1 text-[var(--text-caption)] text-muted-foreground">{EVENT.hostSlogan}</p>
              </div>
              <div>
                <p className="font-mono text-[var(--text-caption)] uppercase tracking-[0.18em] text-muted-foreground">
                  주관 · Organizer
                </p>
                <p className="mt-2 font-display text-2xl font-extrabold tracking-tight text-terracotta-deep">
                  {EVENT.organizer}
                </p>
                <p className="mt-1 text-[var(--text-caption)] text-muted-foreground">{EVENT.organizerSlogan}</p>
              </div>
            </div>
          </BlurFade>
        </div>

        <DashDivider className="my-10" />

        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="font-display text-[var(--text-h3)] font-extrabold tracking-tight text-terracotta-deep">
            행복에도 헌법이 있다면.
          </p>
          <p className="font-mono text-[var(--text-caption)] tracking-[0.12em] text-muted-foreground">
            © 2026 이어온 × SSalty · 행복헌법 717
          </p>
        </div>
      </div>
    </footer>
  );
}
