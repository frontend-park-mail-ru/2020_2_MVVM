import EmployersList from "../pages/employersList/employersList.js";
import {URL, vacancyPageURL} from "../libs/constants.js";

export default class EmployersListCtrl {
    constructor(router) {
        this.router = router;

        const fetchVacancyList = async () => {
            const response = await fetch(
                `${URL}${vacancyPageURL}` + new URLSearchParams({
                    start: 0,
                    end: 4,
                }),
                {
                    method: "GET",
                },
            )
            console.assert(response.ok);
            const vacancy = await response.json();
            console.log(vacancy);
            return vacancy;
        }

        this.page = new EmployersList(fetchVacancyList, router);
    }
}