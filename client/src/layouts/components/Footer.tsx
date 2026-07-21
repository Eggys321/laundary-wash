export default function Footer() {
  return (
    <footer className="border-t border-base-300 py-8">
      <div className="container mx-auto px-6 text-center text-sm text-base-content/70">
        © {new Date().getFullYear()} Laundry Wash. All rights reserved.
      </div>
    </footer>
  );
}