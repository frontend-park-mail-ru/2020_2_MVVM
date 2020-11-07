import CreateCompany from "../../pages/createCompanySum/createCompany.js";

import {addCompanyUrl} from "../../libs/constants.js";
import {network} from "../../libs/networks.js";
import {getBase64} from "../../components/base64FileUpload/base64Upload.js";


export default class CreateCompanyCtrl {
    constructor(router) {
        this.router = router;
        this.page = new CreateCompany(async (form, cbArr) => {
            const formData = new FormData(form),
                compLogo = formData.get("sum__avatar"),
                json = {};
            json.avatar = "";
            if (compLogo !== "") {
                json.avatar = await getBase64(compLogo);
            }
            json.name = formData.get("name");
            json.description = formData.get("description");
            json.spheres = cbArr;
            json.link = formData.get("link");
            json.location = formData.get("location");
            const response = await network.doPost(addCompanyUrl, json);
            const content = await response.json();
            if (response.status >= 200 && response.status < 300) {
                console.log("company New:", content.company);
                console.assert(response.ok);
                this.router.change('\/company', content.company.id);
            } else {
                console.log("Error in company creation", content.error);
            }
        });
    }
}