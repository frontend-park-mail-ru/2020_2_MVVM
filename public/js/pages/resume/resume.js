import {NavBarInit} from "../../components/navBar/navBar.js";


const app = window.document.getElementById('app');

function createElem(tag, className, parent) {
    const temp = document.createElement(tag);
    temp.className = className;
    parent.appendChild(temp);
    return temp
}

export default class Resume {
    async render(user, user_id, resume_id) {

        const resumeInfo = async () => {
            const response1 = await fetch(
                `api/v1/users/by/id/${user_id}`,
                {
                    method: "get",
                },
            )
            console.assert(response1.ok)
            const user = (await response1.json()).user

            const response2 = await fetch(
                `api/v1/resume/by/id/${resume_id}`,
                {
                    method: "GET",
                },
            )

            const nullToString = (e) => {
                if (e == null) {
                    return "-"
                }
                return e
            }
            console.assert(response2.ok)
            const resume = (await response2.json()).resume

            console.log(resume)

            return [{
                mainSkill: ['TODODesigners'],
                photo: 'img/es1.jpg',
                name: user.name + " " + user.surname,
                position: 'TODO UX / UI Designer at Atract Solutions',
                mail: user.mail,
                dateReg: 'TODO2017',
                location: 'TODOМосква / Россия'
            }, {
                user_id: resume.id,
                salary_min: nullToString(resume.salary_min),
                salary_max: nullToString(resume.salary_max),
                gender: nullToString(resume.gender),
                level: nullToString(resume.level),
                experience_month: nullToString(resume.experience_month),
                interest: "TODOManagement",
                education: nullToString(resume.education),
            },
                {text: nullToString(resume.description)}
            ]
        }


        app.innerHTML = '';

        const navBarInit = new NavBarInit(app, user, "");
        navBarInit.loadNavBar();

        const infoAll = await resumeInfo();

        console.log(infoAll)

        const candOptions = createElem("div", "cand-option", app.firstElementChild.firstElementChild.firstElementChild)
        //
        // const briefInfo =
        //     {
        //         mainSkill: ['Photoshop', 'Illustrator', 'Designers'],
        //         photo: 'img/es1.jpg',
        //         name: 'David CARLOS',
        //         position: 'UX / UI Designer at Atract Solutions',
        //         mail: 'creativelayers088@gmail.com',
        //         dateReg: '2017',
        //         location: 'Москва / Россия'
        //     };

        candOptions.insertAdjacentHTML("afterEnd", window.fest['briefInfo.tmpl'](infoAll[0]));

        const main = createElem("div", "main", app);

        const contact = createElem("div", "mainPage-contact", main)
        contact.insertAdjacentHTML("afterEnd", window.fest['contact.tmpl']());

        const mainContent = createElem("div", "main-content", main);

        const contentLeftColumn = createElem("div", "content-left-column", mainContent);

        // const resume = [
        //     {
        //         mainInfo: [{
        //             name: 'Подробная информация',
        //             text: ' Hello my name is Mark William Connor and I’m a Web Designer & Web Developer from Melbourne, Australia. ' +
        //                 'In pharetra orci dignissim, blandit mi semper, ultricies diam. Suspendisse malesuada suscipit nunc non volutpat. ' +
        //                 'Sed porta nulla id orci laoreet tempor non consequat enim. Sed vitae aliquam velit. Aliquam ante erat, ' +
        //                 'blandit at pretium et, accumsan ac est. Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem ' +
        //                 'condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam. ' +
        //                 'Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at pretium et, accumsan ac est. ' +
        //                 'Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. ' +
        //                 'Suspendisse condimentum lorem ut elementum aliquam. Mauris nec erat ut libero vulputate pulvinar. '
        //         }],
        //
        //         education: [{
        //             name: 'Образование',
        //             educationItem: [{
        //                 type: 'Университет',
        //                 duration: '2008 - 2012',
        //                 university: 'Middle East Technical University',
        //                 department: 'Computer Science',
        //                 description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. ' +
        //                     'Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        //             }, {
        //                 type: 'Высшая школа',
        //                 time: '2008 - 2012',
        //                 university: 'Tomms College',
        //                 department: 'Bachlors in Fine Arts',
        //                 description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. ' +
        //                     'Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        //             }],
        //         }],
        //
        //         workExperience: [{
        //             name: 'Опыт работы',
        //             experienceItem: [{
        //                 position: 'Web Designer',
        //                 nameCompany: 'Inwave Studio',
        //                 duration: '2008 - 2012',
        //                 description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. ' +
        //                     'Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        //             }, {
        //                 position: 'Web Designer',
        //                 nameCompany: 'Inwave Studio',
        //                 duration: '2008 - 2012',
        //                 description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. ' +
        //                     'Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        //             }],
        //         }],
        //
        //         portfolio: [{
        //             name: 'Портфолио',
        //             portfolioItem: [{
        //                 image: 'img/p1.jpg'
        //             }, {
        //                 image: 'img/p2.jpg'
        //             }, {
        //                 image: 'img/p1.jpg'
        //             }, {
        //                 image: 'img/p2.jpg'
        //             }],
        //         }],
        //
        //         skills: [{
        //             name: 'Персональные навыки',
        //             skillsItem: [{
        //                 skill: 'Adobe Photoshop',
        //                 percent: '50%'
        //             }, {
        //                 skill: 'Production In Html',
        //                 percent: '80%'
        //             }, {
        //                 skill: 'Adobe Photoshop',
        //                 percent: '30%'
        //             }],
        //         }],
        //
        //         awards: [{
        //             name: 'Награды',
        //             awardsItem: [{
        //                 award: 'Perfect Attendance Programs',
        //                 description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. ' +
        //                     'Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        //             }, {
        //                 award: 'Top Performer Recognition',
        //                 description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. ' +
        //                     'Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        //             }],
        //         }],
        //
        //     },
        // ]

        contentLeftColumn.insertAdjacentHTML("beforeend", window.fest['resume.tmpl'](infoAll[2]));


        const contentRightColumn = createElem("div", "content-right-column", mainContent);

        // const jobOverview =
        //     {
        //         name: 'резюме',
        //         salary: '£15,000 - £20,000',
        //         gender: 'Мужской',
        //         level: 'Должностное лицо',
        //         interest: 'Менеджмент',
        //         experience: '2 Года',
        //         education: 'Бакалавриат'
        //     };

        contentRightColumn.insertAdjacentHTML("beforeend", window.fest['jobOverview.tmpl'](infoAll[1]));

        contentRightColumn.insertAdjacentHTML("beforeend", window.fest['contactForm.tmpl']());

        main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
    }
}
