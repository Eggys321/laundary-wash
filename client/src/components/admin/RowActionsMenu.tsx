import { useEffect, useRef, useState } from "react";
import { Check, Eye, MoreVertical, X } from "lucide-react";
import clsx from "clsx";

interface RowActionsMenuProps {
  onViewDetails: () => void;
  onAccept?: () => void;
  onReject?: () => void;
}

export default function RowActionsMenu({
  onViewDetails,
  onAccept,
  onReject,
}: RowActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const runAndClose = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Row actions"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="rounded-lg p-1.5 text-text-secondary hover:bg-white/10 hover:text-text-primary"
      >
        <MoreVertical size={18} />
      </button>

      <div
        role="menu"
        className={clsx(
          "absolute right-0 top-full z-20 mt-1 w-40 origin-top-right rounded-xl bg-background-gray-3 p-1.5 shadow-xl transition-all duration-150",
          isOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0",
        )}
      >
        <button
          type="button"
          onClick={() => runAndClose(onViewDetails)}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-text-primary hover:bg-white/10"
        >
          <Eye size={16} />
          View Details
        </button>

        {onAccept && (
          <button
            type="button"
            onClick={() => runAndClose(onAccept)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-emerald-500 hover:bg-white/10"
          >
            <Check size={16} />
            Accept
          </button>
        )}

        {onReject && (
          <button
            type="button"
            onClick={() => runAndClose(onReject)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-white/10"
          >
            <X size={16} />
            Reject
          </button>
        )}
      </div>
    </div>
  );
}
