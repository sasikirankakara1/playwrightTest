import { Locator, Page } from "@playwright/test";
import { promises } from "node:dns";

export class PlaceOrder{


    readonly page:Page
    readonly name:Locator
    readonly country:Locator
    readonly city:Locator
    readonly creditCard:Locator
    readonly month:Locator
    readonly year:Locator
    readonly purchase:Locator
    constructor(page:Page){
        this.page=page
        this.name = page.locator("#name")
        this.country=page.locator("#country")
        this.city=page.locator("#city")
        this.creditCard = page.locator("#card")
        this.month = page.locator("#month")
        this.year = page.locator("#year")  
        this.purchase = page.locator("(//button[@class='btn btn-primary'])[3]") 
    }

   async setUserName(uname:string){
    return this.name.fill(uname)
   }
   async setCountryName(countryName:string){
    return this.country.fill(countryName)
   }
   async setCityName(city:string){
    return this.city.fill(city)
   }
   async setCreditcard(cardDetails:string){
    return this.creditCard.fill(cardDetails)
   }
   async setMonth(monthDetails:string){
    return this.month.fill(monthDetails)
   }
   async setYear(yearDetails:string){
    return this.year.fill(yearDetails)
   }
   async clickPurchase(){
    await this.purchase.click()
   }
   async takeScreenshot(){
    await this.page.screenshot({fullPage:true,path:'/images'})
   }
}