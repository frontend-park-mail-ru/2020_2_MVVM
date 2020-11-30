import Company from "../../pages/company/company.js";

export default class CompanyCtrl {
  constructor(router) {
    this.router = router;
    this.page = new Company();
  }
}