import { test as base,expect,Page } from "@playwright/test";
import { ProductStoreHomepage } from "../pages/ProductStoreHomepage";
import { PlaceOrder } from "../pages/PlaceOrder";

type myFixtures = {
    home:ProductStoreHomepage
    placeorder:PlaceOrder
}

export const test = base.extend<myFixtures>({
    home:async({page},use)=>{
        use(new ProductStoreHomepage(page))
    },
    placeorder:async({page},use)=>{
        use(new PlaceOrder(page))
    }
})


export {expect} from '@playwright/test'

