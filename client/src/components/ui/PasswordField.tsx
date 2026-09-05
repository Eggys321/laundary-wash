import { forwardRef, useId, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

interface PasswordFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
  hint?: string;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, hint, id, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div>
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          {label}
        </label>

        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={isVisible ? "text" : "password"}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={clsx(
              "input w-full rounded-xl border-black/10 bg-white pr-11 text-base-content",
              error && "input-error",
              className,
            )}
            {...props}
          />

          <button
            type="button"
            onClick={() => setIsVisible((prev) => !prev)}
            aria-label={isVisible ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-base-content/50 hover:text-base-content"
          >
            {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {hint && !error && (
          <p className="mt-1.5 text-xs text-text-secondary/70">{hint}</p>
        )}

        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-xs text-error">
            {error}
          </p>
        )}
      </div>
    );
  },
);

PasswordField.displayName = "PasswordField";

export default PasswordField;
