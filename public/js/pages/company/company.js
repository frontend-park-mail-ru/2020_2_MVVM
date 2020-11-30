import createElem from "Js/libs/createElem";
import companyTemp from "./components/companyPage/companyPage.tmpl.xml";
import { spheres } from "Js/libs/constants";
import openMenuList from "Js/components/header/phoneNavBar/pNavBar";

import defaultVac from "Img/defaultVac.png";

const app = window.document.getElementById("app");

export default class CompanyPage {
  async render(content, companyInfo) {
    app.innerHTML = "";

    openMenuList(app, false);

    const main = createElem("div", "company-page", app);

    let tmpContent = {
      name: companyInfo.name,
      location: companyInfo.location,
      link: companyInfo.link,
      sphere: [],
      avatar: companyInfo.avatar ? companyInfo.avatar : defaultVac,
      description: companyInfo.description,
      count_vacancy: companyInfo.vac_count,
    };

    if (companyInfo.spheres) {
      companyInfo.spheres.forEach((idx) => {
        tmpContent.sphere.push(spheres[idx]);
      });
    }

    main.insertAdjacentHTML("afterbegin", companyTemp(tmpContent));
    const photo = document.getElementById("container-left-top__logo");
    photo.style.background = `no-repeat 0 0/cover url(${tmpContent.avatar})`;

    // app.insertAdjacentHTML("beforeend", window.fest['footer.tmpl']());
  }
}
