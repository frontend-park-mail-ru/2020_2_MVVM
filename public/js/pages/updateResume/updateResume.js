import {NavBarInit} from "../../components/header/navBar.js";
import createElem from "../../libs/createElem.js";
import {openAndDelJob,renderInputForm} from "../../components/popUpResume/popUpCand/createOneJob.js";
import {afterRenderResume} from "../createCandidateSum/createCandidateSum.js";

export const app = window.document.getElementById('app');

export default class UpdateResume{
    constructor(onsubmit) {
        this.onsubmit = onsubmit;
        // this.jobsArr = [];
        // this.numOfJob = 0;
    }

    render(content, ...args){
        app.innerHTML = '';
        this.jobsArr = [];
        this.numOfJob = 0;
        //
        // console.log(content);
        console.log(args[2]);


        let user = {
                surname: content.user.surname,
                name: content.user.name,
                email: content.user.email,
                resume_id: args[2].resume.id,
                title: args[2].resume.title,
                description: args[2].resume.description,
                salary_min: args[2].resume.salary_min,
                salary_max: args[2].resume.salary_max,
                gender: args[2].resume.gender,
                place: args[2].resume.place,
                career_level: args[2].resume.career_level,
                experience_month: args[2].resume.experience_month,
                skills: args[2].resume.skills,
                area_search: args[2].resume.area_search,
                education_level: args[2].resume.education_level,
                experience: args[2].custom_experience,
            };

        // console.log(user);

        if (user.experience) {
            user.experience.forEach((item)=>{
               let tmpDate = new Date(item.begin);
               item.begin = tmpDate.toISOString().slice(0,10);
               if (item.continue_to_today) {
                   item.finish = "today";
               } else {
                   let tmpDate = new Date(item.finish);
                   item.finish = tmpDate.toISOString().slice(0,10);
               }
            });

            user.experience.forEach((item, index)=>{
                this.jobsArr.push(
                    {
                        begin: item.begin,
                        finish: item.finish,
                        name_job: item.name_job,
                        continue_to_today: item.continue_to_today,
                        position: item.position,
                        duties: item.duties,
                        numOfJob: index,
                    }
                )
            });
            this.numOfJob = user.experience.length;
            console.log(this.jobsArr);
        }

        const employersList = new NavBarInit(app, content, false, "");
        employersList.loadNavBar();

        const main = createElem("div", "main", app);

        // console.log(user);
        main.insertAdjacentHTML("afterbegin", window.fest['updateResume.tmpl'](user));


        const form = main.querySelector("form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            afterRenderResume(this.onsubmit, form, this.jobsArr);
        });

        openAndDelJob(this.jobsArr, this);
        popUp(this);
    }
}


async function popUp(classCand) {
    const btn = document.getElementById("btn__add_exp");
    await btn.addEventListener('click', (event) => {
        renderInputForm(undefined, classCand);
    });
}

