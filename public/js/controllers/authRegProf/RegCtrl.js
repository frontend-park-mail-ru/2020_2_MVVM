import RegList from '../../pages/reg/reg.js';
import {addUserURL} from "Js/libs/constants";
import {network} from "Js/libs/networks";

export default class RegCtrl {
    constructor(router) {
        this.router = router;

        const onsubmit = async (event, form, errorMes) => {
            event.preventDefault();

            console.log(form);
            const formData = new FormData(form);
            errorMes[0].innerHTML = '';

            const body = {
                name: formData.get("firstname"),
                surname: formData.get("lastname"),
                email: formData.get("email"),
                password: formData.get("password"),
                user_type: formData.get("type"),
            };

            let formReg = await document.getElementsByClassName("reg");
            const response = await network.doPost(`${addUserURL}`, body);

            const res = await response.json();


            if (response.status >= 200 && response.status < 300) {
                console.assert(response.ok);
                this.router.change('\/auth');
            } else if (response.status === 409){
                formReg[0].insertAdjacentHTML("afterBegin", `<div class="error">Пользователь уже существует</div>`);
            } else {
                formReg[0].insertAdjacentHTML("afterBegin", `<div class="error">${res.error}</div>`);

            }
        };

        this.page = new RegList(onsubmit);
    }
}
