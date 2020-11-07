import CompaniesList from "../../pages/companiesList/companiesList.js";

import {usersByIdURL, companyPageURL} from "../../libs/constants.js";
import {network} from "../../libs/networks.js";


export default class CompaniesListCtrl{
    constructor(router) {
        this.router = router;

        const fetchCompaniesInfo = async (resume) => {
            const response = await network.doGetLimit(companyPageURL, 0, 10);
            return await response.json();
        }

        this.page = new CompaniesList(fetchCompaniesInfo, router);
    }
}