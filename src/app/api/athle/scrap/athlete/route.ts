import { NextResponse } from "next/server";
import { scrapAthlete } from "@/modules/scrapping/athlete/scrapAthlete";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bilanAthleteId = searchParams.get("bilan-athlete-id") ?? "";

    const athlete = await scrapAthlete({ bilanAthleteId });

    return NextResponse.json({ athlete }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
