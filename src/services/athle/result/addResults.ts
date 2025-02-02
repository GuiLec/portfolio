import { Result } from "@/modules/result/result.type";
import { sql } from "@vercel/postgres";

export const addResults = async (results: Result[]) => {
  const values = results.flatMap(
    ({
      id,
      fullName,
      club,
      clubRegion,
      clubDepartement,
      athleteYear,
      resultAgeCategory,
      eventType,
      eventDate,
      eventLocation,
      score,
    }) => [
      id,
      fullName,
      club,
      clubRegion,
      clubDepartement,
      athleteYear,
      resultAgeCategory,
      eventType,
      score,
      eventDate.toISOString(),
      eventLocation,
    ]
  );

  const numFields = 11;
  const placeholders = results
    .map((_, index) => {
      return `(${Array.from(
        { length: numFields },
        (_, fieldIndex) => `$${index * numFields + fieldIndex + 1}`
      ).join(", ")})`;
    })
    .join(", ");

  return await sql.query(
    `INSERT INTO AthleResults 
     (id, fullName, club, clubRegion, clubDepartement, athleteYear, resultAgeCategory, eventType, score, eventDate, eventLocation)
     VALUES ${placeholders}
     ON CONFLICT (id) DO UPDATE SET
       score = EXCLUDED.score,
       club = EXCLUDED.club,
       clubRegion = EXCLUDED.clubRegion,
       clubDepartement = EXCLUDED.clubDepartement,
       athleteYear = EXCLUDED.athleteYear,
       resultAgeCategory = EXCLUDED.resultAgeCategory,
       eventType = EXCLUDED.eventType,
       eventDate = EXCLUDED.eventDate,
       eventLocation = EXCLUDED.eventLocation`,
    values
  );
};
