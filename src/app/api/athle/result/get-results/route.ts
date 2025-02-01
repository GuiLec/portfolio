import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const pageSize = searchParams.get("page-size");
  const safePage = Number(page) || 1;
  const safePageSize = Number(pageSize) || 10;

  try {
    const count = await sql`SELECT COUNT(*) FROM AthleResults;`;

    const userTable = await sql`
      SELECT * FROM AthleResults
      ORDER BY id
      OFFSET ${(safePage - 1) * safePageSize}
      LIMIT ${safePageSize};
    `;

    const results = userTable.rows;
    return NextResponse.json(
      { length: results.length, results, count: count.rows[0].count },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
