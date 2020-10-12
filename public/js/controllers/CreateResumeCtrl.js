import CreateResume from "../pages/createCandidateSum/createCandidateSum.js";

export default class CreateResumeCtrl{
    constructor(router) {
        this.router = router;

        this.page = new CreateResume(async (event, form) => {
            event.preventDefault();

            let formData = new FormData(form);

            const json = {}

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

            if (formData.get("level") !== "") {
                json.level = formData.get("level")
            }

            if (formData.get("experience_month") !== "") {
                json.experience_month = parseInt(formData.get("experience_month"))
            }

            if (formData.get("education") !== "") {
                json.education = formData.get("education")
            }

            console.debug(json)

            const response = await fetch(
                `${URL}/v1/resume/add`,
                {
                    body: JSON.stringify(json),
                    method: "post"
                });
            const content = await response.json();
            console.log(content);
            console.assert(response.ok);

            console.log(content.resume.user_id);
            this.router.change('\/resume', content.resume.user_id, content.resume.id);
        });
    }
}