import createElem from "Js/libs/createElem";
import companyTemp from "./components/companyPage/companyPage.tmpl.xml";
import { spheres } from "Js/libs/constants";

import defaultVac from "Img/defaultVac.png";

const app = window.document.getElementById("main");

const loadCompanyInfo = async (loadCompany) => {
  const company_id = window.location.search.split("id=")[1];
  const info = await loadCompany(company_id);
  const companyInfo = {
    name: info.name,
    location: info.location,
    link: info.link,
    sphere: [],
    avatar: info.avatar ? info.avatar : defaultVac,
    description: info.description,
    count_vacancy: info.vac_count,
  }
  if (info.spheres) {
    info.spheres.forEach((idx) => {companyInfo.sphere.push(spheres[idx]);})
  }
  return companyInfo;
}

export default class CompanyPage {
  constructor(getCompanyInfoF) {
    this.getCompanyInfo = getCompanyInfoF;
  }

  async render() {
    app.innerHTML = "";


    const main = createElem("div", "company-page", app);
    const tmpContent = await loadCompanyInfo(this.getCompanyInfo);


    main.insertAdjacentHTML("afterbegin", companyTemp(tmpContent));
    const photo = document.getElementById("container-left-top__logo");
    photo.style.background = `no-repeat 0 0/cover url(${tmpContent.avatar})`;

    // app.insertAdjacentHTML("beforeend", window.fest['footer.tmpl']());
  }
}
