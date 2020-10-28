import CreateVacancy from "../pages/createEmployerSum/createEmployerSum.js";

import {URL, addVacancyURL} from "../libs/constants.js";

export default class CreateResumeCtrl {
    constructor(router) {
        this.router = router;
        this.page = new CreateVacancy(async (event, form) => {
            event.preventDefault();

            const response = await fetch(
                `${URL}${addVacancyURL}`,
                {
                    body: new FormData(form),
                    method: "post"
                });
            const content = await response.json();
            /*
             console.assert(response.ok);
             console.log(content.resume.user_id);*/
            //this.router.change('\/vacancy', content.resume.user_id, content.resume.id);
        });
    }
}