import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface PageHeroProps {
  variant?: "home" | "inner";

  title: string;
  description: string;

  image: string;
  imageAlt: string;

  primaryAction?: {
    label: string;
    href: string;
  };

  secondaryAction?: {
    label: string;
    href: string;
  };

  children?: ReactNode;
}

export default function PageHero({
  variant = "inner",
  title,
  description,
  image,
  imageAlt,
  primaryAction,
  secondaryAction,
  children,
}: PageHeroProps) {
  const isHome = variant === "home";

  return (
    <section className="bg-background-gray-2 text-text-primary">
      <div
        className={
          isHome
            ? "container mx-auto px-4 py-12 font-lato md:px-6 md:py-16 lg:px-20 xl:px-24"
            : "container mx-auto px-4 py-16 font-lato md:px-6 md:py-20 lg:px-20 xl:px-24"
        }
      >
        {/* Hero Content */}
        <div
          className={
            isHome
              ? "mx-auto max-w-4xl text-center"
              : "mx-auto max-w-3xl text-center"
          }
        >
          <h1 className="font-redhat text-4xl font-semibold leading-tight tracking-tight text-text-primary md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            {description}
          </p>

          {(primaryAction || secondaryAction) && (
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {primaryAction && (
                <Link
                  to={primaryAction.href}
                  className="btn btn-primary min-w-32 rounded-full px-6"
                >
                  {primaryAction.label}
                </Link>
              )}

              {secondaryAction && (
                <Link
                  to={secondaryAction.href}
                  className="btn min-w-32 rounded-full border border-primary bg-transparent px-6 text-primary"
                >
                  {secondaryAction.label}
                </Link>
              )}
            </div>
          )}

          {children}
        </div>

        {/* Hero Image */}
        <div
          className={
            isHome
              ? "relative mx-auto mt-14 max-w-6xl"
              : "relative mx-auto mt-12 max-w-5xl"
          }
        >
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={image}
              alt={imageAlt}
              className="w-full object-cover md:h-130 lg:h-150"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/5" />           
      </div>
        </div>
      </div>
    </section>
  );
}