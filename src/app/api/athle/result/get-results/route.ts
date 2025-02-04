import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const pageSize = searchParams.get("page-size");
  const sortField = searchParams.get("sort-field");
  const sortOrder = searchParams.get("sort-order");
  const filterFields = searchParams.get("filter-fields");
  const filterValues = searchParams.get("filter-values");

  let safeFilterQuery = "";
  if (filterFields && filterValues) {
    const fields = filterFields.split(",");
    const values = filterValues.split(",");
    safeFilterQuery = `WHERE ${fields
      .map(
        (field, index) =>
          `${decodeURIComponent(field)} ILIKE '%${decodeURIComponent(
            values[index]
          )}%'`
      )
      .join(" AND ")}`;
  }

  const safePage = Number(page) || 0;
  const safePageSize = Number(pageSize) || 10;
  const safeSortField = sortField ?? "eventdate";
  const safeSortOrder = sortOrder === "desc" ? "DESC" : "ASC";

  try {
    const count = await sql.query(
      `SELECT COUNT(*) FROM AthleResults ${safeFilterQuery};`
    );

    const queryString = `
    SELECT * FROM AthleResults
    ${safeFilterQuery}
    ORDER BY ${safeSortField} ${safeSortOrder}
    OFFSET ${safePage * safePageSize}
    LIMIT ${safePageSize};
  `;
    const userTable = await sql.query(queryString);

    const results = userTable.rows;
    return NextResponse.json(
      { length: results.length, results, count: count.rows[0].count },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
