import { PageHero } from "@/components";
import homeImgHero from "@/assets/images/home-img-hero.png";

export default function HomePage() {
  return (
    <main>
      <PageHero
        variant="home"
        title="Quick. Clean. Delivered."
        description="Laundry Wash helps you save time with fast, reliable pickup and delivery service. Because you deserve clean clothes without the wait."
        image={homeImgHero}
        imageAlt="Laundry Wash pickup and delivery service"
        primaryAction={{
          label: "Book Laundry",
          href: "/book",
        }}
        secondaryAction={{
          label: "Log In",
          href: "/login",
        }}
      />
    </main>
  );
}
