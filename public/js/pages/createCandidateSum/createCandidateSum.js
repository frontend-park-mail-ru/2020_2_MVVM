import { checkFrom } from "./components/createCandidateSum/createCandidateSum.js";
import createElem from "Js/libs/createElem";
import { renderInputForm } from "Js/components/popUpResume/popUpCand/createOneJob";
import createCandidateSumTemp from "./components/createCandidateSum/createCandidateSum.tmpl.xml";
import {spheres} from "Js/libs/constants";

export const app = window.document.getElementById("main");

export default class CreateResume {
  constructor(loadUserF, onsubmit) {
    this.onsubmit = onsubmit;
    this.userInfo = loadUserF;
  }

  async render(content, ...args) {
    app.innerHTML = "";
    this.jobsArr = [];
    this.numOfJob = 0;
    this.user = await this.userInfo();
    this.content = {
      user : this.user.user,
      sphere : spheres,
    }

    // openMenuList(app, false);

    const main = createElem("div", "main", app);
    main.insertAdjacentHTML(
      "afterbegin",
      createCandidateSumTemp(this.content),
    );

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
