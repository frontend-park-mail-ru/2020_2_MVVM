import CreateResume from "../pages/createCandidateSum/createCandidateSum.js";

export default class CreateResumeCtrl{
    constructor(router) {
        this.router = router;

        this.page = new CreateResume(async (event, form) => {
            event.preventDefault();

            let formData = new FormData(form);

            const response = await fetch(
                "api/v1/resume/add",
                {
                    body: formData,
                    method: "post"
                });
            const content = await response.json();
            console.assert(response.ok);
            this.router.change('\/resume/page');
        });
    }
}