import createElem from "Js/libs/createElem";
import { network } from "Js/libs/networks";
import { companySearchURL, spheres } from "Js/libs/constants";
import { checkBoxes } from "Js/components/searchForm/searchForm";
import searchFormTemp from "Js/components/searchForm/searchForm.tmpl.xml";
import listOfCompaniesTemp from "./components/listOfCompanies/listOfCompanies.tmpl.xml";
import emptyListTemp from "Js/components/emptyList/emptyList.tmpl.xml";
import openMenuList from "Js/components/header/phoneNavBar/pNavBar";

import defaultVac from "Img/defaultVac.png";

const app = window.document.getElementById("main");

export default class CompaniesList {
  constructor(fetchCompanyList, router) {
    this.fetchCompanyList = fetchCompanyList;
    this.router = router;
  }

  async render() {

    app.innerHTML = '';

    let m = [
      {
        title: {
          name: "sphere",
          text: "Сфера",
        },
        fields: [],
      },
      {
        title: {
          name: "area_search",
          text: "Город",
        },
        fields: [
          {
            name: "Москва",
            text: "Москва",
          },
          {
            name: "Санкт-петербург",
            text: "Санкт-Петербург",
          },
          {
            name: "Екатеринбург",
            text: "Екатеринбург",
          },
        ],
      },
    ];

    spheres.forEach((item) => {
      m[0].fields.push({ name: item, text: item });
    });

    // openMenuList(app, true);

    const main = createElem("div", "main", app);
    const container = createElem("div", "container", main);
    const mainRow = createElem("div", "main__row", container);
    mainRow.style.display = "flex";

    mainRow.insertAdjacentHTML("afterbegin", searchFormTemp(m));

    const searchForm = document.getElementById("main-navigation");
    if (document.body.className === "is-mobile") {
      searchForm.classList.add("hide");
    }

    const mainList = createElem("div", "main-list", mainRow);

    const companies = await this.fetchCompanyList();
    await renderCompanyList(companies, mainList, this.router);
    afterRender(mainList, main, this.router);
  }
}

function afterRender(mainList, main, router) {
  checkBoxes();
  let form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    search(form, mainList, main, router);
  });
}

async function search(form, mainList, main, router) {
  mainList.innerHTML = "";

  const formData = new FormData(form);
  let data = {};

  data.area_search = formData.getAll("area_search");
  data.sphere = [];
  formData.getAll("sphere").forEach((item) => {
    let tmp = spheres.indexOf(item);
    if (tmp !== -1) {
      data.sphere.push(tmp);
    }
  });
  data.keywords = formData.get("keywords");
  const companiesResponse = await network.doPost(companySearchURL, data);
  const companies = await companiesResponse.json();
  const searchBlock = document.getElementById("main-navigation");
  if (document.body.className === "is-mobile") {
    searchBlock.classList.add("hide");
    mainList.classList.remove('hide');
  }
  await renderCompanyList(companies, mainList, router);
}

async function renderCompanyList(companies, mainList, router) {
  window.scroll(0, 0);
  if (companies && companies.companyList) {
    mainList.insertAdjacentHTML(
      "beforeend",
      listOfCompaniesTemp(companies.companyList)
    );
    let compDomList = await document.getElementsByClassName(
      "list-row-photo__bg"
    );
    companies.companyList.forEach((company, i) => {
      const photo = company.avatar ? company.avatar : defaultVac;
      compDomList[i].style.background = `no-repeat  0 0/cover url(${photo})`;
    });
    getCompanyPage(router, companies.companyList);
    // mainList.insertAdjacentHTML("beforeend", window.fest['pagination.tmpl']());
  } else {
    mainList.insertAdjacentHTML(
      "beforeend",
      emptyListTemp("Ничего не найдено")
    );

  }
  // main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
}

function getCompanyPage(router, company) {
  const linksToCompany = document.getElementsByClassName("list-row");
  for (let i = 0; i < linksToCompany.length; i++) {
    linksToCompany[i].addEventListener("click", (event) => {
      event.preventDefault();
      router.change(`/company?id=${company[i].id}`);
    });
  }
}