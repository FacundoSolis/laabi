import type { Metadata } from "next";
import { Amenities } from "@/components/Amenities";
import { Booking } from "@/components/Booking";
import { Cursor } from "@/components/Cursor";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Location } from "@/components/Location";
import { Marquee } from "@/components/Marquee";
import { MotionProvider } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { OtherApartment } from "@/components/OtherApartment";
import { Story } from "@/components/Story";
import { laAbi } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: laAbi.seo.title },
  description: laAbi.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: laAbi.seo.title,
    description: laAbi.seo.description,
    url: "/",
  },
};

export default function Home() {
  const apt = laAbi;

  return (
    <MotionProvider variant="slat">
      <Cursor />
      <Nav apt={apt} />
      <main>
        <Hero apt={apt} />
        <Story apt={apt} />
        <Marquee apt={apt} />
        <Gallery apt={apt} />
        <Amenities apt={apt} />
        <OtherApartment apt={apt} />
        <Location apt={apt} />
        <Booking apt={apt} />
        <Faq apt={apt} />
      </main>
      <Footer apt={apt} />
      <WhatsAppFab apt={apt} />
      <JsonLd apt={apt} />
    </MotionProvider>
  );
}
