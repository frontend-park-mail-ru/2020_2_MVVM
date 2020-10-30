import {NavBarInit} from "../../components/header/navBar.js";
import {checkBoxes} from '../../components/searchForm/searchForm.js'
import createElem from "../../libs/createElem.js";

const app = window.document.getElementById('app');

export default class EmployersList{
    constructor(fetchVacancyList, router) {
        this.fetchVacancyList = fetchVacancyList
        this.router = router
    }
    async render(content){
        app.innerHTML = '';


        const employersList = new NavBarInit(app, content, false,"Список ваканский");
        employersList.loadNavBar();

        const main = createElem("div", "main", app);
        const container = createElem("div", "container", main);
        const mainRow = createElem("div", "main__row", container);
        mainRow.style.display = "flex";

        const m = [
            {
                type: 'Специализация',
                name: ['Бухгалтерский учет', 'Банковское дело', 'Благотворительность', 'Дизайн', 'Агенство недвижимости', 'IT технологии'],
            },
            {
                type: 'Размер команды',
                name: ['1-10', '11-100', '100+'],
            },
            {
                type: 'Пол',
                name: ['Мужской', 'Женский'],
            }
        ]
        mainRow.insertAdjacentHTML("afterbegin", window.fest['searchForm.tmpl'](m));

        const mainList = createElem("div", "main__list",mainRow);

        const vacancies = await this.fetchVacancyList();
        console.log(vacancies.vacancyList)
        vacancies.vacancyList.forEach(function(vacancy, i, _) {
            vacancy.imgPath = `static/${vacancy.ID}`
            console.log( i + ": " + vacancy.ID);
        });
        mainList.insertAdjacentHTML("beforeend", window.fest['listOfEmployers.tmpl'](vacancies.vacancyList));
        mainList.insertAdjacentHTML("beforeend", window.fest['pagination.tmpl']());
        // main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());

        afterRender();
    }
}


function afterRender() {
    checkBoxes();
}