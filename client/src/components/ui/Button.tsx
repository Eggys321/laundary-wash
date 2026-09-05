import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

import Spinner from "./Spinner";

type ButtonVariant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  outline: "border border-primary bg-transparent text-primary",
  ghost: "border-none bg-transparent text-text-primary",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      isLoading = false,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          "btn rounded-xl",
          VARIANT_CLASSES[variant],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {isLoading && <Spinner size={16} />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
