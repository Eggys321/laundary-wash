import avatar from "@/assets/images/avatar.png";

export interface RegisteredAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  avatarUrl: string;
}

export const DEMO_CREDENTIALS = {
  email: "customer@demo.com",
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
  },
];
