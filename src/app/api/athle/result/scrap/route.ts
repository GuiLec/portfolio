import { Result } from "@/modules/result/result.type";
import { addResults } from "@/services/athle/result/addResults";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

const getId = ({ fullName, eventDate, eventLocation }: Result) =>
  `${fullName}-${eventDate}-${eventLocation}`;

const mockResult: Result = {
  id: "1",
  fullName: "John Doe",
  distance: 100,
  eventDate: "2021-01-01",
  eventLocation: "Paris",
};

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

    const fullNames = await page.$$eval(
      'td[class^="datas"] a[href^="javascript:bddThrowAthlete"]',
      (anchors) =>
        anchors.map((a) => (a.textContent ? a.textContent.trim() : ""))
    );

    const results = fullNames.map((fullName) => ({
      ...mockResult,
      id: getId({ ...mockResult, fullName }),
      fullName,
    }));

    await addResults(results);

    await browser.close();

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
