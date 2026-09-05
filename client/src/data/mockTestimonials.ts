export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Amara Bello",
    role: "Regular Customer",
    quote:
      "Laundry Wash has completely taken laundry off my to-do list. Pickup is always on time and my clothes come back perfectly clean.",
    rating: 5,
  },
  {
    id: "t2",
    name: "David Okafor",
    role: "Busy Professional",
    quote:
      "Between work and family, I never had time for laundry. Booking a pickup takes two minutes and I get everything back fresh and folded.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Chiamaka Nwosu",
    role: "Verified Customer",
    quote:
      "The dry cleaning service is excellent, and their team is always careful with delicate fabrics. Highly recommend Laundry Wash.",
    rating: 4,
  },
];
