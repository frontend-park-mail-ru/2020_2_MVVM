import CreateVacancy from "../../pages/createEmployerSum/createEmployerSum.js";
import {addVacancyURL, companyMineURL} from "../../libs/constants.js";
import {network} from "../../libs/networks.js";
import {getBase64} from "../../components/base64FileUpload/base64Upload.js";


export default class CreateResumeCtrl {
    constructor(router) {
        this.router = router;
        const loadCompany = async () => {
            try {
                const response = await network.doGet(companyMineURL);
                const data = await response.json();
                console.assert(response.ok);
                return data;
            } catch (err) {
                console.assert(err);
            }
        };

        const sendVacancy = async (event, form) => {
            event.preventDefault();
            const formData = new FormData(form),
                avatar = formData.get("sum__avatar"),
                json = {};
            json.avatar = "";
            if (avatar !== "") {
                json.avatar = await getBase64(avatar);
            }
            json.title = formData.get("name");
            json.description = formData.get("description");
            json.salary_min = parseInt(formData.get("salary_min").toString());
            json.salary_max = parseInt(formData.get("salary_max").toString());
            json.requirements = formData.get("requirements");
            json.duties = formData.get("duties");
            //json.sphere = formData.get("sphere");
            json.sphere = 0;
            json.skills = formData.get("skills");
            json.employment = formData.get("employment");
            json.experince_work = formData.get("experience_month");
            json.location = formData.get("location");
            json.career_level = formData.get("career_level");
            json.education_level = formData.get("education_level");
            json.email = formData.get("email");
            json.phone = formData.get("phone");
            const response = await network.doPost(addVacancyURL, json);
            if (response.status >= 200 && response.status < 300) {
                const content = await response.json();
                console.assert(response.ok);
                console.log("vacancy New:", content)
                this.router.change('\/vacancy', content.vacancy.empl_id, content.vacancy.vac_id, content.vacancy.comp_id);
            }
        }

        this.page = new CreateVacancy(sendVacancy, loadCompany, router);
    }
}