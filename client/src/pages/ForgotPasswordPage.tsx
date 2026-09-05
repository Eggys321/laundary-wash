import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { CheckCircle2 } from "lucide-react";

import { AuthCard } from "@/layouts/components";
import { Button, Seo, TextField, PasswordField } from "@/components";
import { useAuth } from "@/hooks";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  type ForgotPasswordFormValues,
  type ResetPasswordFormValues,
} from "@/schemas/authSchemas";

type Step = "request" | "reset" | "done";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("request");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requestForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const resetForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onRequestSubmit = async (values: ForgotPasswordFormValues) => {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setEmail(values.email);
    setStep("reset");
    setIsSubmitting(false);
  };

  const onResetSubmit = async (values: ResetPasswordFormValues) => {
    setIsSubmitting(true);

    try {
      await resetPassword(email, values.password);
      setStep("done");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      resetForm.setError("root", { message });
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "done") {
    return (
      <>
        <Seo
          title="Password Reset"
          description="Your Laundry Wash account password has been reset successfully."
        />

        <AuthCard title="Password Updated">
          <div className="flex flex-col items-center text-center">
            <CheckCircle2 size={56} className="text-primary" />

            <p className="mt-4 text-sm text-text-secondary">
              Your password has been reset successfully. You can now log in
              with your new password.
            </p>

            <Button className="mt-6" onClick={() => navigate("/login")}>
              Back to Log In
            </Button>
          </div>
        </AuthCard>
      </>
    );
  }

  if (step === "reset") {
    return (
      <>
        <Seo
          title="Reset Password"
          description="Choose a new password for your Laundry Wash account."
        />

        <AuthCard
          title="Reset Password"
          subtitle={`Create a new password for ${email}.`}
        >
          <form
            onSubmit={resetForm.handleSubmit(onResetSubmit)}
            noValidate
            className="space-y-5"
          >
            <PasswordField
              label="New Password"
              autoComplete="new-password"
              placeholder="Enter your new password"
              error={resetForm.formState.errors.password?.message}
              {...resetForm.register("password")}
            />

            <PasswordField
              label="Confirm New Password"
              autoComplete="new-password"
              placeholder="Re-enter your new password"
              error={resetForm.formState.errors.confirmPassword?.message}
              {...resetForm.register("confirmPassword")}
            />

            {resetForm.formState.errors.root?.message && (
              <p className="text-sm text-error">
                {resetForm.formState.errors.root.message}
              </p>
            )}

            <Button type="submit" fullWidth isLoading={isSubmitting}>
              Reset Password
            </Button>
          </form>
        </AuthCard>
      </>
    );
  }

  return (
    <>
      <Seo
        title="Forgot Password"
        description="Reset your Laundry Wash account password."
      />

      <AuthCard
        title="Forgot Password"
        subtitle="Enter your information"
        footer={
          <>
            Remembered your password?{" "}
            <Link to="/login" className="font-semibold text-primary">
              Log In
            </Link>
          </>
        }
      >
        <form
          onSubmit={requestForm.handleSubmit(onRequestSubmit)}
          noValidate
          className="space-y-5"
        >
          <TextField
            label="Email Address"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            error={requestForm.formState.errors.email?.message}
            {...requestForm.register("email")}
          />

          <Button type="submit" fullWidth isLoading={isSubmitting}>
            Next
          </Button>
        </form>
      </AuthCard>
    </>
  );
}
