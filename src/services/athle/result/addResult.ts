import { sql } from "@vercel/postgres";

export const addResult = async ({
  id,
  fullName,
  distance,
  eventDate,
  eventLocation,
}: {
  id: string;
  fullName: string;
  distance: number;
  eventDate: string;
  eventLocation: string;
}) => {
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
