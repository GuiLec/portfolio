import { Result } from "@/modules/result/result.type";
import { addResults } from "@/services/athle/result/addResults";

import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { extractPageResults } from "@/modules/scrapping/extractPageResults";

export async function POST(request: Request) {
  const { targetUrls } = await request.json();

  const results: Result[] = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });

  try {
    for (const targetUrl of targetUrls) {
      // remove the frmposition position query param from the url if it exists
      const url = new URL(targetUrl);
      url.searchParams.delete("frmposition");

      await page.goto(targetUrl);

      const pageResults = await extractPageResults(page);

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
