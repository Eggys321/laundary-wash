import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";

import brandIcon from "@/assets/logos/Frame 1 (1).png";
import { CONTACT_VALUES } from "@/data/siteData";

const FOOTER_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact Us", path: "/contact" },
];

const CONTACT_ROW_LABELS = ["Contact", "Email", "Address"];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background-dark font-lato">
      <div className="container mx-auto flex flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center lg:px-10">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img src={brandIcon} alt="" className="h-9 w-9 rounded-lg" />
          <span className="font-redhat text-lg font-bold text-primary">
            Laundry Wash
          </span>
        </Link>

        <nav className="flex flex-1 flex-wrap items-center justify-between gap-y-3 text-sm text-text-secondary sm:pl-12">
          {FOOTER_LINKS.map(({ label, path }) => (
            <Link key={path} to={path} className="hover:text-primary">
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="container mx-auto flex flex-col gap-6 px-6 pb-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <div className="grid flex-1 gap-6 sm:grid-cols-3 sm:gap-10">
          {CONTACT_VALUES.map((detail, index) => (
            <div key={detail.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary/60">
                {CONTACT_ROW_LABELS[index]}
              </p>
              <p className="mt-2 text-sm text-text-primary">{detail.value}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex h-9 w-9 shrink-0 items-center justify-center self-end rounded-full bg-primary text-white transition-transform hover:-translate-y-0.5 sm:self-center"
        >
          <ArrowUp size={18} />
        </button>
      </div>

      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 py-6 text-sm text-text-secondary/60 lg:px-10">
          © {new Date().getFullYear()} Laundry Wash. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
