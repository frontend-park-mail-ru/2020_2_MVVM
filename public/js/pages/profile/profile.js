import {NavBarInit} from "../../components/navBar/navBar.js";
import {checkBoxes} from '../../components/searchForm/searchForm.js'
import {checkoutProfilePage} from './components/personalNavBar/persNavBar.js'
import {updateProfileFields} from './components/checkboxSearch/checkBox.js'

const app = window.document.getElementById('app');

function createElem(tag, className, parent) {
    const temp = document.createElement(tag);
    temp.className = className;
    parent.appendChild(temp);
    return temp
}

export function renderPersNavBar(user, isPersonalRusemes) {
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


    const person =  {
        firstName: 'Margot',
        lastName: 'Shulyak',
        email: 'qwerty@gmail.com',
        phone: '89991111111',
        resumeCount: '5',
        locationOfSearch: 'Moscow',
        socialNetworkLinks: '',

    }

    mainColumnRight.insertAdjacentHTML("afterbegin", window.fest['checkBoxJob.tmpl'](person));

    if (isPersonalRusemes){
        personalResumes(mainColumnLeft);
    } else {
        personalInfo(person, mainColumnLeft);
    }


    main.insertAdjacentHTML("beforeend", window.fest['footer.tmpl']());

    checkoutProfilePage();
    updateProfileFields();
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