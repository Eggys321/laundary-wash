import type { ReactNode } from "react";
import clsx from "clsx";

type BadgeTone = "pending" | "ongoing" | "completed" | "cancelled" | "neutral";

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
}

const TONE_CLASSES: Record<BadgeTone, string> = {
  pending: "bg-amber-500/15 text-amber-500",
  ongoing: "bg-sky-500/15 text-sky-500",
  completed: "bg-emerald-500/15 text-emerald-500",
  cancelled: "bg-red-500/15 text-red-500",
  neutral: "bg-white/10 text-text-secondary",
};

export default function Badge({ tone = "neutral", children }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize",
        TONE_CLASSES[tone],
      )}
    >
      {children}
    </span>
  );
}
