import CreateResume from "../pages/createCandidateSum/createCandidateSum.js";

export default class CreateResumeCtrl{
    constructor(router) {
        this.router = router;
        this.page = new CreateResume();
    }
}