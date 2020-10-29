import Router from './libs/router.js';
import AuthCtrl from './controllers/AuthCtrl.js';
import RegCtrl from './controllers/RegCtrl.js';
import MainCtrl from './controllers/MainCtrl.js';
import EmployersListCtrl from "./controllers/EmployersListCtrl.js";
import CandidatesListCtrl from "./controllers/CandidatesListCtrl.js";
import ProfileCtrl from "./controllers/ProfileCtrl.js";
import CreateResumeCtrl from "./controllers/CreateResumeCtrl.js";
import CreateVacancyCtrl from "./controllers/CreateVacancyCtrl.js";
import CreateCompanyCtrl from "./controllers/CreateCompanyCtrl.js";
import VacancyCtrl from "./controllers/VacancyCtrl.js";
import ResumeCtrl from "./controllers/ResumeCtrl.js";
import CompanyCtrl from "./controllers/CompanyCtrl.js";
import UpdateResumeCtrl from "./controllers/UpdateResumeCtrl.js";
import LogoutCtrl from "./controllers/LogoutCtrl.js";


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
        logout: new LogoutCtrl(router),
    }



    router.add('/auth', controllers.auth.page);
    router.add('/reg', controllers.reg.page);
    router.add('/', controllers.mainPage.page);
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
    router.add('/logout', controllers.logout.page);


    router.start();
});