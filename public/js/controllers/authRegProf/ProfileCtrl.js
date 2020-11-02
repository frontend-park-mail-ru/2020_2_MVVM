import Profile from "../../pages/profile/profile.js";
import {resumeMineURL, URL, vacancyMineURL, vacancyPageURL, companyByIdURL} from "../../libs/constants.js";
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

        const loadCompany = async (comp_id) => {
            try {
                console.log("comp_id in load", comp_id)
                const response = await network.doGet(companyByIdURL + comp_id);
                const data = await response.json();
                /*console.log("comp_id in load", comp_id)
                const data = await fetch(
                    `${URL}${companyByIdURL}` + new URLSearchParams(comp_id),
                    {
                        credentials: "include",
                        method: "GET",
                    },
                )*/

                //console.assert(response.ok);
                return data;
            } catch (err) {
                console.assert(err);
            }
        };

        this.page = new Profile(null, loadVacancies, loadCompany, router); // ???
    }
}