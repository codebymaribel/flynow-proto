"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import { Calendar, Filter, MapPin, Plane } from "lucide-react";
import { searchAvailableFlights } from "@/app/features/flights/actions";
import Sorting from "@/app/shared/components/forms/Sorting";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  current_search,
  flights_search_result,
} from "@/app/features/flights/lib/types";
import FlightCardSkeleton from "@/app/features/flights/components/skeletons/FlightCardSkeleton";
import FlightSearchCard from "@/app/features/flights/components/forms/FlightSearchCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchPage() {
  const searchParams = useSearchParams();
  // const [sortBy, setSortBy] = useState("price");
  const [loading, setLoading] = useState(true);
  const [currentSearch, setCurrentSearch] = useState<current_search | object>(
    {}
  );
  const [availableFights, setAvailableFights] = useState<flights_search_result>(
    {
      success: false,
      departure_flights: [],
      destination_flights: [],
    }
  );

  async function fetchData() {
    setLoading(true);
    const query = {
      origin_code: searchParams.get("from"),
      destination_code: searchParams.get("to"),
      origin_date: searchParams.get("origin_date"),
      destination_date: searchParams.get("destination_date"),
      passengers: {
        adults: Number(searchParams.get("adultsCount")),
        children: Number(searchParams.get("childrenCount")),
        elders: Number(searchParams.get("eldersCount")),
      },
      tripType: searchParams.get("tripType") as "round" | "one-way",
    };
    const data = await searchAvailableFlights(query);
    setCurrentSearch(query);
    setAvailableFights(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    console.log(availableFights);
  }, [availableFights]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Plane className="h-8 w-8 text-cyan-400" />
                <span className="text-2xl font-bold text-white">FlyNow</span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Home
                </a>
                <a href="#" className="text-white font-medium">
                  Flights
                </a>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Destinations
                </a>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Travel Info
                </a>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Loyalty Program
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Log In
              </Button>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-cyan-400" />
                <span className="font-medium">New York (JFK)</span>
                <span>→</span>
                <span className="font-medium">Los Angeles (LAX)</span>
              </div>
              <Separator orientation="vertical" className="h-6 bg-white/30" />
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-cyan-400" />
                <span>Dec 15, 2024</span>
              </div>
              <Separator orientation="vertical" className="h-6 bg-white/30" />
              <span>1 Adult, Economy</span>
            </div>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Modify Search
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Filters and Sort Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              {loading ? (
                <>
                  {" "}
                  <Skeleton className="h-6 w-4 bg-gray-200" />{" "}
                  <p className="text-2xl font-bold text-white">flights found</p>
                </>
              ) : (
                <h2 className="text-2xl font-bold text-white">
                  {availableFights.departure_flights.length || ""} flights found
                </h2>
              )}
              {/* Filters Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 bg-white/95 backdrop-blur-sm border-white/20 p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-gray-900 font-medium mb-3">
                        Price Range
                      </h4>
                      <div className="space-y-2 text-gray-700 text-sm">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span>Under $300</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span>$300 - $400</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span>Over $400</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-gray-900 font-medium mb-3">
                        Airlines
                      </h4>
                      <div className="space-y-2 text-gray-700 text-sm">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span>SkyWings</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span>AeroConnect</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span>CloudJet</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-gray-900 font-medium mb-3">
                        Departure Time
                      </h4>
                      <div className="space-y-2 text-gray-700 text-sm">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span>Morning (6AM - 12PM)</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span>Afternoon (12PM - 6PM)</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span>Evening (6PM - 12AM)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Sorting />

            {/* Load More */}
            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Load More Flights
              </Button>
            </div>
          </div>
        </div>
        {/* Flight Results */}

        <div
          className="space-y-4"
          style={{ minHeight: loading ? "1200px" : "auto" }}
        >
          {loading
            ? // Skeleton loading state
              Array(4)
                .fill(0)
                .map((_, index) => <FlightCardSkeleton key={index} />)
            : // Actual flight data
              availableFights.departure_flights.map((flight) => (
                <FlightSearchCard
                  currentSearch={currentSearch}
                  flight={flight}
                  key={flight.id}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
