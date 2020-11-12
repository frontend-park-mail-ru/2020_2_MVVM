import CreateCompany from "../../pages/createCompanySum/createCompany.js";
import {addCompanyURL} from "Js/libs/constants";
import {network} from "Js/libs/networks";
import {getBase64} from "Js/components/base64FileUpload/base64Upload";


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
            json.area_search = formData.get("area_search");

            const response = await network.doPost(addCompanyURL, json);
            console.log(response);
            const content = await response.json();

            if (response.status >= 200 && response.status < 300) {
                console.log("company New:", content.company);
                console.assert(response.ok);
                console.log(content);
                this.router.change('/company', content.company);
            } else {
                const errorField = document.getElementsByClassName("error");
                const errLen = errorField.length;
                errorField[errLen-1].innerHTML=`Размер изображения слишком большой`;


            }
        });
    }
}