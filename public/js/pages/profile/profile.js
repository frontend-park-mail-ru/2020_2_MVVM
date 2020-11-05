import {NavBarInit} from "../../components/header/navBar.js";
import {checkoutProfilePage, personalInfo} from './components/personalNavBar/persNavBar.js'
import {updateProfileFields} from './components/personalInfo/persInfo.js'
import createElem from "../../libs/createElem.js";


const app = window.document.getElementById('app');

export default class Profile {
    constructor(loadResumesF, loadVacanciesF, loadFavorites, loadCompanyF, router) {
        this.loadResumes = loadResumesF;
        this.loadVacancies = loadVacanciesF;
        this.loadFavorites = loadFavorites;
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
            await this.loadFavorites().then((data)=>{
                this.favorites = data;
                console.log(this.favorites.resume);
            })
        } else {
            title.innerText = "Личный кабинет соискателя";
            await this.loadResumes().then((data) => {
                this.resumes = data;
            });

        }
        const mainPage = createElem("div", "main__page", container);
        const mainColumnLeft = createElem("div", "main__page_left", mainPage);
        const body = createElem("div", "main__page_left-body", mainColumnLeft);
        await mainColumnLeft.insertAdjacentHTML("afterbegin", window.fest['persNavBar.tmpl'](content.user.user_type));

        const mainColumnRight = createElem("div", "main__page_right", mainPage);
        mainColumnRight.insertAdjacentHTML("afterbegin", window.fest['listOfCandidates.tmpl'](this.favorites.resume));


        //app.insertAdjacentHTML("beforeend", window.fest['footer.tmpl'](q

        await personalInfo(person, body);
        await checkoutProfilePage(this, content, body, person);
        updateProfileFields(person);
    }
}
