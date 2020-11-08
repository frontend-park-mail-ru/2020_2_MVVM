import {NavBarInit} from "Js/components/header/navBar";
import {network} from "Js/libs/networks";
import {
    resumeByIdURL,
    gender,
    educationLevel,
    experienceLevel,
    experienceMonth,
    addLikeResumeURL,
    deleteLikeResumeURL, DOMAIN,
} from "Js/libs/constants";
import createElem from "../../libs/createElem.js";
import briefInfoTemp from './components/briefInfo/briefInfo.tmpl.xml'
import contactTemp from './components/contact/contact.tmpl.xml'
import resumeTemp from './components/resume/resume.tmpl.xml'
import jobOverviewTemp from 'Js/components/rightColumn/jobOverview.tmpl.xml'
import contactFormTemp from 'Js/components/rightColumn/contactForm.tmpl.xml'
import favoritesTemp from 'Js/pages/resume/components/briefInfo/favorites.tmpl.xml'



const app = window.document.getElementById('app');

const nullToString = (e) => {
    if (e == null) {
        return "-";
    }
    return e;
}

const resumeInfo = async (content, resumeSource) => {

    let resumeData;
    if (resumeSource.hasOwnProperty('user')) {
        resumeData = resumeSource;
    } else {
        const responseResume = await network.doGet(`${resumeByIdURL}${resumeSource.resume_id}`);
        console.assert(responseResume.ok);
        resumeData = await responseResume.json();
    }


    const dateRegBd = resumeData.resume.date_create.toString();
    let dataReg = '';
    dataReg = dateRegBd.slice(8,10) + '-' + dateRegBd.slice(5,7) + '-' + dateRegBd.slice(0,4);

    let experiences = resumeData.custom_experience;
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

    const userInfo = resumeData.user;
    const resumeInfo = resumeData.resume;
    console.log(content);

    return {
            infoAll : {
                imgPath: `${DOMAIN}static/resume/${resumeInfo.id}`,
                name: userInfo.name + " " + userInfo.surname,
                position: resumeInfo.place,
                mail: userInfo.email,
                dateReg: dataReg,
                area_search: resumeInfo.area_search,
                my_user_type: content.user.user_type,
                is_favorite: resumeData.is_favorite,
            },
            jobOverview : {
                name: userInfo.name,
                salary_min: nullToString(resumeInfo.salary_min),
                salary_max: nullToString(resumeInfo.salary_max),
                gender: nullToString(gender[resumeInfo.gender]),
                experience_level: nullToString(experienceLevel[resumeInfo.education_level]),
                experience_month: nullToString(experienceMonth[resumeInfo.experience_month]),
                interest: "TODOManagement",
                education: nullToString(educationLevel[resumeInfo.education_level]),
                career_level: nullToString(resumeInfo.career_level),
            },
            description : {
                text: nullToString(resumeInfo.description),
                experience_custom_company: resumeData.custom_experience,
                skills: resumeInfo.skills,
            }
        }
}

export default class Resume {
    async render(content, resume) {

        app.innerHTML = '';

        const navBarInit = new NavBarInit(app, content, false,"");
        navBarInit.loadNavBar();

        const infoAll = await resumeInfo(content, resume);


        const candOptions = createElem("div", "cand-option", app.firstElementChild.firstElementChild.firstElementChild)


        candOptions.insertAdjacentHTML("afterEnd", briefInfoTemp(infoAll.infoAll));

        const main = createElem("div", "main", app);

        const contact = createElem("div", "mainPage-contact", main)
        contact.insertAdjacentHTML("afterEnd", contactTemp());

        const mainContent = createElem("div", "main-content", main);

        const contentLeftColumn = createElem("div", "content-left-column", mainContent);

        contentLeftColumn.insertAdjacentHTML("beforeend", resumeTemp(infoAll.description));


        const contentRightColumn = createElem("div", "content-right-column", mainContent);


        contentRightColumn.insertAdjacentHTML("beforeend", jobOverviewTemp(infoAll.jobOverview));

        contentRightColumn.insertAdjacentHTML("beforeend", contactFormTemp());


        addDeleteLikes(resume.resume_id, infoAll);





        // main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
    }
}


async function addDeleteLikes(resume_id, infoAll){
    let addLike = document.getElementById("add_to_prefer");
    let deleteLike = document.getElementById("delete_from_prefer");
    let likes = document.getElementsByClassName("cand-options-contact");

    if (addLike) {
        addLike.addEventListener('click', async () =>{
            const addLikeResp = await network.doPost(addLikeResumeURL + `${resume_id}`);
            console.assert(addLikeResp.ok);
            const data = await (addLikeResp.json());
            infoAll.infoAll.is_favorite = data.favorite_for_empl.favorite_id;
            likes[0].lastChild.remove();
            likes[0].insertAdjacentHTML("beforeend",favoritesTemp(infoAll.infoAll.is_favorite));
            addDeleteLikes(resume_id, infoAll);
        });
    }

    if (deleteLike) {
        deleteLike.addEventListener('click', async ()=>{
            const addLikeResp = await network.doDelete(deleteLikeResumeURL + `${infoAll.infoAll.is_favorite}`);
            console.assert(addLikeResp.ok);
            infoAll.infoAll.is_favorite = null;
            likes[0].lastChild.remove();
            likes[0].insertAdjacentHTML("beforeend", favoritesTemp(infoAll.infoAll.is_favorite));
            addDeleteLikes(resume_id, infoAll);
        });
    }
}