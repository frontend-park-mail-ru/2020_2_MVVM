import {NavBarInit} from "../../components/header/navBar.js";
import createElem from "../../libs/createElem.js";
import {network} from "../../libs/networks.js";
import {companyPageURL, companySearchURL, spheres} from "../../libs/constants.js";
import {checkBoxes} from "../../components/searchForm/searchForm.js";

const app = window.document.getElementById('app');

export default class CompaniesList {
    constructor(router) {
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


        const candidatesList = new NavBarInit(app, content, false, "");
        candidatesList.loadNavBar();

        const main = createElem("div", "main", app);
        const container = createElem("div", "container", main);
        const mainRow = createElem("div", "main__row", container);
        mainRow.style.display = "flex";

        mainRow.insertAdjacentHTML("afterbegin", window.fest['searchForm.tmpl'](m));

        const mainList = createElem("div", "main__list", mainRow);

        const response = await network.doGetLimit(companyPageURL, 0, 15);
        console.assert(response.ok);

        await renderCompanyList(response, this.router, mainList, main);
        afterRender(mainList, main, this.router);
    }
}

async function renderCompanyList(response, router, mainList, main) {
    let companies = (await response.json()).companies_list;

    if (companies && companies.length) {
        mainList.insertAdjacentHTML("beforeend", window.fest['companiesList.tmpl'](companies));
        getCompanyPage(router, main, companies);
    } else {
        mainList.insertAdjacentHTML("beforeend", window.fest['emptyList.tmpl']());
    }
}


function afterRender(mainList, main, fetchCompanyInfo, router) {
    checkBoxes();
    let form = document.querySelector("form");
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        search(form, mainList, main, router);
    });
}


async function search(form, mainList, main, router) {
    mainList.innerHTML = '';

    const formData = new FormData(form);
    let data = {};

    data.location = formData.getAll("location");
    data.sphere = formData.getAll("sphere");
    data.keywords = formData.get("keywords");

    const response = await network.doPost(companySearchURL, data);
    console.assert(response.ok);

    await renderCompanyList(response, router, mainList, main);
}


function getCompanyPage(router, main, companies) {
    const linksToCompanyPage = main.getElementsByClassName("go_to_resume");
    for (let i = 0; i < linksToCompanyPage.length; i++) {
        linksToCompanyPage[i].addEventListener('click', event => {
            event.preventDefault();
            router.change('/company', companies[i]);
        })
    }
}