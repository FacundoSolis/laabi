import { Amenities } from "@/components/Amenities";
import { Booking } from "@/components/Booking";
import { Cursor } from "@/components/Cursor";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Story } from "@/components/Story";

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Story />
        <Marquee />
        <Gallery />
        <Amenities />
        <Location />
        <Booking />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
