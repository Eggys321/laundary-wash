import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { AuthCard } from "@/layouts/components";
import { Button, PasswordField, Seo, TextField } from "@/components";
import { useAuth } from "@/hooks";
import { signUpSchema, type SignUpFormValues } from "@/schemas/authSchemas";

export default function SignUpPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    setIsSubmitting(true);

    try {
      const user = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      toast.success(`Welcome to Laundry Wash, ${user.name.split(" ")[0]}!`);
      navigate("/", { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setError("root", { message });
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title="Sign Up"
        description="Create a Laundry Wash account to book pickup and delivery for your laundry in minutes."
      />

      <AuthCard
        title="Create Account"
        subtitle="Sign up to start booking hassle-free laundry pickups."
        footer={
          <>
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary">
              Log In
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <TextField
            label="Full Name"
            autoComplete="name"
            placeholder="Enter your full name"
            error={errors.name?.message}
            {...register("name")}
          />

          <TextField
            label="Email Address"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            error={errors.email?.message}
            {...register("email")}
          />

          <TextField
            label="Phone Number"
            type="tel"
            autoComplete="tel"
            placeholder="Enter your phone number"
            error={errors.phone?.message}
            {...register("phone")}
          />

          <PasswordField
            label="Password"
            autoComplete="new-password"
            placeholder="Create a password"
            error={errors.password?.message}
            {...register("password")}
          />

          <PasswordField
            label="Confirm Password"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <label className="flex items-start gap-2.5 text-sm text-text-secondary">
            <input
              type="checkbox"
              className="checkbox checkbox-sm mt-0.5 rounded border-white/20"
              {...register("agreeToTerms")}
            />
            I agree to the Terms of Service and Privacy Policy.
          </label>

          {errors.agreeToTerms?.message && (
            <p className="-mt-3 text-sm text-error">{errors.agreeToTerms.message}</p>
          )}

          {errors.root?.message && (
            <p className="text-sm text-error">{errors.root.message}</p>
          )}

          <Button type="submit" fullWidth isLoading={isSubmitting}>
            Sign Up
          </Button>
        </form>
      </AuthCard>
    </>
  );
}
