import { Menu } from "lucide-react";

interface MobileMenuButtonProps {
  onClick: () => void;
}

export default function MobileMenuButton({
  onClick,
}: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open navigation menu"
      className="flex items-center justify-center rounded-lg bg-primary p-1 text-white lg:hidden"
    >
      <Menu size={35} />
    </button>
  );
}