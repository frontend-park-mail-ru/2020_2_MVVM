import {NavBarInit} from "../../components/navBar/navBar.js";
import {recentJobs} from './components/recentJobs/resentJobs.js';

const app = window.document.getElementById('app');

function createElem(tag, className, parent) {
    const temp = document.createElement(tag);
    temp.className = className;
    parent.appendChild(temp);
    return temp
}

export default class Vacancy{
    render(user) {
        app.innerHTML = '';

        const navBarInit = new NavBarInit(app, Boolean(user.id), "Вакансия");
        navBarInit.loadNavBar();

        const main = createElem("div", "main", app);
        const mainContent = createElem("div", "main-content", main);

        const briefInfoJob = {
            name: 'Tix Dog',
            logo: 'img/sj.png',
            location: '274 Seven Sisters Road, London, N4 2HY',
            site: 'www.jobhunt.com',
            phone: '+90 538 963 54 87',
            mail: 'ali.tufan@jobhunt.com',
        }
        mainContent.insertAdjacentHTML("beforeend", window.fest['briefInfoJob.tmpl'](briefInfoJob));

        const contentLeftColumn = createElem("div", "content-left-column", mainContent);

        const vacancy =
            [{
                mainInfo: [{
                    name: 'Описание работы',
                    text: 'Company is a 2016 Iowa City-born start-up that develops consectetuer adipiscing elit. ' +
                        'Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, ' +
                        'dapibus id, mattis vel, nisi.Sed pretium, ligula sollicitudin laoreet viverra, ' +
                        'tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. ' +
                        'Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.' +
                        'Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus.' +
                        'Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, ' +
                        'lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien '
                }],

                required: [{
                    name: 'Требуемые знания, Навыки и Способности',
                    requiredItem: [
                        'Ability to write code – HTML & CSS (SCSS flavor of SASS preferred when writing CSS)',
                        'Proficient in Photoshop, Illustrator, bonus points for familiarity with Sketch ' +
                        '(Sketch is our preferred concepting)',
                        'Cross-browser and platform testing as standard practice',
                        'Experience using Invision a plus',
                        'Experience in video production a plus or, at a minimum, a willingness to learn',
                    ],
                }],
                experience: [{
                    name: 'Образование + Опыт работы',
                    experienceItem: [
                        'Advanced degree or equivalent experience in graphic and web design',
                        '3 or more years of professional design experience',
                        'Direct response email experience',
                        'Ecommerce website design experience',
                        'Familiarity with mobile and web apps preferred',
                        'Excellent communication skills, most notably a demonstrated ability to solicit and ' +
                        'address creative and design feedback',
                        'Must be able to work under pressure and meet deadlines while maintaining a positive attitude ' +
                        'and providing exemplary customer service',
                        'Ability to work independently and to carry out assignments to completion within parameters ' +
                        'of instructions given, prescribed routines, and standard accepted practices',
                    ],
                }],
            }];

        contentLeftColumn.insertAdjacentHTML("beforeend", window.fest['vacancy.tmpl'](vacancy));

        recentJobs(contentLeftColumn);

        const contentRightColumn = createElem("div", "content-right-column", mainContent);

        const jobOverview =
            {
                name: 'вакансии',
                salary: '£15,000 - £20,000',
                gender: 'Мужской',
                level: 'Должностное лицо',
                interest: 'Менеджмент',
                experience: '2 Года',
                education: 'Бакалавриат'
            };

        contentRightColumn.insertAdjacentHTML("beforeend", window.fest['jobOverview.tmpl'](jobOverview));

        contentRightColumn.insertAdjacentHTML("beforeend", window.fest['contactForm.tmpl']());

        contentRightColumn.insertAdjacentHTML("beforeend", window.fest['shareBar.tmpl']());


        main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
    }
}


