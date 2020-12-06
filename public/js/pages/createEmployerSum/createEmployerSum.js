import createElem from "Js/libs/createElem";
import { spheres } from "Js/libs/constants";
import createEmployerSumTemp from "./components/createEmployerSum/createEmployerSum.tmpl.xml";
import { checkFrom } from "Js/pages/createEmployerSum/components/createEmployerSum/createEmpoyerSum";
import defaultVac from "Img/defaultVac.png";

export const app = window.document.getElementById("main");

export default class CreateVacancy {
  constructor(sendVacancy, loadCompany, loadUserInfo, router) {
    this.sendVacancy = sendVacancy;
    this.loadCompany = loadCompany;
    this.userInfo = loadUserInfo;
    this.router = router;
  }

  async render(content) {
    app.innerHTML = "";
    this.content = {
      user: (await this.userInfo()).user,
      company: null,
      comp_logo: null,
      spheres: spheres,
    };
    await this.loadCompany().then((data) => {
      if (data && data.company) {
        this.content.company = data.company;
        this.content.comp_logo = data.company.avatar;
      } else {
        this.content.comp_logo = defaultVac;
      }
    });


    const main = createElem("div", "main", app);
    main.insertAdjacentHTML("afterbegin", createEmployerSumTemp(this.content));
    const compLogo = document.getElementById("comp-logo__avatar");
    compLogo.style.background = `no-repeat 0 0/cover url(${this.content.comp_logo})`;

    const form = main.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      afterRenderVacancy(this.sendVacancy, form);
    });
  }
}

function afterRenderVacancy(submitF, form) {
  checkFrom(submitF, form);
}