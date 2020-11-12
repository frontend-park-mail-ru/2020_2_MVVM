import CreateResume from "../../pages/createCandidateSum/createCandidateSum.js";
import {network} from "Js/libs/networks";
import {addResumeURL, meUserURL} from "Js/libs/constants";
import {getBase64} from "Js/components/base64FileUpload/base64Upload";

export default class CreateResumeCtrl{
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

        this.page = new CreateResume(loadUser,async (form, jobsArr) => {

            let formData = new FormData(form);
            const json = {};

            const resumeLogo = formData.get("sum__avatar");
            json.avatar = "";
            if (resumeLogo.size !== 0) {
                json.avatar = await getBase64(resumeLogo);
            }

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

            jobsArr.forEach((item)=>{
                let dBegin = new Date(item.begin);
                item.begin = dBegin.toISOString();
                if (item.finish === "today") {
                    item.finish = null;
                } else {
                    let dEnd = new Date(item.finish);
                    item.finish = dEnd.toISOString();
                }
            });

            json.custom_experience = jobsArr;


            const response = await network.doPost(addResumeURL, json);

            if (response.status >= 200 && response.status < 300) {
                const content = await response.json();
                console.assert(response.ok);
                console.log(content);
                this.router.change('\/resume', content);
            } else {
                const errorField = document.getElementsByClassName("error");
                const errLen = errorField.length;
                errorField[errLen-1].innerHTML=`${content.error}`;
            }

        });
    }
}
