import CompaniesList from "../../pages/companiesList/companiesList.js";
import {usersByIdURL, companyPageURL} from "../../libs/constants.js";
import {network} from "../../libs/networks.js";

export default class CompaniesListCtrl{
    constructor(router) {
        this.router = router;

        const fetchCompaniesInfo = async (resume) => {
           /* const companyInfo = resume.map(async (e) => {
                const response = await network.doGet(usersByIdURL+`${e.user_id}`)
                const company = (await response.json()).user;
                return {
                    id: company.id,
                    resume_id: e.id,
                    name: company.name + " " + company.surname,
                    prof: e.place,
                    location: [e.area_search, "Росcия"],
                }
            })
            return await Promise.all(companyInfo);*/
            const response = await network.doGetLimit(companyPageURL, 0, 10);
            return await response.json();
        }

        this.page = new CompaniesList(fetchCompaniesInfo, router);
    }
}