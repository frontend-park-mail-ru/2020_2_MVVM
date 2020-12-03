import createElem from "Js/libs/createElem";
import searchJobTemp from "Js/pages/mainPage/components/searchJob/searchJob.tmpl.xml";
import categoryTemp from "Js/pages/mainPage/components/category/category.tmpl.xml";
import createResumeTemp from "Js/pages/mainPage/components/createResume/createResume.tmpl.xml";
import openMenu from "Js/components/header/phoneNavBar/pNavBar";

const app = window.document.getElementById("main");

export default class MainPage {
  render(content) {

    app.innerHTML='';
    // openMenu(app, false);

    const mainPage = createElem("div", "main-page", app);
    mainPage.insertAdjacentHTML(
      "afterbegin",
      searchJobTemp("Самый простой способ найти новую работу")
    );

    const category = [
      {
        name: "Дизайн",
        count: "22",
      },
      {
        name: "Образование",
        count: "22",
      },
      {
        name: "Финансы",
        count: "22",
      },
      {
        name: "Телекоммуникации",
        count: "22",
      },
      {
        name: "Рестораны",
        count: "22",
      },
      {
        name: "Промышленность",
        count: "22",
      },
      {
        name: "Здоровье",
        count: "22",
      },
      {
        name: "Рестораны",
        count: "22",
      },
    ];

    mainPage.insertAdjacentHTML("beforeend", categoryTemp(category));
    mainPage.insertAdjacentHTML(
      "beforeend",
      createResumeTemp(localStorage.getItem("user_type"))
    );

    // const jobs = [
    //     {
    //         position: 'Web Designer / Developer',
    //         nameCompany: 'Massimo Artemisis',
    //         logo: 'img/l1.png',
    //         location: 'Sacramento, California',
    //         schedule: 'Full time',
    //         durationPublic: '5 месяцев назад',
    //     },
    //     {
    //         position: 'C Developer (Senior) C .Net',
    //         nameCompany: 'Massimo Artemisis',
    //         logo: 'img/l2.png',
    //         location: 'Sacramento, California',
    //         schedule: 'Full time',
    //         durationPublic: '5 месяцев назад',
    //     },
    // ]
    // main.insertAdjacentHTML("beforeend", popularJobTemp(jobs));

    // app.insertAdjacentHTML("beforeend", footerTemp());
  }
}
