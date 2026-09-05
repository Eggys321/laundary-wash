import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";

import { Button, SelectField, TextField } from "@/components";
import {
  pickupDetailsSchema,
  SERVICE_TYPE_OPTIONS,
  PICKUP_TIME_SLOTS,
  type PickupDetailsValues,
} from "@/schemas/bookingSchemas";

interface PickupDetailsStepProps {
  defaultValues: Partial<PickupDetailsValues>;
  onNext: (values: PickupDetailsValues) => void;
}

export default function PickupDetailsStep({ defaultValues, onNext }: PickupDetailsStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PickupDetailsValues>({
    resolver: zodResolver(pickupDetailsSchema),
    defaultValues: {
      serviceType: defaultValues.serviceType ?? "",
      pickupDate: defaultValues.pickupDate ?? "",
      pickupTime: defaultValues.pickupTime ?? "",
      address: defaultValues.address ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate className="space-y-5">
      <h2 className="font-redhat text-xl font-bold text-text-primary">
        Book Laundry Pick-Up
      </h2>

      <SelectField
        label="Service Type"
        placeholder="Select a service"
        options={SERVICE_TYPE_OPTIONS.map(({ label, value }) => ({ label, value }))}
        error={errors.serviceType?.message}
        {...register("serviceType")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Pickup Date"
          type="date"
          min={dayjs().format("YYYY-MM-DD")}
          error={errors.pickupDate?.message}
          {...register("pickupDate")}
        />

        <SelectField
          label="Pickup Time"
          placeholder="Select a time slot"
          options={PICKUP_TIME_SLOTS}
          error={errors.pickupTime?.message}
          {...register("pickupTime")}
        />
      </div>

      <TextField
        label="Pickup Address"
        placeholder="Enter your pickup address"
        error={errors.address?.message}
        {...register("address")}
      />

      <Button type="submit" fullWidth>
        Continue
      </Button>
    </form>
  );
}
