import RecommendationsList from "../../pages/recommendationsList/recommendationsList.js";
import {notificationsPageURL, vacancyRecommendationsPageURL} from "Js/libs/constants";
import { network } from "Js/libs/networks";

export default class EmployersListCtrl {
  constructor(router) {
    this.router = router;
    const fetchVacancyList = async () => {
      let limit;
      const body = {
        only_new_resp_cnt: false,
        vac_in_last_n_days: 1,
        watched_responses: [],
        only_new_vac_cnt: true,
      };
      const responseCount = await network.doPost(notificationsPageURL, body);
      const responseCountJson = await responseCount.json();
      limit = responseCountJson.recommended_vac_cnt;
      if (!limit) {
        limit = 10;
      }
      const response = await network.doGetLimit(
        vacancyRecommendationsPageURL,
        0,
        limit
      );
      return await response.json();
    };
    this.page = new RecommendationsList(fetchVacancyList, router);
  }
}