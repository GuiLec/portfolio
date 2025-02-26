import { Result } from "@/modules/result/result.type";
import { sql } from "@vercel/postgres";

export const addResults = async (results: Result[]) => {
  const uniqueResults = Array.from(
    new Map(results.map((result) => [result.id, result])).values()
  );

  const values = uniqueResults.flatMap(
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
      iaafScore,
      gender,
      nationality,
      bilanAthlete,
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
      iaafScore,
      gender,
      nationality,
      bilanAthlete,
    ]
  );

  const numFields = 15;
  const placeholders = uniqueResults
    .map((_, index) => {
      return `(${Array.from(
        { length: numFields },
        (_, fieldIndex) => `$${index * numFields + fieldIndex + 1}`
      ).join(", ")})`;
    })
    .join(", ");

  try {
    return await sql.query(
      `INSERT INTO AthleResults 
     (id, fullName, club, clubRegion, clubDepartement, athleteYear, resultAgeCategory, eventType, score, eventDate, eventLocation, iaafScore, gender, nationality, bilanAthlete)
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
       eventLocation = EXCLUDED.eventLocation,
       iaafScore = EXCLUDED.iaafScore,
       gender = EXCLUDED.gender,
       nationality = EXCLUDED.nationality,
       bilanAthlete = EXCLUDED.bilanAthlete
       `,
      values
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    console.log("🚀 ~ POST ~ results:", JSON.stringify(results));
  }
};
