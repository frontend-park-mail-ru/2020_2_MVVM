import {NavBarInit} from "Js/components/header/navBar";
import createElem from "../../libs/createElem.js";
import companyTemp from './components/companyPage/companyPage.tmpl.xml'
import {DOMAIN, spheres} from "Js/libs/constants";
import {getBase64} from "Js/components/base64FileUpload/base64Upload";

const app = window.document.getElementById('app');


export default class CompanyPage{
    async render(content, companyInfo) {

        app.innerHTML = '';

        const navBarInit = new NavBarInit(app, content, false);
        navBarInit.loadNavBar();

        const main = createElem("div", "main__company", app);



        let tmpContent = {
            name: companyInfo.name,
            location: companyInfo.location,
            link: companyInfo.link,
            sphere: [],
            avatar: `${DOMAIN}static/company/`+companyInfo.id,
            description: companyInfo.description,
            count_vacancy: companyInfo.vac_count,
        };

        if (companyInfo.spheres) {
            companyInfo.spheres.forEach((idx)=>{
                tmpContent.sphere.push(spheres[idx]);
            });
        }




        main.insertAdjacentHTML("afterbegin", companyTemp(tmpContent));

        // app.insertAdjacentHTML("beforeend", window.fest['footer.tmpl']());
    }
}

