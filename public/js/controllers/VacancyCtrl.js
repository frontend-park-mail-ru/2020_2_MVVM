import Vacancy from "../pages/vacancy/vacancy.js";

export default class VacancyCtrl{
    constructor(router) {
        this.router = router;
        this.page = new Vacancy();
    }
}