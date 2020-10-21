import {NavBarInit} from "../../components/header/navBar.js";
import {checkFrom} from "./components/createCandidateSum/createCandidateSum.js";
import {openAndDelJob, renderInputForm} from "./components/popUpCand/createOneJob.js"
import createElem from "../../libs/createElem.js";


export const app = window.document.getElementById('app');
export let jobsArr=[];


export default class CreateResume{
    constructor(onsubmit) {
        this.onsubmit = onsubmit
    }

    render(isAuthorized, content, ...args){
        // console.log(args[2]);
        app.innerHTML = '';
        let user;

        if (args[0] && content){
            user = {
                user: {
                    surname: content.user.surname,
                    name: content.user.name,
                    email: content.user.email,
                    description: args[2].description,
                    salary_min: args[2].salary_min,
                    salary_max: args[2].salary_max,
                    gender: "female",
                    place: "place",
                    career_level: "middle",
                    experience_month: 10,
                    skills: "skills",
                    education_level: "higher",
                    experience: [{
                        duties: "обяз1",
                        end_work_year: "2020-10-02",
                        job: "организация 1",
                        numOfJob: 0,
                        start_work_year: "2020-09-28",
                        type_of_job: "должность 1",
                    },
                        {
                        duties: "обяз2",
                        end_work_year: "2020-10-01",
                        job: "организация2",
                        numOfJob: 1,
                        start_work_year: "2020-08-31",
                        type_of_job: "должность2",
                    }],
                }
                // user: args[2],
                // user: content.user,
                // user: {
                //     surname: "test",
                //     name: "test",
                //     email: "test@test.test",
                //     description: "description",
                //     salary_min: 10,
                //     salary_max: 20,
                //     gender: "female",
                //     place: "place",
                //     career_level: "middle",
                //     experience_month: 10,
                //     skills: "skills",
                //     education_level: "higher",
                //     experience: [{
                //         duties: "обяз1",
                //         end_work_year: "2020-10-02",
                //         job: "организация 1",
                //         numOfJob: 0,
                //         start_work_year: "2020-09-28",
                //         type_of_job: "должность 1",
                //     },{
                //         duties: "обяз2",
                //         end_work_year: "2020-10-01",
                //         job: "организация2",
                //         numOfJob: 1,
                //         start_work_year: "2020-08-31",
                //         type_of_job: "должность2",
                //     }]
                // }
        }} else if (content) {
            user = {
                user: {
                    surname: content.user.surname,
                    name: content.user.name,
                    email: content.user.email,
                }
            }
        } else {
            user = {
                surname: "test",
                name: "test",
                email: "test@test.test",
            }
        }

        if (user.user.experience) {
            jobsArr = user.user.experience;
        } else {
            jobsArr = [];
        }


        const employersList = new NavBarInit(app, isAuthorized, false, "Создание резюме");
        employersList.loadNavBar();

        const main = createElem("div", "main", app);
        main.insertAdjacentHTML("afterbegin", window.fest['createCandidateSum.tmpl'](user.user));


        const form = main.querySelector("form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            afterRender(this.onsubmit, form, jobsArr);
        });

        openAndDelJob(user.user.experience);
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
