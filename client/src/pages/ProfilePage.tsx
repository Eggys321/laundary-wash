import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { UserCircle } from "lucide-react";

import { Button, Seo, TextField } from "@/components";
import { useAuth } from "@/hooks";
import { profileSchema, type ProfileFormValues } from "@/schemas/profileSchema";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      phone: user?.phone ?? "",
      address: user?.address ?? "",
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    updateProfile(values);
    toast.success("Profile updated successfully.");
    setIsSubmitting(false);
  };

  if (!user) return null;

  return (
    <>
      <Seo
        title="Personal Information"
        description="Manage your Laundry Wash profile details."
      />

      <div className="rounded-3xl bg-background-gray-2 p-6 sm:p-8">
        <h1 className="font-redhat text-2xl font-bold text-text-primary">
          Personal Information
        </h1>

        <p className="mt-1 text-sm text-text-secondary">
          Keep your details up to date so we can reach you about your orders.
        </p>

        <div className="mt-8 flex items-center gap-4">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
              <UserCircle size={36} />
            </div>
          )}

          <div>
            <p className="font-redhat font-bold text-text-primary">{user.name}</p>
            <p className="text-sm text-text-secondary">{user.email}</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-8 grid gap-5 sm:grid-cols-2"
        >
          <TextField
            label="Full Name"
            autoComplete="name"
            placeholder="Enter your full name"
            error={errors.name?.message}
            {...register("name")}
          />

          <TextField label="Email Address" type="email" value={user.email} disabled readOnly />

          <TextField
            label="Phone Number"
            type="tel"
            autoComplete="tel"
            placeholder="Enter your phone number"
            error={errors.phone?.message}
            {...register("phone")}
          />

          <TextField
            label="Address"
            autoComplete="street-address"
            placeholder="Enter your address"
            error={errors.address?.message}
            {...register("address")}
          />

          <div className="sm:col-span-2">
            <Button type="submit" isLoading={isSubmitting} disabled={!isDirty}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
