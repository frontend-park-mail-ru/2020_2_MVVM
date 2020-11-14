import AuthList from '../../pages/auth/auth.js';
import {companyMineURL, loginURL, UNAUTHORISED} from "Js/libs/constants";
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
            const res = await response.json();
            if (response.status >= 200 && response.status < 300) {
                localStorage.setItem('user_type', res.user.user_type);
                if (localStorage.getItem('user_type') === 'employer') {
                    const response = await network.doGet(companyMineURL);
                    const ans = await response.json();
                    if (ans.company) {
                        localStorage.setItem('has_company', "true");
                    } else {
                        localStorage.setItem('has_company', "false");
                    }
                } else if (localStorage.getItem('user_type') === 'candidate') {
                    localStorage.setItem('has_company', "false");
                }
                this.router.change('\/');
            } else {
                let formAuth = document.getElementsByClassName("auth");
                formAuth[0].insertAdjacentHTML("afterBegin", `<div class="error">${res.error}</div>`);
            }
        };
        this.page = new AuthList(onsubmit);
    }
}