import { z } from "zod";

export const search_flight_schema = z.object({
  from_code: z.string(),
  to_code: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  adultsCount: z.number(),
  childrenCount: z.number(),
  eldersCount: z.number(),
  tripType: z.enum(["round", "one-way"]),
});