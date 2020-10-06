import {NavBarInit} from "../../components/navBar/navBar.js";
import {checkoutProfilePage} from './components/personalNavBar/persNavBar.js'
import {updateProfileFields} from './components/checkboxSearch/checkBox.js'

const app = window.document.getElementById('app');

function createElem(tag, className, parent) {
    const temp = document.createElement(tag);
    temp.className = className;
    parent.appendChild(temp);
    return temp
}


export default class Profile{
    constructor(get_current_user) {
        this.get_current_user = get_current_user
    }
    isPersonalRusemes = false;

    async render(user){
        app.innerHTML = '';

        const employersList = new NavBarInit(app, user, "Личный кабинет");
        employersList.loadNavBar();

        const main = createElem("div", "main", app);
        const container = createElem("div", "container", main);

        const title = createElem("div", "title", container);
        title.innerText = "Настройки";

        const mainPage = createElem("div", "main__page", container);
        const mainColumnLeft = createElem("div", "main__page_left", mainPage);
        mainColumnLeft.insertAdjacentHTML("afterbegin", window.fest['persNavBar.tmpl']());
        const mainColumnRight = createElem("div", "main__page_right", mainPage);


        const person = await this.get_current_user()
        mainColumnRight.insertAdjacentHTML("afterbegin", window.fest['checkBoxJob.tmpl'](person));

        if (this.isPersonalRusemes){
            personalResumes(mainColumnLeft);
        } else {
            personalInfo(person, mainColumnLeft);
        }


        main.insertAdjacentHTML("beforeend", window.fest['footer.tmpl']());

        checkoutProfilePage();
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