import type { LucideIcon } from "lucide-react";
import clsx from "clsx";

type StatTone = "amber" | "purple" | "teal" | "blue" | "green";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  tone: StatTone;
}

const TONE_CLASSES: Record<StatTone, string> = {
  amber: "bg-amber-500/15 text-amber-500",
  purple: "bg-primary/15 text-primary",
  teal: "bg-teal-500/15 text-teal-500",
  blue: "bg-sky-500/15 text-sky-500",
  green: "bg-emerald-500/15 text-emerald-500",
};

export default function StatCard({ icon: Icon, label, value, tone }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-background-gray-2 p-5">
      <div
        className={clsx(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
          TONE_CLASSES[tone],
        )}
      >
        <Icon size={22} />
      </div>

      <div>
        <p className="text-sm text-text-secondary">{label}</p>
        <p className="font-redhat text-xl font-bold text-text-primary">{value}</p>
      </div>
    </div>
  );
}
