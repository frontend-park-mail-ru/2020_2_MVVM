import Profile from "../../pages/profile/profile.js";
import {
    resumeMineURL,
    URL,
    vacancyMineURL,
    vacancyPageURL,
    companyMineURL,
    myLikeResumeURL,
    candByIdURL
} from "../../libs/constants.js";
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

        const candidateInfo = async (resume) => {
            console.log(resume);
            const candInfo = resume.map(async (e) => {
                console.log(e);
                const response = await network.doGet(candByIdURL+`${e.resume.cand_id}`);
                const user = await response.json();
                return {
                    id: e.resume.cand_id,
                    resume_id: e.id,
                    name: user.name + " " + user.surname,
                    prof: e.resume.place,
                    location: [e.resume.area_search, "Росcия"],
                }
            })
            return await Promise.all(candInfo);
        }

        this.page = new Profile(loadResumes, loadVacancies,loadFavorites, loadCompany, candidateInfo, router);
    }
}