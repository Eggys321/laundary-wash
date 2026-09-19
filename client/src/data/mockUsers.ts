import avatar from "@/assets/images/avatar.png";

export type UserRole = "customer" | "admin";

export interface RegisteredAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  avatarUrl: string;
  role: UserRole;
  createdAt: string;
}

export const DEMO_CREDENTIALS = {
  email: "customer@demo.com",
  password: "Demo1234",
};

export const DEMO_ADMIN_CREDENTIALS = {
  email: "admin@demo.com",
  password: "Demo1234",
};

export const SEED_ACCOUNTS: RegisteredAccount[] = [
  {
    id: "seed-customer-1",
    name: "John Doe",
    email: DEMO_CREDENTIALS.email,
    password: DEMO_CREDENTIALS.password,
    phone: "+234 801 234 5678",
    address: "12 Admiralty Way, Lekki, Lagos",
    avatarUrl: avatar,
    role: "customer",
    createdAt: "2026-08-01T09:00:00.000Z",
  },
  {
    id: "seed-admin-1",
    name: "Amaka Admin",
    email: DEMO_ADMIN_CREDENTIALS.email,
    password: DEMO_ADMIN_CREDENTIALS.password,
    phone: "+234 802 345 6789",
    address: "Laundry Wash HQ, Victoria Island, Lagos",
    avatarUrl: avatar,
    role: "admin",
    createdAt: "2026-01-15T09:00:00.000Z",
  },
];
