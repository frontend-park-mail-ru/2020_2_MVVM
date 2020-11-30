import RecommendationsList from "../../pages/recommendationsList/recommendationsList.js";
import { vacancyRecommendationsPageURL } from "Js/libs/constants";
import { network } from "Js/libs/networks";

export default class EmployersListCtrl {
  constructor(router) {
    this.router = router;
    const fetchVacancyList = async () => {
      const response = await network.doGetLimit(
        vacancyRecommendationsPageURL,
        0,
        10
      );
      return await response.json();
    };
    this.page = new RecommendationsList(fetchVacancyList, router);
  }
}