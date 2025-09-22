import React from "react";
import HeroSection from "../../components/Home/HeroSection";
import Features from "../../components/Home/Features";
import Stats from "../../components/Home/Stats";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <HeroSection />
      <Features />
      <Stats />
    </div>
  );
}
