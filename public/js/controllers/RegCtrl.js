import RegList from '../pages/reg/reg.js';
import {URL} from "../libs/constants.js";

export default class AuthCtrl {
    constructor(router) {
        this.router = router;


        const onsubmit = async (event, form) => {
            event.preventDefault();

            let formData = new FormData();
            formData.append("nickname", form[0][0].value);
            formData.append("name", form[0][1].value);
            formData.append("surname", form[0][2].value);
            formData.append("email", form[0][3].value);
            formData.append("password", form[0][4].value);

            const response = await fetch(
                `${URL}/v1/users/add`,
                {
                    body: formData,
                    method: "post"
                });
            const content = await response.json();
            console.assert(response.ok);
            if (content.user) {
                this.router.change('\/auth');
            }
        };

        this.page = new RegList(onsubmit);
    }
}
