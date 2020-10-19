import {NavBarInit} from "../../components/header/navBar.js";
import {checkoutProfilePage} from './components/personalNavBar/persNavBar.js'
import {updateProfileFields} from './components/checkboxSearch/checkBox.js'
import createElem from "../../libs/createElem.js";

const app = window.document.getElementById('app');

export default class Profile{
    constructor() {

    }

    isPersonalRusemes = false;

    async render(isAuthorized, content){
        app.innerHTML = '';

        let person;
        if (isAuthorized) {
            person = {
                id: content.user.id,
                firstName: content.user.name,
                lastName: content.user.surname,
                email: content.user.email,
                phone: 'NOT READY YET',
                resumeCount: 'NOT READY YET',
                locationOfSearch: 'NOT READY YET',
                socialNetworkLinks: 'NOT READY YET',
            };
        }


        const employersList = new NavBarInit(app, isAuthorized, false,"Личный кабинет");
        employersList.loadNavBar();

        const main = createElem("div", "main", app);
        const container = createElem("div", "container", main);

        const title = createElem("div", "profile__title", container);
        title.innerText = "Личный кабинет";

        const mainPage = createElem("div", "main__page", container);
        const mainColumnLeft = createElem("div", "main__page_left", mainPage);
        mainColumnLeft.insertAdjacentHTML("afterbegin", window.fest['persNavBar.tmpl']());
        const mainColumnRight = createElem("div", "main__page_right", mainPage);



        mainColumnRight.insertAdjacentHTML("afterbegin", window.fest['checkBoxJob.tmpl'](person));

        if (this.isPersonalRusemes){
            personalResumes(mainColumnLeft);
        } else {
            personalInfo(person, mainColumnLeft);
        }

        // app.insertAdjacentHTML("beforeend", window.fest['footer.tmpl']());

        checkoutProfilePage(isAuthorized, content);
        updateProfileFields();
    }
}



function personalResumes(mainColumnLeft){
    const resumes = [{
        name: 'Первое резюме',
        job: 'Желаемая работа',
        },
        {
            name: 'Второе резюме',
            job: 'Желаемая работа',
        },
        {
            name: 'Тертье резюме',
            job: 'Желаемая работа',
        }
        ]
    mainColumnLeft.insertAdjacentHTML("beforeend", window.fest['persResumes.tmpl'](resumes));
}

function personalInfo(person, mainColumnLeft){
    mainColumnLeft.insertAdjacentHTML("beforeend", window.fest['persInfo.tmpl'](person));
}