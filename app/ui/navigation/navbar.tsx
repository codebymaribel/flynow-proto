"use client"

import { useState } from "react"
import Link from "next/link"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-indigo-600 pb-60 text-white relative z-0 ">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <PaperAirplaneIcon className="h-8 w-8 text-sky-400" />
            <span className="text-2xl font-bold">FlyNow</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium hover:text-sky-300 transition-colors">
              Home
            </Link>
            <Link href="/flights" className="font-medium hover:text-sky-300 transition-colors">
              Flights
            </Link>
            <Link href="/destinations" className="font-medium hover:text-sky-300 transition-colors">
              Destinations
            </Link>
            <Link href="/travel-info" className="font-medium hover:text-sky-300 transition-colors">
              Travel Info
            </Link>
            <Link href="/loyalty" className="font-medium hover:text-sky-300 transition-colors">
              Loyalty Program
            </Link>
          </nav>

          <div className="hidden md:flex space-x-4">
            <Link href="/login" className="px-4 py-2 rounded hover:bg-sky-800 transition-colors">
              Log In
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-sky-500 rounded hover:bg-sky-600 transition-colors">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="font-medium hover:text-sky-300 transition-colors">
                Home
              </Link>
              <Link href="/flights" className="font-medium hover:text-sky-300 transition-colors">
                Flights
              </Link>
              <Link href="/destinations" className="font-medium hover:text-sky-300 transition-colors">
                Destinations
              </Link>
              <Link href="/travel-info" className="font-medium hover:text-sky-300 transition-colors">
                Travel Info
              </Link>
              <Link href="/loyalty" className="font-medium hover:text-sky-300 transition-colors">
                Loyalty Program
              </Link>
              <div className="flex space-x-4 pt-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded border border-white hover:bg-sky-800 transition-colors"
                >
                  Log In
                </Link>
                <Link href="/signup" className="px-4 py-2 bg-sky-500 rounded hover:bg-sky-600 transition-colors">
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
