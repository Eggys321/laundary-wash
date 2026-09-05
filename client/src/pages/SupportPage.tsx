import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

import { Seo } from "@/components";

const FAQS = [
  {
    question: "How do I book a laundry pickup?",
    answer:
      "Go to the Book Laundry page, choose your service, pickup date and time, then confirm your order. We'll pick up your laundry at the scheduled time.",
  },
  {
    question: "How long does a standard order take?",
    answer:
      "Standard orders are returned within 48 hours. Express orders are returned within 24 hours for an additional fee.",
  },
  {
    question: "Can I reschedule or cancel an order?",
    answer:
      "Yes. Reach out to our support team from the Contact page at least 3 hours before your scheduled pickup to reschedule or cancel.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept card payments, bank transfers, and cash on delivery.",
  },
];

export default function SupportPage() {
  return (
    <>
      <Seo
        title="Support"
        description="Find answers to common questions about Laundry Wash orders, pickup, and payments."
      />

      <div className="rounded-3xl bg-background-gray-2 p-6 sm:p-8">
        <h1 className="font-redhat text-2xl font-bold text-text-primary">
          Frequently Asked Questions
        </h1>

        <p className="mt-1 text-sm text-text-secondary">
          Can't find what you're looking for? Reach out to our team.
        </p>

        <div className="mt-6 space-y-3">
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-text-primary">
                {faq.question}
                <ChevronDown
                  size={18}
                  className="shrink-0 text-text-secondary transition-transform group-open:rotate-180"
                />
              </summary>

              <p className="mt-3 text-sm leading-6 text-text-secondary">{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-primary/10 p-6 text-center">
          <p className="font-redhat font-bold text-text-primary">Still need help?</p>
          <p className="mt-1 text-sm text-text-secondary">
            Our support team is ready to assist with any questions.
          </p>

          <Link to="/contact" className="btn btn-primary mt-4 rounded-xl">
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
