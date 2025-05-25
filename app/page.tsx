// import Image from "next/image";

import HeroSearch from "./ui/navigation/hero/home-hero";
import Navbar from "./ui/navigation/navbar";

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col">
    <div className="relative">
      {/* Background image that extends below navbar */}
      <div
        className="absolute inset-0 bg-cover bg-center z-10 h-[700px]"
      >
        <div 
          className="absolute inset-24 rounded-md overflow-hidden shadow-2xl"
          style={{
            backgroundImage: "url('/hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-gray-900/50 opacity-100"></div>
        </div>
      </div>

      {/* Navbar with transparent background */}
      <Navbar />

      {/* Hero section positioned over the background */}
      <HeroSearch/>
    </div>

    {/* <main>
      <Checkin />
      <SpecialOffers />
    </main> */}
    
  </div>
  );
}
