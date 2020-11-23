import {NavBarInit} from "Js/components/header/navBar";
import createElem from "Js/libs/createElem";
import companyTemp from './components/companyPage/companyPage.tmpl.xml'
import {DOMAIN, spheres} from "Js/libs/constants";
import openMenuList from "Js/components/header/phoneNavBar/pNavBar";

const app = window.document.getElementById('app');


export default class CompanyPage{
    async render(content, companyInfo) {

        app.innerHTML = '';

        openMenuList(app, false);

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
        let imgs = document.getElementsByClassName("pageOfCompImg");
        for (let i=0; i<imgs.length;i++){
            imgs[i].onerror = ()=>{imgs[i].src = `${DOMAIN}static/company/default.png`};
            //TODO change path
        }

        // app.insertAdjacentHTML("beforeend", window.fest['footer.tmpl']());
    }
}

