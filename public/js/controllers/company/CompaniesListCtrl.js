import CompaniesList from "../../pages/companiesList/companiesList.js";

export default class CompaniesListCtrl{
    constructor(router) {
        this.router = router;
        this.page = new CompaniesList(router);
    }
}