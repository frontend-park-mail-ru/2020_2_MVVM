import {NavBarInit} from "../../components/navBar/navBar.js";
import {checkBoxes} from '../../components/searchForm/searchForm.js'

const app = window.document.getElementById('app');

function createElem(tag, className, parent) {
    const temp = document.createElement(tag);
    temp.className = className;
    parent.appendChild(temp);
    return temp
}

export function renderCandList(user){

    app.innerHTML = '';

    const candidatesList = new NavBarInit(app,user, "Список резюме");
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
    ]

    mainRow.insertAdjacentHTML("afterbegin", window.fest['searchForm.tmpl'](m));

    const mainList = createElem("div", "main__list",mainRow);

    const infoOfCand = [
        {
            name: 'Мария Козлова',
            prof: 'UX / UI Дизайнер',
            job: 'yandex.ru',
            location: ['Москва','Россия'],
        },
        {
            name: 'Иван Иванов',
            prof: 'Слесарь',
            job: 'мгту',
            location: ['Иркутск','Россия'],
        },
        {
            name: 'Елизавета Комарова',
            prof: 'Кассир',
            job: 'Пятерочка',
            location: ['Новосибирск','Россия'],
        },
        {
            name: 'Екатерина Шумакова',
            prof: 'Программист 1:С',
            job: '1:C',
            location: ['Санкт-Петербург','Россия'],
        }
    ]

    mainList.insertAdjacentHTML("beforeend", window.fest['listOfCandidates.tmpl'](infoOfCand));
    mainList.insertAdjacentHTML("beforeend", window.fest['pagination.tmpl']());
    main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());


    afterRender();
}

function afterRender() {
    checkBoxes();
}