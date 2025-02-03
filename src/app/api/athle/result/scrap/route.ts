import { Result } from "@/modules/result/result.type";
import { addResults } from "@/services/athle/result/addResults";

import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { extractPageResults } from "@/modules/scrapping/extractPageResults";

const EVENT_TYPE_PARAMS_MAPPER = {
  ["5 Km Route"]: 252,
  ["10 Km Route"]: 261,
  ["1/2 Marathon"]: 271,
  ["Marathon"]: 295,
};

const MAX_PAGES_TO_SCRAP_BY_SEX_YEAR_AND_EVENT = 100;

const CHUNK_SIZE = 2000;

export async function POST(request: Request) {
  const { scrapRequests } = await request.json();

  const results: Result[] = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });

  try {
    for (const scrapRequest of scrapRequests) {
      const { year, eventType, sex } = scrapRequest;
      console.log("🚀 ~ POST ~ year, eventType, sex:", year, eventType, sex);
      const eventTypeId =
        EVENT_TYPE_PARAMS_MAPPER[
          eventType as keyof typeof EVENT_TYPE_PARAMS_MAPPER
        ];

      const targetUrl = `https://bases.athle.fr/asp.net/liste.aspx?frmpostback=true&frmbase=bilans&frmmode=1&frmespace=0&frmannee=${year}&frmepreuve=${eventTypeId}&frmcategorie=&frmsexe=${sex}&frmnationalite=&frmamini=&frmamaxi=&frmligue=&frmdepartement=&frmclub=&frmvent=&frmathlerama=&frmfcompetition=&frmfepreuve=&frmplaces=`;

      const baseUrl = new URL(targetUrl);

      await page.goto(baseUrl.toString());

      const { totalNumberOfPages: numberOfPages } = await page.evaluate(() => {
        const barSelect = document.querySelector(".barContainer .barSelect ");
        const barSelectText = barSelect?.textContent;
        const match = barSelectText?.match(/\/(\d+)/);
        const totalNumberOfPages = match ? parseInt(match[1], 10) : 1;

        return { totalNumberOfPages };
      });

      const pageResults = await extractPageResults(page);
      results.push(...pageResults);

      const numberOfPagesToScrap = Math.min(
        numberOfPages,
        MAX_PAGES_TO_SCRAP_BY_SEX_YEAR_AND_EVENT
      );

      for (let i = 1; i <= numberOfPagesToScrap - 1; i++) {
        console.log("🚀 ~ POST ~ i:", i);
        await page.goto(`${baseUrl.toString()}&frmposition=${i}`);
        // Optional: Add debug screenshot
        // await page.screenshot({ path: `page-${i}.png` });
        const newPageResults = await extractPageResults(page);
        results.push(...newPageResults);

        if (results.length > CHUNK_SIZE) {
          await addResults(results);
          console.log("🚀 ~ POST ~ CHUNK SENT !");
          results.length = 0;
        }
      }
    }

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
