import { test,expect } from "../fixtures/fixtures";

test.describe('Demo-Blaze',()=>{
  test.beforeEach(async({page})=>{
    /* Navigation to the DemoBlaze Website */
    await page.goto("https://www.demoblaze.com/")
  })

  test.only('Launch Browser using reusable setup method',async({page,home,placeorder})=>{
    console.log("Title of the Page: ",await page.title())
    /* Performing assertion functionality for the Title Name */
    expect(page).toHaveTitle("STORE")
    await home.clickAnyCategories("Laptops")
    await home.clickAnyLaptop("Sony vaio i5")
    await home.clickSpecificButton("Add to cart")
    await home.clickSpecificNavTab("Cart")
    // expect(page.locator("h3[class='price-container']").allInnerTexts(),"$360")
    await home.clickSpecificNavTab("Home")
    await home.clickAnyCategories("Phones")
    await home.clickAnySpecificMobile("Nexus 6")
    await home.clickSpecificButton("Add to cart")
    await home.clickSpecificNavTab("Cart")
    await page.waitForTimeout(5000)
    console.log("Total Amount:",await page.locator("#totalp").textContent())
    // console.log(home.getTotalAmount())
    await page.locator("//button[@class='btn btn-success']").click()
    await placeorder.setUserName("Hellos")
    await placeorder.setCountryName("India")
    await placeorder.setCityName("Hyd")
    await placeorder.setCreditcard("8888")
    await placeorder.setMonth("Jan")
    await placeorder.setYear("2026")
    await placeorder.clickPurchase()
    // await placeorder.takeScreenshot()
    await page.screenshot({fullPage:true,path:"images/one.png"})
    await page.pause()
  })

  test('rough-works',async({page,home})=>{
    await home.clickAnyCategories("Laptops")
    // const texts = await page.locator("//a[text()='Sony vaio i5']").textContent()
    // console.log(texts)
     await page.waitForTimeout(5000)
    const texts = await page.locator("h4.card-title>a").allTextContents()
    console.log(texts)
    
    const prices = await page.locator("div.card-block>h5").allInnerTexts()
    console.log(prices)
   
    await page.pause()
  })
  
  

})