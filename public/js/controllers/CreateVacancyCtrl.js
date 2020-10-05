import CreateVacancy from "../pages/createEmployerSum/createEmployerSum.js";

export default class CreateResumeCtrl{
    constructor(router) {
        this.router = router;
        this.page = new CreateVacancy();
    }
}