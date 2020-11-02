import {NavBarInit} from "../../components/header/navBar.js";
import {checkoutProfilePage, personalInfo} from './components/personalNavBar/persNavBar.js'
import {updateProfileFields} from './components/checkboxSearch/checkBox.js'
import createElem from "../../libs/createElem.js";


const app = window.document.getElementById('app');

export default class Profile {
    constructor(loadResumesF, loadVacanciesF, loadCompanyF, router) {
        this.loadResumes = loadResumesF;
        this.loadVacancies = loadVacanciesF;
        this.loadCompany = loadCompanyF;
        this.router = router;
    }

    async render(content) {

        app.innerHTML = '';
        this.vacancies = null;
        this.resumes = null;
        this.company= null;

        let person;
        if (content) {
            person = {
                id: content.user.id,
                firstName: content.user.name,
                lastName: content.user.surname,
                email: content.user.email,
                phone: content.user.phone,
                resumeCount: "NOT READY YET",
                socialNetworkLinks: content.user.social_network,
            };
        }


        const profile = new NavBarInit(app, content, false, "");
        profile.loadNavBar();

        const main = createElem("div", "main", app);
        const container = createElem("div", "container", main);

        const title = createElem("div", "profile__title", container);
        if (content.user.user_type === "employer") {
            title.innerText = "Личный кабинет работодателя";
            await this.loadVacancies().then((data) => {
                this.vacancies = data.vacancyList;
            });
            // работодатель может быть привязан ток к одной компании, поэтому для всех вакансий работодателя компания одна
            await this.loadCompany().then((data) => {
                this.company = data.official_company;
            });
            //
        } else {
            title.innerText = "Личный кабинет соискателя";
            await this.loadResumes().then((data) => {
                this.resumes = data;
            });
        }
        console.log("data=", this.vacancies);
        const mainPage = createElem("div", "main__page", container);
        const mainColumnLeft = createElem("div", "main__page_left", mainPage);
        const body = createElem("div", "main__page_left-body", mainColumnLeft);
        await mainColumnLeft.insertAdjacentHTML("afterbegin", window.fest['persNavBar.tmpl'](content.user.user_type));

        //const mainColumnRight = createElem("div", "main__page_right", mainPage);
        // mainColumnRight.insertAdjacentHTML("afterbegin", window.fest['checkBoxJob.tmpl'](person));


        //app.insertAdjacentHTML("beforeend", window.fest['footer.tmpl'](q

        await personalInfo(person, body);
        await checkoutProfilePage(this, content, body, person);
        updateProfileFields();
    }
}
