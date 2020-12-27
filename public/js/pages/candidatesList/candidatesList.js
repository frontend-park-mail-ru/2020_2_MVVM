import { checkBoxes } from "Js/components/searchForm/searchForm";
import createElem from "Js/libs/createElem";
import {resumePageURL, resumeSearchURL, spheres} from "Js/libs/constants";
import { network } from "Js/libs/networks";
import searchFormTemp from "Js/components/searchForm/searchForm.tmpl.xml";
import listOfCandidatesTemp from "./components/listOfCandidates/listOfCandidates.tmpl.xml";
import emptyListTemp from "Js/components/emptyList/emptyList.tmpl.xml";

import defaultRes from "Img/defaultRes.png";

const app = window.document.getElementById("main");

export default class CandidatesList {
  constructor(router) {
    this.router = router;
  }

  async render(data) {

    data = await data;
    app.innerHTML='';

    const mainPage = createElem("div", "main", app);
    const container = createElem("div", "container", mainPage);
    const mainRow = createElem("div", "main__row", container);
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
            text: "Среднее cпециальное",
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

    if (data === undefined) {
      data = await network.doGetLimit(resumePageURL, 0, 15);
      console.assert(data.ok);
    }

    await renderResumeList(data, main, mainList, this.router);
    afterRender(mainList, main, this.router);
  }
}

async function renderResumeList(response, main, mainList, router) {
  const resume = await response.json();

  window.scroll(0, 0);

  if (resume && resume.length) {
    mainList.insertAdjacentHTML("beforeend", listOfCandidatesTemp(resume));
    let candDomList = await document.getElementsByClassName(
      "list-row-photo__bg"
    );
    resume.forEach((item, i) => {
      const photo = item.avatar ? item.avatar : defaultRes;
      candDomList[i].style.background = `no-repeat  0 0/cover url(${photo})`;
    });

    // mainRow.insertAdjacentHTML("afterend", window.fest['pagination.tmpl']());
    // main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
    getUserResume(router, main, resume);
  } else {
    mainList.insertAdjacentHTML(
      "beforeend",
      emptyListTemp("Ничего не найдено")
    );
  }
}

function getUserResume(router, main, resume) {
  const linksToResume = main.getElementsByClassName("list-row");
  for (let i = 0; i < linksToResume.length; i++) {
    linksToResume[i].addEventListener("click", (event) => {
      event.preventDefault();
      router.change(`/resume?id=${resume[i].resume_id}`);
    });
  }
}

async function search(form, mainList, main, router) {
  mainList.innerHTML = "";

  const formData = new FormData(form);
  let data = {};
  data.education_level = formData.getAll("education_level");
  data.career_level = formData.getAll("career_level");
  data.area_search = formData.getAll("area_search");
  data.experience_month = await formData.getAll("experience_month");
  data.experience_month.forEach((item, idx, arr) => {
    arr[idx] = parseInt(item);
  });
  data.keywords = formData.get("keywords");
  data.sphere = [];
  formData.getAll("sphere").forEach((item) => {
    let tmp = spheres.indexOf(item);
    if (tmp !== -1) {
      data.sphere.push(tmp);
    }
  });

  const response = await network.doPost(resumeSearchURL, data);
  console.assert(response.ok);
  const searchBlock = document.getElementById("main-navigation");
  if (document.body.className === "is-mobile") {
    searchBlock.classList.add("hide");
    mainList.classList.remove('hide');
  }
  await renderResumeList(response, main, mainList, router);
}

function afterRender(mainList, main, router) {
  checkBoxes();
  let form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    search(form, mainList, main, router);
  });
}
