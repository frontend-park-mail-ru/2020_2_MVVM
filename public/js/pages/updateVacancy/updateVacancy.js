import createElem from "Js/libs/createElem";
import updateVacancyTemp from "Js/pages/updateVacancy/components/updateVacancy/updateVacancy.tmpl.xml";
import {network} from "Js/libs/networks";
import {spheres, vacancyByIdURL} from "Js/libs/constants";
import {afterRenderVacancy} from "Js/pages/createEmployerSum/createEmployerSum"


export const app = window.document.getElementById("main");

export default class UpdateVacancy {
  constructor(router, submitF, deleteVacancyF, loadVacancyInfoF) {
    this.router = router;
    this.submit = submitF;
    this.deleteVacancy = deleteVacancyF;
    this.loadVacancyInfo = loadVacancyInfoF;
  }

  async render() {
    app.innerHTML = "";
    const windLocationSearch = window.location.search;

    const vacancyInfo = await this.loadVacancyInfo(windLocationSearch.split('vac_id=')[1].split('&')[0]);
    vacancyInfo.spheres = spheres;
    vacancyInfo.sphere = vacancyInfo.sphere.toString();
    console.log(vacancyInfo);
    const main = createElem("div", "main", app);
    main.insertAdjacentHTML("afterbegin", updateVacancyTemp(vacancyInfo));

    const deleteVacancy = document.getElementById('deleteVacancy');
    deleteVacancy.addEventListener('click', ()=>{
      this.deleteVacancy(vacancyInfo.vac_id);
    })

    const form = main.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      afterRenderVacancy(this.submit, form);
    });
  }
}