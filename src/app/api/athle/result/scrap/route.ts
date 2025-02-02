import { Result } from "@/modules/result/result.type";
import { addResults } from "@/services/athle/result/addResults";
import { adaptRawScrapResult } from "@/modules/scrapping/adaptRawScrapResult";
import { extractPageRawResult } from "@/modules/scrapping/extractPageRawResult";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(request: Request) {
  const { targetUrls } = await request.json();

  const results: Result[] = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });

  try {
    for (const targetUrl of targetUrls) {
      await page.goto(
        targetUrl
        // "https://bases.athle.fr/asp.net/liste.aspx?frmpostback=true&frmbase=bilans&frmmode=1&frmespace=0&frmannee=2024&frmepreuve=250&frmsexe=M&frmcategorie=&frmdepartement=&frmligue=&frmnationalite=&frmvent=&frmamaxi="
      );

      const rawData = await extractPageRawResult(page);

      const pageResults: Result[] = rawData.rawResults.map((rawScrapResult) =>
        adaptRawScrapResult({
          rawScrapResult,
          rawSearchDescription: rawData.rawSearchDescription,
        })
      );

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
