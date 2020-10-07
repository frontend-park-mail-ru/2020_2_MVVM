import {NavBarInit} from "../../components/navBar/navBar.js";
import {checkBoxes} from '../../components/searchForm/searchForm.js'
import router from "../../libs/router.js";

const app = window.document.getElementById('app');

function createElem(tag, className, parent) {
    const temp = document.createElement(tag);
    temp.className = className;
    parent.appendChild(temp);
    return temp
}

export default class CandidatesList{
    // TODO ROUTER - костыль, сделать нормально через контроллеры
    constructor(fetchCandInfo, router) {
        this.fetchCandInfo = fetchCandInfo
        this.router = router
    }

    async render(user) {
        app.innerHTML = '';

        const candidatesList = new NavBarInit(app, user, "Список резюме");
        candidatesList.loadNavBar();

        const main = createElem("div", "main", app);
        const container = createElem("div", "container", main);
        const mainRow = createElem("div", "main__row", container);
        mainRow.style.display = "flex";


        const m = [
            {
                type:'Специализация',
                name: ['Бухгалтерский учет', 'Банковское дело', 'Благотвор'],
            },
            {
                type:'Желаемая зарплата',
                name:['10-50', '50-100', '100-150'],
            }
        ];

        mainRow.insertAdjacentHTML("afterbegin", window.fest['searchForm.tmpl'](m));

        const mainList = createElem("div", "main__list",mainRow);

        const infoOfCand = await this.fetchCandInfo();
        mainList.insertAdjacentHTML("beforeend", window.fest['listOfCandidates.tmpl'](infoOfCand));
        mainList.insertAdjacentHTML("beforeend", window.fest['pagination.tmpl']());
        main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());

        const linksToResume = main.getElementsByClassName("go_to_resume");


        for (let i = 0; i < linksToResume.length; i++) {
            linksToResume[i].addEventListener('click', event => {
                event.preventDefault()
                this.router.change('/resume', infoOfCand[i].id, infoOfCand[i].resume_id)
            })
        }

        afterRender();
    }
}

function afterRender() {
    checkBoxes();
}
