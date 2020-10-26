import EmployersList from "../pages/employersList/employersList.js";

export default class EmployersListCtrl {
    constructor(router) {
        this.router = router;

        const fetchVacancyList = async () => {
            const response = await fetch(
                "api/v1/vacancy/page?" + new URLSearchParams({
                    start: 0,
                    end: 4,
                }),
                {
                    method: "GET",
                },
            )
            console.assert(response.ok)
            return await response.json()
        }

        this.page = new EmployersList(fetchVacancyList, router);
    }
}