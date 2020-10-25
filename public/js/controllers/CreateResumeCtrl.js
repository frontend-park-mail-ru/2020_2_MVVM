import CreateResume from "../pages/createCandidateSum/createCandidateSum.js";
import {network} from "../libs/networks.js";
import {addResumeURL} from "../libs/constants.js";

export default class CreateResumeCtrl{
    constructor(router) {
        this.router = router;

        this.page = new CreateResume(async (form, jobsArr) => {


            let formData = new FormData(form);

            const json = {};

            json.title = formData.get("title");
            json.description = formData.get("description");
            json.salary_min = parseInt(formData.get("salary_min"));
            json.salary_max = parseInt(formData.get("salary_max"));
            if (formData.get("gender") !== "") {
                json.gender = formData.get("gender");
            }
            json.place = formData.get("place");
            json.career_level = formData.get("career_level");
            json.experience_month = parseInt(formData.get("experience_month"));
            json.skills = formData.get("skills");
            json.education_level = formData.get("education_level");
            json.area_search = formData.get("area_search");
            if (formData.get("awards") !== "") {
                json.awards = formData.get("awards");
            }
            json.custom_experience = jobsArr;

            console.log(json);
            const response = await network.doPost(addResumeURL, json);

            if (response.status >= 200 && response.status < 300) {
                const content = await response.json();
                console.assert(response.ok);
                this.router.change('\/resume', content.resume.user_id, content.resume.id);
            }

        });
    }
}