import {NavBarInit} from "Js/components/header/navBar";
import {recentJobs} from './components/recentJobs/resentJobs.js';
import createElem from "Js/libs/createElem";
import popUpList from "Js/components/popUpList/popUpList";
import {network} from "Js/libs/networks";
import {
    companyByIdURL, DOMAIN,
    educationLevel,
    emplByIdURL,
    experienceLevel,
    experienceMonth, gender, spheres,
    vacancyByIdURL
} from "Js/libs/constants";
import briefInfoJobTemp from './components/briefInfoJob/briefInfoJob.tmpl.xml';
import vacancyTemp from './components/vacancy/vacancy.tmpl.xml';
import jobOverviewTemp from 'Js/components/rightColumn/jobOverview.tmpl.xml';
import contactFormTemp from 'Js/components/rightColumn/contactForm.tmpl.xml';
import openMenuList from "Js/components/header/phoneNavBar/pNavBar";
// import shareBarTemp from 'Js/components/shareBar/shareBar.tmpl.xml';



const app = window.document.getElementById('app');


async function vacancyInfo(vacancy_id, company_id) {

    const allInfo = ([
        new Promise((resolve) => network.doGet(vacancyByIdURL + `${vacancy_id}`).then(resolve)),
        new Promise((resolve) => network.doGet(companyByIdURL + `${company_id}`).then(resolve)),
    ]);


    const pageInfo = await Promise.all(allInfo).then((values) => {
        return values;
    });
    const vacInfo = await pageInfo[0].json()
    const compInfo = await pageInfo[1].json()
    return {
        vacancyInfo: vacInfo === null ? null : vacInfo.vacancy,
        companyInfo: compInfo == null ? null : compInfo.company,
    };
}


export default class Vacancy {
    constructor(router, createRespF, myResumesF) {
        this.router = router;
        this.createResp = createRespF;
        this.myResumes = myResumesF;
    }

    async render(content, vacancy_id, company_id) {

        app.innerHTML = '';

        openMenuList(app, false);

        const allInfo = await vacancyInfo(vacancy_id, company_id);

        const main = createElem("div", "main", app);
        const mainContent = createElem("div", "main-content", main);

        const briefInfoJob = {
            name: allInfo.companyInfo.name,
            logo: `${DOMAIN}static/company/`+company_id,
            location: `${allInfo.vacancyInfo.location}/${allInfo.vacancyInfo.area_search}`,
            site: allInfo.companyInfo.link,
            phone: allInfo.vacancyInfo.phone,
            mail: allInfo.vacancyInfo.email,
            my_user_type: localStorage.getItem('user_type'),
        }
        mainContent.insertAdjacentHTML("beforeend", briefInfoJobTemp(briefInfoJob));
        let imgs = document.getElementsByClassName("pageOfVacImg");
        for (let i=0; i<imgs.length;i++){
            imgs[i].onerror = ()=>{imgs[i].src = `${DOMAIN}static/company/default.png`};
        }


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
                gender: (allInfo.vacancyInfo.gender ? gender[allInfo.vacancyInfo.gender]:"Любой"),
                career_level: allInfo.vacancyInfo.career_level,
                interest: spheres[allInfo.vacancyInfo.sphere],
                experience_month: allInfo.vacancyInfo.employment,
                education: educationLevel[allInfo.vacancyInfo.education_level],
            };


        contentRightColumn.insertAdjacentHTML("beforeend", jobOverviewTemp(jobOverview));

        contentRightColumn.insertAdjacentHTML("beforeend", contactFormTemp());

        // contentRightColumn.insertAdjacentHTML("beforeend", shareBarTemp());

        if (localStorage.getItem('user_type') === 'candidate') {
            renderVacancyResp(this, vacancy_id, jobOverview.name);
        }
        // main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
    }
}

async function renderVacancyResp(vacancyCls, vac_id, title) {
    const responseBtn = document.getElementById("responseVacancyBtn");

    let selectedResume = null;

    responseBtn.addEventListener('click', async () =>{
        const resumeList = await vacancyCls.myResumes(vac_id);
        if (resumeList) {
            resumeList.forEach((item)=>{
                item.imgPath = `${DOMAIN}static/resume/${item.resume_id}`;
            })
        }
       selectedResume = popUpList(app, vacancyCls, vac_id, {list:resumeList, title:title});
    });
}