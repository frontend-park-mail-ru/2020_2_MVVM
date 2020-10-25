import {NavBarInit} from "../../components/header/navBar.js";
import createElem from "../../libs/createElem.js";
import {openAndDelJob,renderInputForm} from "../../components/popUpResume/popUpCand/createOneJob.js";
import {afterRenderResume} from "../createCandidateSum/createCandidateSum.js";


export const app = window.document.getElementById('app');
export let jobsArr=[];


export default class UpdateResume{
    constructor(onsubmit) {
        this.onsubmit = onsubmit
    }

    render(isAuthorized, content, ...args){
        app.innerHTML = '';
        //
        // console.log(content);
        // console.log(args[2]);


        let user = {
                surname: content.user.surname,
                name: content.user.name,
                email: content.user.email,
                title: args[2].title,
                description: args[2].description,
                salary_min: args[2].salary_min,
                salary_max: args[2].salary_max,
                gender: args[2].gender,
                place: args[2].place,
                career_level: args[2].career_level,
                experience_month: args[2].experience_month,
                skills: args[2].skills,
                area_search: args[2].area_search,
                education_level: args[2].education_level,
                experience: args[2].experience_custom_company,
            };



        if (user.experience) {
            user.experience.forEach((item)=>{
               if (item.continue_to_today) {
                   item.finish = "today";
               }
            });

            jobsArr = user.experience;
        } else {
            jobsArr = [];
        }


        const employersList = new NavBarInit(app, isAuthorized, false, "");
        employersList.loadNavBar();

        const main = createElem("div", "main", app);

        // console.log(user);
        main.insertAdjacentHTML("afterbegin", window.fest['updateResume.tmpl'](user));


        const form = main.querySelector("form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            afterRenderResume(this.onsubmit, form, jobsArr);
        });

        openAndDelJob(user.experience);
        popUp();

    }
}


async function popUp() {
    const btn = document.getElementById("btn__add_exp");
    await btn.addEventListener('click', (event) => {
        renderInputForm(undefined);
    });
}

