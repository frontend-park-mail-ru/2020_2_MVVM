import MainList from "../pages/mainPage/mainPage.js";
import {resumeSearchURL, vacancySearchURL} from "Js/libs/constants";
import {network} from "Js/libs/networks";

export default class MainCtrl {
  constructor(router) {
    this.router = router;


    const searchData = async (data) => {
      const user_type = localStorage.getItem('user_type');
      const searchUrl = user_type === 'employer' ?  resumeSearchURL : vacancySearchURL;

      const response = await network.doPost(searchUrl, data);
      if (response.status >= 200 && response.status < 300) {
        const searchUrl = user_type === 'employer' ? '/candidatesList' : '/employersList';
        this.router.change(searchUrl, response);
      }
    }


    this.page = new MainList(router, searchData);
  }
}