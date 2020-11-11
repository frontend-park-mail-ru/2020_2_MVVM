import AuthList from '../../pages/auth/auth.js';
import {SUCCESS, loginURL, UNAUTHORISED} from "Js/libs/constants";
import {network} from "Js/libs/networks";


export default class AuthCtrl {
    constructor(router) {
        this.router = router;

        const onsubmit = async (event, form) => {
            event.preventDefault();
            let errorMes = document.getElementsByClassName("error");
            errorMes[0].innerHTML = '';

            const formData = new FormData(form);

            const body = {
                email: formData.get("email"),
                password: formData.get("password"),
            };

            const response = await network.doPost(`${loginURL}`, body);

            if (response.status >= 200 && response.status < 300) {
                const res = await response.json();
                localStorage.setItem('user_type', res.user.user_type);
                localStorage.setItem('id', res.user.id);
                this.router.change('\/');
            } else {
                let formAuth = document.getElementsByClassName("auth");
                formAuth[0].insertAdjacentHTML("afterBegin", `<div class="error">Неверное имя пользователя или пароль</div>`);
            }
        };
        this.page = new AuthList(onsubmit);
    }
}