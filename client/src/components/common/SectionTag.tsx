import type { ReactNode } from "react";

interface SectionTagProps {
  children: ReactNode;
}

export default function SectionTag({ children }: SectionTagProps) {
  return (
    <span className="inline-block rounded-full bg-primary px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
      {children}
    </span>
  );
}
