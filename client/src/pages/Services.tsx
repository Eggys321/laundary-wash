import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Shirt,
  Sparkles,
  Truck,
} from "lucide-react";

const services = [
  {
    icon: Shirt,
    title: "Wash & Fold",
    description:
      "Our everyday laundry service takes care of washing, drying, and neatly folding your clothes so they're ready to wear.",
    idealFor:
      "Everyday clothes, towels, bedsheets, and household laundry.",
  },
  {
    icon: Sparkles,
    title: "Wash & Iron",
    description:
      "Get your clothes professionally washed and neatly ironed, ready for your wardrobe.",
    idealFor:
      "Workwear, shirts, dresses, trousers, and everyday outfits.",
  },
  {
    icon: CheckCircle2,
    title: "Dry Cleaning",
    description:
      "Give your delicate and special garments the professional care and attention they deserve.",
    idealFor:
      "Suits, dresses, formal wear, and delicate fabrics.",
  },
  {
    icon: Clock3,
    title: "Ironing Service",
    description:
      "Already have clean clothes but don't have the time to iron them? We'll take care of the finishing touches.",
    idealFor:
      "Shirts, trousers, dresses, uniforms, and workwear.",
  },
  {
    icon: Truck,
    title: "Pickup & Delivery",
    description:
      "Enjoy a completely hassle-free laundry experience. Schedule a pickup and have your freshly cleaned clothes delivered back to you.",
    idealFor:
      "Busy professionals, families, students, and anyone looking to save time.",
  },
];

const steps = [
  {
    number: "01",
    title: "Book Your Service",
    description:
      "Choose the laundry service you need and schedule a convenient pickup.",
  },
  {
    number: "02",
    title: "We Pick Up",
    description:
      "We'll collect your clothes at the scheduled time and get them ready for cleaning.",
  },
  {
    number: "03",
    title: "We Clean & Care",
    description:
      "Your clothes are professionally cleaned and handled with the care they deserve.",
  },
  {
    number: "04",
    title: "We Deliver",
    description:
      "Your fresh, clean laundry is returned to you, ready to wear and enjoy.",
  },
];

export default function Services() {
  return (
    <main className="bg-background-gray-2 font-lato">
      {/* Hero */}
      <section className="px-6 py-20 md:py-28 lg:px-40">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Our Services
          </span>

          <h1 className="mt-4 font-redhat text-4xl font-bold leading-tight text-text-primary sm:text-5xl lg:text-6xl">
            Clean clothes.
            <br />
            Less stress. More time.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
            From everyday laundry to delicate garments, we take care of your
            clothes with the attention and care they deserve.
          </p>

          <Link
            to="/book"
            className="btn btn-primary mt-8 rounded-xl px-8 py-3"
          >
            Book a Laundry
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white px-6 py-20 md:py-24 lg:px-40 ">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
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
            {services.map((service) => {
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
      <section className="px-6 py-20 md:py-24 lg:px-40">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              How It Works
            </span>

            <h2 className="mt-3 font-redhat text-3xl font-bold text-text-primary sm:text-4xl">
              Laundry day, simplified.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-text-secondary">
              Getting your laundry done shouldn't be complicated. We've made
              the entire process simple.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
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
      <section className="px-6 pb-20 md:pb-24 lg:px-40">
        <div className="mx-auto max-w-7xl rounded-3xl bg-primary px-6 py-14 text-center sm:px-12">
          <h2 className="font-redhat text-3xl font-bold text-white sm:text-4xl">
            Ready to take laundry off your to-do list?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Let us handle the washing while you focus on what matters most.
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