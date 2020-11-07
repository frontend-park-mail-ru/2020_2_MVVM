import {NavBarInit} from "../../components/header/navBar.js";
import createElem from "../../libs/createElem.js";
import {network} from "../../libs/networks.js";
import {companySearchUrl, spheres, companyPageURL} from "../../libs/constants.js";
import {checkBoxes} from "../../components/searchForm/searchForm.js";

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
        const compList = new NavBarInit(app, content, false, "");
        compList.loadNavBar();

        const main = createElem("div", "main", app);
        const container = createElem("div", "container", main);
        const mainRow = createElem("div", "main__row", container);
        mainRow.style.display = "flex";

        mainRow.insertAdjacentHTML("afterbegin", window.fest['searchForm.tmpl'](m));

        const mainList = createElem("div", "main__list", mainRow);
        const companies = await this.fetchCompanyList();
        await renderCompanyList(companies, mainList)
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

function checkCreateOrg(form) {
    let cbArr = []
    const cb = document.getElementById("checkboxes");
    for (let i = 0; i < cb.childElementCount; i++) {
        if (cb.children[i].children[0].checked) {
            cbArr.push(parseInt(cb.children[i].children[0].id))
        }
    }
    return cbArr
}


async function search(form, mainList, main, router) {
    mainList.innerHTML = '';

    const formData = new FormData(form);
    let data = {};

    data.location = formData.getAll("location");

    //TODO: spheres by int index
    //data.spheres = formData.getAll("sphere");
    data.keywords = formData.get("keywords");
    const companies = await network.doPost(companySearchUrl, data)
    await renderCompanyList(companies, mainList)
}

async function renderCompanyList(companies, mainList) {
    if (companies && companies.companyList) {
        companies.companyList.forEach((company) => {
            company.imgPath = `static/company/${company.id}`;
        });
        mainList.insertAdjacentHTML("beforeend", window.fest['listOfCompanies.tmpl'](companies.companyList));
        mainList.insertAdjacentHTML("beforeend", window.fest['pagination.tmpl']());
    } else {
        mainList.insertAdjacentHTML("beforeend", window.fest['emptyList.tmpl']());
    }
    // main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
}
