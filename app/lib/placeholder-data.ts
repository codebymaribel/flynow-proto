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
    airport_code: "CCS",
    city: "La Guaira",
    country: "Venezuela",
  },
  {
    id: "4fc365c9-8225-4e57-aa6a-ec8a219adfe7",
    name: "Miami International Airport",
    airport_code: "MIA",
    city: "Miami",
    country: "USA",
  },
  {
    id: "d6e15127-9fe1-2961-8D5b-ea44a9b231aC",
    name: "John F. Kennedy International Airport",
    airport_code: "JFK",
    city: "New York",
    country: "USA",
  },
  {
    id: "4fc365c9-8225-4e57-aa6a-ec8a219adfe7",
    name: "Panama International Airport",
    airport_code: "PTY",
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
    id: "d6e15727-9fe1-4961-8c5b-ea44a9b231aa",
    flight_code: "ACG348",
    from: airports[0].id,
    to: airports[1].id,
    airplane: airplanes[0].id,
    date: "2025-05-30T17:30:00",
  },
  {
    id: "d6e15s27-9fe1-4961-8c5b-ea44a9b231aa",
    flight_code: "ACG348",
    from: airports[3].id,
    to: airports[2].id,
    airplane: airplanes[1].id,
    date: "2025-05-30T17:30:00",
  },
  {
    id: "w6e15727-9fe1-4961-8c5b-ea44a9b231aa",
    flight_code: "ACG348",
    from: airports[2].id,
    to: airports[1].id,
    airplane: airplanes[1].id,
    date: "2025-05-30T17:30:00",
  },
  {
    id: "t6e15727-9fe1-4961-8c5b-ea44a9b231aa",
    flight_code: "ACG348",
    from: airports[1].id,
    to: airports[0].id,
    airplane: airplanes[0].id,
    date: "2025-05-30T17:30:00",
  },
];

const tickets = [
  {
    id: "0399a5f3-0a73-4fa3-9727-a93f6d1c0a5b",
    flight: flights[0].id,
    user_id: users[0].id,
    reserved_seats: [seat_Reserv[0].id],
    airport_from: airports[0].id,
    airport_to: airports[1].id,
    price: 1200,
    created_at: new Date(),
  },
];

export { users, tickets, flights, seat_Reserv, airplanes, airports };
