import { Result } from "@/modules/result/result.type";
import { sql } from "@vercel/postgres";

export const addResults = async (results: Result[]) => {
  const values = results.flatMap(
    ({ id, fullName, distance, eventDate, eventLocation }) => [
      id,
      fullName,
      distance,
      eventDate,
      eventLocation,
    ]
  );

  const placeholders = results
    .map(
      (_, index) =>
        `($${index * 5 + 1}, $${index * 5 + 2}, $${index * 5 + 3}, $${
          index * 5 + 4
        }, $${index * 5 + 5})`
    )
    .join(", ");

  return await sql.query(
    `INSERT INTO AthleResults 
     (id, fullName, distance, eventDate, eventLocation)
     VALUES ${placeholders}
     ON CONFLICT (id) DO UPDATE SET
       distance = EXCLUDED.distance,
       eventDate = EXCLUDED.eventDate,
       eventLocation = EXCLUDED.eventLocation`,
    values
  );
};
