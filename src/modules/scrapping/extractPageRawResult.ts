import { Page } from "puppeteer";

export const extractPageRawResult = async (page: Page) => {
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

  return rawData;
};
