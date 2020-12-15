import Profile from "../../pages/profile/profile.js";
import {
  resumeMineURL,
  vacancyMineURL,
  companyMineURL,
  myLikeResumeURL,
  meUserURL,
  updateRespStatusURL,
  getMyRespURL,
  companyByIdURL, deleteUserURL,
} from "Js/libs/constants";
import { network } from "Js/libs/networks";
import {stopPolling} from "Js/libs/polling";

export default class ProfileCtrl {
  constructor(router) {
    this.router = router;

    const loadResumes = async () => {
      try {
        const response = await network.doGet(resumeMineURL);
        const data = await response.json();
        console.assert(response.ok);
        return data;
      } catch (err) {
        console.assert(err);
      }
    };

    const loadVacancies = async () => {
      try {
        const response = await network.doGetLimit(vacancyMineURL, 0, 5);
        const data = await response.json();
        console.assert(response.ok);
        return data;
      } catch (err) {
        console.assert(err);
      }
    };

    const loadMyCompanies = async () => {
      try {
        const response = await network.doGet(companyMineURL);
        const data = await response.json();
        console.assert(response.ok);
        return data;
      } catch (err) {
        console.assert(err);
      }
    };

    const loadFavorites = async () => {
      try {
        const response = await network.doGet(myLikeResumeURL);
        const data = await response.json();
        console.assert(response.ok);
        return data;
      } catch (err) {
        console.assert(err);
      }
    };

    const loadUser = async () => {
      try {
        const response = await network.doGet(meUserURL);
        const data = await response.json();
        console.assert(response.ok);
        return data;
      } catch (err) {
        console.assert(err);
      }
    };

    const updateStatus = async (response_id, statusResp) => {
      try {
        const response = await network.doPost(updateRespStatusURL, {
          response_id: response_id,
          status: statusResp,
        });
        const data = await response.json();
        console.assert(response.ok);
        return data;
      } catch (err) {
        console.assert(err);
      }
    };

    const getMyResponses = async () => {
      try {
        const response = await network.doGet(getMyRespURL);
        const data = await response.json();
        console.assert(response.ok);
        return data;
      } catch (err) {
        console.assert(err);
      }
    };

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

    const deleteUser = async () => {
      try {
        const response = await network.doDelete(deleteUserURL);
        console.assert(response.ok);
        localStorage.setItem("user_type", "");
        stopPolling();
        localStorage.setItem("has_company", "false");
        this.router.change('/');
      } catch (err) {
        console.assert(err);
      }
    }

    this.page = new Profile(
        router,
        loadResumes,
        loadVacancies,
        loadFavorites,
        loadMyCompanies,
        loadUser,
        updateStatus,
        getMyResponses,
        getCompanyById,
        deleteUser
      );
    }
}