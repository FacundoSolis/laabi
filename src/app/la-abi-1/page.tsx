import type { Metadata } from "next";
import { Amenities } from "@/components/Amenities";
import { Booking } from "@/components/Booking";
import { Cursor } from "@/components/Cursor";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Location } from "@/components/Location";
import { Marquee } from "@/components/Marquee";
import { MotionProvider } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { Gallery1 } from "@/components/abi1/Gallery1";
import { Hero1 } from "@/components/abi1/Hero1";
import { Story1 } from "@/components/abi1/Story1";
import { laAbi1 } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: laAbi1.seo.title },
  description: laAbi1.seo.description,
  alternates: { canonical: "/la-abi-1" },
  openGraph: {
    title: laAbi1.seo.title,
    description: laAbi1.seo.description,
    url: "/la-abi-1",
  },
};

export default function LaAbi1() {
  const apt = laAbi1;

  return (
    <MotionProvider variant="veil">
      <Cursor />
      <Nav apt={apt} />
      <main>
        <Hero1 apt={apt} />
        <Story1 apt={apt} />
        <Marquee apt={apt} reverse />
        <Gallery1 apt={apt} />
        <Amenities apt={apt} />
        <Location apt={apt} />
        <Booking apt={apt} />
        <Faq apt={apt} />
      </main>
      <Footer apt={apt} />
      <JsonLd apt={apt} />
    </MotionProvider>
  );
}
