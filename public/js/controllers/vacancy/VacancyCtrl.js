import Vacancy from "../../pages/vacancy/vacancy.js";
import {network} from "Js/libs/networks";
import {createRespURL, myFreeResumesURL} from "Js/libs/constants";

export default class VacancyCtrl {
  constructor(router) {
    this.router = router;

    const createResp = async (vacancy_id, resume_id) => {
      try {
        const response = await network.doPost(createRespURL, {
          vacancy_id: vacancy_id,
          resume_id: resume_id,
        });
        const data = await response.json();
        console.assert(response.ok);
        return data;
      } catch (err) {
        console.assert(err);
      }
    };

    const loadMyResumes = async (vacancy_id) => {
      try {
        const response = await network.doGet(
          myFreeResumesURL + `${vacancy_id}`
        );
        const data = await response.json();
        console.assert(response.ok);
        return data;
      } catch (err) {
        console.assert(err);
      }
    };

    this.page = new Vacancy(router, createResp, loadMyResumes);
  }
}