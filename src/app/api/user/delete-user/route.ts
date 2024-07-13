import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const userFirstName = searchParams.get("first-name");
  const userLastName = searchParams.get("last-name");

  try {
    if (!userFirstName || !userLastName)
      throw new Error("First name and last name required");
    await sql`DELETE FROM Users WHERE FirstName = ${userFirstName} AND LastName = ${userLastName};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const userTable = await sql`SELECT * FROM Users;`;
  const users = userTable.rows;
  return NextResponse.json({ users }, { status: 200 });
}
