import { checkFrom } from "./components/createCandidateSum/createCandidateSum.js";
import createElem from "Js/libs/createElem";
import { renderInputForm } from "Js/components/popUpResume/popUpCand/createOneJob";
import createCandidateSumTemp from "./components/createCandidateSum/createCandidateSum.tmpl.xml";
import {spheres} from "Js/libs/constants";
import {getBase64} from "Js/components/base64FileUpload/base64Upload";
import {doSubmit} from "Js/pages/profile/components/personalInfo/persInfo";

import defaultRes from "Img/defaultRes.png";

export const app = window.document.getElementById("main");

export default class CreateResume {
  constructor(loadUserF, onsubmit) {
    this.onsubmit = onsubmit;
    this.userInfo = loadUserF;
  }

  async render() {
    app.innerHTML = "";
    this.jobsArr = [];
    this.numOfJob = 0;
    this.user = await this.userInfo();
    this.content = {
      user : this.user.user,
      sphere : spheres,
    }


    const main = createElem("div", "main", app);
    main.insertAdjacentHTML(
      "afterbegin",
      createCandidateSumTemp(this.content),
    );
    const photoBlock = document.getElementById('avatar');
    const userPhoto = this.user.avatar ? this.user.avatar : defaultRes;
    const inputAvatar = document.getElementById('sum-img-load');
    photoBlock.style.background = `no-repeat 0 0/cover url(${userPhoto})`;
    inputAvatar.addEventListener("change", async () => {
      photoBlock.style.background = `no-repeat 0 0/cover url(${window.URL.createObjectURL(inputAvatar.files[0])})`;
    });

    const form = main.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      afterRenderResume(this.onsubmit, form, this.jobsArr);
    });

    popUp(this);
  }
}

export function afterRenderResume(submitF, form, jobsArray) {
  checkFrom(submitF, form, jobsArray);
}

async function popUp(classCand) {
  const btn = document.getElementById("btn-add-exp");
  await btn.addEventListener("click", (event) => {
    renderInputForm(undefined, classCand);
  });
}
