"use client";

import { useEffect, useState } from "react";
import { GlobeAmericasIcon } from "@heroicons/react/24/outline";
import DateRangePicker from "./datepickers";
import PassengersAmount from "./passengers-amount";
import useCount from "@/app/hooks/useCount";

const HomeSearch = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const [from, setFrom] = useState("CCS");
  const [to, setTo] = useState("MIA");

  const adultsCounter = useCount(1);
  const childrenCounter = useCount(0);
  const eldersCounter = useCount(0);

  const [passengers, setPassengers] = useState({
    adults: adultsCounter.count,
    children: childrenCounter.count,
    elders: eldersCounter.count,
  });

  useEffect(() => {
    setPassengers({
      adults: adultsCounter.count,
      children: childrenCounter.count,
      elders: eldersCounter.count,
    });
  }, [adultsCounter.count, childrenCounter.count, eldersCounter.count]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <form>
        <input type="hidden" name="adultsCount" value={passengers.adults} />
        <input type="hidden" name="childrenCount" value={passengers.children} />
        <input type="hidden" name="eldersCount" value={passengers.elders} />
        <input
          type="hidden"
          name="startDate"
          value={startDate?.toISOString() || ""}
        />
        <input
          type="hidden"
          name="endDate"
          value={endDate?.toISOString() || ""}
        />
        <div className="gris grid-cols-2 gap-4 flex flex-row items-center">
          <PassengersAmount
            adultsCounter={adultsCounter}
            childrenCounter={childrenCounter}
            eldersCounter={eldersCounter}
          />
        </div>
        <hr className="my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <div className="relative">
              <GlobeAmericasIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="City or airport"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="pl-10 w-full p-2 border border-gray-300  text-gray-800 placeholder:text-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="City or airport"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="pl-10 w-full p-2 border border-gray-300 text-gray-800 placeholder:text-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dates
            </label>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors col-span-full md:col-span-1"
          >
            Search Flights
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomeSearch;
