import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FlightCardSkeleton() {
  return (
    <Card className="bg-white/95 backdrop-blur-sm border-white/20">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          {/* Airline Info Skeleton */}
          <div className="flex items-center space-x-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-gray-200" />
              <Skeleton className="h-3 w-16 bg-gray-200" />
              <Skeleton className="h-3 w-12 bg-gray-200" />
            </div>
          </div>

          {/* Flight Details Skeleton */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <Skeleton className="h-8 w-16 mx-auto mb-2 bg-gray-200" />
                <Skeleton className="h-4 w-10 mx-auto mb-1 bg-gray-200" />
                <Skeleton className="h-3 w-14 mx-auto bg-gray-200" />
              </div>

              <div className="flex-1 mx-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  <div className="flex flex-col items-center">
                    <Skeleton className="h-4 w-4 rounded-full bg-gray-200" />
                    <Skeleton className="h-3 w-16 mt-1 bg-gray-200" />
                    <Skeleton className="h-3 w-12 bg-gray-200" />
                  </div>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>
              </div>

              <div className="text-center">
                <Skeleton className="h-8 w-16 mx-auto mb-2 bg-gray-200" />
                <Skeleton className="h-4 w-10 mx-auto mb-1 bg-gray-200" />
                <Skeleton className="h-3 w-14 mx-auto bg-gray-200" />
              </div>
            </div>

            {/* Amenities Skeleton */}
            <div className="flex items-center space-x-3 mt-4">
              <Skeleton className="h-4 w-16 bg-gray-200" />
              <Skeleton className="h-4 w-16 bg-gray-200" />
              <Skeleton className="h-4 w-16 bg-gray-200" />
            </div>
          </div>

          {/* Price and Book Skeleton */}
          <div className="text-right">
            <div className="mb-2">
              <Skeleton className="h-3 w-16 ml-auto mb-1 bg-gray-200" />
              <Skeleton className="h-8 w-24 ml-auto mb-1 bg-gray-200" />
              <Skeleton className="h-3 w-20 ml-auto bg-gray-200" />
            </div>
            <Skeleton className="h-10 w-full rounded-md bg-gray-200" />
            <Skeleton className="h-4 w-24 ml-auto mt-2 bg-gray-200" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
