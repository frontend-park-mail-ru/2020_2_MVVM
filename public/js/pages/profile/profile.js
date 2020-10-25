import {NavBarInit} from "../../components/header/navBar.js";
import {checkoutProfilePage, personalInfo} from './components/personalNavBar/persNavBar.js'
import {updateProfileFields} from './components/checkboxSearch/checkBox.js'
import createElem from "../../libs/createElem.js";



const app = window.document.getElementById('app');

export default class Profile{
    constructor(loadResumesF, router) {
        this.onload = loadResumesF;
        this.router = router;
    }

    resumes = null;

    async render(isAuthorized, content){

        app.innerHTML = '';
        await this.onload().then((data)=>{
            this.resumes = data;
        });

        console.log(content);
        let person;
        if (isAuthorized) {
            person = {
                id: content.user.id,
                firstName: content.user.name,
                lastName: content.user.surname,
                email: content.user.email,
                phone: content.user.phone,
                resumeCount: "NOT READY YET",
                locationOfSearch: content.user.area_search,
                socialNetworkLinks: content.user.social_network,
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
        const body = createElem("div", "main__page_left-body", mainColumnLeft);
        await mainColumnLeft.insertAdjacentHTML("afterbegin", window.fest['persNavBar.tmpl']());

        const mainColumnRight = createElem("div", "main__page_right", mainPage);

        mainColumnRight.insertAdjacentHTML("afterbegin", window.fest['checkBoxJob.tmpl'](person));


        // app.insertAdjacentHTML("beforeend", window.fest['footer.tmpl']());

        await personalInfo(person, body);
        await checkoutProfilePage(this, isAuthorized, content, body, person);
        updateProfileFields();
    }
}



// function personalResumes(mainColumnLeft, resumes1){
//     console.log(resumes1);
//     const resumes = [{
//         name: 'Первое резюме',
//         name_job: 'Желаемая работа',
//         },
//         {
//             name: 'Второе резюме',
//             name_job: 'Желаемая работа',
//         },
//         {
//             name: 'Тертье резюме',
//             name_job: 'Желаемая работа',
//         }
//         ]
//     mainColumnLeft.insertAdjacentHTML("beforeend", window.fest['persResumes.tmpl'](resumes));
// }
//
// function personalInfo(person, mainColumnLeft){
//     mainColumnLeft.insertAdjacentHTML("beforeend", window.fest['persInfo.tmpl'](person));
// }