"use client";

import Navbar from "./shared/components/navbar";
import { useState } from "react";
import { useCount } from "@/app/features/flights/hooks/useCount";
import { useEffect } from "react";
import DateRangePicker from "@/app/shared/components/forms/DateRangePicker";
import PassengersAmount from "@/app/features/flights/components/passengers-amount";
import DropdownSearch from "@/app/features/flights/components/DropdownSearch";
import {
  GlobeAmericasIcon,
  GlobeAsiaAustraliaIcon,
} from "@heroicons/react/24/outline";
import { submitSearch } from "./features/flights/actions";
// We don't need useFormState for this implementation

export default function Landing() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const [oneWay, setOneWay] = useState(false);
  const [formErrors, setFormErrors] = useState({
    from: false,
    to: false,
    startDate: false,
    endDate: false,
  });

  const adultsCounter = useCount(1);
  const childrenCounter = useCount(0);
  const eldersCounter = useCount(0);

  const incrementChildrenWithLimit = () => {
    const maxChildren = adultsCounter.count * 2;
    if (childrenCounter.count < maxChildren) {
      setPassengers((prev) => ({
        ...prev,
        children: childrenCounter.count + 1,
      }));
      childrenCounter.increment();
    }
  };

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

  useEffect(() => {
    setDateRange([null, null]);
  }, [oneWay]);

  // Function to validate form before submission
  const validateForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get form values
    const formData = new FormData(e.currentTarget);
    const from = formData.get("from_code") as string;
    const to = formData.get("to_code") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = oneWay ? null : (formData.get("endDate") as string);

    // Check for empty fields
    const errors = {
      from: !from,
      to: !to && !oneWay,
      startDate: !startDate,
      endDate: !endDate && !oneWay,
    };

    setFormErrors(errors);

    // If no errors, submit the form
    if (!errors.from && !errors.to && !errors.startDate && !errors.endDate) {
      submitSearch(formData);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative">
        {/* Background image that extends below navbar */}
        <div className="absolute inset-0 bg-cover bg-center z-10 h-[700px]">
          <div
            className="absolute inset-24 rounded-md overflow-hidden shadow-2xl"
            style={{
              backgroundImage: "url('/hero.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-gray-900/50 opacity-100"></div>
          </div>
        </div>

        {/* Navbar with transparent background */}
        <Navbar />

        {/* Hero section positioned over the background */}
        <section className="relative flex items-center justify-center z-10">
          {/* Content */}
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Discover the World with FlyNow
                </h1>
                <p className="text-xl text-white/90">
                  Find the best deals on flights to your dream destinations
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
                <form onSubmit={validateForm}>
                  <input
                    type="hidden"
                    name="adultsCount"
                    value={passengers.adults}
                  />
                  <input
                    type="hidden"
                    name="childrenCount"
                    value={passengers.children}
                  />
                  <input
                    type="hidden"
                    name="eldersCount"
                    value={passengers.elders}
                  />
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
                      childrenCounter={{
                        ...childrenCounter,
                        increment: incrementChildrenWithLimit,
                      }}
                      eldersCounter={eldersCounter}
                    />
                    <div className="flex flex-row items-center gap-2">
                      <input
                        type="radio"
                        defaultChecked
                        name="tripType"
                        value="round"
                        onChange={() => setOneWay(false)}
                      />
                      <label className="font-medium text-gray-600">
                        Round trip
                      </label>
                      <input
                        type="radio"
                        name="tripType"
                        value="one-way"
                        onChange={() => setOneWay(true)}
                      />
                      <label className="font-medium text-gray-600">
                        One way
                      </label>
                    </div>
                  </div>
                  <hr className="my-4 h-0.5 bg-gray-200 dark:bg-white/10" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-4">
                    <div className={`border border-b-2 border-transparent`}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        From
                      </label>
                      <div className="relative">
                        <GlobeAmericasIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <DropdownSearch
                          name="from"
                          error={formErrors.from}
                          clearErrors={() =>
                            setFormErrors({ ...formErrors, from: false })
                          }
                        />
                      </div>
                    </div>

                    <div className={`border border-b-2 border-transparent`}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        To
                      </label>
                      <div className="relative">
                        <GlobeAsiaAustraliaIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <DropdownSearch
                          name="to"
                          disabled={oneWay}
                          error={formErrors.to}
                          clearErrors={() =>
                            setFormErrors({ ...formErrors, to: false })
                          }
                        />
                      </div>
                    </div>

                    <div className={`border border-b-2 border-transparent`}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dates
                      </label>
                      <DateRangePicker
                        oneWay={oneWay}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => setDateRange(update)}
                      />
                    </div>

                    <div className="flex justify-center md:justify-end mt-4 md:col-start-3 md:self-center col-span-full">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md w-full md:w-40 h-10 transition-colors cursor-pointer"
                      >
                        Search Flights
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* <main>
      <Checkin />
      <SpecialOffers />
    </main> */}
    </div>
  );
}
