import CandidatesList from "../../pages/candidatesList/candidatesList.js";
import {candByIdURL} from "../../libs/constants.js";
import {network} from "../../libs/networks.js";

export default class CandidatesListCtrl{
    constructor(router) {
        this.router = router;

        const fetchCandInfo = async (resume) => {
            // console.log(resume);
            const candInfo = resume.map(async (e) => {
                const response = await network.doGet(candByIdURL+`${e.cand_id}`);
                const user = await response.json();
                return {
                    id: e.cand_id,
                    resume_id: e.id,
                    name: user.name + " " + user.surname,
                    prof: e.place,
                    location: [e.area_search, "Росcия"],
                }
            })
            return await Promise.all(candInfo);
        }

        this.page = new CandidatesList(fetchCandInfo, router);
    }
}
