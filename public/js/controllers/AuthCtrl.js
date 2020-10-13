import AuthList from '../pages/auth/auth.js';
import {SUCCESS, loginURL, UNAUTHORISED} from "../libs/constants.js";
import {network} from "../libs/networks.js";


export default class AuthCtrl {
    constructor(router) {
        this.router = router;

        const onsubmit = async (event, form) => {
            event.preventDefault();
            let errorMes = document.getElementsByClassName("error");
            errorMes[0].innerHTML = '';

            const body = {
                email: form[0][0].value,
                nickname: form[0][1].value,
                password: form[0][2].value,
            };

            const response = await network.doPost(`${loginURL}`, body);

            if (response.status >= 200 && response.status < 300) {
                console.assert(response.ok);
                this.router.change('\/mainPage');
            } else {
                let formAuth = document.getElementsByClassName("auth");
                formAuth[0].insertAdjacentHTML("afterBegin", `<div class="error">Неверное имя пользователя или пароль</div>`);
            }
        }
        this.page = new AuthList(onsubmit);
    }
}