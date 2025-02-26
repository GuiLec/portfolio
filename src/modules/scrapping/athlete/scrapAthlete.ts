import { adapatRawScrapedAthlete } from "@/modules/scrapping/athlete/adapatRawScrapedAthlete";

const isProd = process.env.VERCEL_ENV !== "dev";

export const scrapAthlete = async ({
  bilanAthleteId,
}: {
  bilanAthleteId: string;
}) => {
  const Chromium = require("@sparticuz/chromium");
  const puppeteer = require("puppeteer-core");

  Chromium.setGraphicsMode = false;

  const localChromePath =
    process.platform === "darwin"
      ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      : process.platform === "win32"
      ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
      : "/usr/bin/google-chrome";

  const executablePath = isProd
    ? await Chromium.executablePath()
    : localChromePath;

  // Use production args only on Vercel; otherwise, use a minimal set.
  const launchArgs = isProd
    ? Chromium.args
    : ["--no-sandbox", "--disable-setuid-sandbox"];

  // Optionally, use production's default viewport; otherwise, let Chrome use its default.
  const defaultViewport = isProd ? Chromium.defaultViewport : undefined;

  const browser = await puppeteer.launch({
    args: launchArgs,
    defaultViewport,
    executablePath,
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(
    `https://bases.athle.fr/asp.net/athletes.aspx?base=bilans&seq=${bilanAthleteId}`
  );

  const rawScrapedAthlete = await page.evaluate(() => {
    const fullName = document
      .querySelector("#ctnContentDetails .titles span")
      ?.textContent?.trim();

    return { fullName };
  });

  await browser.close();

  const athlete = adapatRawScrapedAthlete(rawScrapedAthlete);

  return athlete;
};
