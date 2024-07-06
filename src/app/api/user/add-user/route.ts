import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userFirstName = searchParams.get("first-name");
  const userLastName = searchParams.get("last-name");

  try {
    if (!userFirstName || !userLastName)
      throw new Error("First name and last name required");
    await sql`INSERT INTO Users (FirstName, LastName) VALUES (${userFirstName}, ${userLastName});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const users = await sql`SELECT * FROM Users;`;
  return NextResponse.json({ users }, { status: 200 });
}
