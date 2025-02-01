import { Result } from "@/modules/result/result.type";
import { addResults } from "@/services/athle/result/addResults";
import { parseRawScore } from "@/utils/parseRawScore";
import moment from "moment";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(request: Request) {
  const { targetUrl } = await request.json();

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
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
        const eventDate = cells[9]?.textContent?.trim();
        const eventLocation = cells[10]?.textContent?.trim();
        const rawScore = cells[1]?.querySelector("b")?.textContent?.trim();

        return {
          rawScore,
          fullName,
          eventDate,
          eventLocation,
        };
      });

      return { rawResults, rawSearchDescription };
    });

    const results: Result[] = rawData.rawResults.map((rawResult) => {
      const fullName = rawResult.fullName ?? "";
      const eventLocation = rawResult.eventLocation ?? "";
      const eventType = getEventType(rawData.rawSearchDescription);
      const score = parseRawScore(rawResult.rawScore);
      const id = getId({
        fullName,
        rawEventDate: rawResult.eventDate ?? "",
        eventLocation,
        score,
      });
      const eventDate = getEventDate(rawResult.eventDate);

      return {
        id,
        fullName,
        eventDate,
        eventLocation,
        score,
        eventType,
      };
    });

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
  score,
}: {
  fullName: string;
  rawEventDate: string;
  eventLocation: string;
  score: number;
}) => `${rawEventDate}-${eventLocation}-${score}-${fullName}`.slice(0, 50);

const getEventType = (rawSearchDescription?: string | null) => {
  if (!rawSearchDescription) {
    return "";
  }

  const eventType = rawSearchDescription.split(" | ")[1];
  return eventType;
};

const getEventDate = (rawEventDate?: string | null): Date => {
  console.log("🚀 ~ getEventDate ~ rawEventDate:", rawEventDate);
  if (!rawEventDate) {
    return new Date(0);
  }
  const date = moment.utc(rawEventDate, "DD/MM/YY").toDate();
  console.log("🚀 ~ getEventDate ~ date:", date.toISOString());
  return date;
};
