import { useState } from "react";
import toast from "react-hot-toast";
import { CreditCard, Plus, Trash2 } from "lucide-react";

import { Button, Seo } from "@/components";

interface SavedCard {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
}

const INITIAL_CARDS: SavedCard[] = [
  { id: "card-1", brand: "Visa", last4: "4242", expiry: "09/28" },
  { id: "card-2", brand: "Mastercard", last4: "8890", expiry: "01/27" },
];

export default function PaymentsPage() {
  const [cards, setCards] = useState(INITIAL_CARDS);

  const addMockCard = () => {
    const nextCard: SavedCard = {
      id: `card-${Date.now()}`,
      brand: "Verve",
      last4: String(Math.floor(1000 + Math.random() * 9000)),
      expiry: "12/29",
    };

    setCards((prev) => [...prev, nextCard]);
    toast.success("Payment method added.");
  };

  const removeCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    toast.success("Payment method removed.");
  };

  return (
    <>
      <Seo
        title="Payment Methods"
        description="Manage the payment methods linked to your Laundry Wash account."
      />

      <div className="rounded-3xl bg-background-gray-2 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-redhat text-2xl font-bold text-text-primary">
              Payment Methods
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Manage your saved cards for faster checkout.
            </p>
          </div>

          <Button onClick={addMockCard} className="w-fit">
            <Plus size={18} />
            Add Card
          </Button>
        </div>

        <div className="mt-6 space-y-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CreditCard size={22} />
                </div>

                <div>
                  <p className="font-medium text-text-primary">
                    {card.brand} •••• {card.last4}
                  </p>
                  <p className="text-sm text-text-secondary">Expires {card.expiry}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeCard(card.id)}
                aria-label={`Remove card ending in ${card.last4}`}
                className="rounded-lg p-2 text-text-secondary hover:bg-white/10 hover:text-error"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          {cards.length === 0 && (
            <p className="py-6 text-center text-sm text-text-secondary">
              You have no saved payment methods yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
