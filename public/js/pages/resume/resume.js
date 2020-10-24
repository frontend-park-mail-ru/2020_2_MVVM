import {NavBarInit} from "../../components/header/navBar.js";
import {network} from "../../libs/networks.js";
import {usersByIdURL, resumeByIdURL, gender, educationLevel,experienceLevel, experienceMonth} from "../../libs/constants.js";
import createElem from "../../libs/createElem.js";


const app = window.document.getElementById('app');

const resumeInfo = async (user_id, resume_id) => {
    const response1 = await network.doGet(`${usersByIdURL}${user_id}`);
    const user = (await response1.json()).user;
    console.log(user);
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
    console.log(resume);

    const resp = {
        resume:{
            id: resume.id,
            user_id: user.id,
            awards: null,
            career_level: "junior",
            description: "о себе",
            education_level: "middle",
            experience_month: 5,
            gender: "male",
            place: "желаемая должность",
            salary_max: 1000,
            salary_min: 10,
            skills: "проф навыки",
            title: "название резюме",
            date_create: "2020-10-23T00:00:00Z",
        },
        experience_custom_company: [
            {
                begin: "2020-09-28",
                duties: "обяз1",
                finish: "2020-10-03",
                name_job: "организация1",
                numOfJob: 1,
                position: "должность1",
            },
            {
                begin: "2020-09-28",
                duties: "обяз2",
                finish: "today",
                name_job: "организация2",
                numOfJob: 2,
                position: "должность2",
            }
            ],
    }

    const dateRegBd = resp.resume.date_create.toString();
    let dataReg = '';
    dataReg = dateRegBd.slice(8,10) + '-' + dateRegBd.slice(5,7) + '-' + dateRegBd.slice(0,4);


    return {
        infoAll : {
            photo: 'img/es1.jpg',
            name: user.name + " " + user.surname,
            position: resp.resume.place,
            mail: user.email,
            dateReg: dataReg,
            location: 'TODOМосква / Россия',
        },
        jobOverview : {
                name: user.name,
                salary_min: nullToString(resp.resume.salary_min),
                salary_max: nullToString(resp.resume.salary_max),
                gender: nullToString(gender[resp.resume.gender]),
                experience_level: nullToString(experienceLevel[resp.resume.education_level]),
                experience_month: nullToString(experienceMonth[resp.resume.experience_month]),
                interest: "TODOManagement",
                education: nullToString(educationLevel[resp.resume.education_level]),
        },
        description : {
            text: nullToString(resp.resume.description),
            experience_custom_company: resp.experience_custom_company,
            skills: resp.resume.skills,
        }

    }
}

export default class Resume {
    async render(isAuthorized, content, user_id, resume_id) {

        app.innerHTML = '';

        const navBarInit = new NavBarInit(app, isAuthorized, false,"");
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
