import {NavBarInit} from "Js/components/header/navBar";
import createElem from "Js/libs/createElem";
import {network} from "Js/libs/networks";
import {companySearchURL, spheres, companyPageURL, DOMAIN} from "Js/libs/constants";
import {checkBoxes} from "Js/components/searchForm/searchForm";
import searchFormTemp from 'Js/components/searchForm/searchForm.tmpl.xml';
import listOfCompaniesTemp from './components/listOfCompanies/listOfCompanies.tmpl.xml';
import emptyListTemp from 'Js/components/emptyList/emptyList.tmpl.xml';
import openMenuList from "Js/components/header/phoneNavBar/pNavBar";

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

        openMenuList(app, true);


        const main = createElem("div", "main", app);
        const container = createElem("div", "container", main);
        const mainRow = createElem("div", "main__row", container);
        mainRow.style.display = "flex";

        mainRow.insertAdjacentHTML("afterbegin", searchFormTemp(m));

        const searchForm = document.getElementById("main-navigation");
        if (document.body.className === 'is-mobile') {
            searchForm.classList.add("hide");
        }

        const mainList = createElem("div", "main-list", mainRow);

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
    const searchBlock = document.getElementById("main-navigation");
    searchBlock.classList.add("hide");
    await renderCompanyList(companies, mainList, router);
}

async function renderCompanyList(companies, mainList, router) {
    if (companies && companies.companyList) {
        mainList.insertAdjacentHTML("beforeend", listOfCompaniesTemp(companies.companyList));
        let compDomList = await document.getElementsByClassName('list-row-photo__bg');
        companies.companyList.forEach((company, i) => {
            if (company.avatar) {
                compDomList[i].style.background = `no-repeat  0 0/cover url(${company.avatar})`;
            } else {
                //TODO
            }

        });
        getCompanyPage(router, companies.companyList);
        // mainList.insertAdjacentHTML("beforeend", window.fest['pagination.tmpl']());
    } else {
        mainList.insertAdjacentHTML("beforeend",  emptyListTemp("Ничего не найдено"));
    }
    // main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
}


function getCompanyPage(router, company) {
    const linksToCompany = document.getElementsByClassName("list-row");
    for (let i = 0; i < linksToCompany.length; i++) {
        linksToCompany[i].addEventListener('click', event => {
            event.preventDefault();
            router.change('/company', company[i]);
        })
    }
}