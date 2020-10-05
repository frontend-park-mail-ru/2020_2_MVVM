import {NavBarInit} from "../../components/navBar/navBar.js";
import {checkBoxes} from '../../components/searchForm/searchForm.js'

const app = window.document.getElementById('app');

function createElem(tag, className, parent) {
    const temp = document.createElement(tag);
    temp.className = className;
    parent.appendChild(temp);
    return temp
}

export default class EmployersList{
    render(user){
        app.innerHTML = '';

        const employersList = new NavBarInit(app, user, "Список ваканский");
        employersList.loadNavBar();

        const main = createElem("div", "main", app);
        const container = createElem("div", "container", main);
        const mainRow = createElem("div", "main__row", container);
        mainRow.style.display = "flex";

        const m = [
            {
                type: 'Специализация',
                name: ['Бухгалтерский учет', 'Банковское дело', 'Благотворительность', 'Дизайн', 'Агенство недвижимости', 'IT технологии'],
            },
            {
                type: 'Размер команды',
                name: ['1-10', '11-100', '100+'],
            },
            {
                type: 'Пол',
                name: ['Мужской', 'Женский'],
            }
        ]
        mainRow.insertAdjacentHTML("afterbegin", window.fest['searchForm.tmpl'](m));

        const mainList = createElem("div", "main__list",mainRow);

        const infoOfEmpl = [
            {
                name: 'Программист 1С',
                openPos: '4',
                special: ['IT технологии', 'Бухгалтерской учет'],
                location: ['Москва','Россия'],
                description: 'Программирование в среде 1С 8 УПП. Доработка конфигурации по техническим заданиям (проекты). Составление технической документации. Ведение плана работ. Высшее профильное образование. Знание конфигураций 1С:УПП 1.3, 1С Документооборот. Плюсом будет знание: 1С Зарплата',
            },
            {
                name: 'Программист 1С',
                openPos: '4',
                special: ['IT технологии', 'Бухгалтерской учет'],
                location: ['Москва','Россия'],
                description: 'Программирование в среде 1С 8 УПП. Доработка конфигурации по техническим заданиям (проекты). Составление технической документации. Ведение плана работ. Высшее профильное образование. Знание конфигураций 1С:УПП 1.3, 1С Документооборот. Плюсом будет знание: 1С Зарплата',
            },
            {
                name: 'Программист 1С',
                openPos: '4',
                special: ['IT технологии', 'Бухгалтерской учет'],
                location: ['Москва','Россия'],
                description: 'Программирование в среде 1С 8 УПП. Доработка конфигурации по техническим заданиям (проекты). Составление технической документации. Ведение плана работ. Высшее профильное образование. Знание конфигураций 1С:УПП 1.3, 1С Документооборот. Плюсом будет знание: 1С Зарплата',
            },
            {
                name: 'Программист 1С',
                openPos: '4',
                special: ['IT технологии', 'Бухгалтерской учет'],
                location: ['Москва','Россия'],
                description: 'Программирование в среде 1С 8 УПП. Доработка конфигурации по техническим заданиям (проекты). Составление технической документации. Ведение плана работ. Высшее профильное образование. Знание конфигураций 1С:УПП 1.3, 1С Документооборот. Плюсом будет знание: 1С Зарплата',
            },
            {
                name: 'Программист 1С',
                openPos: '4',
                special: ['IT технологии', 'Бухгалтерской учет'],
                location: ['Москва','Россия'],
                description: 'Программирование в среде 1С 8 УПП. Доработка конфигурации по техническим заданиям (проекты). Составление технической документации. Ведение плана работ. Высшее профильное образование. Знание конфигураций 1С:УПП 1.3, 1С Документооборот. Плюсом будет знание: 1С Зарплата',
            },
        ]

        mainList.insertAdjacentHTML("beforeend", window.fest['listOfEmployers.tmpl'](infoOfEmpl));
        mainList.insertAdjacentHTML("beforeend", window.fest['pagination.tmpl']());
        main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());

        afterRender();
    }
}


function afterRender() {
    checkBoxes();
}