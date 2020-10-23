import {NavBarInit} from "../../components/header/navBar.js";
import createElem from "../../libs/createElem.js";
import {openAndDelJob} from "../../components/popUpResume/popUpCand/createOneJob.js";


export const app = window.document.getElementById('app');
export let jobsArr=[];


export default class UpdateResume{
    constructor(onsubmit) {
        this.onsubmit = onsubmit
    }

    render(isAuthorized, content, ...args){
        app.innerHTML = '';

        let user = {
                surname: content.user.surname,
                name: content.user.name,
                email: content.user.email,
                description: args[2].description,
                salary_min: args[2].salary_min,
                salary_max: args[2].salary_max,
                gender: args[2].gender,
                place: "желаемая должность",
                career_level: "middle",
                experience_month: 10,
                skills: "скилы",
                education_level: "higher",
                experience: [{
                    duties: "обяз1",
                    finish: "2020-10-02",
                    name_job: "организация 1",
                    numOfJob: 0,
                    begin: "2020-09-28",
                    position: "должность 1",
                },
                    {
                    duties: "обяз2",
                    finish: "today",
                    name_job: "организация2",
                    numOfJob: 1,
                    begin: "2020-08-31",
                    position: "должность2",
                }],
            };



        if (user.experience) {
            jobsArr = user.experience;
        } else {
            jobsArr = [];
        }


        const employersList = new NavBarInit(app, isAuthorized, false, "Редактирование резюме");
        employersList.loadNavBar();

        const main = createElem("div", "main", app);

        // console.log(user);
        main.insertAdjacentHTML("afterbegin", window.fest['updateResume.tmpl'](user));


        const form = main.querySelector("form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            afterRender(this.onsubmit, form, jobsArr);
        });

        openAndDelJob(user.experience);
        popUp();

    }
}

function afterRender(submitF, form, jobsArr) {
    checkFrom(submitF, form, jobsArr);
}

async function popUp() {
    const btn = document.getElementById("btn__add_exp");
    await btn.addEventListener('click', (event) => {
        renderInputForm(undefined);
    });
}

