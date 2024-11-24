const puppeteer = require("puppeteer");
const fs = require("fs");

async function scrapeIPLData() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const seasons = ["2023", "2022", "2021", "2020", "2019"]; // Last 5 seasons
  const categories = [
    { name: "orange-cap", url: "most-runs" },
    { name: "most-fours", url: "most-fours" },
    { name: "most-sixes", url: "most-sixes" },
    { name: "most-centuries", url: "most-hundreds" },
    { name: "most-fifties", url: "most-fifties" },
  ];

  const data = {};

  for (let season of seasons) {
    data[season] = {};

    for (let category of categories) {
      const categoryUrl = `https://www.iplt20.com/stats/${season}/${category.url}`;
      console.log(`Navigating to ${categoryUrl}`);
      await page.goto(categoryUrl, {
        waitUntil: "networkidle2",
        timeout: 60000,
      });

      console.log(`Waiting for table in ${season} ${category.name}`);
      await page.waitForSelector("table.st-table", { timeout: 60000 });

      console.log(`Scraping data for ${season} ${category.name}`);
      data[season][category.name] = await page.$$eval(
        "table.st-table tbody tr",
        (rows) => {
          return rows
            .slice(0, 10)
            .map((row) => {
              const columns = row.querySelectorAll("td");
              if (columns.length >= 4) {
                return {
                  rank: columns[0]?.innerText.trim(),
                  player: columns[1]?.innerText.trim(),
                  team: columns[2]?.innerText.trim(),
                  stat: columns[3]?.innerText.trim(),
                };
              } else {
                console.log(
                  "Row does not have expected number of columns:",
                  row
                );
                return null;
              }
            })
            .filter((row) => row !== null); // Filter out null entries
        }
      );
    }
  }

  await browser.close();
  fs.writeFileSync("iplData.json", JSON.stringify(data, null, 2));
  console.log("Data scraped successfully");
}

scrapeIPLData().catch((error) => {
  console.error("Error:", error);
});
