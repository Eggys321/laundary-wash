import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
}

interface ContactState {
  messages: ContactMessage[];
  addMessage: (message: ContactMessage) => void;
}

export const useContactStore = create<ContactState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({ messages: [message, ...state.messages] })),
    }),
    {
      name: "laundry-wash-contact-messages",
    },
  ),
);
