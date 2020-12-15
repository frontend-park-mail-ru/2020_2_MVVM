import CreateResume from "../../pages/createCandidateSum/createCandidateSum.js";
import { network } from "Js/libs/networks";
import { addResumeURL, meUserURL } from "Js/libs/constants";
import { getBase64 } from "Js/components/base64FileUpload/base64Upload";

export default class CreateResumeCtrl {
  constructor(router) {
    this.router = router;

    const loadUser = async () => {
      try {
        const response = await network.doGet(meUserURL);
        const data = await response.json();
        console.assert(response.ok);
        return data;
      } catch (err) {
        console.assert(err);
      }
    };

    this.page = new CreateResume(loadUser, async (form, jobsArr, avatar) => {
      const formData = new FormData(form);
      const json = {};

      // console.log(avatar);
      const resumeLogo = formData.get("sum__avatar");
      // console.log(resumeLogo.size);

      if (!resumeLogo.size) {
        json.avatar = avatar;
      } else {
        const resumeLogo = formData.get("sum__avatar");
        if (resumeLogo !== "") {
          json.avatar = await getBase64(resumeLogo);
        }
      }


      json.cand_name = formData.get('name');
      json.cand_surname = formData.get('surname');
      json.cand_email = formData.get('email');
      json.title = formData.get("title");
      json.description = formData.get("description");
      json.sphere = Number(formData.get("sphere"));
      json.salary_min = parseInt(formData.get("salary_min"));
      json.salary_max = parseInt(formData.get("salary_max"));
      json.place = formData.get("place");
      json.career_level = formData.get("career_level");
      json.experience_month = parseInt(formData.get("experience_month"));
      json.skills = formData.get("skills");
      json.education_level = formData.get("education_level");
      json.area_search = formData.get("area_search");
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


      const response = await network.doPost(addResumeURL, json);
      const content = await response.json();
      console.assert(response.ok);

      if (response.status >= 200 && response.status < 300) {
        this.router.change(`/resume?id=${content.resume.id}`);
      } else {
        const errorField = document.getElementsByClassName("error");
        const errLen = errorField.length;
        errorField[errLen - 1].innerHTML = `${content.error}`;
      }
    });
  }
}
