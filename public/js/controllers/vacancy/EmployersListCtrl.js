import EmployersList from "../../pages/employersList/employersList.js";
import {vacancyPageURL} from "Js/libs/constants";
import {network} from "Js/libs/networks";

export default class EmployersListCtrl {
  constructor(router) {
    this.router = router;
    const fetchVacancyList = async (start, limit) => {
      const response = await network.doGetLimit(vacancyPageURL, start, limit);
      return await response.json();
    };
    this.page = new EmployersList(fetchVacancyList, router);
  }
}