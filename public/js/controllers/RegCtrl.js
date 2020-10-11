import RegList from '../pages/reg/reg.js';
import {URL} from "../libs/constants.js";

export default class AuthCtrl {
    constructor(router) {
        this.router = router;

        const onsubmit = async (event, form) => {
            event.preventDefault();

            const body = {
                nickname: form[0][0].value,
                name: form[0][1].value,
                surname: form[0][2].value,
                email: form[0][3].value,
                password: form[0][4].value,
            };

            const response = await fetch(
                `${URL}/v1/users/add`,
                {
                    body: JSON.stringify(body),
                    method: "post"
                });
            const content = await response.json();
            console.assert(response.ok);


            if (content.error){
                let formReg = document.getElementsByClassName("reg");
                formReg[0].insertAdjacentHTML("afterBegin", `<h1>${content.error}</h1>`);
            }
            if (content.user) {
                this.router.change('\/auth');
            }
        };

        this.page = new RegList(onsubmit);
    }
}
