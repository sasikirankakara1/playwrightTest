import { Locator, Page } from "@playwright/test";

export class ProductStoreHomepage{

    readonly page:Page
    readonly elements:Locator
    readonly links:Locator
    readonly buttons:Locator
    readonly userName:Locator
    readonly passWord:Locator
    readonly loginButton:Locator
  
    constructor(page:Page){
        this.page=page
        this.links = page.locator("a")
       this.elements = page.locator("h4.card-title>a")
       this.buttons = page.locator("a")
       this.userName = page.locator("#loginusername")
       this.passWord=page.locator("//input[@id='loginpassword']")
       this.loginButton=page.locator("//button[@onclick='logIn()']")
    }

    async clickAnyCategories(categoryName:string){
        return this.links.filter({hasText:categoryName}).first().click()
    }

   async clickAnyLaptop(laptopName:string){
        return this.elements.filter({hasText:laptopName}).first().click()
   }
   async clickSpecificButton(buttonName:string){
    return this.buttons.filter({hasText:buttonName}).first().click()
   }
   async clickSpecificNavTab(tabName:string){
    return this.buttons.filter({hasText:tabName}).first().click()
   }
   async setUserName(uname:string){
    return this.userName.fill(uname)
   }
   async setPassword(passcode:string){
    return this.passWord.fill(passcode)
   }
   async clickLogin(){
    await this.loginButton.click()
   }
   async clickAnySpecificMobile(mobileName:string){
    await this.links.filter({hasText:mobileName}).first().click()
   }
   async getTotalAmount():Promise<void>{
    await this.totalAmount.getAttribute("text")
   }
}