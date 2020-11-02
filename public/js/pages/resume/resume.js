import {NavBarInit} from "../../components/header/navBar.js";
import {network} from "../../libs/networks.js";
import {
    usersByIdURL,
    resumeByIdURL,
    gender,
    educationLevel,
    experienceLevel,
    experienceMonth,
    // city
} from "../../libs/constants.js";
import createElem from "../../libs/createElem.js";


const app = window.document.getElementById('app');

const resumeInfo = async (user_id, resume_id) => {
    const responseUser = await network.doGet(`${usersByIdURL}${user_id}`);
    const user = (await responseUser.json()).user;
    console.log(user);
    console.assert(responseUser.ok);

    const responseResume = await network.doGet(`${resumeByIdURL}${resume_id}`);

    const nullToString = (e) => {
        if (e == null) {
            return "-";
        }
        return e;
    }

    console.assert(responseResume.ok);
    const resume = (await responseResume.json());
    console.log(resume);

    const dateRegBd = resume.resume.date_create.toString();
    let dataReg = '';
    dataReg = dateRegBd.slice(8,10) + '-' + dateRegBd.slice(5,7) + '-' + dateRegBd.slice(0,4);

    let experiences = resume.experience_custom_company;
    if (experiences){
        experiences.forEach((item)=>{
            let tmpDate = new Date(item.begin);
            item.begin = tmpDate.toDateString();
            if (item.continue_to_today) {
                item.finish = "today";
            } else {
                let tmpDate = new Date(item.finish);
                item.finish = tmpDate.toDateString();
            }
        });
    }


    return {
        infoAll : {
            photo: 'img/es1.jpg',
            name: user.name + " " + user.surname,
            position: resume.resume.place,
            mail: user.email,
            dateReg: dataReg,
            area_search: resume.resume.area_search,
        },
        jobOverview : {
                name: user.name,
                salary_min: nullToString(resume.resume.salary_min),
                salary_max: nullToString(resume.resume.salary_max),
                gender: nullToString(gender[resume.resume.gender]),
                experience_level: nullToString(experienceLevel[resume.resume.education_level]),
                experience_month: nullToString(experienceMonth[resume.resume.experience_month]),
                interest: "TODOManagement",
                education: nullToString(educationLevel[resume.resume.education_level]),
                career_level: nullToString(resume.resume.career_level),
        },
        description : {
            text: nullToString(resume.resume.description),
            experience_custom_company: experiences,
            skills: resume.resume.skills,
        }

    }
}

export default class Resume {
    async render(content, user_id, resume_id) {

        app.innerHTML = '';

        const navBarInit = new NavBarInit(app, content, false,"");
        navBarInit.loadNavBar();

        const infoAll = await resumeInfo(user_id, resume_id);


        const candOptions = createElem("div", "cand-option", app.firstElementChild.firstElementChild.firstElementChild)


        candOptions.insertAdjacentHTML("afterEnd", window.fest['briefInfo.tmpl'](infoAll.infoAll));

        const main = createElem("div", "main", app);

        const contact = createElem("div", "mainPage-contact", main)
        contact.insertAdjacentHTML("afterEnd", window.fest['contact.tmpl']());

        const mainContent = createElem("div", "main-content", main);

        const contentLeftColumn = createElem("div", "content-left-column", mainContent);

        contentLeftColumn.insertAdjacentHTML("beforeend", window.fest['resume.tmpl'](infoAll.description));


        const contentRightColumn = createElem("div", "content-right-column", mainContent);


        contentRightColumn.insertAdjacentHTML("beforeend", window.fest['jobOverview.tmpl'](infoAll.jobOverview));

        contentRightColumn.insertAdjacentHTML("beforeend", window.fest['contactForm.tmpl']());

        // main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
    }
}
