const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    firstName: "Pepe",
    lastName: "Garcia",
    id_number: "V21391823",
    email: "pepe@nextmail.com",
    password: "123456",
    created_at: new Date(),
    active: true,
    miles: 0,
  },
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442b",
    firstName: "Marlene",
    lastName: "Greg",
    id_number: "E21391823",
    email: "marlene@nextmail.com",
    password: "123456",
    created_at: new Date(),
    active: true,
    miles: 0,
  },
];

const airplanes = [
  {
    id: "4033a0a2-40e6-4be4-8571-5b4718aad6cc",
    model: "Airbus A320",
    capacity: 150,
    created_at: new Date(),
  },
  {
    id: "20d78dcc-3a23-48dc-bd4e-de375e86d9df",
    model: "Boeing 747",
    capacity: 250,
    created_at: new Date(),
  },
];

const airports = [
  {
    id: "d6e15727-9fe1-2961-8D5b-ea44a9b231aC",
    name: "Aeropuerto Internacional Simon Bolivar",
    iata_code: "CCS",
    city: "La Guaira",
    country: "Venezuela",
  },
  {
    id: "4fc365c9-8225-4e57-aa6a-ec8a219adfe7",
    name: "Miami International Airport",
    iata_code: "MIA",
    city: "Miami",
    country: "USA",
  },
  {
    id: "d6e15127-9fe1-2961-8D5b-ea44a9b231aC",
    name: "John F. Kennedy International Airport",
    iata_code: "JFK",
    city: "New York",
    country: "USA",
  },
  {
    id: "4fc365c9-8225-4e57-aa6a-ec8a219adfe7",
    name: "Panama International Airport",
    iata_code: "PTY",
    city: "Panama City",
    country: "Panama",
  },
];

const seat_Reserv = [
  {
    id: "989e57f9-eff4-4513-8b8b-fe3a650ae6fa",
    flight_number: "d6e15727-9fe1-4961-8c5b-ea44a9b231aa",
    date: "2025-05-30T17:30:00",
    customer: "410544b2-4001-4271-9855-fec4b6a6442a",
    seats: ["F2"],
  },
];

const flights = [
  {
    id: "b8f59f3e-c586-457f-9824-909c8e79aa55",
    flight_code: "ACG348",
    origin: airports[0].id,
    destination: airports[1].id,
    airplane: airplanes[0].id,
    date: "2025-06-01T17:30:00",
  },
  {
    id: "3fad419c-9a08-4fd3-951d-61b29273da03",
    flight_code: "ACG332",
    origin: airports[0].id,
    destination: airports[1].id,
    airplane: airplanes[0].id,
    date: "2025-06-01T12:30:00",
  },
  {
    id: "c6716a23-7c1a-40d8-9454-a03737d6cb96",
    flight_code: "ACG324",
    origin: airports[0].id,
    destination: airports[1].id,
    airplane: airplanes[0].id,
    date: "2025-06-01T10:30:00",
  },
  {
    id: "3d510839-b90f-432f-ad1a-b36dbdc3cde0",
    flight_code: "ACG349",
    origin: airports[3].id,
    destination: airports[2].id,
    airplane: airplanes[1].id,
    date: "2025-06-02T17:30:00",
  },
  {
    id: "5c3bd991-b2f5-4aba-8a20-5fb636a8934b",
    flight_code: "ACG350",
    origin: airports[2].id,
    destination: airports[1].id,
    airplane: airplanes[1].id,
    date: "2025-06-02T17:30:00",
  },
  {
    id: "8fdd5c5b-bd93-45b8-a9b6-55d61c134d4b",
    flight_code: "ACG351",
    origin: airports[1].id,
    destination: airports[0].id,
    airplane: airplanes[0].id,
    date: "2025-06-02T17:30:00",
  },
];

const bookings = [
  {
    id: "0399a5f3-0a73-4fa3-9727-a93f6d1c0a5b",
    flight: flights[0].id,
    user_id: users[0].id,
    reserved_seats: [seat_Reserv[0].id],
    origin: airports[0].id,
    destination: airports[1].id,
    price: 1200,
    created_at: new Date(),
  },
];

export { users, bookings, flights, seat_Reserv, airplanes, airports };
