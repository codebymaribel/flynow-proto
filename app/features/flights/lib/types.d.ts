type passengerCount = {
  adults: number;
  children: number;
  elders: number;
};

export type search_flight = {
  origin_code: string;
  destination_code: string;
  origin_date: string;
  destination_date: string;
  passengers: passengerCount;
  tripType: "round" | "one-way";
};

export type Airport = {
  id: string;
  name: string;
  city: string;
  country: string;
  iata_code: string;
};

export type flight_search_result = {
  id: string;
  airplane_model: string;
  date: string;
  flight_code: string;
};

export type flights_search_result = {
  success: boolean;
  origin_flights: flight_search_result[];
  destination_flights: flight_search_result[];
};
