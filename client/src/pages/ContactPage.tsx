import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+234 XXX XXX XXXX",
    description: "We're available to help with your questions.",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "hello@laundrywash.com",
    description: "Send us a message and we'll get back to you.",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Lagos, Nigeria",
    description: "Our team is ready to assist you.",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-background-gray-2 font-lato">
      {/* Hero */}
      <section className="px-6 py-20 md:py-28 lg:px-40">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Contact Us
          </span>

          <h1 className="mt-4 font-redhat text-4xl font-bold leading-tight text-text-primary sm:text-5xl lg:text-6xl">
            We're here to help.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
            Have a question about our services, need help with a booking, or
            just want to learn more about Laundry Wash? We'd love to hear from
            you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white px-6 py-20 md:py-24 lg:px-40">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Get In Touch
            </span>

            <h2 className="mt-3 font-redhat text-3xl font-bold  sm:text-4xl">
              Let's talk.
            </h2>

            <p className="mt-4 max-w-lg text-base leading-7 ">
              Reach out to us and our team will be happy to assist you with
              any questions or concerns.
            </p>

            <div className="mt-10 space-y-6">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;

                return (
                  <div
                    key={detail.title}
                    className="flex gap-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 className="font-redhat font-bold">
                        {detail.title}
                      </h3>

                      <p className="mt-1 font-medium">
                        {detail.value}
                      </p>

                      <p className="mt-1 text-sm ">
                        {detail.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Business Hours */}
            <div className="mt-10 border-t border-black/5 pt-8">
              <h3 className="font-redhat text-lg font-bold">
                Business Hours
              </h3>

              <div className="mt-4 space-y-2 text-sm ">
                <div className="flex justify-between max-w-sm">
                  <span>Monday – Saturday</span>
                  <span>8:00 AM – 6:00 PM</span>
                </div>

                <div className="flex justify-between max-w-sm">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl bg-background-gray-2 p-6 sm:p-8">
            <h2 className="font-redhat text-2xl font-bold text-text-primary">
              Send us a message
            </h2>

            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="input w-full rounded-xl border-black/10 bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="input w-full rounded-xl border-black/10 bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="input w-full rounded-xl border-black/10 bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What can we help you with?"
                  className="input w-full rounded-xl border-black/10 bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="textarea w-full resize-none rounded-xl border-black/10 bg-white"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full rounded-xl"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="px-6 py-20 md:py-24 lg:px-40">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-redhat text-3xl font-bold text-text-primary sm:text-4xl">
            Need help with a booking?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-text-secondary">
            If you already have a booking and need assistance, include your
            booking details in your message so our team can help you faster.
          </p>
        </div>
      </section>
    </main>
  );
}