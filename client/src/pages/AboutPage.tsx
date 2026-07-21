import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const values = [
  {
    icon: Clock3,
    title: "Convenience",
    description:
      "Your time matters. Our service is designed to fit into your schedule and make laundry less of a chore.",
  },
  {
    icon: HeartHandshake,
    title: "Quality Care",
    description:
      "We treat your clothes with care and give different fabrics and garments the attention they deserve.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description:
      "From pickup to delivery, we aim to provide a dependable experience you can trust.",
  },
  {
    icon: Sparkles,
    title: "Simplicity",
    description:
      "No complicated process. Book your service, let us handle the laundry, and enjoy your freshly cleaned clothes.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-background-gray-2 font-lato">
      {/* Hero */}
      <section className="px-6 py-20 md:py-28 lg:px-40">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            About Laundry Wash
          </span>

          <h1 className="mt-4 font-redhat text-4xl font-bold leading-tight text-text-primary sm:text-5xl lg:text-6xl">
            We make laundry day easier.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
            Laundry is a part of everyday life, but it doesn't have to take up
            your entire day.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="bg-white px-6 py-20 md:py-24 lg:px-40 text-primary ">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest">
              Who We Are
            </span>

            <h2 className="mt-3 font-redhat text-3xl font-bold  sm:text-4xl">
              Laundry care you can count on.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-7">
            <p>
              At Laundry Wash, we believe that getting your clothes clean
              should be simple.
            </p>

            <p>
              We combine professional laundry care with a convenient booking
              and pickup experience, making it easier for busy individuals,
              families, and professionals to stay on top of their laundry.
            </p>

            <p>
              From everyday clothing to garments that need special attention,
              we treat every item with the care it deserves.
            </p>

            <p className="font-semibold ">
              Our goal is simple: to make laundry one less thing you have to
              worry about.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-20 md:py-24 lg:px-40 text-text-secondary">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest">
            Our Mission
          </span>

          <h2 className="mt-4 font-redhat text-3xl font-bold sm:text-4xl">
            Our mission is simple.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 ">
            To make professional laundry care more accessible, convenient,
            and reliable for everyone.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 ">
            We are committed to delivering quality service, caring for your
            clothes, and creating a seamless experience from pickup to
            delivery.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white px-6 py-20 md:py-24 lg:px-40">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why Choose Us?
            </span>

            <h2 className="mt-3 font-redhat text-3xl font-bold text-text-primary sm:text-4xl">
              More than just clean clothes.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-2xl border border-black/5 bg-background-gray-2 p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-6 font-redhat text-xl font-bold text-text-primary">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="px-6 py-20 md:py-24 lg:px-40">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Our Promise
          </span>

          <h2 className="mt-4 font-redhat text-3xl font-bold text-text-primary sm:text-4xl">
            We take care of your clothes like they're our own.
          </h2>

          <p className="mt-6 text-base leading-7 text-text-secondary">
            Every garment deserves the right care. That's why we pay attention
            to the details—from handling your clothes carefully to ensuring
            they're returned clean, fresh, and ready to wear.
          </p>

          <p className="mt-4 font-semibold text-text-primary">
            With Laundry Wash, you can always expect care, convenience, and
            quality.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 md:pb-24 lg:px-40">
        <div className="mx-auto max-w-7xl rounded-3xl bg-primary px-6 py-14 text-center sm:px-12">
          <h2 className="font-redhat text-3xl font-bold text-white sm:text-4xl">
            Ready to experience easier laundry?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Give yourself one less thing to worry about.
          </p>

          <Link
            to="/book"
            className="btn mt-8 rounded-xl border-none bg-white px-8 text-primary hover:bg-white/90"
          >
            Book a Laundry
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}