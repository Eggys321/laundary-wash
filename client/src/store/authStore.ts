import { create } from "zustand";
import { persist } from "zustand/middleware";

import { SEED_ACCOUNTS, type RegisteredAccount, type UserRole } from "@/data/mockUsers";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl: string;
  role: UserRole;
  createdAt: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  accounts: RegisteredAccount[];
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (input: RegisterInput) => Promise<AuthUser>;
  logout: () => void;
  updateProfile: (updates: Partial<Omit<AuthUser, "id" | "email">>) => void;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const MOCK_LATENCY_MS = 600;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const toPublicUser = (account: RegisteredAccount): AuthUser => {
  const { password: _password, ...user } = account;
  return user;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      accounts: SEED_ACCOUNTS,

      login: async (email, password) => {
        await wait(MOCK_LATENCY_MS);

        const account = get().accounts.find(
          (candidate) =>
            candidate.email.toLowerCase() === email.trim().toLowerCase(),
        );

        if (!account || account.password !== password) {
          throw new Error("Invalid email or password.");
        }

        const user = toPublicUser(account);
        set({ user, isAuthenticated: true });
        return user;
      },

      register: async ({ name, email, password }) => {
        await wait(MOCK_LATENCY_MS);

        const normalizedEmail = email.trim().toLowerCase();
        const exists = get().accounts.some(
          (candidate) => candidate.email.toLowerCase() === normalizedEmail,
        );

        if (exists) {
          throw new Error("An account with this email already exists.");
        }

        const account: RegisteredAccount = {
          id: `acc-${Date.now()}`,
          name: name.trim(),
          email: normalizedEmail,
          password,
          phone: "",
          address: "",
          avatarUrl: "",
          role: "customer",
          createdAt: new Date().toISOString(),
        };

        set((state) => ({ accounts: [...state.accounts, account] }));

        const user = toPublicUser(account);
        set({ user, isAuthenticated: true });
        return user;
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateProfile: (updates) => {
        const { user } = get();
        if (!user) return;

        const updatedUser = { ...user, ...updates };

        set((state) => ({
          user: updatedUser,
          accounts: state.accounts.map((account) =>
            account.id === updatedUser.id
              ? { ...account, ...updates }
              : account,
          ),
        }));
      },

      resetPassword: async (email, newPassword) => {
        await wait(MOCK_LATENCY_MS);

        const normalizedEmail = email.trim().toLowerCase();
        const exists = get().accounts.some(
          (candidate) => candidate.email.toLowerCase() === normalizedEmail,
        );

        if (!exists) {
          throw new Error("No account found for this email.");
        }

        set((state) => ({
          accounts: state.accounts.map((account) =>
            account.email.toLowerCase() === normalizedEmail
              ? { ...account, password: newPassword }
              : account,
          ),
        }));
      },

      changePassword: async (currentPassword, newPassword) => {
        await wait(MOCK_LATENCY_MS);

        const { user, accounts } = get();
        if (!user) throw new Error("You must be logged in.");

        const account = accounts.find((candidate) => candidate.id === user.id);

        if (!account || account.password !== currentPassword) {
          throw new Error("Current password is incorrect.");
        }

        set((state) => ({
          accounts: state.accounts.map((candidate) =>
            candidate.id === user.id
              ? { ...candidate, password: newPassword }
              : candidate,
          ),
        }));
      },
    }),
    {
      name: "laundry-wash-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accounts: state.accounts,
      }),
      merge: (persistedState, currentState) => {
        const persisted = (persistedState ?? {}) as Partial<AuthState>;
        const persistedAccounts = persisted.accounts ?? [];
        const existingIds = new Set(persistedAccounts.map((account) => account.id));
        const missingSeeds = SEED_ACCOUNTS.filter((seed) => !existingIds.has(seed.id));

        return {
          ...currentState,
          ...persisted,
          accounts: [...persistedAccounts, ...missingSeeds],
        };
      },
    },
  ),
);
