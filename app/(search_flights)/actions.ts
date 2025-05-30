"use server";

import { getDb } from "../lib/db";
import { search_flight } from "../lib/types";

export async function searchAvailableFlights(formData: search_flight) {
  try {
    const sql = getDb();

    const result = await sql`
        SELECT * FROM flights
        WHERE from = ${formData.from}
        AND to = ${formData.to}
        AND date::date = ${formData.start_date}::date
        `;

    console.log(result);
    // Return the results`
    return {
      success: true,
      flights: result,
      count: result.length,
    };
  } catch (error) {
    console.log(error);
  }
}
