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
      const baseUrl = new URL(targetUrl);
      baseUrl.searchParams.delete("frmposition");

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

      for (let i = 1; i <= numberOfPages - 1; i++) {
        console.log("🚀 ~ POST ~ i:", i);
        await page.goto(`${baseUrl.toString()}&frmposition=${i}`);
        // Optional: Add debug screenshot
        // await page.screenshot({ path: `page-${i}.png` });
        const newPageResults = await extractPageResults(page);
        results.push(...newPageResults);
      }
    }

    // batch results by 2000
    const chunkSize = 2000;
    for (let i = 0; i < results.length; i += chunkSize) {
      console.log("🚀 ~ POST ~ chunk:", i);
      const chunk = results.slice(i, i + chunkSize);
      await addResults(chunk);
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
