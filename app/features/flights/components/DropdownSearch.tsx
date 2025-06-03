"use client";

import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { searchAirports, type Airport } from "@/app/features/flights/actions";
import clsx from "clsx";

type DropdownSearchProps = {
  name: string;
  disabled?: boolean;
  error?: boolean;
  clearErrors: () => void;
};

export default function DropdownSearch({
  name,
  disabled,
  error,
  clearErrors,
}: DropdownSearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);
  // Store the selected airport code in a hidden input for form submission
  const [selectedAirportCode, setSelectedAirportCode] = useState<string>("");

  // Initialize input value from URL params
  useEffect(() => {
    const paramValue = searchParams.get(name)?.toString() || "";
    setInputValue(paramValue);
  }, [searchParams, name]);

  const handleSearch = useDebouncedCallback(async (value: string) => {
    setQuery(value);
    setLoading(true);

    try {
      if (value.length >= 2) {
        const results = await searchAirports(value);
        setAirports(results);
      } else {
        setAirports([]);
      }
    } catch (error) {
      console.error("Error fetching airports:", error);
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    handleSearch(value);
    if (error && value.length >= 2) {
      clearErrors();
    }
  };

  const handleSelectAirport = (airport: Airport) => {
    const displayValue = `${airport.city} (${airport.iata_code})`;
    setInputValue(displayValue);
    setSelectedAirportCode(airport.iata_code);
    setAirports([]);

    // Update URL params
    const params = new URLSearchParams(searchParams);
    params.set(name, displayValue);
    // Also store the IATA code in the URL params for form submission
    params.set(`${name}_code`, airport.iata_code);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={disabled ? "" : "City or airport"}
        value={disabled ? "" : inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        disabled={disabled}
        className={clsx(
          `pl-10 w-full p-2 cursor-pointer border border-gray-300 text-gray-500 placeholder:text-gray-400 disabled:bg-gray-200 rounded-md focus:border-cyan-200`,
          error ? "border-red-500" : ""
        )}
      />
      {/* Hidden input to store the airport code for form submission */}
      <input type="hidden" name={`${name}_code`} value={selectedAirportCode} />
      <div
        className={
          airports.length > 0
            ? "block absolute z-10 w-full p-2 bg-white text-gray-800 border-2 border-gray-200 rounded-md shadow-lg"
            : "hidden"
        }
      >
        {loading ? (
          <div className="py-2 text-center text-gray-500">Loading...</div>
        ) : (
          <ul className="flex flex-col gap-2">
            {airports.map((airport) => (
              <li
                key={airport.id}
                className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                onClick={() => handleSelectAirport(airport)}
              >
                <div className="font-medium">
                  {airport.city} ({airport.iata_code})
                </div>
                <div className="text-sm text-gray-500">
                  {airport.name}, {airport.country}
                </div>
              </li>
            ))}
            {airports.length === 0 && query.length >= 2 && (
              <li className="text-gray-500 p-2">No airports found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
