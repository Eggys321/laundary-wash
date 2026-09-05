import { forwardRef, useId } from "react";
import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface SelectFieldOption {
  label: string;
  value: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectFieldOption[];
  placeholder?: string;
  error?: string;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    { label, options, placeholder, error, id, className, ...props },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div>
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          {label}
        </label>

        <div className="relative">
          <select
            id={inputId}
            ref={ref}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
            defaultValue=""
            className={clsx(
              "select w-full appearance-none rounded-xl border-black/10 bg-white text-base-content",
              error && "select-error",
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/50"
          />
        </div>

        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-xs text-error">
            {error}
          </p>
        )}
      </div>
    );
  },
);

SelectField.displayName = "SelectField";

export default SelectField;
