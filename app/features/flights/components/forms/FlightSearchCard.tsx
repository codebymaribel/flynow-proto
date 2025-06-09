import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@headlessui/react";
import { ArrowUpDown, Coffee, Luggage, Plane, Star, Wifi } from "lucide-react";
// import { Flight } from "@/app/features/flights/types";

export default function FlightSearchCard({ flight }) {

    const getAmenityIcon = (amenity: string) => {
        switch (amenity) {
          case "wifi":
            return <Wifi className="h-4 w-4" />;
          case "meals":
            return <Coffee className="h-4 w-4" />;
          case "entertainment":
            return <Star className="h-4 w-4" />;
          case "extra-legroom":
            return <ArrowUpDown className="h-4 w-4" />;
          case "priority-boarding":
            return <Luggage className="h-4 w-4" />;
          default:
            return <Star className="h-4 w-4" />;
        }
      };
  return (
    <Card
      key={flight.id}
      className="bg-white/95 backdrop-blur-sm border-white/20 hover:bg-white transition-colors"
    >
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          {/* Airline Info */}
          <div className="flex items-center space-x-3">
            <Plane className="w-8 h-8 rounded-full" />

            <div className="space-y-2">
              {" "}
              {/* Match skeleton structure */}
              <div className="font-semibold text-gray-900">
                {flight.airline}
              </div>
              <div className="text-sm text-gray-600">{flight.class}</div>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600">{flight.rating}</span>
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {flight.departure.time}
                </div>
                <div className="text-sm text-gray-600">
                  {flight.departure.airport}
                </div>
                <div className="text-xs text-gray-500">
                  {flight.departure.city}
                </div>
              </div>

              <div className="flex-1 mx-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-px bg-gray-300 flex-1"></div>
                  <div className="flex flex-col items-center">
                    <Plane className="h-4 w-4 text-gray-400 rotate-90" />
                    <div className="text-xs text-gray-500 mt-1">
                      {flight.duration}
                    </div>
                    <div className="text-xs text-gray-500">{flight.stops}</div>
                  </div>
                  <div className="h-px bg-gray-300 flex-1"></div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {flight.arrival.time}
                </div>
                <div className="text-sm text-gray-600">
                  {flight.arrival.airport}
                </div>
                <div className="text-xs text-gray-500">
                  {flight.arrival.city}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex items-center space-x-3 mt-4">
              {flight.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 text-gray-500"
                >
                  {getAmenityIcon(amenity)}
                  <span className="text-xs capitalize">
                    {amenity.replace("-", " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Price and Book */}
          <div className="text-right">
            <div className="mb-2">
              {flight.originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  ${flight.originalPrice}
                </div>
              )}
              <div className="text-3xl font-bold text-gray-900">
                ${flight.price}
              </div>
              <div className="text-sm text-gray-600">per person</div>
            </div>
            <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
              Select Flight
            </Button>
            <button className="text-sm text-cyan-600 hover:text-cyan-700 mt-2">
              View Details
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
