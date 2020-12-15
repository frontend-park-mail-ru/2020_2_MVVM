import Resume from '../../pages/resume/resume.js';
import {network} from "Js/libs/networks";
import {
  addLikeResumeURL,
  createRespURL,
  deleteLikeResumeURL,
  getLikeURL,
  myFreeVacanciesURL,
  resumeByIdURL
} from "Js/libs/constants";

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

    const isLiked = async (resume_id) => {
      try {
        const response = await network.doGet(
          getLikeURL + `${resume_id}`
        );
        const data = await response.json();
        console.assert(response.ok);
        return data.favorite_id;
      } catch (err) {
        console.assert(err);
      }
    }

    const responseResume = async (resume_id) => {
      try {
        const responseResume = await network.doGet(
          `${resumeByIdURL}${resume_id}`
        );
        console.assert(responseResume.ok);
       return await responseResume.json();
      } catch (err) {
        console.assert(err);
      }
    }

    const addLike = async (resume_id) => {
      try {
        const addLikeResp = await network.doPost(
          addLikeResumeURL + `${resume_id}`
        );
        console.assert(addLikeResp.ok);
        const res = await addLikeResp.json();
        return res.favorite_id;
      } catch (err) {
        console.assert(err);
      }
    }

    const deleteLike = async (is_favorite) => {
      try {
        const addLikeResp = await network.doDelete(
          deleteLikeResumeURL + `${is_favorite}`
        );
        console.assert(addLikeResp.ok);
      } catch (err) {
        console.assert(err);
      }
    }


    this.page = new Resume(router, createResp, loadMyVacancies, isLiked, responseResume, addLike, deleteLike);
  }
}