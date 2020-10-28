import RegList from '../pages/reg/reg.js';
import {addUserURL, UNAUTHORISED} from "../libs/constants.js";
import {network} from "../libs/networks.js";

export default class RegCtrl {
    constructor(router) {
        this.router = router;

        const onsubmit = async (event, form) => {
            event.preventDefault();

            let errorMes = document.getElementsByClassName("error");
            errorMes[0].innerHTML = '';

            const body = {
                nickname: form[0][0].value,
                name: form[0][1].value,
                surname: form[0][2].value,
                email: form[0][3].value,
                password: form[0][4].value,
            };

            let formReg = await document.getElementsByClassName("reg");
            const response = await network.doPost(`${addUserURL}`, body);

            if (response.status >= 200 && response.status < 300) {
                console.assert(response.ok);
                this.router.change('\/auth');
            } else if (response.status === 409){
                formReg[0].insertAdjacentHTML("afterBegin", `<div class="error">Пользователь уже существует</div>`);
            } else {
                formReg[0].insertAdjacentHTML("afterBegin", `<div class="error">Что-то пошло не так</div>`);
            }
        };

        this.page = new RegList(onsubmit);
    }
}
