import { Result } from "@/modules/result/result.type";
import { sql } from "@vercel/postgres";

export const addResults = async (results: Result[]) => {
  const values = results.flatMap(
    ({ id, fullName, eventType, eventDate, eventLocation, score }) => [
      id,
      fullName,
      eventType,
      score,
      eventDate,
      eventLocation,
    ]
  );

  const placeholders = results
    .map(
      (_, index) =>
        `($${index * 6 + 1}, $${index * 6 + 2}, $${index * 6 + 3}, $${
          index * 6 + 4
        }, $${index * 6 + 5}, $${index * 6 + 6})`
    )
    .join(", ");

  return await sql.query(
    `INSERT INTO AthleResults 
     (id, fullName, eventType, score, eventDate, eventLocation)
     VALUES ${placeholders}
     ON CONFLICT (id) DO UPDATE SET
       score = EXCLUDED.score,
       eventType = EXCLUDED.eventType,
       eventDate = EXCLUDED.eventDate,
       eventLocation = EXCLUDED.eventLocation`,
    values
  );
};
