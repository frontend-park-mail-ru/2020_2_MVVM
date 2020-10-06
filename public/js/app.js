import Router from './libs/router.js';
import AuthCtrl from './controllers/AuthCtrl.js';
import RegCtrl from './controllers/RegCtrl.js';
import MainCtrl from './controllers/MainCtrl.js';
import EmployersListCtrl from "./controllers/EmployersListCtrl.js";
import CandidatesListCtrl from "./controllers/CandidatesListCtrl.js";
import ProfileCtrl from "./controllers/ProfileCtrl.js";
import CreateResumeCtrl from "./controllers/CreateResumeCtrl.js";
import CreateVacancyCtrl from "./controllers/CreateVacancyCtrl.js";
import VacancyCtrl from "./controllers/VacancyCtrl.js";
import ResumeCtrl from "./controllers/ResumeCtrl.js";

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
        vacancy: new VacancyCtrl(router),
        resume: new ResumeCtrl(router),
    }



    router.add('/auth', controllers.auth.page);
    router.add('/reg', controllers.reg.page);
    router.add('/mainPage', controllers.mainPage.page);
    router.add('/employersList', controllers.employersList.page);
    router.add('/candidatesList', controllers.candidatesList.page);
    router.add('/profile', controllers.profile.page);
    router.add('/createResume', controllers.createResume.page);
    router.add('/createVacancy', controllers.createVacancy.page);
    router.add('/vacancy', controllers.vacancy.page);
    router.add('/resume', controllers.resume.page);

    router.start(false);
});