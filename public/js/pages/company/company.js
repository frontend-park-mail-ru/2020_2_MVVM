import createElem from "Js/libs/createElem";
import companyTemp from "./components/companyPage/companyPage.tmpl.xml";
import { spheres } from "Js/libs/constants";
import emptyListTemp from "Js/components/emptyList/emptyList.tmpl.xml";
import defaultVac from "Img/defaultVac.png";

const app = window.document.getElementById("main");

const loadCompanyInfo = async (loadCompany) => {
  const company_id = window.location.search.split("id=")[1];
  const info = await loadCompany(company_id);
  const companyInfo = {
    company_id: company_id,
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
  constructor(router, getCompanyInfoF, getCompaniesVacF) {
    this.getCompanyInfo = getCompanyInfoF;
    this.getCompaniesVac = getCompaniesVacF;
    this.router = router;
  }

  async render() {
    app.innerHTML = "";


    const main = createElem("div", "company-page", app);
    const tmpContent = await loadCompanyInfo(this.getCompanyInfo);
    tmpContent.vacancy = await this.getCompaniesVac(tmpContent.company_id);
    main.insertAdjacentHTML("afterbegin", companyTemp(tmpContent));
    let vacDomList = await document.getElementsByClassName(
      "list-row-photo__bg"
    );

    const vacancyBlock = document.getElementsByClassName('list-row');
    if (tmpContent.vacancy) {
      tmpContent.vacancy.forEach((vacancy, i) => {
        const photo = vacancy.avatar ? vacancy.avatar : defaultVac;
        vacDomList[i].style.background = `no-repeat  0 0/cover url(${photo})`;
        vacancyBlock[i].addEventListener("click", (event) => {
          event.preventDefault();
          this.router.change(`/vacancy?vac_id=${vacancy.vac_id}&comp_id=${vacancy.comp_id}`);
        });
      });
    } else {
      const vacList = document.getElementsByClassName('company-vacancies')[0];
      vacList.insertAdjacentHTML('beforeend', emptyListTemp('Вакансий пока нет'));
    }

    const photo = document.getElementById("container-left-top__logo");
    photo.style.background = `no-repeat 0 0/cover url(${tmpContent.avatar})`;

    // app.insertAdjacentHTML("beforeend", window.fest['footer.tmpl']());
  }
}
