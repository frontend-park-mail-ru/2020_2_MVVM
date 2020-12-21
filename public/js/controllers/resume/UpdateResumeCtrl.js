import UpdateResume from '../../pages/updateResume/updateResume.js';
import { network } from 'Js/libs/networks';
import {addResumeURL, deleteResumeURL, deleteUserURL, updateResumeURL} from 'Js/libs/constants';
import { getBase64 } from 'Js/components/base64FileUpload/base64Upload';

export default class updateResumeCtrl {
  constructor(router) {
    this.router = router;

    const submitF = async (form, jobsArr, avatar) => {
      const formData = new FormData(form);

      const json = {};

      const resumeLogo = formData.get("sum__avatar");
      if (!resumeLogo.size) {
        json.avatar = avatar;
      } else {
        const resumeLogo = formData.get("sum__avatar");
        if (resumeLogo !== "") {
          json.avatar = await getBase64(resumeLogo);
        }
      }

      json.id = formData.get('resume_id');
      json.cand_name = formData.get('name');
      json.cand_surname = formData.get('surname');
      json.cand_email = formData.get('email');
      json.area_search = formData.get('area_search');
      json.title = formData.get('title');
      json.description = formData.get('description');
      json.salary_min = parseInt(formData.get('salary_min'));
      json.salary_max = parseInt(formData.get('salary_max'));
      json.sphere = Number(formData.get("sphere"));

      json.place = formData.get('place');
      json.career_level = formData.get('career_level');
      json.experience_month = parseInt(formData.get('experience_month'));
      json.skills = formData.get('skills');
      json.education_level = formData.get('education_level');
      if (formData.get("awards") !== "") {
        json.awards = formData.get("awards");
      }

      jobsArr.forEach((item) => {
        const dBegin = new Date(item.begin);
        item.begin = dBegin.toISOString();
        if (item.finish === "today") {
          item.finish = null;
        } else {
          const dEnd = new Date(item.finish);
          item.finish = dEnd.toISOString();
        }
      });

      json.custom_experience = jobsArr;

      const response = await network.doPut(addResumeURL, json);

      if (response.status >= 200 && response.status < 300) {
        const content = await response.json();
        console.assert(response.ok);
        this.router.change(`/resume?id=${content.resume.id}`);
      }
    };

    const deleteResume = async (resume_id) => {
      try {
        const response = await network.doDelete(deleteResumeURL+`${resume_id}`);
        console.assert(response.ok);
        this.router.change('/profile');
      } catch (err) {
        console.assert(err);
      }
    }

    this.page = new UpdateResume(router, submitF, deleteResume);
  }
}