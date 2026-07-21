import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-lato text-8xl font-bold text-primary sm:text-9xl">
          404
        </p>

        <h1 className="mt-6 font-redhat text-3xl font-bold text-text-primary sm:text-4xl">
          This page needs a little washing.
        </h1>

        <p className="mx-auto mt-4 max-w-lg font-lato text-base leading-7 text-text-secondary sm:text-lg">
          Looks like the page you're looking for has gone
          missing from the laundry. Don't worry — let's get
          you back to somewhere clean and fresh.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="btn btn-primary w-full rounded-xl px-8 sm:w-auto"
          >
            Back to Home
          </Link>

          <Link
            to="/services"
            className="btn w-full rounded-xl border-primary bg-transparent px-8 text-primary sm:w-auto"
          >
            View Our Services
          </Link>
        </div>
      </div>
    </main>
  );
}