import {NavBarInit} from "../../components/header/navBar.js";
import {network} from "../../libs/networks.js";
import {usersByIdURL, resumeByIdURL} from "../../libs/constants.js";
import createElem from "../../libs/createElem.js";


const app = window.document.getElementById('app');

const resumeInfo = async (user_id, resume_id) => {

    console.log(user_id,resume_id);
    const response1 = await network.doGet(`${usersByIdURL}${user_id}`);
    const user = (await response1.json()).user;
    console.assert(response1.ok);

    const response2 = await network.doGet(`${resumeByIdURL}${resume_id}`);

    const nullToString = (e) => {
        if (e == null) {
            return "-";
        }
        return e;
    }

    console.assert(response2.ok);
    const resume = (await response2.json()).resume;

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

export default class Resume {
    async render(isAuthorized, content, user_id, resume_id) {

        console.log(content, user_id, resume_id);

        app.innerHTML = '';


        const navBarInit = new NavBarInit(app, isAuthorized, false,"");
        navBarInit.loadNavBar();

        const infoAll = await resumeInfo(user_id, resume_id);


        const candOptions = createElem("div", "cand-option", app.firstElementChild.firstElementChild.firstElementChild)


        candOptions.insertAdjacentHTML("afterEnd", window.fest['briefInfo.tmpl'](infoAll[0]));

        const main = createElem("div", "main", app);

        const contact = createElem("div", "mainPage-contact", main)
        contact.insertAdjacentHTML("afterEnd", window.fest['contact.tmpl']());

        const mainContent = createElem("div", "main-content", main);

        const contentLeftColumn = createElem("div", "content-left-column", mainContent);

        contentLeftColumn.insertAdjacentHTML("beforeend", window.fest['resume.tmpl'](infoAll[2]));


        const contentRightColumn = createElem("div", "content-right-column", mainContent);


        contentRightColumn.insertAdjacentHTML("beforeend", window.fest['jobOverview.tmpl'](infoAll[1]));

        contentRightColumn.insertAdjacentHTML("beforeend", window.fest['contactForm.tmpl']());

        // main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
    }
}
