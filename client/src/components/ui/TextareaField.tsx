import { forwardRef, useId } from "react";
import type { TextareaHTMLAttributes } from "react";
import clsx from "clsx";

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, id, className, rows = 5, ...props }, ref) => {
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

        <textarea
          id={inputId}
          ref={ref}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={clsx(
            "textarea w-full resize-none rounded-xl border-black/10 bg-white text-base-content",
            error && "textarea-error",
            className,
          )}
          {...props}
        />

        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-xs text-error">
            {error}
          </p>
        )}
      </div>
    );
  },
);

TextareaField.displayName = "TextareaField";

export default TextareaField;
