import { Result } from "@/modules/result/result.type";
import { addResults } from "@/services/athle/result/addResults";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

const getId = ({
  fullName,
  eventDate,
  eventLocation,
}: {
  fullName: string;
  eventDate: string;
  eventLocation: string;
}) => `${fullName}-${eventDate}-${eventLocation}`;

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
      const rows = document.querySelectorAll("#ctnBilans tbody tr");
      const resultRows = Array.from(rows).slice(2);

      const rawResults = resultRows.map((row) => {
        const cells = row.querySelectorAll('td[class^="datas"]');

        const fullName = cells[3]?.textContent?.trim();
        const eventDate = cells[8]?.textContent?.trim();
        const eventLocation = cells[10]?.textContent?.trim();

        return {
          rawScore: cells[1]?.textContent?.trim(),
          fullName,
          eventDate,
          eventLocation,
        };
      });

      return rawResults;
    });

    const results: Result[] = rawData.map((rawResult) => {
      const fullName = rawResult.fullName ?? "";
      const eventDate = rawResult.eventDate ?? "";
      const eventLocation = rawResult.eventLocation ?? "";
      const id = getId({ fullName, eventDate, eventLocation });

      return {
        id,
        fullName,
        eventDate,
        eventLocation,
        score: 100,
        eventType: "Decathlon",
      };
    });

    await addResults(results);

    await browser.close();

    return NextResponse.json(
      { length: results.length, results },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
