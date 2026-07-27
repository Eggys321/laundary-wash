import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CtaProps{
    title: string;
  description: string;
}
export default function CTA({
    title,
  description,
}:CtaProps) {
  return (
     <section className="px-6 pb-20 md:pb-24 lg:px-10">
        <div className=" rounded-3xl bg-primary px-6 py-14 text-center sm:px-12">
          <h2 className="font-redhat text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-white/80">
            {description}
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
  )
}
