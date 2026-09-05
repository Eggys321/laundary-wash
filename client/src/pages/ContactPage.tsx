import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Button, PageHero, Seo, TextareaField, TextField } from "@/components";
import { CONTACT_VALUES } from "@/data/siteData";
import { contactSchema, type ContactFormValues } from "@/schemas/contactSchema";
import { useContactStore } from "@/store/contactStore";
import contactImgHero from "@/assets/images/contact-img.jpg";

export default function ContactPage() {
  const addMessage = useContactStore((state) => state.addMessage);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    addMessage({
      id: `msg-${Date.now()}`,
      ...values,
      submittedAt: new Date().toISOString(),
    });

    toast.success("Message sent! Our team will get back to you shortly.");
    reset();
  };

  return (
    <div className="bg-background-gray-2 font-lato">
      <Seo
        title="Contact Us"
        description="Get in touch with the Laundry Wash team for questions about services, pickup, delivery, or your order."
      />

      <PageHero
        variant="inner"
        title="We're Here to Help"
        description="Have a question about our services, pickup and delivery, or your laundry? Reach out to our team and we'll be happy to help."
        image={contactImgHero}
        imageAlt="Laundry Wash customer support"
      />

      <section className="bg-white px-6 py-20 md:py-24 lg:px-10">
        <div className="container mx-auto grid gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Get In Touch
            </span>

            <h2 className="mt-3 font-redhat text-3xl font-bold sm:text-4xl">
              Let's talk.
            </h2>

            <p className="mt-4 max-w-lg text-base leading-7 ">
              Reach out to us and our team will be happy to assist you with
              any questions or concerns.
            </p>

            <div className="mt-10 space-y-6">
              {CONTACT_VALUES.map((detail) => {
                const Icon = detail.icon;

                return (
                  <div key={detail.title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 className="font-redhat font-bold">{detail.title}</h3>
                      <p className="mt-1 font-medium">{detail.value}</p>
                      <p className="mt-1 text-sm ">{detail.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 border-t border-black/5 pt-8">
              <h3 className="font-redhat text-lg font-bold">Business Hours</h3>

              <div className="mt-4 space-y-2 text-sm ">
                <div className="flex max-w-sm justify-between">
                  <span>Monday – Saturday</span>
                  <span>8:00 AM – 6:00 PM</span>
                </div>

                <div className="flex max-w-sm justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-background-gray-2 p-6 sm:p-8">
            <h2 className="font-redhat text-2xl font-bold text-text-primary">
              Send us a message
            </h2>

            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mt-8 space-y-5"
            >
              <TextField
                label="Full Name"
                autoComplete="name"
                placeholder="Enter your full name"
                error={errors.fullName?.message}
                {...register("fullName")}
              />

              <TextField
                label="Email Address"
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                error={errors.email?.message}
                {...register("email")}
              />

              <TextField
                label="Phone Number"
                type="tel"
                autoComplete="tel"
                placeholder="Enter your phone number"
                error={errors.phone?.message}
                {...register("phone")}
              />

              <TextField
                label="Subject"
                placeholder="What can we help you with?"
                error={errors.subject?.message}
                {...register("subject")}
              />

              <TextareaField
                label="Message"
                placeholder="Tell us how we can help..."
                error={errors.message?.message}
                {...register("message")}
              />

              <Button type="submit" fullWidth isLoading={isSubmitting}>
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24 lg:px-10">
        <div className=" text-center">
          <h2 className="font-redhat text-3xl font-bold text-text-primary sm:text-4xl">
            Need help with a booking?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-text-secondary">
            If you already have a booking and need assistance, include your
            booking details in your message so our team can help you faster.
          </p>
        </div>
      </section>
    </div>
  );
}
