import {NavBarInit} from "../../components/header/navBar.js";
import {recentJobs} from './components/recentJobs/resentJobs.js';
import createElem from "../../libs/createElem.js";
import {network} from "../../libs/networks.js";
import {
    companyByIdURL,
    emplByIdURL,
    vacancyByIdURL,
    educationLevel,
    experienceMonth,
    experienceLevel,
    gender
} from "../../libs/constants.js";

const app = window.document.getElementById('app');


async function vacancyInfo(user_id, vacancy_id, company_id){

    const allInfo = ([
        new Promise( (resolve) => network.doGet(emplByIdURL+`${user_id}`).then(resolve)),
        new Promise((resolve) =>  network.doGet(vacancyByIdURL+`${vacancy_id}`).then(resolve)),
        new Promise((resolve) =>  network.doGet(companyByIdURL+`${company_id}`).then(resolve)),
    ]);


    const pageInfo = await Promise.all(allInfo).then((values) => {
        return values;
    });

    return {
        userInfo: await pageInfo[0].json(),
        vacancyInfo: (await pageInfo[1].json()).Vacancy,
        companyInfo: (await pageInfo[2].json()).company,
    };
}


export default class Vacancy{
    async render(content, user_id, vacancy_id, company_id) {

        app.innerHTML = '';

        const navBarInit = new NavBarInit(app, content, true,"Вакансия");
        navBarInit.loadNavBar();

        const allInfo = await vacancyInfo(user_id, vacancy_id, company_id);
        console.log(allInfo);

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
        mainContent.insertAdjacentHTML("beforeend", window.fest['briefInfoJob.tmpl'](briefInfoJob));

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

        contentLeftColumn.insertAdjacentHTML("beforeend", window.fest['vacancy.tmpl'](vacancy));

        recentJobs(contentLeftColumn);

        const contentRightColumn = createElem("div", "content-right-column", mainContent);

        //
        // const jobOverview1 = {
        //         name: user.name,
        //         salary_min: nullToString(resume.resume.salary_min),
        //         salary_max: nullToString(resume.resume.salary_max),
        //         gender: nullToString(gender[resume.resume.gender]),
        //         experience_level: nullToString(experienceLevel[resume.resume.education_level]),
        //         experience_month: nullToString(experienceMonth[resume.resume.experience_month]),
        //         interest: "TODOManagement",
        //         education: nullToString(educationLevel[resume.resume.education_level]),
        //         career_level: nullToString(resume.resume.career_level),
        // };

        const jobOverview =
            {
                name: allInfo.vacancyInfo.title,
                salary_min: allInfo.vacancyInfo.salary_min,
                salary_max: allInfo.vacancyInfo.salary_max,
                gender: 'TODOМужской',
                interest: allInfo.vacancyInfo.spheres,
                experience_month: allInfo.vacancyInfo.employment,
                education: educationLevel[allInfo.vacancyInfo.education_level],
                career_level: allInfo.vacancyInfo.week_work_hours,
            };

        // const jobOverview =
        //     {
        //         name: allInfo.vacancyInfo.title,
        //         salary_min: allInfo.vacancyInfo.salary_min,
        //         salary_max: allInfo.vacancyInfo.salary_max,
        //         gender: 'TODOМужской',
        //         interest: "фывыфа",
        //         experience_month: "фывыфа",
        //         education: "фывыфа",
        //         career_level: "efsdc",
        //     };

        contentRightColumn.insertAdjacentHTML("beforeend", window.fest['jobOverview.tmpl'](jobOverview));

        contentRightColumn.insertAdjacentHTML("beforeend", window.fest['contactForm.tmpl']());

        contentRightColumn.insertAdjacentHTML("beforeend", window.fest['shareBar.tmpl']());


        // main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
    }
}


