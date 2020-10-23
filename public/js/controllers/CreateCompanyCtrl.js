import CreateCompany from "../pages/createCompanySum/createCompany.js";
import {network} from "../libs/networks.js";
import {addResumeURL} from "../libs/constants.js";

export default class CreateCompanyCtrl {
    constructor(router) {
        this.router = router;
        this.page = new CreateCompany( async (form, cbArr) => {

            let formData = new FormData(form);

            const json = {};

            json.description = formData.get("description");
            json.name = formData.get("name");
            json.link = formData.get("link");
            json.location = formData.get("location");
            json.sphere = cbArr;

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