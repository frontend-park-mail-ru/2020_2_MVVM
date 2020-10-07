import RegList from '../pages/reg/reg.js';

export default class AuthCtrl {
    constructor(router) {
        this.router = router;

        this.page = new RegList(async (event, form) => {
            event.preventDefault();

            // We should have fields like <input type="text" name="field_name">
            // then we cand simply do
            // let formData = new FormData(form);

            let formData = new FormData();
            formData.append("nickname", form.elements.item(0).value)
            formData.append("name", form.elements.item(1).value)
            formData.append("surname", form.elements.item(2).value)
            formData.append("email", form.elements.item(3).value)
            formData.append("password", form.elements.item(4).value)

            const response = await fetch(
                // "v1/users/add",
                "http://95.163.212.36/api/v1/users/add",
                // "api/v1/register",
                {
                    body: formData,
                    method: "post"
                });
            const content = await response.json();
            console.assert(response.ok);
            this.router.change('\/auth');
        });
    }
}