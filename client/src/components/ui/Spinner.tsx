import { Loader2 } from "lucide-react";
import clsx from "clsx";

interface SpinnerProps {
  size?: number;
  className?: string;
}

export default function Spinner({ size = 24, className }: SpinnerProps) {
  return (
    <Loader2
      size={size}
      className={clsx("animate-spin", className)}
      aria-hidden="true"
    />
  );
}
