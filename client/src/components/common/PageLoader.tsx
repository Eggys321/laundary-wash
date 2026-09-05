import Spinner from "../ui/Spinner";

export default function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background-dark">
      <Spinner size={32} className="text-primary" />
    </div>
  );
}
