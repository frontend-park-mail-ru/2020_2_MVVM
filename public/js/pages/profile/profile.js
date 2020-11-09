import {NavBarInit} from "Js/components/header/navBar";
import {checkoutProfilePage, personalInfo} from './components/personalNavBar/persNavBar.js'
import {updateProfileFields} from './components/personalInfo/persInfo.js'
import createElem from "../../libs/createElem.js";
import persNB from './components/personalNavBar/persNavBar.tmpl.xml'
import listOfCandidatesTemp from 'Js/pages/candidatesList/components/listOfCandidates/listOfCandidates.tmpl.xml'
import emptyListTemp from 'Js/components/emptyList/emptyList.tmpl.xml'
import {DOMAIN} from "Js/libs/constants";

const app = window.document.getElementById('app');

export default class Profile {
    constructor(loadResumesF, loadVacanciesF, loadFavoritesF, loadCompanyF, router) {
        this.loadResumes = loadResumesF;
        this.loadVacancies = loadVacanciesF;
        this.loadFavorites = loadFavoritesF;
        this.loadCompany = loadCompanyF;
        this.router = router;
    }

    async render(content) {

        app.innerHTML = '';
        this.vacancies = null;
        this.resumes = null;
        this.company= null;
        this.favorites = null;

        let person;
        if (content) {
            person = {
                id: content.user.id,
                firstName: content.user.name,
                lastName: content.user.surname,
                email: content.user.email,
                phone: content.user.phone,
                type: content.user.type,
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
            await this.loadFavorites().then((data)=>{
                this.favorites = data;
            });
            await this.loadCompany().then((data) => {
                this.company = data.company;
            });

        } else {
            title.innerText = "Личный кабинет соискателя";
            await this.loadResumes().then((data) => {
                this.resumes = data;
            });

        }
        const mainPage = createElem("div", "main__page", container);
        const body = createElem("div", "main__page_body", mainPage);
        await mainPage.insertAdjacentHTML("afterbegin", persNB(content.user.user_type));

        //app.insertAdjacentHTML("beforeend", window.fest['footer.tmpl'](q

        await personalInfo(person, body);
        await checkoutProfilePage(this, content, body, person);
        updateProfileFields(person);
    }
}
