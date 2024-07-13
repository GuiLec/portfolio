import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const userTable = await sql`SELECT * FROM users;`;
    const users = userTable.rows;
    const response = NextResponse.json({ users }, { status: 200 });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    const response = NextResponse.json({ error }, { status: 500 });
    response.headers.set("Cache-Control", "no-store");
    return response;
  }
}
