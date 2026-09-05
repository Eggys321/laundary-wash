import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, SelectField, TextareaField, TextField } from "@/components";
import {
  garmentDetailsSchema,
  DELIVERY_OPTIONS,
  type GarmentDetailsValues,
} from "@/schemas/bookingSchemas";

interface GarmentDetailsStepProps {
  defaultValues: Partial<GarmentDetailsValues>;
  onNext: (values: GarmentDetailsValues) => void;
  onBack: () => void;
}

export default function GarmentDetailsStep({
  defaultValues,
  onNext,
  onBack,
}: GarmentDetailsStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GarmentDetailsValues>({
    resolver: zodResolver(garmentDetailsSchema),
    defaultValues: {
      itemCount: defaultValues.itemCount ?? 1,
      deliveryOption: defaultValues.deliveryOption ?? "",
      instructions: defaultValues.instructions ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate className="space-y-5">
      <h2 className="font-redhat text-xl font-bold text-text-primary">Laundry Details</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Number of Items"
          type="number"
          min={1}
          error={errors.itemCount?.message}
          {...register("itemCount", { valueAsNumber: true })}
        />

        <SelectField
          label="Delivery Option"
          placeholder="Select a delivery option"
          options={DELIVERY_OPTIONS.map(({ label, value }) => ({ label, value }))}
          error={errors.deliveryOption?.message}
          {...register("deliveryOption")}
        />
      </div>

      <TextareaField
        label="Special Instructions (optional)"
        placeholder="Let us know about any specific care instructions..."
        error={errors.instructions?.message}
        {...register("instructions")}
      />

      <div className="flex gap-3">
        <Button type="button" variant="outline" className="shrink-0" onClick={onBack}>
          Back
        </Button>

        <Button type="submit" className="flex-1">
          Continue
        </Button>
      </div>
    </form>
  );
}
