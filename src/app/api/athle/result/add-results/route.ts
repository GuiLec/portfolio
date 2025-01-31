import { Result } from "@/modules/result/result.type";
import { addResults } from "@/services/athle/result/addResults";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const newResults = body.results as Result[];

  try {
    await addResults(newResults);
    const table = await sql`SELECT * FROM AthleResults LIMIT 200;`;
    const results = table.rows;
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
