import { Check } from "lucide-react";
import clsx from "clsx";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <ol className="flex w-full items-center">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <li
            key={label}
            className={clsx("flex items-center", !isLast && "flex-1")}
          >
            <div className="flex flex-col items-center gap-2">
              <span
                className={clsx(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  isCompleted && "bg-primary text-white",
                  isActive && "border-2 border-primary text-primary",
                  !isCompleted && !isActive && "border border-white/20 text-text-secondary",
                )}
              >
                {isCompleted ? <Check size={16} /> : stepNumber}
              </span>

              <span
                className={clsx(
                  "hidden text-xs font-medium sm:block",
                  isActive || isCompleted ? "text-text-primary" : "text-text-secondary/70",
                )}
              >
                {label}
              </span>
            </div>

            {!isLast && (
              <div
                className={clsx(
                  "mx-2 h-0.5 flex-1 rounded-full transition-colors sm:mx-4",
                  isCompleted ? "bg-primary" : "bg-white/10",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
