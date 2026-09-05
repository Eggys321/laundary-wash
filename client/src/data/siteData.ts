import {
    Clock3,
    HeartHandshake,
    ShieldCheck,
    Sparkles,
    CheckCircle2,
    Shirt,
    Truck,
    Mail,
    MapPin,
    Phone,
    CalendarCheck,
    Leaf,
} from "lucide-react";

import washFoldImg from "@/assets/images/services-img.jpg";
import dryCleaningImg from "@/assets/images/about-img.jpg";
import pickupDeliveryImg from "@/assets/images/contact-img.jpg";

export const ABOUT_VALUES = [
  {
    icon: Clock3,
    title: "Convenience",
    description:
      "Your time matters. Our service is designed to fit into your schedule and make laundry less of a chore.",
  },
  {
    icon: HeartHandshake,
    title: "Quality Care",
    description:
      "We treat your clothes with care and give different fabrics and garments the attention they deserve.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description:
      "From pickup to delivery, we aim to provide a dependable experience you can trust.",
  },
  {
    icon: Sparkles,
    title: "Simplicity",
    description:
      "No complicated process. Book your service, let us handle the laundry, and enjoy your freshly cleaned clothes.",
  },
];



export const SERVICES_VALUES = [
  {
    icon: Shirt,
    title: "Wash & Fold",
    description:
      "Our everyday laundry service takes care of washing, drying, and neatly folding your clothes so they're ready to wear.",
    idealFor:
      "Everyday clothes, towels, bedsheets, and household laundry.",
  },
  {
    icon: Sparkles,
    title: "Wash & Iron",
    description:
      "Get your clothes professionally washed and neatly ironed, ready for your wardrobe.",
    idealFor:
      "Workwear, shirts, dresses, trousers, and everyday outfits.",
  },
  {
    icon: CheckCircle2,
    title: "Dry Cleaning",
    description:
      "Give your delicate and special garments the professional care and attention they deserve.",
    idealFor:
      "Suits, dresses, formal wear, and delicate fabrics.",
  },
  {
    icon: Clock3,
    title: "Ironing Service",
    description:
      "Already have clean clothes but don't have the time to iron them? We'll take care of the finishing touches.",
    idealFor:
      "Shirts, trousers, dresses, uniforms, and workwear.",
  },
  {
    icon: Truck,
    title: "Pickup & Delivery",
    description:
      "Enjoy a completely hassle-free laundry experience. Schedule a pickup and have your freshly cleaned clothes delivered back to you.",
    idealFor:
      "Busy professionals, families, students, and anyone looking to save time.",
  },
];

export const SERVICES_STEPS = [
  {
    number: "01",
    title: "Book Your Service",
    description:
      "Choose the laundry service you need and schedule a convenient pickup.",
  },
  {
    number: "02",
    title: "We Pick Up",
    description:
      "We'll collect your clothes at the scheduled time and get them ready for cleaning.",
  },
  {
    number: "03",
    title: "We Clean & Care",
    description:
      "Your clothes are professionally cleaned and handled with the care they deserve.",
  },
  {
    number: "04",
    title: "We Deliver",
    description:
      "Your fresh, clean laundry is returned to you, ready to wear and enjoy.",
  },
];

export const CONTACT_VALUES  = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+234 XXX XXX XXXX",
    description: "We're available to help with your questions.",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "hello@laundrywash.com",
    description: "Send us a message and we'll get back to you.",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Lagos, Nigeria",
    description: "Our team is ready to assist you.",
  },
];

export const HOME_SERVICE_HIGHLIGHTS = [
  {
    title: "Wash & Fold",
    description:
      "Everyday laundry washed, dried, and neatly folded so it's ready to wear.",
    image: washFoldImg,
  },
  {
    title: "Dry Cleaning",
    description:
      "Professional care for delicate and special garments that need extra attention.",
    image: dryCleaningImg,
  },
  {
    title: "Pickup & Delivery",
    description:
      "Schedule a pickup and have your fresh laundry delivered back to your door.",
    image: pickupDeliveryImg,
  },
];

export const HOME_HOW_IT_WORKS = [
  {
    icon: CalendarCheck,
    title: "Schedule Your Service",
    description:
      "Pick a service and a convenient pickup time in just a few taps.",
    tone: "bg-sky-500/15 text-sky-500",
  },
  {
    icon: Leaf,
    title: "We Clean & Care",
    description:
      "Your clothes are professionally cleaned and handled with care.",
    tone: "bg-emerald-500/15 text-emerald-500",
  },
  {
    icon: Truck,
    title: "We Deliver",
    description:
      "Freshly cleaned laundry delivered back to your doorstep, on time.",
    tone: "bg-amber-500/15 text-amber-500",
  },
];
