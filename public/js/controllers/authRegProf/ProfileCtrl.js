import Profile from "../../pages/profile/profile.js";
import {resumeMineURL, URL, vacancyMineURL, vacancyPageURL, companyMineURL, myLikeResumeURL} from "../../libs/constants.js";
import {network} from "../../libs/networks.js";

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

        this.page = new Profile(loadResumes, loadVacancies,loadFavorites, loadCompany, router);
    }
}