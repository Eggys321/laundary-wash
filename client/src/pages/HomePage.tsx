import { Star } from "lucide-react";

import { CTA, PageHero, SectionTag, Seo } from "@/components";
import {
  HOME_HOW_IT_WORKS,
  HOME_SERVICE_HIGHLIGHTS,
} from "@/data/siteData";
import { MOCK_TESTIMONIALS } from "@/data/mockTestimonials";
import homeImgHero from "@/assets/images/home-img-hero.png";
import servicesHeroImg from "@/assets/images/services-img.jpg";

export default function HomePage() {
  return (
    <div>
      <Seo
        title="Home"
        description="Laundry Wash helps you save time with fast, reliable pickup and delivery laundry service."
      />

      <PageHero
        variant="home"
        title="Quick. Clean. Delivered."
        description="Laundry Wash helps you save time with fast, reliable pickup and delivery service. Because you deserve clean clothes without the wait."
        image={homeImgHero}
        imageAlt="Laundry Wash pickup and delivery service"
        primaryAction={{
          label: "Book Laundry",
          href: "/book",
        }}
      />

      <section className="px-6 py-20 md:py-24 lg:px-10">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center">
            <SectionTag>Services</SectionTag>

            <h2 className="mt-4 font-redhat text-3xl font-bold text-text-primary sm:text-4xl">
              Expert Care for Every Fabric
            </h2>

            <p className="mt-4 text-base leading-7 text-text-secondary">
              From everyday essentials to delicate garments, we tailor our
              service to what your laundry actually needs.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {HOME_SERVICE_HIGHLIGHTS.map((service) => (
              <article
                key={service.title}
                className="overflow-hidden rounded-2xl bg-background-gray-2 shadow-sm"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-48 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="font-redhat text-xl font-bold text-text-primary">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {service.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24 lg:px-10">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center">
            <SectionTag>How It Works</SectionTag>

            <h2 className="mt-4 font-redhat text-3xl font-bold text-text-primary sm:text-4xl">
              Expert Care for Every Fabric
            </h2>

            <p className="mt-4 text-base leading-7 text-text-secondary">
              Getting your laundry done shouldn't be complicated. Here's how
              simple it is with Laundry Wash.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {HOME_HOW_IT_WORKS.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.title} className="text-center">
                  <div
                    className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${step.tone}`}
                  >
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-5 font-redhat text-lg font-bold text-text-primary">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24 lg:px-10">
        <div className="container mx-auto grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionTag>Who We Are</SectionTag>

            <h2 className="mt-4 font-redhat text-3xl font-bold text-text-primary sm:text-4xl">
              Reclaiming Your Time with Professional Laundry Solutions
            </h2>

            <p className="mt-5 text-base leading-7 text-text-secondary">
              Laundry Wash is a trusted laundry service dedicated to giving
              you back your time. From pickup to delivery, our experienced
              team handles every load with care, consistency, and attention
              to detail.
            </p>

            <p className="mt-4 text-base leading-7 text-text-secondary">
              Whether it's everyday washing or delicate garments that need
              special attention, we treat every order like it's our own.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl">
            <img
              src={homeImgHero}
              alt="Laundry Wash professional laundry facility"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24 lg:px-10">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-redhat text-3xl font-bold text-text-primary sm:text-4xl">
              What Our Customers Say About Us
            </h2>

            <p className="mt-3 text-base leading-7 text-text-secondary">
              Real experiences from people who trust us with their clothes
              every week.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {MOCK_TESTIMONIALS.map((testimonial) => {
              const initials = testimonial.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .toUpperCase();

              return (
                <article
                  key={testimonial.id}
                  className="overflow-hidden rounded-2xl"
                >
                  <div className="bg-background-gray-3 p-6">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5 text-amber-400">
                        {Array.from({ length: testimonial.rating }).map((_, index) => (
                          <Star key={index} size={14} fill="currentColor" strokeWidth={0} />
                        ))}
                      </div>

                      <span className="text-sm font-semibold text-text-primary">
                        {testimonial.rating}/5
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-text-secondary">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-primary p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-primary">
                      {initials}
                    </div>

                    <div>
                      <p className="font-redhat text-sm font-bold text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-white/70">{testimonial.role}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTA
        title="Laundry Made Effortless"
        description="Fresh, clean, perfectly cared for laundry, right when you need it."
        image={servicesHeroImg}
      />
    </div>
  );
}
