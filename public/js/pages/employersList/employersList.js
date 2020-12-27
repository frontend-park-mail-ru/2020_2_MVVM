import { checkBoxes } from "Js/components/searchForm/searchForm";
import createElem from "Js/libs/createElem";
import { network } from "Js/libs/networks";
import {spheres, vacancySearchURL} from "Js/libs/constants";
import searchFormTemp from "Js/components/searchForm/searchForm.tmpl.xml";
import listOfEmployersTemp from "./components/listOfEmployers/listOfEmployers.tmpl.xml";
import emptyListTemp from "Js/components/emptyList/emptyList.tmpl.xml";

import defaultVac from "Img/defaultVac.png";

const app = window.document.getElementById("main");

export default class EmployersList {
  constructor(fetchVacancyList, router) {
    this.fetchVacancyList = fetchVacancyList;
    this.router = router;
  }

  async render(data) {
    app.innerHTML = "";
    data = await data;

    // openMenuList(app, true);


    const main = createElem("div", "main", app);
    const container = createElem("div", "container", main);
    const mainRow = createElem("div", "list-page", container);
    mainRow.style.display = "flex";

    const m = [
      {
        title: {
          name: "education_level",
          text: "Уровень образования",
        },
        fields: [
          {
            name: "middle",
            text: "Среднее",
          },
          {
            name: "specialized_secondary",
            text: "Среднее специальное",
          },
          {
            name: "incomplete_higher",
            text: "Неоконченное высшее",
          },
          {
            name: "higher",
            text: "Высшее",
          },
          {
            name: "bachelor",
            text: "Бакалавр",
          },
          {
            name: "master",
            text: "Магистр",
          },
          {
            name: "phD",
            text: "Кандидат наук",
          },
          {
            name: "doctoral",
            text: "Доктор наук",
          },
        ],
      },
      {
        title: {
          name: "career_level",
          text: "Карьерный уровень",
        },
        fields: [
          {
            name: "junior",
            text: "Junior",
          },
          {
            name: "middle",
            text: "Middle",
          },
          {
            name: "senior",
            text: "Senior",
          },
        ],
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
      {
        title: {
          name: "experience_month",
          text: "Опыт работы",
        },
        fields: [
          {
            name: "0",
            text: "Не работал",
          },
          {
            name: "1",
            text: "полгода",
          },
          {
            name: "5",
            text: "один год",
          },
          {
            name: "10",
            text: "больше года",
          },
        ],
      },
    ];

    let arrSpheres = [];
    spheres.forEach((item) => {
      arrSpheres.push({ name: item, text: item });
    });

    m.push({title: {name: "sphere", text: 'Сфера'},fields: arrSpheres});

    mainRow.insertAdjacentHTML("afterbegin", searchFormTemp(m));
    const searchForm = document.getElementById("main-navigation");
    if (document.body.className === "is-mobile") {
      searchForm.classList.add("hide");
    }

    const mainList = createElem("div", "main-list", mainRow);

    let dataJson;
    if (data === undefined) {
      dataJson = await this.fetchVacancyList();
    } else {
      dataJson = await data.json();
    }

    await getVacanciesList(dataJson, main, mainList, this.router);

    // main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
    afterRender(mainList, main, this.fetchVacancyList, this.router);
  }
}

function afterRender(mainList, main, fetchVacancyList, router) {
  checkBoxes();
  let form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    search(form, mainList, main, fetchVacancyList, router);
  });
}

async function search(form, mainList, main, fetchVacancyList, router) {
  mainList.innerHTML = "";

  const formData = new FormData(form);
  let data = {};
  data.education_level = formData.getAll("education_level");
  data.career_level = formData.getAll("career_level");
  data.area_search = formData.getAll("area_search");
  data.keywords = formData.get("keywords");
  data.experience_month = await formData.getAll("experience_month");
  data.experience_month.forEach((item, idx, arr) => {
    arr[idx] = parseInt(item);
  });
  data.sphere = [];
  formData.getAll("sphere").forEach((item) => {
    let tmp = spheres.indexOf(item);
    if (tmp !== -1) {
      data.sphere.push(tmp);
    }
  });

  const response = await network.doPost(vacancySearchURL, data);
  console.assert(response.ok);
  const vacancies = await response.json();
  const searchBlock = document.getElementById("main-navigation");
  if (document.body.className === "is-mobile") {
    searchBlock.classList.add("hide");
    mainList.classList.remove('hide');
  }
  await getVacanciesList(vacancies, main, mainList, router);
}

async function getVacanciesList(vacancies, main, mainList, router) {
  window.scroll(0, 0);
  if (vacancies && vacancies.vacancyList && vacancies.vacancyList.length !== 0) {
    mainList.insertAdjacentHTML(
      "beforeend",
      listOfEmployersTemp(vacancies.vacancyList)
    );
    let vacDomList = await document.getElementsByClassName(
      "list-row-photo__bg"
    );
    vacancies.vacancyList.forEach((vacancy, i) => {
      const photo = vacancy.avatar ? vacancy.avatar : defaultVac;
      vacDomList[i].style.background = `no-repeat  0 0/cover url(${photo})`;
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
      router.change(`/vacancy?vac_id=${vacancy[i].vac_id}&comp_id=${vacancy[i].comp_id}`);
    });
  }
}