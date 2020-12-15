import {network} from "Js/libs/networks";
import {addVacancyURL, deleteVacancyURL, vacancyByIdURL} from "Js/libs/constants";
import UpdateVacancy from "Js/pages/updateVacancy/updateVacancy";


export default class updateVacancyCtrl {
  constructor(router) {
    this.router = router;

    const submitF = async (form) => {
      const formData = new FormData(form);
      let json = {};

      json.title = formData.get("name");
      json.description = formData.get("description");
      json.salary_min = parseInt(formData.get("salary_min").toString());
      json.salary_max = parseInt(formData.get("salary_max").toString());
      json.requirements = formData.get("requirements");
      json.duties = formData.get("duties");
      json.sphere = Number(formData.get("sphere"));
      json.skills = formData.get("skills");
      json.employment = formData.get("employment");
      json.experience_month = parseInt(formData.get("experience_month"));
      json.location = formData.get("location");
      json.career_level = formData.get("career_level");
      json.education_level = formData.get("education_level");
      json.email = formData.get("email");
      json.phone = formData.get("phone");
      json.area_search = formData.get("area_search");

      const response = await network.doPost(addVacancyURL, json);
      const content = await response.json();

      if (response.status >= 200 && response.status < 300) {
        console.assert(response.ok);
        this.router.change(
          `/vacancy?vac_id=${content.vacancy.vac_id}&comp_id=${content.vacancy.comp_id}`);
      } else {
        const errorField = document.getElementsByClassName("error");
        const errLen = errorField.length;
        errorField[errLen - 1].innerHTML = `${content.error}`;
      }
    };

    const deleteVacancy = async (vacancy_id) => {
      try {
        const response = await network.doDelete(deleteVacancyURL+`${vacancy_id}`);
        console.assert(response.ok);
        this.router.change('/profile');
      } catch (err) {
        console.assert(err);
      }
    }

    const loadVacancyInfo = async (vacancy_id) => {
      try {
        const response = await network.doGet(vacancyByIdURL+`${vacancy_id}`);
        const data = await response.json();
        console.assert(response.ok);
        if (data) {
          return data.vacancy;
        }
      } catch (err) {
        console.assert(err);
      }
    }

    this.page = new UpdateVacancy(router, submitF, deleteVacancy, loadVacancyInfo);
  }
}