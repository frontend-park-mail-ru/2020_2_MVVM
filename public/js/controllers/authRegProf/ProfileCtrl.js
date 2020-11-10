import Profile from "../../pages/profile/profile.js";
import {
    resumeMineURL,
    URL,
    vacancyMineURL,
    vacancyPageURL,
    companyMineURL,
    myLikeResumeURL,
    candByIdURL, meUserURL, updateRespStatusURL, getMyRespURL
} from "Js/libs/constants";
import {network} from "Js/libs/networks";

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

        const loadCompany = async () => {
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
            try{
                const response = await network.doPut(updateRespStatusURL, {response_id: response_id, status: statusResp});
                const data = await response.json();
                console.assert(response.ok);
                return data;
            } catch (err) {
                console.assert(err);
            }
        }

        const getMyResponses = async () => {
            try{
                const response = await network.doGet(getMyRespURL);
                const data = await response.json();
                console.assert(response.ok);
                return data;
            } catch (err) {
                console.assert(err);
            }
        }

        this.page = new Profile(router, loadResumes, loadVacancies,loadFavorites, loadCompany,loadUser,  updateStatus,getMyResponses );
    }
}