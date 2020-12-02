import {
  checkoutProfilePage,
  personalInfo,
} from "./components/personalNavBar/persNavBar.js";
import { updateProfileFields } from "./components/personalInfo/persInfo.js";
import createElem from "Js/libs/createElem";
import persNB from "./components/personalNavBar/persNavBar.tmpl.xml";
import openMenuList from "Js/components/header/phoneNavBar/pNavBar";

const app = window.document.getElementById("app");

export default class Profile {
  constructor(
    router,
    loadResumesF,
    loadVacanciesF,
    loadFavoritesF,
    loadCompanyF,
    loadUserF,
    updateStatusF,
    getMyResponsesF,
    getCompanyByIdF
  ) {
    this.loadResumes = loadResumesF;
    this.loadVacancies = loadVacanciesF;
    this.loadFavorites = loadFavoritesF;
    this.loadCompany = loadCompanyF;
    this.loadUserInfo = loadUserF;
    this.updateStatus = updateStatusF;
    this.getMyResponses = getMyResponsesF;
    this.getCompanyById = getCompanyByIdF;
    this.router = router;
  }

  async render(content) {
    app.innerHTML = "";
    this.vacancies = null;
    this.resumes = null;
    this.company = null;
    this.favorites = null;
    this.responses = null;
    this.user = null;

    const person = (await this.loadUserInfo()).user;

    openMenuList(app, false);

    const main = createElem("div", "main", app);
    const container = createElem("div", "container", main);

    const title = createElem("div", "profile-title", container);

    await this.getMyResponses().then((data) => {
      this.responses = data;
    });

    if (localStorage.getItem("user_type") === "employer") {
      title.innerText = "Личный кабинет работодателя";
      await this.loadVacancies().then((data) => {
        this.vacancies = data.vacancyList;
      });
      await this.loadFavorites().then((data) => {
        this.favorites = data;
      });
      await this.loadCompany().then((data) => {
        this.company = data ? data.company : "";
      });
    } else {
      title.innerText = "Личный кабинет соискателя";
      await this.loadResumes().then((data) => {
        this.resumes = data;
      });
    }
    const mainPage = createElem("div", "main-page", container);
    const body = createElem("div", "main-page__body", mainPage);
    await mainPage.insertAdjacentHTML(
      "afterbegin",
      persNB(localStorage.getItem("user_type"))
    );

    //app.insertAdjacentHTML("beforeend", window.fest['footer.tmpl'](q

    await personalInfo(person, body);
    await checkoutProfilePage(this, content, body, person);
    updateProfileFields(person);
  }
}
