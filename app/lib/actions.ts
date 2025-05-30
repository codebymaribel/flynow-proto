'use server';

import { getDb } from './db';

export type Airport = {
  id: string;
  name: string;
  city: string;
  country: string;
  iata_code: string;
};

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
        LOWER(name) LIKE LOWER(${'%' + query + '%'})
        OR LOWER(city) LIKE LOWER(${'%' + query + '%'})
        OR LOWER(iata_code) LIKE LOWER(${'%' + query + '%'})
      ORDER BY 
        CASE 
          WHEN LOWER(iata_code) = LOWER(${query}) THEN 1
          WHEN LOWER(iata_code) LIKE LOWER(${query + '%'}) THEN 2
          WHEN LOWER(city) LIKE LOWER(${query + '%'}) THEN 3
          ELSE 4
        END
      LIMIT 10
    `;
    
    // Explicitly cast the database result to the Airport type
    return airports as unknown as Airport[];
  } catch (error) {
    console.error('Error searching airports:', error);
    return [];
  }
}
