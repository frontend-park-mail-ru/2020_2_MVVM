import AuthList from '../pages/auth/auth.js';
import {SUCCESS,URL} from "../libs/constants.js";

export default class AuthCtrl {
    constructor(router) {
        this.router = router;

        const onsubmit = async (event, form) => {
            event.preventDefault();

            let formData = new FormData();
            formData.append("email", form[0][0].value)
            formData.append("nickname", form[0][1].value)
            formData.append("password", form[0][2].value)

            const response = await fetch(
                `${URL}/v1/auth/login`,
                {
                    credentials: "include",
                    body: formData,
                    method: "post",
                },
            )
            const content = await response.json();
            console.assert(response.ok);
            if (content.code === SUCCESS) {
                this.router.change('\/mainPage');
            }
        }
        this.page = new AuthList(onsubmit);
    }
}