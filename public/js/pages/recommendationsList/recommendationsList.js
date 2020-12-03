import createElem from "Js/libs/createElem";
import { DOMAIN } from "Js/libs/constants";
import listOfEmployersTemp from "./components/listOfEmployers/listOfRecommendations.tmpl.xml";
import emptyListTemp from "Js/components/emptyList/emptyList.tmpl.xml";

import openMenuList from "Js/components/header/phoneNavBar/pNavBar";

const app = window.document.getElementById("main");

export default class RecommendationsList {
  constructor(fetchVacancyList, router) {
    this.fetchVacancyList = fetchVacancyList;
    this.router = router;
  }

  async render(content) {
    app.innerHTML = "";

    // openMenuList(app, false);

    const main = createElem("div", "main", app);
    const container = createElem("div", "container", main);
    const mainRow = createElem("div", "list-page", container);
    mainRow.style.display = "flex";

    const mainList = createElem("div", "main-list", mainRow);

    const vacancies = await this.fetchVacancyList();
    await getVacanciesList(vacancies, main, mainList, this.router);
  }
}

async function getVacanciesList(vacancies, main, mainList, router) {
  if (vacancies && vacancies.vacancyList) {
    mainList.insertAdjacentHTML(
      "beforeend",
      listOfEmployersTemp(vacancies.vacancyList)
    );
    let vacDomList = await document.getElementsByClassName(
      "list-row-photo__bg"
    );
    vacancies.vacancyList.forEach((vacancy, i) => {
      vacDomList[
        i
      ].style.background = `no-repeat  0 0/cover url(${vacancy.avatar})`;
    });
    // mainList.insertAdjacentHTML("beforeend", paginationTemp());
    getEmplVacancy(router, main, vacancies.vacancyList);
  } else {
    mainList.insertAdjacentHTML(
      "beforeend",
      emptyListTemp("Ничего не найдено")
    );
  }
}

function getEmplVacancy(router, main, vacancy) {
  const vacNameLink = main.getElementsByClassName("list-row");
  for (let i = 0; i < vacNameLink.length; i++) {
    vacNameLink[i].addEventListener("click", (event) => {
      event.preventDefault();
      router.change("/vacancy", vacancy[i].vac_id, vacancy[i].comp_id);
    });
  }
}