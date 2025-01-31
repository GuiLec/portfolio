import { Result } from "@/modules/result/result.type";
import { sql } from "@vercel/postgres";

export const addResult = async ({
  id,
  fullName,
  distance,
  eventDate,
  eventLocation,
}: Result) => {
  return await sql`
        INSERT INTO AthleResults 
        (id, fullName, distance, eventDate, eventLocation) 
        VALUES 
        (${id}, ${fullName}, ${distance}, ${eventDate}, ${eventLocation})
        ON CONFLICT (id) DO UPDATE SET
        distance = EXCLUDED.distance,
        eventDate = EXCLUDED.eventDate,
        eventLocation = EXCLUDED.eventLocation;
    `;
};
