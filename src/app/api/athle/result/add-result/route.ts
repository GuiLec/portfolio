import { addResult } from "@/services/athle/result/addResult";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { id, fullName, distance, eventDate, eventLocation } = body;

  try {
    if (!id) throw new Error("id");
    await addResult({ id, fullName, distance, eventDate, eventLocation });
    const table = await sql`SELECT * FROM AthleResults LIMIT 200;`;
    const results = table.rows;
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
