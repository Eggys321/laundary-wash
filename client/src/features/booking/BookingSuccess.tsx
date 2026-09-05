import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

import { formatCurrency } from "@/lib/currency";

interface BookingSuccessProps {
  orderId: string;
  amountDue?: number;
}

export default function BookingSuccess({ orderId, amountDue }: BookingSuccessProps) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <CheckCircle2 size={64} className="text-primary" />

      <h2 className="mt-6 font-redhat text-2xl font-bold text-text-primary">
        Booking Confirmed!
      </h2>

      <p className="mt-2 max-w-sm text-sm text-text-secondary">
        Your order <span className="font-semibold text-text-primary">{orderId}</span> has
        been placed. We'll notify you once a rider is on the way for pickup.
      </p>

      {amountDue !== undefined && (
        <div className="mt-4 rounded-2xl bg-primary/10 px-5 py-3 text-sm text-text-primary">
          Please have <span className="font-bold">{formatCurrency(amountDue)}</span> ready
          to pay in cash when your order is delivered.
        </div>
      )}

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <Link to="/orders" className="btn btn-primary w-full rounded-xl sm:w-auto">
          View My Orders
        </Link>

        <Link
          to="/"
          className="btn w-full rounded-xl border-primary bg-transparent text-primary sm:w-auto"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
