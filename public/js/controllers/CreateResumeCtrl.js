import CreateResume from "../pages/createCandidateSum/createCandidateSum.js";
import {network} from "../libs/networks.js";
import {addResumeURL} from "../libs/constants.js";

export default class CreateResumeCtrl{
    constructor(router) {
        this.router = router;

        this.page = new CreateResume(async (event, form) => {
            event.preventDefault();

            let formData = new FormData(form);

            const json = {};
            console.log(formData.get("education_month"));


            if (formData.get("description") !== "") {
                json.description = formData.get("description")
            }

            if (formData.get("salary_min") !== "") {
                json.salary_min = parseInt(formData.get("salary_min"))
            }

            if (formData.get("salary_max") !== "") {
                json.salary_max = parseInt(formData.get("salary_max"))
            }

            if (formData.get("gender") !== "") {
                json.gender = formData.get("gender")
            }

            if (formData.get("career_level") !== "") {
                json.level = formData.get("career_level")
            }

            if (formData.get("experience_month") !== "") {
                json.experience_month = parseInt(formData.get("experience_month"))
            }

            if (formData.get("education_level") !== "") {
                json.education = formData.get("education_level")
            }

            console.log(json);

            // const response = await network.doPost(addResumeURL, json);
            //
            // if (response.status >= 200 && response.status < 300) {
            //     const content = await response.json();
            //     console.assert(response.ok);
            //     this.router.change('\/resume', content.resume.user_id, content.resume.id);
            // }

        });
    }
}