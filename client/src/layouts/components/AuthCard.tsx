import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-3xl bg-background-gray-2 p-8 shadow-xl sm:p-10">
      <h1 className="font-redhat text-2xl font-bold text-text-primary sm:text-3xl">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-sm leading-6 text-text-secondary">{subtitle}</p>
      )}

      <div className="mt-8">{children}</div>

      {footer && (
        <div className="mt-6 text-center text-sm text-text-secondary">
          {footer}
        </div>
      )}
    </div>
  );
}
