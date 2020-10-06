import AuthList from '../pages/auth/auth.js';

export default class AuthCtrl {
    constructor(router) {
        this.router = router;

        const onsubmit = async (event, form) => {
            event.preventDefault();

            // // We should have fields like <input type="text" name="field_name">
            // // then we cand simply do
            // let formData = new FormData(form);
            //
            let formData = new FormData();
            formData.append("email", form.elements.item(0).value)
            formData.append("nickname", form.elements.item(1).value)
            formData.append("password", form.elements.item(2).value)

            const response = await fetch(
                "api/v1/auth/login",
                {
                    body: formData,
                    method: "post",
                },
            )
            // const content = await response.json();
            console.assert(response.ok);
            this.router.change('\/mainPage');
        }
        this.page = new AuthList(onsubmit);
    }
}