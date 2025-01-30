import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { id, fullName, distance, eventDate, eventLocation } = body;

  try {
    if (!id) throw new Error("id");
    await sql`
    INSERT INTO AthleResults 
      (id, fullName, distance, eventDate, eventLocation) 
    VALUES 
      (${id}, ${fullName}, ${distance}, ${eventDate}, ${eventLocation})
    ON CONFLICT (id) DO UPDATE SET
      distance = EXCLUDED.distance,
      eventDate = EXCLUDED.eventDate,
      eventLocation = EXCLUDED.eventLocation;
  `;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const table = await sql`SELECT * FROM AthleResults LIMIT 200;`;
  const results = table.rows;
  return NextResponse.json({ results }, { status: 200 });
}
