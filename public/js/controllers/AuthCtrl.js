import AuthList from '../pages/auth/auth.js';

export default class AuthCtrl {
    constructor(router) {
        this.router = router;

        const onsubmit = async (event, form) => {
            event.preventDefault();

            let formData = new FormData();
            console.log(form);
            formData.append("email", form[0][0].value)
            formData.append("nickname", form[0][1].value)
            formData.append("password", form[0][2].value)

            const response = await fetch(
                "http://95.163.212.36/api/v1/auth/login",
                {
                    body: formData,
                    method: "post",
                },
            )
            const content = await response.json();
            console.assert(response.ok);
            if (content.code===200) {
                this.router.change('\/mainPage');
            }
        }
        this.page = new AuthList(onsubmit);
    }
}