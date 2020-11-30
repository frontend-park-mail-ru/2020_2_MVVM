import Resume from '../../pages/resume/resume.js';
import {network} from "Js/libs/networks";
import {createRespURL, myFreeVacanciesURL} from "Js/libs/constants";

export default class ResumeCtrl {
  constructor(router) {
    this.router = router;

    const createResp = async (resume_id, vacancy_id) => {
      try {
        const response = await network.doPost(createRespURL, {
          resume_id: resume_id,
          vacancy_id: vacancy_id,
        });
        const data = await response.json();
        console.assert(response.ok);
        return data;
      } catch (err) {
        console.assert(err);
      }
    };

    const loadMyVacancies = async (resume_id) => {
      try {
        const response = await network.doGet(
          myFreeVacanciesURL + `${resume_id}`
        );
        const data = await response.json();
        console.assert(response.ok);
        return data;
      } catch (err) {
        console.assert(err);
      }
    };

    this.page = new Resume(router, createResp, loadMyVacancies);
  }
}