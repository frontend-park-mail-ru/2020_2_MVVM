import Company from "../../pages/company/company.js";
import {network} from "Js/libs/networks";
import {companyByIdURL, vacancyCompURL, vacancyPageURL} from "Js/libs/constants";

export default class CompanyCtrl {
  constructor(router) {
    this.router = router;

    const getCompanyById = async (company_id) => {
      try {
        const response = await network.doGet(companyByIdURL + `${company_id}`);
        const data = await response.json();
        console.assert(response.ok);
        if (data) {
          return data.company;
        }
      } catch (err) {
        console.assert(err);
      }
    };

    const getCompaniesVac = async (company_id) => {
      console.log(company_id);
      try {
        const response = await network.doGetLimit(`${vacancyCompURL}comp_id=${company_id}&`, 0, 10);
        const data = await response.json();
        console.log(data);
        console.assert(response.ok);
        if (data) {
          return data.vacancyList;
        }
      } catch (err) {
        console.assert(err);
      }
    };

    this.page = new Company(this.router, getCompanyById, getCompaniesVac);
  }
}