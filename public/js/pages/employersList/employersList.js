import {NavBarInit} from "../../components/header/navBar.js";
import {checkBoxes} from '../../components/searchForm/searchForm.js'
import createElem from "../../libs/createElem.js";
import {network} from "../../libs/networks.js";
import {vacancySearchURL} from "../../libs/constants.js";
import searchFormTemp from 'Js/components/searchForm/searchForm.tmpl.xml'
import listOfEmployersTemp from './components/listOfEmployers/listOfEmployers.tmpl.xml'
import paginationTemp from 'Js/components/pagination/pagination.tmpl.xml'
import emptyListTemp from 'Js/components/emptyList/emptyList.tmpl.xml'


const app = window.document.getElementById('app');

export default class EmployersList{
    constructor(fetchVacancyList, router) {
        this.fetchVacancyList = fetchVacancyList;
        this.router = router;
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
                title: {
                    name: 'education_level',
                    text: 'Уровень образования'
                },
                fields: [
                    {
                        name: 'middle',
                        text: 'Среднее',
                    }, {
                        name: 'specialized_secondary',
                        text: 'Среднее специальное',
                    }, {
                        name: 'incomplete_higher',
                        text: 'Неоконченное высшее',
                    }, {
                        name: 'higher',
                        text: 'Высшее',
                    }, {
                        name: 'bachelor',
                        text: 'Бакалавр',
                    }, {
                        name: 'master',
                        text: 'Магистр',
                    },
                    {
                        name: 'phD',
                        text: 'Кандидат наук',
                    }, {
                        name: 'doctoral',
                        text: 'Доктор наук',
                    }
                ]
            },
            {
                title: {
                    name: 'career_level',
                    text: 'Карьерный уровень'
                },
                fields: [
                    {
                        name: "junior",
                        text: "Junior"
                    }, {
                        name: "middle",
                        text: "Middle"
                    }, {
                        name: "senior",
                        text: "Senior"
                    }
                ]
            },
            {
                title: {
                    name: "area_search",
                    text: "Город"
                },
                fields: [
                    {
                        name: "москва",
                        text: "Москва"
                    }, {
                        name: "санкт-петербург",
                        text: "Санкт-Петербург"
                    }, {
                        name: "екатеринбург",
                        text: "Екатеринбург"
                    }
                ]
            },
            {
                title: {
                    name: "experience_month",
                    text: "Опыт работы"
                },
                fields: [
                    {
                        name: "0",
                        text: "Не работал"
                    }, {
                        name: "1",
                        text: "Меньше года"
                    }, {
                        name: "5",
                        text: "1-5 лет"
                    }, {
                        name: "10",
                        text: "5-10 лет"
                    }, {
                        name: "11",
                        text: "больше 10 лет"
                    }
                ]
            },
        ];


        mainRow.insertAdjacentHTML("afterbegin", searchFormTemp(m));

        const mainList = createElem("div", "main__list",mainRow);

        const vacancies = await this.fetchVacancyList();

        if (vacancies) {
            vacancies.vacancyList.forEach((vacancy) => {
                vacancy.imgPath = `static/${vacancy.ID}`;
            });
            mainList.insertAdjacentHTML("beforeend", listOfEmployersTemp(vacancies.vacancyList));
            mainList.insertAdjacentHTML("beforeend", paginationTemp());
            getEmplVacancy(this.router, main, vacancies.vacancyList);
        } else {
            mainList.insertAdjacentHTML("beforeend", emptyListTemp());
        }


        // main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());

        afterRender(mainList, main, this.fetchVacancyList, this.router);
    }
}


function afterRender(mainList, main, fetchVacancyList, router) {
    checkBoxes();
    let form = document.querySelector("form");
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        search(form, mainList, main, fetchVacancyList, router);
    });
}


async function search(form, mainList, main, fetchVacancyList, router) {
    mainList.innerHTML = '';

    const formData = new FormData(form);
    let data = {};
    data.education_level = formData.getAll("education_level");
    data.career_level = formData.getAll("career_level");
    data.area_search = formData.getAll("area_search");
    // data.experience_month = formData.getAll("experience_month");
    data.keywords = formData.get("keywords");


    const response = await network.doPost(vacancySearchURL, data);
    console.assert(response.ok);
    const vacancy = (await response.json()).vacancyList;

    if (vacancy && vacancy.length) {
        mainList.insertAdjacentHTML("beforeend", listOfEmployersTemp(vacancy));
        getEmplVacancy(router, main, vacancy);
    } else {
        mainList.insertAdjacentHTML("beforeend", emptyListTemp());
        // const pagination = document.getElementsByClassName("pagination");
        // pagination[0].innerHTML = '';
    }
}

function getEmplVacancy(router, main, vacancy) {
    const linksToVacancy = main.getElementsByClassName("go_to_resume");
    for (let i = 0; i < linksToVacancy.length; i++) {
        linksToVacancy[i].addEventListener('click', event => {
            event.preventDefault();
            router.change('/vacancy', vacancy[i].EmpID, vacancy[i].ID, vacancy[i].CompID);
        })
    }
}