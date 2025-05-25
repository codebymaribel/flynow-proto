"use client"

import HomeSearch from "../forms/home-search"

export default function HeroSearch( ) {

  return (
    <section className="relative flex items-center justify-center z-10">
      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Discover the World with FlyNow</h1>
            <p className="text-xl text-white/90">Find the best deals on flights to your dream destinations</p>
          </div>
          <HomeSearch/>
        </div>
      </div>
    </section>
  )
}
