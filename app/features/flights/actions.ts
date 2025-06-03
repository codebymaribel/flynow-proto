"use server";

import { getDb } from "../../shared/lib/db";
import { search_flight_schema } from "./lib/query_schemas";
import {
  Airport,
  flight_search_result,
  flights_search_result,
  search_flight,
} from "./lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function searchAirports(query: string): Promise<Airport[]> {
  const db = getDb();

  if (!query || query.length < 2) {
    return [];
  }

  try {
    // Search for airports where the name, city, or IATA code matches the query
    const airports = await db`
      SELECT id, name, city, country, iata_code
      FROM airports
      WHERE 
        LOWER(name) LIKE LOWER(${"%" + query + "%"})
        OR LOWER(city) LIKE LOWER(${"%" + query + "%"})
        OR LOWER(iata_code) LIKE LOWER(${"%" + query + "%"})
      ORDER BY 
        CASE 
          WHEN LOWER(iata_code) = LOWER(${query}) THEN 1
          WHEN LOWER(iata_code) LIKE LOWER(${query + "%"}) THEN 2
          WHEN LOWER(city) LIKE LOWER(${query + "%"}) THEN 3
          ELSE 4
        END
      LIMIT 10
    `;

    // Explicitly cast the database result to the Airport type
    return airports as unknown as Airport[];
  } catch (error) {
    console.error("Error searching airports:", error);
    return [];
  }
}

export async function submitSearch(formData: FormData) {
  const searchParams = new URLSearchParams();

  const validatedFields = search_flight_schema.safeParse({
    from_code: formData.get("from_code"),
    to_code: formData.get("to_code"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    adultsCount: Number(formData.get("adultsCount")),
    childrenCount: Number(formData.get("childrenCount")),
    eldersCount: Number(formData.get("eldersCount")),
    tripType: formData.get("tripType") as "round" | "one-way",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    from_code,
    to_code,
    startDate,
    endDate,
    adultsCount,
    childrenCount,
    eldersCount,
    tripType,
  } = validatedFields.data;

  searchParams.set("from", from_code);
  searchParams.set("to", to_code);
  searchParams.set("origin_date", startDate);

  if (endDate) {
    searchParams.set("destination_date", endDate);
  }

  searchParams.set("adultsCount", adultsCount.toString());
  searchParams.set("childrenCount", childrenCount.toString());
  searchParams.set("eldersCount", eldersCount.toString());
  searchParams.set("tripType", tripType);

  revalidatePath("search");
  redirect("/search?" + searchParams.toString());
}
export async function searchAvailableFlights(
  searchParams: search_flight
): Promise<flights_search_result> {
  try {
    const {
      origin_code,
      destination_code,
      origin_date,
      destination_date,
      passengers,
      tripType,
    }: search_flight = searchParams;

    const sql = getDb();
    console.log(passengers);
    const origin_results = await sql<flight_search_result[]>`
    SELECT
     f.id,
     f.flight_code,
     f.date,
     a.model as airplane_model
     FROM flights f
     JOIN airplanes a ON f.assigned_airplane = a.id
     JOIN airports origin ON f.origin = origin.id
     JOIN airports destination ON f.destination = destination.id
     WHERE origin.iata_code = ${origin_code}
     AND f.date::date = ${origin_date}
     ORDER BY f.date ASC
        `;

    if (tripType === "round") {
      const destination_results = await sql<flight_search_result[]>`
      SELECT
      f.id,
      f.flight_code,
      f.date,
      a.model as airplane_model
      FROM flights f
      JOIN airplanes a ON f.assigned_airplane = a.id
      JOIN airports origin ON f.origin = origin.id
      JOIN airports destination ON f.destination = destination.id
      WHERE origin.iata_code = ${destination_code}
      AND f.date::date = ${destination_date}
      ORDER BY f.date ASC
          `;

      return {
        success: true,
        origin_flights: origin_results,
        destination_flights: destination_results,
      };
    }
    return {
      success: true,
      origin_flights: origin_results,
      destination_flights: [],
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      origin_flights: [],
      destination_flights: [],
    };
  }
}
