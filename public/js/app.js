import Router from './libs/router.js';
import AuthCtrl from './controllers/authRegProf/AuthCtrl.js';
import RegCtrl from './controllers/authRegProf/RegCtrl.js';
import MainCtrl from './controllers/MainCtrl.js';
import CompaniesListCtrl from "./controllers/company/CompaniesListCtrl.js";
import EmployersListCtrl from "./controllers/vacancy/EmployersListCtrl.js";
import CandidatesListCtrl from "./controllers/resume/CandidatesListCtrl.js";
import ProfileCtrl from "./controllers/authRegProf/ProfileCtrl.js";
import CreateResumeCtrl from "./controllers/resume/CreateResumeCtrl.js";
import CreateVacancyCtrl from "./controllers/vacancy/CreateVacancyCtrl.js";
import CreateCompanyCtrl from "./controllers/company/CreateCompanyCtrl.js";
import VacancyCtrl from "./controllers/vacancy/VacancyCtrl.js";
import ResumeCtrl from "./controllers/resume/ResumeCtrl.js";
import CompanyCtrl from "./controllers/company/CompanyCtrl.js";
import UpdateResumeCtrl from "./controllers/resume/UpdateResumeCtrl.js";
import LogoutCtrl from "./controllers/authRegProf/LogoutCtrl.js";
import '../styles/main.scss'



document.addEventListener('DOMContentLoaded', ()=>{
    const app = document.getElementById('app');
    const router = new Router("/");

    const controllers = {
        auth: new AuthCtrl(router),
        reg: new RegCtrl(router),
        mainPage: new MainCtrl(router),
        employersList: new EmployersListCtrl(router),
        candidatesList: new CandidatesListCtrl(router),
        companiesList: new CompaniesListCtrl(router),
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
    router.add('/companiesList', controllers.companiesList.page);
    router.add('/profile', controllers.profile.page);
    router.add('/createResume', controllers.createResume.page);
    router.add('/createVacancy', controllers.createVacancy.page);
    router.add('/createCompany', controllers.createCompany.page);
    router.add('/vacancy', controllers.vacancy.page);
    router.add('/resume', controllers.resume.page);
    router.add('/company', controllers.company.page);
    router.add('/updateResume', controllers.updateResume.page);
    router.add('/logout', controllers.logout.page);


    router.start();
});