import {NavBarInit} from "../../components/header/navBar.js";
import {checkBoxes} from '../../components/searchForm/searchForm.js'
import createElem from "../../libs/createElem.js";
import {resumePageURL, resumeSearchURL, usersByIdURL} from "../../libs/constants.js";
import {network} from "../../libs/networks.js";

const app = window.document.getElementById('app');

export default class CandidatesList {
    // TODO ROUTER - костыль, сделать нормально через контроллеры
    constructor(fetchCandInfo, router) {
        this.fetchCandInfo = fetchCandInfo
        this.router = router
    }

    async render(isAuthorized, content) {
        app.innerHTML = '';

        const candidatesList = new NavBarInit(app, isAuthorized, false, "Список резюме");
        candidatesList.loadNavBar();

        const main = createElem("div", "main", app);
        const container = createElem("div", "container", main);
        const mainRow = createElem("div", "main__row", container);
        mainRow.style.display = "flex";


        const m = [
            {
                title: {
                    name: 'gender',
                    text: 'Пол'
                },
                fields: [{
                    name: 'male',
                    text: 'Мужской',
                }, {
                    name: 'female',
                    text: 'Женский',
                }
                ]
            },
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
                        text: 'Среднее cпециальное',
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
            }
        ];

        mainRow.insertAdjacentHTML("afterbegin", window.fest['searchForm.tmpl'](m));

        const mainList = createElem("div", "main__list", mainRow);


        const response = await network.doGetLimit(resumePageURL, 0, 15);
        console.assert(response.ok);
        const resume = (await response.json()).resume;
        const infoOfCand = await this.fetchCandInfo(resume);

        mainList.insertAdjacentHTML("beforeend", window.fest['listOfCandidates.tmpl'](infoOfCand));
        mainRow.insertAdjacentHTML("afterend", window.fest['pagination.tmpl']());
        // main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
        getUserResume(this.router, main, infoOfCand);


        afterRender(mainList, main, this.fetchCandInfo, this.router);
    }
}


function getUserResume(router, main, infoOfCand) {
    const linksToResume = main.getElementsByClassName("go_to_resume");
    for (let i = 0; i < linksToResume.length; i++) {
        linksToResume[i].addEventListener('click', event => {
            event.preventDefault()
            router.change('/resume', infoOfCand[i].id, infoOfCand[i].resume_id)
        })
    }
}

async function search(form, mainList, main, fetchCandInfo, router) {
    mainList.innerHTML = '';

    const formData = new FormData(form);
    let data = {};
    data.gender = formData.getAll("gender");
    data.education_level = formData.getAll("education_level");
    data.career_level = formData.getAll("career_level");
    data.area_search = formData.getAll("area_search");
    data.experience_month = formData.getAll("experience_month");
    data.salary_min = 0;
    data.salary_max = 10000;
    data.keywords = formData.get("keywords");


    const response = await network.doPost(resumeSearchURL, data);
    console.assert(response.ok);
    const resume = (await response.json()).resume;
    const infoOfCand = await fetchCandInfo(resume);
    console.log(infoOfCand);

    mainList.insertAdjacentHTML("beforeend", window.fest['listOfCandidates.tmpl'](infoOfCand));
    getUserResume(router, main, infoOfCand);
}

function afterRender(mainList, main, fetchCandInfo, router) {
    checkBoxes();

    let form = document.querySelector("form");
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        search(form, mainList, main, fetchCandInfo, router);
    });
}
