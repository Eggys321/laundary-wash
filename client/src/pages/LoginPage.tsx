import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { AuthCard } from "@/layouts/components";
import { Button, PasswordField, Seo, TextField } from "@/components";
import { useAuth } from "@/hooks";
import { loginSchema, type LoginFormValues } from "@/schemas/authSchemas";
import { DEMO_ADMIN_CREDENTIALS, DEMO_CREDENTIALS } from "@/data/mockUsers";

interface LocationState {
  from?: { pathname: string };
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);

    try {
      const user = await login(values.email, values.password);
      toast.success(`Welcome back, ${user.name.split(" ")[0]}!`);

      const fallback = user.role === "admin" ? "/admin" : "/";
      const redirectTo = (location.state as LocationState | null)?.from?.pathname ?? fallback;
      navigate(redirectTo, { replace: true });
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
        title="Log In"
        description="Log in to your Laundry Wash account to book pickups, track orders, and manage your laundry."
      />

      <AuthCard
        title="Welcome Back!"
        subtitle="Log in to book a pickup and manage your laundry."
        footer={
          <>
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-primary">
              Sign Up
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <TextField
            label="Email Address"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            error={errors.email?.message}
            {...register("email")}
          />

          <div>
            <PasswordField
              label="Password"
              autoComplete="current-password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="mt-2 text-right">
              <Link to="/forgot-password" className="text-sm font-medium text-primary">
                Forgot Password?
              </Link>
            </div>
          </div>

          {errors.root?.message && (
            <p className="text-sm text-error">{errors.root.message}</p>
          )}

          <Button type="submit" fullWidth isLoading={isSubmitting}>
            Log In
          </Button>

          <p className="text-center text-xs text-text-secondary/70">
            Demo customer: {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
            <br />
            Demo admin: {DEMO_ADMIN_CREDENTIALS.email} / {DEMO_ADMIN_CREDENTIALS.password}
          </p>
        </form>
      </AuthCard>
    </>
  );
}
