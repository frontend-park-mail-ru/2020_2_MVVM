import CompaniesList from "../../pages/companiesList/companiesList.js";
import { companyPageURL } from "Js/libs/constants";
import { network } from "Js/libs/networks";

export default class CompaniesListCtrl {
  constructor(router) {
    this.router = router;

    const fetchCompaniesInfo = async (resume) => {
      const response = await network.doGetLimit(companyPageURL, 0, 10);
      return await response.json();
    };

    this.page = new CompaniesList(fetchCompaniesInfo, router);
  }
}