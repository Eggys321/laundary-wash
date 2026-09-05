import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Button, PasswordField, Seo } from "@/components";
import { useAuth } from "@/hooks";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "@/schemas/authSchemas";

interface PreferenceToggle {
  key: string;
  label: string;
  description: string;
}

const PREFERENCE_TOGGLES: PreferenceToggle[] = [
  {
    key: "orderUpdates",
    label: "Order updates",
    description: "Get notified about pickup, progress, and delivery status.",
  },
  {
    key: "promotions",
    label: "Promotions & offers",
    description: "Receive occasional discounts and service announcements.",
  },
  {
    key: "smsAlerts",
    label: "SMS alerts",
    description: "Receive text messages for time-sensitive order updates.",
  },
];

export default function SettingsPage() {
  const { changePassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preferences, setPreferences] = useState({
    orderUpdates: true,
    promotions: false,
    smsAlerts: true,
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: ChangePasswordFormValues) => {
    setIsSubmitting(true);

    try {
      await changePassword(values.currentPassword, values.password);
      toast.success("Password updated successfully.");
      reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setError("root", { message });
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Seo
        title="Settings"
        description="Manage your Laundry Wash password and notification preferences."
      />

      <div className="space-y-6">
        <div className="rounded-3xl bg-background-gray-2 p-6 sm:p-8">
          <h1 className="font-redhat text-2xl font-bold text-text-primary">
            Change Password
          </h1>

          <p className="mt-1 text-sm text-text-secondary">
            Use a strong password you don't use anywhere else.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-6 grid gap-5 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <PasswordField
                label="Current Password"
                autoComplete="current-password"
                placeholder="Enter your current password"
                error={errors.currentPassword?.message}
                {...register("currentPassword")}
              />
            </div>

            <PasswordField
              label="New Password"
              autoComplete="new-password"
              placeholder="Enter a new password"
              error={errors.password?.message}
              {...register("password")}
            />

            <PasswordField
              label="Confirm New Password"
              autoComplete="new-password"
              placeholder="Re-enter your new password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            {errors.root?.message && (
              <p className="text-sm text-error sm:col-span-2">{errors.root.message}</p>
            )}

            <div className="sm:col-span-2">
              <Button type="submit" isLoading={isSubmitting}>
                Update Password
              </Button>
            </div>
          </form>
        </div>

        <div className="rounded-3xl bg-background-gray-2 p-6 sm:p-8">
          <h2 className="font-redhat text-2xl font-bold text-text-primary">
            Notification Preferences
          </h2>

          <div className="mt-6 space-y-5">
            {PREFERENCE_TOGGLES.map((toggle) => (
              <div key={toggle.key} className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-text-primary">{toggle.label}</p>
                  <p className="mt-0.5 text-sm text-text-secondary">{toggle.description}</p>
                </div>

                <input
                  type="checkbox"
                  className="toggle toggle-primary shrink-0"
                  checked={preferences[toggle.key as keyof typeof preferences]}
                  onChange={() => togglePreference(toggle.key as keyof typeof preferences)}
                  aria-label={toggle.label}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
