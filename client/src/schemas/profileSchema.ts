import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z.string().min(7, "Enter a valid phone number"),
  address: z.string().min(6, "Enter your address"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
