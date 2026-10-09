import { About } from "@/components/About";
import { Brands } from "@/components/Brands";
import { BrandWall } from "@/components/BrandWall";
import { Dock } from "@/components/Dock";
import { Expertise } from "@/components/Expertise";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HorizontalSite } from "@/components/ui/HorizontalSite";
import { Intro } from "@/components/Intro";
import { Navbar } from "@/components/Navbar";
import { Process } from "@/components/Process";
import { Testimonial } from "@/components/Testimonial";
import { TravellingPortrait } from "@/components/TravellingPortrait";

export default function HomePage() {
  return (
    <>
      <Navbar />
      {/* Desktop: one landscape strip of panels. <main> uses display: contents there so its sections join the strip. */}
      <HorizontalSite
        overlay={
          <>
            <TravellingPortrait />
            <Dock />
          </>
        }
      >
        <main id="main" className="lg:contents">
          <Hero />
          <About />
          <Expertise />
          <Process />
          <Brands />
          <BrandWall />
          <FeaturedWork />
          <Intro />
          <Testimonial />
        </main>
        <Footer />
      </HorizontalSite>
    </>
  );
}
