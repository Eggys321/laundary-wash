import { Download } from "lucide-react";

interface AdminPageHeaderProps {
  title: string;
  onExport?: () => void;
}

export default function AdminPageHeader({ title, onExport }: AdminPageHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <h1 className="font-redhat text-2xl font-bold text-text-primary">{title}</h1>

      {onExport && (
        <button
          type="button"
          onClick={onExport}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-text-primary hover:bg-white/10"
        >
          <Download size={16} />
          Export CSV
        </button>
      )}
    </div>
  );
}
