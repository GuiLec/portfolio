import { getAthleteYear } from "@/app/api/athle/result/scrap/utils/getAthleteYear";
import { Result } from "@/modules/result/result.type";
import { addResults } from "@/services/athle/result/addResults";
import { parseRawScore } from "@/utils/parseRawScore";
import moment from "moment";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(request: Request) {
  const { targetUrls } = await request.json();

  const results: Result[] = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    for (const targetUrl of targetUrls) {
      await page.goto(
        targetUrl
        // "https://bases.athle.fr/asp.net/liste.aspx?frmpostback=true&frmbase=bilans&frmmode=1&frmespace=0&frmannee=2024&frmepreuve=250&frmsexe=M&frmcategorie=&frmdepartement=&frmligue=&frmnationalite=&frmvent=&frmamaxi="
      );

      await page.setViewport({ width: 1080, height: 1024 });

      const rawData = await page.evaluate(() => {
        const rawSearchDescription = document
          .querySelector("#ctnBilans tbody tr td div.headers")
          ?.textContent?.trim();

        const rows = document.querySelectorAll("#ctnBilans tbody tr");
        const resultRows = Array.from(rows).slice(2);

        const rawResults = resultRows.map((row) => {
          const cells = row.querySelectorAll('td[class^="datas"]');

          const fullName = cells[3]?.textContent?.trim();
          const club = cells[4]?.textContent?.trim();
          const clubRegion = cells[5]?.textContent?.trim();
          const clubDepartement = cells[6]?.textContent?.trim();
          const resultAgeCategory = cells[7]?.textContent?.trim();
          const athleteYear = cells[8]?.textContent?.trim();
          const eventDate = cells[9]?.textContent?.trim();
          const eventLocation = cells[10]?.textContent?.trim();
          const rawScore = cells[1]?.querySelector("b")?.textContent?.trim();

          return {
            rawScore,
            fullName,
            club,
            clubRegion,
            clubDepartement,
            resultAgeCategory,
            athleteYear,
            eventDate,
            eventLocation,
          };
        });

        return { rawResults, rawSearchDescription };
      });

      const pageResults: Result[] = rawData.rawResults.map((rawResult) => {
        const fullName = rawResult.fullName ?? "";
        const club = rawResult.club ?? "";
        const clubRegion = rawResult.clubRegion ?? "";
        const clubDepartement = rawResult.clubDepartement ?? "";
        const athleteYear = getAthleteYear(rawResult.athleteYear);
        const resultAgeCategory = rawResult.resultAgeCategory ?? "";
        const eventLocation = rawResult.eventLocation ?? "";
        const eventType = getEventType(rawData.rawSearchDescription);
        const score = parseRawScore(rawResult.rawScore);
        const id = getId({
          fullName,
          rawEventDate: rawResult.eventDate ?? "",
          eventLocation,
          rawScore: rawResult.rawScore ?? "",
        });
        const eventDate = getEventDate(rawResult.eventDate);

        return {
          id,
          fullName,
          club,
          clubRegion,
          clubDepartement,
          athleteYear,
          resultAgeCategory,
          eventDate,
          eventLocation,
          score,
          eventType,
        };
      });

      results.push(...pageResults);
    }

    await addResults(results);
    await browser.close();

    return NextResponse.json(
      { length: results.length, results },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

const getId = ({
  fullName,
  rawEventDate,
  eventLocation,
  rawScore,
}: {
  fullName: string;
  rawEventDate: string;
  eventLocation: string;
  rawScore: string;
}) => `${rawEventDate}-${eventLocation}-${rawScore}-${fullName}`.slice(0, 50);

const getEventType = (rawSearchDescription?: string | null) => {
  if (!rawSearchDescription) {
    return "";
  }

  const eventType = rawSearchDescription.split(" | ")[1];
  return eventType;
};

const getEventDate = (rawEventDate?: string | null): Date => {
  if (!rawEventDate) {
    return new Date(0);
  }
  const date = moment.utc(rawEventDate, "DD/MM/YY").toDate();
  return date;
};
