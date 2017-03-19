import { DevelopersMainComponent, DevelopersBottomComponent } from './DevelopersComponents.jsx'
import { ProductMainComponent, ProductBottomComponent } from './ProductComponents.jsx'
import { CompanyMainComponent, CompanyBottomComponent } from './CompanyComponents.jsx'


const menuItems = {
    "developers":{
        name: "Developers",
        main: DevelopersMainComponent,
        footer: DevelopersBottomComponent,
    },
    "product": {
        name: "Product",
        main:ProductMainComponent,
        footer:ProductBottomComponent,
    },
    "company":{
        name: "Company",
        main: CompanyMainComponent,
        footer: CompanyBottomComponent,
    },
    "no-component":{
        name: "Without dropdown",
        link: "/without-dropdown"
    }
}

export default menuItems  