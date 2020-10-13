import CandidatesList from "../pages/candidatesList/candidatesList.js";
import {URL} from "../libs/constants.js";

export default class CandidatesListCtrl{
    constructor(router) {
        this.router = router;

        const fetchCandInfo = async () => {
            const response = await fetch(
                `${URL}/v1/resume/page?` + new URLSearchParams({
                    start: 0,
                    limit: 5,
                }),
                {
                    method: "GET",
                },
            )
            console.assert(response.ok);
            const resume = (await response.json()).resume;

            const candInfo = resume.map(async (e) => {
                const response = await fetch(
                    `${URL}/v1/users/by/id/${e.user_id}`,
                    {
                        method: "get",
                    },
                )
                const user = (await response.json()).user;
                return {
                    id: user.id,
                    resume_id: e.id,
                    name: user.name + " " + user.surname,
                    prof: "TODO",
                    job: "TODO",
                    location: ["TODO", "TODO"]
                }
            })
            return await Promise.all(candInfo);

        }

        this.page = new CandidatesList(fetchCandInfo, router);
    }
}