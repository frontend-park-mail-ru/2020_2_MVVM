import Router from './js/libs/router.js';
import AuthCtrl from './js/controllers/AuthCtrl.js';
import RegCtrl from './js/controllers/RegCtrl.js';
import MainCtrl from './js/controllers/MainCtrl.js';
import EmployersListCtrl from "./js/controllers/EmployersListCtrl.js";
import CandidatesListCtrl from "./js/controllers/CandidatesListCtrl.js";
import ProfileCtrl from "./js/controllers/ProfileCtrl.js";
import CreateResumeCtrl from "./js/controllers/CreateResumeCtrl.js";
import CreateVacancyCtrl from "./js/controllers/CreateVacancyCtrl.js";
import CreateCompanyCtrl from "./js/controllers/CreateCompanyCtrl.js";
import VacancyCtrl from "./js/controllers/VacancyCtrl.js";
import ResumeCtrl from "./js/controllers/ResumeCtrl.js";
import CompanyCtrl from "./js/controllers/CompanyCtrl.js";
import UpdateResumeCtrl from "./js/controllers/UpdateResumeCtrl.js";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', {scope: '/'})
        .then((reg) => {
            console.log('Registration succeeded. Scope is ' + reg.scope);
        }).catch((error) => {
        console.log('Registration failed with ' + error);
    });
}

document.addEventListener('DOMContentLoaded', ()=>{
    const app = document.getElementById('app');
    const router = new Router("/");

    const controllers = {
        auth: new AuthCtrl(router),
        reg: new RegCtrl(router),
        mainPage: new MainCtrl(router),
        employersList: new EmployersListCtrl(router),
        candidatesList: new CandidatesListCtrl(router),
        profile: new ProfileCtrl(router),
        createResume: new CreateResumeCtrl(router),
        createVacancy: new CreateVacancyCtrl(router),
        createCompany: new CreateCompanyCtrl(router),
        vacancy: new VacancyCtrl(router),
        resume: new ResumeCtrl(router),
        company: new CompanyCtrl(router),
        updateResume: new UpdateResumeCtrl(router),
    }



    router.add('/auth', controllers.auth.page);
    router.add('/reg', controllers.reg.page);
    router.add('/mainPage', controllers.mainPage.page);
    router.add('/employersList', controllers.employersList.page);
    router.add('/candidatesList', controllers.candidatesList.page);
    router.add('/profile', controllers.profile.page);
    router.add('/createResume', controllers.createResume.page);
    router.add('/createVacancy', controllers.createVacancy.page);
    router.add('/createCompanySum', controllers.createCompany.page);
    router.add('/vacancy', controllers.vacancy.page);
    router.add('/resume', controllers.resume.page);
    router.add('/company', controllers.company.page);
    router.add('/updateResume', controllers.updateResume.page);


    router.start();
});