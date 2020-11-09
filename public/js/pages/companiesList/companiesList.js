import {NavBarInit} from "Js/components/header/navBar";
import createElem from "../../libs/createElem.js";
import {network} from "Js/libs/networks";
import {companySearchURL, spheres, companyPageURL, DOMAIN} from "Js/libs/constants";
import {checkBoxes} from "Js/components/searchForm/searchForm";
import searchFormTemp from 'Js/components/searchForm/searchForm.tmpl.xml';
import listOfCompaniesTemp from './components/listOfCompanies/listOfCompanies.tmpl.xml';
import emptyListTemp from 'Js/components/emptyList/emptyList.tmpl.xml';

const app = window.document.getElementById('app');

export default class CompaniesList {
    constructor(fetchCompanyList, router) {
        this.fetchCompanyList = fetchCompanyList;
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
                    name: "area_search",
                    text: "Город"
                },
                fields: [
                    {
                        name: "Москва",
                        text: "Москва"
                    }, {
                        name: "Санкт-петербург",
                        text: "Санкт-Петербург"
                    }, {
                        name: "Екатеринбург",
                        text: "Екатеринбург"
                    }
                ]
            },
        ]

        spheres.forEach((item)=>{
            m[0].fields.push({name:item, text:item});
        });

        const compList = new NavBarInit(app, content, false, "");
        compList.loadNavBar();


        const main = createElem("div", "main", app);
        const container = createElem("div", "container", main);
        const mainRow = createElem("div", "main__row", container);
        mainRow.style.display = "flex";

        mainRow.insertAdjacentHTML("afterbegin", searchFormTemp(m));

        const mainList = createElem("div", "main__list", mainRow);

        const companies = await this.fetchCompanyList();
        console.log(companies);
        await renderCompanyList(companies, mainList, this.router);
        afterRender(mainList, main, this.router);
    }
}

function afterRender(mainList, main,  router) {
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

    data.area_search = formData.getAll("area_search");
    data.spheres = [];
    formData.getAll("sphere").forEach((item)=>{
        let tmp = spheres.indexOf(item);
        if (tmp !== -1) {
            data.spheres.push(tmp);
        }
    });
    data.keywords = formData.get("keywords");
    const companiesResponse = await network.doPost(companySearchURL, data);
    const companies = await companiesResponse.json();
    await renderCompanyList(companies, mainList, router);
}

async function renderCompanyList(companies, mainList, router) {
    if (companies && companies.companyList) {
        companies.companyList.forEach((company) => {
            company.imgPath = `${DOMAIN}static/company/${company.id}`;
        });
        mainList.insertAdjacentHTML("beforeend", listOfCompaniesTemp(companies.companyList));
        getCompanyPage(router, companies.companyList);
        // mainList.insertAdjacentHTML("beforeend", window.fest['pagination.tmpl']());
    } else {
        mainList.insertAdjacentHTML("beforeend",  emptyListTemp("Ничего не найдено"));
    }
    // main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
}


function getCompanyPage(router, company) {
    const linksToCompany = document.getElementsByClassName("go_to_resume");
    for (let i = 0; i < linksToCompany.length; i++) {
        linksToCompany[i].addEventListener('click', event => {
            event.preventDefault();
            router.change('/company', company[i]);
        })
    }
}