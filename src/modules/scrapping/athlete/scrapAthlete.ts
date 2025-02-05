export const scrapAthlete = async ({
  bilanAthleteId,
}: {
  bilanAthleteId: string;
}) => {
  const Chromium = require("@sparticuz/chromium");
  const puppeteer = require("puppeteer-core");

  Chromium.setGraphicsMode = false;

  const executablePath = await Chromium.executablePath();

  const browser = await puppeteer.launch({
    args: Chromium.args,
    defaultViewport: Chromium.defaultViewport,
    executablePath,
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(
    `https://bases.athle.fr/asp.net/athletes.aspx?base=bilans&seq=${bilanAthleteId}`
  );

  const { fullName } = await page.evaluate(() => {
    const fullName =
      document
        .querySelector("#ctnContentDetails .titles span")
        ?.textContent?.trim() ?? "";

    return { fullName };
  });

  await browser.close();

  return { fullName };
};
