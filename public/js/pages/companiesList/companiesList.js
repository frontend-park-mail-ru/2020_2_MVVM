import {NavBarInit} from "../../components/header/navBar.js";
import createElem from "../../libs/createElem.js";
import {network} from "../../libs/networks.js";
import {companySearchUrl, spheres} from "../../libs/constants.js";
import {checkBoxes} from "../../components/searchForm/searchForm.js";
import searchFormTemp from 'Js/components/searchForm/searchForm.tmpl.xml'
import companiesListTemp from'./components/companiesList/companiesLisr.tmpl.xml'
import emptyListTemp from 'Js/components/emptyList/emptyList.tmpl.xml'

const app = window.document.getElementById('app');

export default class CompaniesList {
    constructor(fetchCompanyInfo, router) {
        this.fetchCompanyInfo = fetchCompanyInfo;
        this.router = router;
    }

    async render(content) {
        app.innerHTML = '';

        let m = [
            {
                title: {
                    name: "sphere",
                    text: "Сфера"
                },
                fields: []
            },
            {
                title: {
                    name: "location",
                    text: "Город"
                },
                fields: [
                    {
                        name: "москва",
                        text: "Москва"
                    }, {
                        name: "санкт-петербург",
                        text: "Санкт-Петербург"
                    }, {
                        name: "екатеринбург",
                        text: "Екатеринбург"
                    }
                ]
            },
        ]

        spheres.forEach((item)=>{
            m[0].fields.push({name:item, text:item});
        });


        console.log(m);

        const candidatesList = new NavBarInit(app, content, false, "");
        candidatesList.loadNavBar();

        const main = createElem("div", "main", app);
        const container = createElem("div", "container", main);
        const mainRow = createElem("div", "main__row", container);
        mainRow.style.display = "flex";

        mainRow.insertAdjacentHTML("afterbegin", searchFormTemp(m));

        const mainList = createElem("div", "main__list", mainRow);

        // const response = await network.doGetLimit(companySearchUrl, 0, 15);
        // console.assert(response.ok);
        // const resume = (await response.json()).resume;
        //
        // if (resume && resume.length) {
        //     const infoOfCand = await this.fetchCandInfo(resume);
        //     mainList.insertAdjacentHTML("beforeend", window.fest['listOfCandidates.tmpl'](infoOfCand));
        //     mainRow.insertAdjacentHTML("afterend", window.fest['pagination.tmpl']());
        //     // main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
        //     getUserResume(this.router, main, infoOfCand);
        // } else {
        //     mainList.insertAdjacentHTML("beforeend", window.fest['emptyList.tmpl']());
        // }
        afterRender(mainList, main, this.fetchCompanyInfo, this.router);
    }
}

function afterRender(mainList, main, fetchCOmpanyInfo, router) {
    checkBoxes();
    let form = document.querySelector("form");
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        search(form, mainList, main, fetchCOmpanyInfo, router);
    });
}


async function search(form, mainList, main, fetchCompanyInfo, router) {
    mainList.innerHTML = '';

    const formData = new FormData(form);
    let data = {};

    data.location = formData.getAll("location");
    data.sphere = formData.getAll("sphere");
    data.keywords = formData.get("keywords");

    const response = await network.doPost(companySearchUrl, data);
    console.assert(response.ok);
    const companies = (await response.json()).resume;
    console.log(companies);

    if (companies && companies.length) {
        const infoOfCompany = await fetchCompanyInfo(companies);
        mainList.insertAdjacentHTML("beforeend", companiesListTemp(infoOfCompany));
        // getUserResume(router, main, infoOfCand);
    } else {
        mainList.insertAdjacentHTML("beforeend", emptyListTemp());
        const pagination = document.getElementsByClassName("pagination");
        pagination[0].innerHTML = '';
    }
}