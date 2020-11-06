import {NavBarInit} from "../../components/header/navBar.js";
import {network} from "../../libs/networks.js";
import {
    resumeByIdURL,
    gender,
    educationLevel,
    experienceLevel,
    experienceMonth,
    candByIdURL,
    addLikeResumeURL,
    deleteLikeResumeURL,
    // city
} from "../../libs/constants.js";
import createElem from "../../libs/createElem.js";


const app = window.document.getElementById('app');

const nullToString = (e) => {
    if (e == null) {
        return "-";
    }
    return e;
}

const resumeInfo = async (content, resumeSource) => {
    let resume;
    let result = null;
    console.log(resumeSource);
    if (!resumeSource.hasOwnProperty('resume')) {
        const responseResume = await network.doGet(`${resumeByIdURL}${resumeSource.resume_id}`);
        console.assert(responseResume.ok);
        resume = (await responseResume.json());
        console.log(resume);
    } else {
        resume = resumeSource;
        console.log(result);
    }


    const dateRegBd = resume.resume.date_create.toString();
    let dataReg = '';
    dataReg = dateRegBd.slice(8,10) + '-' + dateRegBd.slice(5,7) + '-' + dateRegBd.slice(0,4);

    let experiences = resume.custom_experience;
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
                name: resumeSource.name + " " + resumeSource.surname,
                position: resume.resume.place,
                mail: resumeSource.email,
                dateReg: dataReg,
                area_search: resume.resume.area_search,
                user_type: content.user.user_type,
                is_favorite: resume.is_favorite,
            },
            jobOverview : {
                name: resumeSource.name,
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
                experience_custom_company: resume.custom_experience,
                skills: resume.resume.skills,
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
            likes[0].insertAdjacentHTML("beforeend", window.fest["favorites.tmpl"](infoAll.infoAll.is_favorite));
            addDeleteLikes(resume_id, infoAll);
        });
    }

    if (deleteLike) {
        deleteLike.addEventListener('click', async ()=>{
            const addLikeResp = await network.doDelete(deleteLikeResumeURL + `${infoAll.infoAll.is_favorite}`);
            console.assert(addLikeResp.ok);
            infoAll.infoAll.is_favorite = null;
            likes[0].lastChild.remove();
            likes[0].insertAdjacentHTML("beforeend", window.fest["favorites.tmpl"](infoAll.infoAll.is_favorite));
            addDeleteLikes(resume_id, infoAll);
        });
    }
}