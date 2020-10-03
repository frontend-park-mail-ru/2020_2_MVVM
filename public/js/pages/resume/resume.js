import {NavBar, NavBarInit} from "../../components/navBar/navBar.js";
import {checkBoxes} from '../../components/searchForm/searchForm.js'

const app = window.document.getElementById('app');

function createElem(tag, className, parent) {
    const temp = document.createElement(tag);
    temp.className = className;
    parent.appendChild(temp);
    return temp
}

export function renderEmplList(user) {
    app.innerHTML = '';

    const employersList = new NavBarInit(app, user, "");
    employersList.loadNavBar();

    const candOptions = createElem("div", "cand-option", app.firstElementChild.firstElementChild.firstElementChild)

    const briefInfo =
        {
            mainSkill: ['Photoshop', 'Illustrator', 'Designers'],
            photo: 'img/es1.jpg',
            name: 'David CARLOS',
            position: 'UX / UI Designer at Atract Solutions',
            mail: 'creativelayers088@gmail.com',
            dateReg: '2017',
            location: 'Москва / Россия'
        };

    candOptions.insertAdjacentHTML("afterEnd", window.fest['briefInfo.tmpl'](briefInfo));

    // Посмотреть как в других проектах все эти блоки раскиданы


    const main = createElem("div", "main", app);

    const contact = createElem("div", "resume-contact", main)
    contact.insertAdjacentHTML("afterEnd", window.fest['shareBar.tmpl']());

    const mainContent = createElem("div", "main-content", main);
    // mainContent.style.display = "flex";

    const contentLeftColumn = createElem("div", "content-left-column", mainContent);

    const infoOfEmpl = [
        {
            mainInfo: [{
                name: 'Подробная информация',
                text: ' Hello my name is Mark William Connor and I’m a Web Designer & Web Developer from Melbourne, Australia. ' +
                'In pharetra orci dignissim, blandit mi semper, ultricies diam. Suspendisse malesuada suscipit nunc non volutpat. ' +
                'Sed porta nulla id orci laoreet tempor non consequat enim. Sed vitae aliquam velit. Aliquam ante erat, ' +
                'blandit at pretium et, accumsan ac est. Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem ' +
                'condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam. ' +
                'Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at pretium et, accumsan ac est. ' +
                'Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. ' +
                'Suspendisse condimentum lorem ut elementum aliquam. Mauris nec erat ut libero vulputate pulvinar. '
            }],

            education: [{
                name: 'Образование',
                educationItem: [{
                    type: 'Университет',
                    duration: '2008 - 2012',
                    university: 'Middle East Technical University',
                    department: 'Computer Science',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. ' +
                        'Interdum et malesuada fames ac ante ipsum primis in faucibus.'
                },{
                    type: 'Высшая школа',
                    time: '2008 - 2012',
                    university: 'Tomms College',
                    department: 'Bachlors in Fine Arts',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. ' +
                        'Interdum et malesuada fames ac ante ipsum primis in faucibus.'
                }],
            }],

            workExperience: [{
                name: 'Опыт работы',
                experienceItem: [{
                    position: 'Web Designer',
                    nameCompany: 'Inwave Studio',
                    duration: '2008 - 2012',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. ' +
                        'Interdum et malesuada fames ac ante ipsum primis in faucibus.'
                },{
                    position: 'Web Designer',
                    nameCompany: 'Inwave Studio',
                    duration: '2008 - 2012',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. ' +
                        'Interdum et malesuada fames ac ante ipsum primis in faucibus.'
                }],
            }],

            portfolio: [{
                name: 'Портфолио',
                portfolioItem: [{
                    image: 'img/p1.jpg'
                },{
                    image: 'img/p2.jpg'
                },{
                    image: 'img/p1.jpg'
                },{
                    image: 'img/p2.jpg'
                }],
            }],

            skills: [{
                name: 'Персональные навыки',
                skillsItem: [{
                    skill: 'Adobe Photoshop',
                    percent: '50%'
                },{
                    skill: 'Production In Html',
                    percent: '80%'
                },{
                    skill: 'Adobe Photoshop',
                    percent: '30%'
                }],
            }],

            awards: [{
                name: 'Награды',
                awardsItem: [{
                    award: 'Perfect Attendance Programs',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. ' +
                        'Interdum et malesuada fames ac ante ipsum primis in faucibus.'
                },{
                    award: 'Top Performer Recognition',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. ' +
                        'Interdum et malesuada fames ac ante ipsum primis in faucibus.'
                }],
            }],

        },
    ]

    contentLeftColumn.insertAdjacentHTML("beforeend", window.fest['resume.tmpl'](infoOfEmpl));


    const contentRightColumn = createElem("div", "content-right-column", mainContent);

    const jobOverview =
        {
            name: 'резюме',
            salary: '£15,000 - £20,000',
            gender: 'Мужской',
            level: 'Должностное лицо',
            interest: 'Менеджмент',
            experience: '2 Года',
            education: 'Бакалавриат'
        };

    contentRightColumn.insertAdjacentHTML("beforeend", window.fest['jobOverview.tmpl'](jobOverview));

    contentRightColumn.insertAdjacentHTML("beforeend", window.fest['contactForm.tmpl']());

    main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());

    afterRender();
}

function afterRender() {
    checkBoxes();
}