import {NavBarInit} from "Js/components/header/navBar";
import {checkBoxes} from 'Js/components/searchForm/searchForm'
import createElem from "Js/libs/createElem";
import {DOMAIN, resumePageURL, resumeSearchURL} from "Js/libs/constants";
import {network} from "Js/libs/networks";
import searchFormTemp from 'Js/components/searchForm/searchForm.tmpl.xml'
import listOfCandidatesTemp from './components/listOfCandidates/listOfCandidates.tmpl.xml'
import emptyListTemp from 'Js/components/emptyList/emptyList.tmpl.xml'

const app = window.document.getElementById('app');

export default class CandidatesList {
    constructor(router) {
        this.router = router
    }

    async render(content) {
        app.innerHTML = '';

        const candidatesList = new NavBarInit(app, content, false, "Список резюме");
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
                        name: "Москва",
                        text: "Москва"
                    }, {
                        name: "Санкт-петербург",
                        text: "Санкт-Петербург"
                    }, {
                        name: "Екатеринбург",
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

        mainRow.insertAdjacentHTML("afterbegin", searchFormTemp(m));

        const mainList = createElem("div", "main__list", mainRow);


        const response = await network.doGetLimit(resumePageURL, 0, 15);
        console.assert(response.ok);
        await renderResumeList(response, main, mainList, this.router);
        afterRender(mainList, main, this.router);
    }
}

async function renderResumeList(response, main, mainList, router){
    const resume = await response.json();
    console.log(resume);

    if (resume && resume.length) {
        resume.forEach((item) => {
            item.imgPath = `${DOMAIN}static/resume/${item.resume_id}`;
        });
        mainList.insertAdjacentHTML("beforeend", listOfCandidatesTemp(resume));
        // mainRow.insertAdjacentHTML("afterend", window.fest['pagination.tmpl']());
        // main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
        getUserResume(router, main, resume);
    } else {
        mainList.insertAdjacentHTML("beforeend", emptyListTemp("Ничего не найдено"));
    }
}


function getUserResume(router, main, resume) {
    const linksToResume = main.getElementsByClassName("go_to_resume");
    for (let i = 0; i < linksToResume.length; i++) {
        linksToResume[i].addEventListener('click', event => {
            event.preventDefault();
            router.change('/resume', resume[i]);
        })
    }
}

async function search(form, mainList, main, router) {
    mainList.innerHTML = '';

    const formData = new FormData(form);
    let data = {};
    data.gender = formData.getAll("gender");
    data.education_level = formData.getAll("education_level");
    data.career_level = formData.getAll("career_level");
    data.area_search = formData.getAll("area_search");
    data.experience_month = await formData.getAll("experience_month");
    data.experience_month.forEach((item, idx, arr)=>{
        arr[idx] = parseInt(item);
    });
    // data.salary_min = 0;
    // data.salary_max = 10000;
    data.keywords = formData.get("keywords");

    const response = await network.doPost(resumeSearchURL, data);
    console.assert(response.ok);
    await renderResumeList(response, main, mainList, router);
}

function afterRender(mainList, main, router) {
    checkBoxes();
    let form = document.querySelector("form");
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        search(form, mainList, main, router);
    });
}
