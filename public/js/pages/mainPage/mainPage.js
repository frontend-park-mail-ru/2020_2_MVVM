import {NavBarInit} from "Js/components/header/navBar";
import createElem from "Js/libs/createElem";
import searchJobTemp from 'Js/pages/mainPage/components/searchJob/searchJob.tmpl.xml'
import categoryTemp from 'Js/pages/mainPage/components/category/category.tmpl.xml'
import createResumeTemp from 'Js/pages/mainPage/components/createResume/createResume.tmpl.xml'
import popularJobTemp from 'Js/pages/mainPage/components/popularJob/popularJob.tmpl.xml'
import gratitudesTemp from 'Js/pages/mainPage/components/gratitudes/gratitudes.tmpl.xml'
import footerTemp from 'Js/components/footer/footer.tmpl.xml'

const app = window.document.getElementById('app');


export default class MainPage{
    render(content) {

        app.innerHTML = '';

        const navBarInit = new NavBarInit(app, content, true,  "Самый простой способ найти новую работу");
        navBarInit.loadNavBar();

        const searchJob = createElem("div", "search-job", app.getElementsByClassName("header__page")[0])
        searchJob.insertAdjacentHTML("afterEnd", searchJobTemp());

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

        main.insertAdjacentHTML("beforeend", categoryTemp(category));
        main.insertAdjacentHTML("beforeend", createResumeTemp());

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
        main.insertAdjacentHTML("beforeend", popularJobTemp(jobs));

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

        main.insertAdjacentHTML("beforeend", gratitudesTemp(gratitudes));


        app.insertAdjacentHTML("beforeend", footerTemp());
    }
}

