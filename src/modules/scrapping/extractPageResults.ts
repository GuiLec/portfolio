import { Result } from "@/modules/result/result.type";
import { adaptRawScrapResult } from "@/modules/scrapping/adaptRawScrapResult";
import { extractPageRawResult } from "@/modules/scrapping/extractPageRawResult";
import { Page } from "puppeteer";

export const extractPageResults = async (page: Page): Promise<Result[]> => {
  const rawData = await extractPageRawResult(page);

  return rawData.rawResults.map((rawScrapResult) =>
    adaptRawScrapResult({
      rawScrapResult,
      rawSearchDescription: rawData.rawSearchDescription,
    })
  );
};
