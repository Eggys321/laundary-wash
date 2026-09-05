import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  subject: z.string().min(3, "Enter a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
