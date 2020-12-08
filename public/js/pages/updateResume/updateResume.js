import createElem from "Js/libs/createElem";
import {
  openAndDelJob,
  renderInputForm,
} from "Js/components/popUpResume/popUpCand/createOneJob";
import { afterRenderResume } from "../createCandidateSum/createCandidateSum.js";
import updateResumeTemp from "./components/updateResume/updateResume.tmpl.xml";
import { network } from "Js/libs/networks";
import { resumeByIdURL, spheres } from "Js/libs/constants";

import defaultRes from "Img/defaultRes.png";

export const app = window.document.getElementById("main");

async function getAllInfo(updClass) {

  const resume_id = window.location.search.split("id=")[1];

  const responseResume = await network.doGet(
    `${resumeByIdURL}${resume_id}`
  );
  console.assert(responseResume.ok);
  const resumeData = await responseResume.json();

  const resumeInfo = resumeData.resume;
  const experienceInfo = resumeData.custom_experience;

  let updResume = {
    avatar: resumeInfo.avatar,
    surname: resumeInfo.cand_surname,
    name: resumeInfo.cand_name,
    email: resumeInfo.cand_email,
    resume_id: resumeInfo.id,
    title: resumeInfo.title,
    description: resumeInfo.description,
    salary_min: resumeInfo.salary_min,
    salary_max: resumeInfo.salary_max,
    gender: resumeInfo.gender,
    place: resumeInfo.place,
    career_level: resumeInfo.career_level,
    experience_month: resumeInfo.experience_month,
    skills: resumeInfo.skills,
    area_search: resumeInfo.area_search,
    education_level: resumeInfo.education_level,
    experience: experienceInfo,
    imgPath: resumeInfo.avatar ? resumeInfo.avatar : defaultRes,
    user_sphere: resumeInfo.sphere,
    all_sphere: spheres,
  };

  if (updResume.experience) {
    updResume.experience.forEach((item) => {
      let tmpDate = new Date(item.begin);
      item.begin = tmpDate.toISOString().slice(0, 10);
      if (item.continue_to_today) {
        item.finish = "today";
      } else {
        let tmpDate = new Date(item.finish);
        item.finish = tmpDate.toISOString().slice(0, 10);
      }
    });

    updResume.experience.forEach((item, index) => {
      updClass.jobsArr.push({
        begin: item.begin,
        finish: item.finish,
        name_job: item.name_job,
        continue_to_today: item.continue_to_today,
        position: item.position,
        duties: item.duties,
        numOfJob: index,
      });
    });
    updClass.numOfJob = updResume.experience.length;
  }

  return updResume;
}

export default class UpdateResume {
  constructor(onsubmit) {
    this.onsubmit = onsubmit;
  }

  async render() {
    app.innerHTML = "";
    this.jobsArr = [];
    this.numOfJob = 0;

    const user = await getAllInfo(this);


    const main = createElem("div", "main", app);

    main.insertAdjacentHTML("afterbegin", updateResumeTemp(user));
    const photo = document.getElementById("sum-profile__photo");
    photo.style.background = `no-repeat 0 0/cover url(${user.imgPath})`;

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
  const btn = document.getElementById("btn-add-exp");
  await btn.addEventListener("click", (event) => {
    renderInputForm(undefined, classCand);
  });
}

