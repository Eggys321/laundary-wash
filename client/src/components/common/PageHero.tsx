import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  image: string;
  children?: ReactNode;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  children,
}: PageHeroProps) {
  return (
    <section className="bg-background-gray-2 px-6 py-12 md:px-10 md:py-16 lg:px-40 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Content */}
        <div>
          {eyebrow && (
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              {eyebrow}
            </span>
          )}

          <h1 className="mt-4 font-redhat text-4xl font-bold leading-tight text-text-primary sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
            {description}
          </p>

          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </div>

        {/* Image */}
        <div className="overflow-hidden rounded-3xl">
          <img
            src={image}
            alt={title}
            className="h-full min-h-70 w-full object-cover md:min-h-100"
          />
        </div>
      </div>
    </section>
  );
}