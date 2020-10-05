
import EmployersList from "../pages/employersList/employersList.js";

export default class EmployersListCtrl{
    constructor(router) {
        this.router = router;
        this.page = new EmployersList();
    }
}