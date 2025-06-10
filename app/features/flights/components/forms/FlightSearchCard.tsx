import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpDown, Coffee, Luggage, Plane, Star, Wifi } from "lucide-react";
import { current_search, flight_search_result } from "../../lib/types";
// import { Flight } from "@/app/features/flights/types";

// Utility function to format date in US format with time
const formatFlightDate = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export default function FlightSearchCard({
  flight,
  currentSearch,
}: {
  flight: flight_search_result;
  currentSearch: current_search | object;
}) {
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
      className="bg-white/95 backdrop-blur-sm border-white/20 "
    >
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Flight Details */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">09:00h</div>
                <div className="text-sm text-gray-600">
                  {currentSearch.origin_code}
                </div>
                <div className="text-xs text-gray-500">
                  {formatFlightDate(currentSearch.origin_date)}
                </div>
                {/* Amenities */}
                <div className="flex items-center space-x-3 mt-4">
                  {["wifi", "meals", "entertainment"].map((amenity, index) => (
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

              <div className="flex-1 mx-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-px bg-gray-300 flex-1"></div>
                  <div className="flex flex-col items-center">
                    <Plane className="h-4 w-4 text-gray-400 rotate-90" />
                    <div className="text-xs text-gray-500 mt-1">1h 30m</div>
                    <div className="text-xs text-gray-500">1</div>
                  </div>
                  <div className="h-px bg-gray-300 flex-1"></div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10:00h</div>
                <div className="text-sm text-gray-600">
                  {currentSearch.destination_code}
                </div>
                <div className="text-xs text-gray-500">
                  {formatFlightDate(currentSearch.destination_date)}
                </div>
                {/* Amenities */}
                <div className="flex items-center space-x-3 mt-4">
                  {["wifi", "meals", "entertainment"].map((amenity, index) => (
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
            </div>
          </div>

          {/* Price and Book */}
          <div className="flex flex-row items-center gap-10 ">
            <div className="flex flex-row  items-center border-2 border-gray-200 rounded-lg p-2 hover:bg-white transition-colors cursor-pointer">
              <div className="h-34 w-2 bg-blue-400 rounded-full"></div>
              <div className="flex flex-col mx-4">
                <div className="text-sm text-gray-600">From</div>
                <div className="text-2xl font-bold text-gray-900">$1,200</div>
                <div className="text-sm text-gray-600">per person</div>
              </div>
            </div>
            <div className="flex flex-row  items-center border-2 border-gray-200 rounded-lg p-2 hover:bg-white transition-colors cursor-pointer">
              <div className="h-34 w-2 bg-cyan-400 rounded-full"></div>
              <div className="flex flex-col mx-4">
                <div className="text-sm text-gray-600">From</div>
                <div className="text-2xl font-bold text-gray-900">$1,200</div>
                <div className="text-sm text-gray-600">per person</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
