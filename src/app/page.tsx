"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Services from "@/components/sections/Services";
import Fleet from "@/components/sections/Fleet";
import TravelTimes from "@/components/sections/TravelTimes";
import Harmony from "@/components/sections/Harmony";
import Booking from "@/components/sections/Booking";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/anim/Preloader";
import SmoothScroll from "@/components/anim/SmoothScroll";
import PageAnimations from "@/components/anim/PageAnimations";
import { SITE } from "@/lib/constants";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  areaServed: [
    "Toulouse",
    "Toulouse-Blagnac",
    "Gare Matabiau",
    "Colomiers",
    "Occitanie",
  ],
  description: SITE.description,
  priceRange: "Sur devis",
};

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <SmoothScroll />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <div className="page-content-wrapper ui-light-background">
        <Navbar />
        <div className="page-content-wrapper__inner js-page-content-wrapper">
          <div className="page-content js-page-content">
            <main id="top" className="page-content__overflow-fix">
              <Hero />
              <Marquee />
              <Booking />
              <Services />
              <Fleet />
              <TravelTimes />
              <Harmony />
              <Footer />
            </main>
          </div>
        </div>
      </div>

      <PageAnimations />
    </>
  );
}
