import { SERVICES_STEPS, SERVICES_VALUES } from "@/data/siteData";
import { PageHero } from "@/components";
import servicesHeroImg from "@/assets/images/services-img.jpg";
import CTA from "@/components/common/CTA";

export default function Services() {
  return (
    <main className="bg-background-gray-2 font-lato">
      <PageHero
        variant="inner"
        title="Laundry Services Made Simple"
        description="From everyday washing to professional garment care, we make keeping your clothes fresh, clean, and ready to wear effortless."
        image={servicesHeroImg}
        imageAlt="Professional laundry and garment care services"
        primaryAction={{
          label: "Book Laundry",
          href: "/book",
        }}
      />

      {/* Services */}
      <section className="bg-white px-6 py-20 md:py-24 lg:px-10 ">
        <div className="">
          <div className="">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary ">
              What We Offer
            </span>

            <h2 className="mt-3 font-redhat text-3xl font-bold  sm:text-4xl">
              Laundry care made simple.
            </h2>

            <p className="mt-4 text-base leading-7">
              Whether you have a week's worth of clothes or just a few special
              pieces that need extra care, our services are designed to make
              laundry convenient and hassle-free.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES_VALUES.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="rounded-2xl border border-black/5 bg-background-gray-2 p-7 transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-6 font-redhat text-xl font-bold text-text-primary">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {service.description}
                  </p>

                  <div className="mt-6 border-t border-black/5 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-text-primary">
                      Perfect for
                    </p>

                    <p className="mt-2 text-sm leading-6 text-text-secondary">
                      {service.idealFor}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 md:py-24 lg:px-10">
        <div className="">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              How It Works
            </span>

            <h2 className="mt-3 font-redhat text-3xl font-bold text-text-primary sm:text-4xl">
              Laundry day, simplified.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-text-secondary">
              Getting your laundry done shouldn't be complicated. We've made the
              entire process simple.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES_STEPS.map((step) => (
              <div key={step.number} className="relative">
                <span className="text-5xl font-bold text-primary/20">
                  {step.number}
                </span>

                <h3 className="mt-3 font-redhat text-xl font-bold text-text-primary">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Ready to take laundry off your to-do list?"
        description="Let us handle the washing while you focus on what matters most."
      />
    </main>
  );
}
