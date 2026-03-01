import { test, expect } from "@playwright/test";

test.describe("Calculate the total price of all laptops and verify it is greater than 5000.", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.demoblaze.com/index.html", {
      waitUntil: "domcontentloaded",
    });
  });
  test("Let's Solve", async ({ page }) => {
    await page.getByRole("link").filter({ hasText: "Laptops" }).click();
    const prices = await page
      .locator("div[class='col-lg-4 col-md-6 mb-4'] h5")
      .allTextContents();
    console.log(prices);
    const price = prices.map((text) =>
      Number(text.replaceAll("$", "").replaceAll(",", "")),
    );
    const sum = price.reduce((total, price) => total + price, 0);
    console.log("Total Price: " + sum);
    console.log("Average of Prices: " + sum / prices.length);
    expect(sum).toBeGreaterThan(5000);
    await page.pause();
  });
  test("Find the average price of all phones and verify at least 2 products are above average.", async ({
    page,
  }) => {
    await page.getByRole("link").filter({ hasText: "Laptops" }).click();
    await page
      .locator("div[class='col-lg-4 col-md-6 mb-4'] h5")
      .first()
      .waitFor();
    const prices = await page
      .locator("div[class='col-lg-4 col-md-6 mb-4'] h5")
      .allTextContents();
    console.log(prices);
    const priceDigits = prices.map((el) =>
      Number(el.replaceAll("$", "").replaceAll(",", "")),
    );
    const sums = priceDigits.reduce((sum, price) => sum + price, 0);
    const avgs = sums / priceDigits.length;
    console.log(sums);
    console.log(avgs);
    const aboveAvg = priceDigits.filter((prices) => prices > avgs);
    console.log(aboveAvg);
    await page.pause();
  });
  test("Find the highest priced laptop and click it dynamically.", async ({
    page,
  }) => {
    await page
      .locator("div[class='col-lg-4 col-md-6 mb-4'] h5")
      .first()
      .waitFor();
    const allPrices = await page
      .locator("div[class='col-lg-4 col-md-6 mb-4'] h5")
      .allTextContents();
    console.log(allPrices);
    const prices = allPrices.map((price) =>
      Number(price.replaceAll("$", "").replaceAll(",", "").trim()),
    );
    console.log(prices);
    console.log("Maximum Price: " + Math.max(...prices));
    const maxIndex = prices.indexOf(Math.max(...prices));
    console.log("index:" + maxIndex);
    await page
      .locator("div.col-lg-4.col-md-6.mb-4")
      .nth(maxIndex)
      .locator("a")
      .first()
      .click();
    await page.pause();
  });
  test("Find the lowest priced phone and add it to cart", async ({ page }) => {
    await page
      .locator("div[class='col-lg-4 col-md-6 mb-4'] h5")
      .first()
      .waitFor();
    const prices = await page
      .locator("div[class='col-lg-4 col-md-6 mb-4'] h5")
      .allTextContents();
    const pricesActual = prices.map((p) =>
      Number(p.replaceAll("$", "").replaceAll(",", "").trim()),
    );
    console.log(pricesActual);
    const smallestPrice = Math.min(...pricesActual);
    console.log(smallestPrice);
    const minIndex = pricesActual.indexOf(Math.min(...pricesActual));
    await page
      .locator("div.col-lg-4.col-md-6.mb-4")
      .nth(minIndex)
      .locator("a")
      .first()
      .click();
    await page.locator("a", { hasText: "Add to cart" }).click();
    await page.pause();
  });
  test("Print top 3 most expensive products dynamically.", async ({
    page,
  }) => {
    await page
      .locator("div[class='col-lg-4 col-md-6 mb-4'] h5")
      .first()
      .waitFor();
    const prices = await page
      .locator("div[class='col-lg-4 col-md-6 mb-4'] h5")
      .allTextContents();
    const pricesActual = prices.map((p) =>
      Number(p.replaceAll("$", "").replaceAll(",", "").trim()),
    );
    const maxPrices = Math.max(...pricesActual)
    const topThree = pricesActual.sort().slice(0,3)
    console.log(topThree)
    console.log("Max Prices:"+maxPrices)
    console.log(pricesActual);
    await page.pause();
  });
  test("Verify products are sorted alphabetically by name.",async({page})=>{
    await page.locator("div.col-lg-4.col-md-6.mb-4 h4 a").first().waitFor()
    const listNames = await page.locator("div.col-lg-4.col-md-6.mb-4 h4 a").allTextContents()
    console.log(listNames)
    const fullListNames = listNames.map(names=>names.replaceAll(",","").trim())
    console.log("Clear List: "+fullListNames)
    const sortNames = [...fullListNames].sort((a,b)=>a.localeCompare(b,undefined,{sensitivity:'base'}))
    console.log("Sorted Names: "+sortNames)
    const reverseSortNames = [...fullListNames].sort((a,b)=>b.localeCompare(a,undefined,{sensitivity:'base'}))
    console.log("Descending Order List: "+reverseSortNames)
    await page.pause()
  })
  test.only("Add all products whose price is above average to cart",async({page})=>{
    await page.locator("div.col-lg-4.col-md-6.mb-4 h5").first().waitFor()
    const prices = await page.locator("div.col-lg-4.col-md-6.mb-4 h5").allTextContents()
    console.log(prices)
    const clearPrices = prices.map(p=>Number(p.replaceAll("$","").replaceAll(",","").trim()))
    console.log(clearPrices)
    const sumPrices = [...clearPrices].reduce((a,b)=>a+b,0)
    const avgPrices = sumPrices/clearPrices.length
    console.log("Avg Prices: "+avgPrices)
    const aboveAvgPrices = [...clearPrices].filter(p=>p>avgPrices)
    console.log("Above Average Prices: "+aboveAvgPrices)
    const indexesOfAboveAvgPrices = aboveAvgPrices.map((prices,index)=>({prices,index})).filter(item=>item.prices>avgPrices)
    .map(item=>item.index)
    console.log("Above Average Indexes: "+indexesOfAboveAvgPrices)
    await page.locator("div.col-lg-4.col-md-6.mb-4").nth(indexesOfAboveAvgPrices[3]).locator("a").first().click()
    await page.pause()
  })
});
