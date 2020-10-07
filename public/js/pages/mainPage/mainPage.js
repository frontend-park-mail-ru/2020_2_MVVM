import {NavBarInit} from "../../components/navBar/navBar.js";

const app = window.document.getElementById('app');

function createElem(tag, className, parent) {
    const temp = document.createElement(tag);
    temp.className = className;
    parent.appendChild(temp);
    return temp
}

export default class MainPage{
    render(user){
        app.innerHTML = '';

        const navBarInit = new NavBarInit(app, Boolean(user.ID), "Самый простой способ найти новую работу");
        navBarInit.loadNavBar();

        const searchJob = createElem("div", "search-job", app.getElementsByClassName("header__page")[0])
        searchJob.insertAdjacentHTML("afterEnd", window.fest['searchJob.tmpl']());

        const main = createElem("div", "main", app);
        const category = [
            {
                name: 'Дизайн',
                count: '22'
            },{
                name: 'Образование',
                count: '22'
            },{
                name: 'Финансы',
                count: '22'
            },{
                name: 'Телекоммуникации',
                count: '22'
            },{
                name: 'Рестораны',
                count: '22'
            },{
                name: 'Промышленность',
                count: '22'
            },{
                name: 'Здоровье',
                count: '22'
            },{
                name: 'Рестораны',
                count: '22'
            }
        ];

        main.insertAdjacentHTML("beforeend", window.fest['category.tmpl'](category));
        main.insertAdjacentHTML("beforeend", window.fest['createResume.tmpl']());

        const jobs = [
            {
                position: 'Web Designer / Developer',
                nameCompany: 'Massimo Artemisis',
                logo: 'img/l1.png',
                location: 'Sacramento, California',
                schedule: 'Full time',
                durationPublic: '5 месяцев назад',
            },
            {
                position: 'C Developer (Senior) C .Net',
                nameCompany: 'Massimo Artemisis',
                logo: 'img/l2.png',
                location: 'Sacramento, California',
                schedule: 'Full time',
                durationPublic: '5 месяцев назад',
            },
        ]
        main.insertAdjacentHTML("beforeend", window.fest['popularJob.tmpl'](jobs));

        const gratitudes = [
            {
                name: 'Маша Петрова',
                position: 'Web designer',
                photo: 'img/r1.jpg',
                text: 'Вы помогли мне найти работу после окончания Бауманки! Спасибо! ' +
                    'Вы помогли мне найти работу после окончания Бауманки! Спасибо!'
            },{
                name: 'Саша Иванов',
                position: 'Инженер',
                photo: 'img/es1.jpg',
                text: 'Никто не брал меня на работу, но ваш сайт помог мне устроиться в мак',
            },{
                name: 'Маша Петрова',
                position: 'Massimo Artemisis',
                photo: 'img/r1.jpg',
                text: 'Вы помогли мне найти работу после окончания Бауманки! Спасибо! '
            },
        ]

        main.insertAdjacentHTML("beforeend", window.fest['gratitudes.tmpl'](gratitudes));


        main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
    }
}

