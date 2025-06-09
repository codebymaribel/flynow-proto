import postgres from "postgres";
import {
  airplanes,
  airports,
  flights,
  seat_Reserv,
  bookings,
  users,
} from "../shared/lib/placeholder-data";
import bcryptjs from "bcryptjs";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedUsers() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    id_number VARCHAR(50) NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    miles INTEGER DEFAULT 0
    );`;

  const insertUsers = await Promise.all(
    users.map(
      ({
        id,
        firstName,
        lastName,
        id_number,
        email,
        password,
        created_at,
        active,
        miles,
      }) => {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        return sql`
            INSERT INTO users (id, firstName, lastName, id_number, email, password, created_at, active, miles)
            VALUES (${id}, ${firstName}, ${lastName}, ${id_number}, ${email}, ${hashedPassword}, ${created_at}, ${active}, ${miles})
            ON CONFLICT (id) DO NOTHING;
            `;
      }
    )
  );

  return insertUsers;
}

async function seedAirplanes() {
  await sql`CREATE TABLE IF NOT EXISTS airplanes(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    model VARCHAR(50) NOT NULL,
    capacity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

  const insertAirplanes = await Promise.all(
    airplanes.map(({ id, model, capacity, created_at }) => {
      return sql`
            INSERT INTO airplanes (id, model, capacity, created_at)
            VALUES (${id}, ${model}, ${capacity}, ${created_at})
            ON CONFLICT (id) DO NOTHING;
            `;
    })
  );

  return insertAirplanes;
}

async function seedAirports() {
  await sql`CREATE TABLE IF NOT EXISTS airports(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    iata_code VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL
    );`;

  const insertAirports = await Promise.all(
    airports.map(({ id, name, iata_code, city, country }) => {
      return sql`
            INSERT INTO airports (id, name, iata_code, city, country)
            VALUES (${id}, ${name}, ${iata_code}, ${city}, ${country})
            ON CONFLICT (id) DO NOTHING;
            `;
    })
  );

  return insertAirports;
}

async function seedSeatReserv() {
  await sql`CREATE TABLE IF NOT EXISTS seat_reserv(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    flight_number VARCHAR(50) NOT NULL,
    date TIMESTAMP NOT NULL,
    customer VARCHAR(50) NOT NULL,
    seats VARCHAR(50) NOT NULL
    );`;

  const insertSeatsReserv = await Promise.all(
    seat_Reserv.map(({ id, flight_number, date, customer, seats }) => {
      return sql`
            INSERT INTO seat_reserv (id, flight_number, date, customer, seats)
            VALUES (${id}, ${flight_number}, ${date}, ${customer}, ${seats})
            ON CONFLICT (id) DO NOTHING;
            `;
    })
  );

  return insertSeatsReserv;
}

async function seedFlights() {
  await sql`CREATE TABLE IF NOT EXISTS flights(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    flight_code VARCHAR(10) NOT NULL,
    origin UUID NOT NULL,
    destination UUID NOT NULL,
    airplane UUID NOT NULL,
    date TIMESTAMP NOT NULL
    );`;

  const insertFlights = await Promise.all(
    flights.map(({ id, flight_code, origin, destination, airplane, date }) => {
      return sql`
            INSERT INTO flights (id, flight_code, origin, destination, airplane, date)
            VALUES (${id}, ${flight_code}, ${origin}, ${destination}, ${airplane}, ${date})
            ON CONFLICT (id) DO NOTHING;
            `;
    })
  );

  return insertFlights;
}

async function seedBookings() {
  await sql`CREATE TABLE IF NOT EXISTS bookings(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    flight VARCHAR(50) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    reserved_seats TEXT[] NOT NULL,
    origin VARCHAR(50) NOT NULL,
    destination VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

  const insertBookings = await Promise.all(
    bookings.map(
      ({
        id,
        flight,
        user_id,
        reserved_seats,
        origin,
        destination,
        price,
        created_at,
      }) => {
        return sql`
            INSERT INTO bookings (id, flight, user_id, reserved_seats, origin, destination, price, created_at)
            VALUES (${id}, ${flight}, ${user_id}, ${sql.array(
          reserved_seats
        )}, ${origin}, ${destination}, ${price}, ${created_at})
            ON CONFLICT (id) DO NOTHING;
            `;
      }
    )
  );

  return insertBookings;
}

export async function GET() {
  try {
    await sql.begin(() => [
      seedUsers(),
      seedAirplanes(),
      seedAirports(),
      seedSeatReserv(),
      seedFlights(),
      seedBookings(),
    ]);
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
