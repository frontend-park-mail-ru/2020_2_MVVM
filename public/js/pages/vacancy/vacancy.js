import {NavBarInit} from "../../components/header/navBar.js";
import {recentJobs} from './components/recentJobs/resentJobs.js';
import createElem from "../../libs/createElem.js";
import {network} from "Js/libs/networks";
import {
    companyByIdURL,
    educationLevel,
    emplByIdURL,
    experienceLevel,
    experienceMonth,
    vacancyByIdURL
} from "Js/libs/constants";
import briefInfoJobTemp from './components/briefInfoJob/briefInfoJob.tmpl.xml'
import vacancyTemp from './components/vacancy/vacancy.tmpl.xml'
import jobOverviewTemp from 'Js/components/rightColumn/contactForm.tmpl.xml'
import contactFormTemp from 'Js/components/rightColumn/contactForm.tmpl.xml'
import shareBarTemp from 'Js/components/shareBar/shareBar.tmpl.xml'

const app = window.document.getElementById('app');


async function vacancyInfo(user_id, vacancy_id, company_id) {

    const allInfo = ([
        new Promise((resolve) => network.doGet(emplByIdURL + `${user_id}`).then(resolve)),
        new Promise((resolve) => network.doGet(vacancyByIdURL + `${vacancy_id}`).then(resolve)),
        new Promise((resolve) => network.doGet(companyByIdURL + `${company_id}`).then(resolve)),
    ]);


    const pageInfo = await Promise.all(allInfo).then((values) => {
        return values;
    });
    const userInfo = await pageInfo[0].json()
    const vacInfo = await pageInfo[1].json()
    const compInfo = await pageInfo[2].json()
    return {
        userInfo: userInfo,
        vacancyInfo: vacInfo === null ? null : vacInfo.vacancy,
        companyInfo: compInfo == null ? null : compInfo.company,
    };
}


export default class Vacancy {
    constructor(router) {
        this.router = router;
    }

    async render(content, user_id, vacancy_id, company_id) {

        app.innerHTML = '';

        const navBarInit = new NavBarInit(app, content, false, "Вакансия");
        navBarInit.loadNavBar();

        const allInfo = await vacancyInfo(user_id, vacancy_id, company_id);

        const main = createElem("div", "main", app);
        const mainContent = createElem("div", "main-content", main);

        const briefInfoJob = {
            name: allInfo.companyInfo.name,
            logo: 'img/sj.png',
            location: allInfo.vacancyInfo.location,
            site: allInfo.companyInfo.link,
            phone: allInfo.userInfo.phone,
            mail: allInfo.userInfo.email,
        }
        mainContent.insertAdjacentHTML("beforeend", briefInfoJobTemp(briefInfoJob));

        const contentLeftColumn = createElem("div", "content-left-column", mainContent);

        const vacancy =
            [{
                mainInfo: [{
                    name: 'Описание работы',
                    text: allInfo.vacancyInfo.description,
                }],

                required: [{
                    name: 'Требуемые знания, Навыки и Способности',
                    requiredItem: [
                        allInfo.vacancyInfo.skills,
                        allInfo.vacancyInfo.requirements,
                    ],
                }],
                experience: [{
                    name: 'Образование + Опыт работы',
                    experienceItem: [
                        educationLevel[allInfo.vacancyInfo.education_level],
                        experienceMonth[allInfo.vacancyInfo.experience_month],
                        experienceLevel[allInfo.vacancyInfo.career_level],
                    ],
                }],
            }];

        contentLeftColumn.insertAdjacentHTML("beforeend", vacancyTemp(vacancy));

        let companyLink = document.getElementById("companyName");
        companyLink.addEventListener('click', event =>{
            event.preventDefault();
            this.router.change("/company", allInfo.companyInfo);
        });


        recentJobs(contentLeftColumn);

        const contentRightColumn = createElem("div", "content-right-column", mainContent);

        const jobOverview =
            {
                name: allInfo.vacancyInfo.title,
                salary_min: allInfo.vacancyInfo.salary_min,
                salary_max: allInfo.vacancyInfo.salary_max,
                gender: 'TODOМужской',
                career_level: allInfo.vacancyInfo.career_level,
                interest: allInfo.vacancyInfo.sphere,
                experience_month: allInfo.vacancyInfo.employment,
                education: educationLevel[allInfo.vacancyInfo.education_level],
            };


        contentRightColumn.insertAdjacentHTML("beforeend", jobOverviewTemp(jobOverview));

        contentRightColumn.insertAdjacentHTML("beforeend", contactFormTemp());

        contentRightColumn.insertAdjacentHTML("beforeend", shareBarTemp());




        // main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
    }
}


