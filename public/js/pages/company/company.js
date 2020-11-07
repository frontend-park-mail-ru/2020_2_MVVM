import {NavBarInit} from "../../components/header/navBar.js";
import createElem from "../../libs/createElem.js";
import companyTemp from './components/companyPage/companyPage.tmpl.xml'

const app = window.document.getElementById('app');


export default class CompanyPage{
    async render(content, companyInfo) {

        app.innerHTML = '';

        const navBarInit = new NavBarInit(app, content, false);
        navBarInit.loadNavBar();

        const main = createElem("div", "main__company", app);



        const tmpContent = {
            name: companyInfo.name,
            location: companyInfo.location,
            link: companyInfo.link,
            avatar: "https://hhcdn.ru/employer-logo/1957143.jpeg",
            sphere: companyInfo.spheres,
            description: companyInfo.description,
            count_vacancy: companyInfo.vac_count,
        }


        main.insertAdjacentHTML("afterbegin", companyTemp(tmpContent));

        // app.insertAdjacentHTML("beforeend", window.fest['footer.tmpl']());
    }
}

