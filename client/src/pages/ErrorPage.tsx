import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  console.error("Route Error:", error);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background-gray-2 px-6">
      <div className="max-w-md text-center">
        <h1 className="font-redhat text-4xl font-bold text-text-primary">
          Something went wrong
        </h1>

        <p className="mt-4 text-text-secondary">
          We encountered an unexpected error.
          Please try again.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn btn-primary rounded-xl"
          >
            Try Again
          </button>

          <Link
            to="/"
            className="btn rounded-xl border-primary text-primary"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}