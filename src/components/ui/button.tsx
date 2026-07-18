"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "navy" | "terracotta" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  navy: "bg-navy text-paper hover:bg-navy-ink hover:-translate-y-0.5 hover:shadow-[var(--shadow-navy)]",
  terracotta:
    "bg-terracotta text-secondary-foreground hover:bg-terracotta-deep hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]",
  outline:
    "relative border-[1.5px] border-navy text-navy overflow-hidden hover:text-paper",
  ghost: "text-ink group/link",
};

export function Button({
  variant = "navy",
  className,
  children,
  magnetic = false,
  ...props
}: {
  variant?: Variant;
  magnetic?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.18;
    const y = (e.clientY - r.top - r.height / 2) * 0.18;
    ref.current.style.transform = `translate(${Math.max(-8, Math.min(8, x))}px, ${Math.max(-8, Math.min(8, y))}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] px-6 py-3 text-[var(--text-small)] font-semibold tracking-tight",
        "transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] active:scale-[0.98] active:shadow-[var(--shadow-press)]",
        "disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        className
      )}
      {...props}
    >
      {variant === "outline" && (
        <span
          aria-hidden
          className="absolute inset-0 -z-0 origin-left scale-x-0 bg-navy transition-transform duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] group-hover:scale-x-100 [button:hover>&]:scale-x-100"
        />
      )}
      <span className={cn("relative z-10 inline-flex items-center gap-2", variant === "ghost" && "underline-draw")}>
        {children}
      </span>
    </button>
  );
}
