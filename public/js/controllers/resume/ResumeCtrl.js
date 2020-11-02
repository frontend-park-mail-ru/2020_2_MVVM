import Resume from "../../pages/resume/resume.js";

export default class ResumeCtrl{
    constructor(router) {
        this.router = router;
        this.page = new Resume();
    }
}