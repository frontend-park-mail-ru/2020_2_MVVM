import { network } from "Js/libs/networks";
import {
  addLikeResumeURL,
  deleteLikeResumeURL,
  educationLevel,
  experienceLevel,
  experienceMonth,
  resumeByIdURL, spheres,
} from "Js/libs/constants";
import createElem from "Js/libs/createElem";
import briefInfoTemp from "./components/briefInfo/briefInfo.tmpl.xml";
import resumeTemp from "./components/resume/resume.tmpl.xml";
import jobOverviewTemp from "Js/components/rightColumn/jobOverview.tmpl.xml";
import favoritesTemp from "Js/pages/resume/components/briefInfo/favorites.tmpl.xml";
import popUpList from "Js/components/popUpList/popUpList";
import defaultRes from "Img/defaultRes.png";
import defaultVac from "Img/defaultVac.png";

const app = window.document.getElementById("main");

const nullToString = (e) => {
  if (e == null) {
    return "-";
  }
  return e;
};

const resumeInfo = async (resumeCLass) => {
  const resume_id = window.location.search.split("id=")[1];
  const isLiked = await resumeCLass.isLiked(resume_id);
  const resumeData = await resumeCLass.responseResume(resume_id);

  // const responseResume = await network.doGet(
  //   `${resumeByIdURL}${resume_id}`
  // );
  //
  // console.assert(responseResume.ok);
  // const resumeData = await responseResume.json();

  const dateRegBd = resumeData.resume.date_create.toString();
  let dataReg = "";
  dataReg =
    dateRegBd.slice(8, 10) +
    "-" +
    dateRegBd.slice(5, 7) +
    "-" +
    dateRegBd.slice(0, 4);

  let experiences = resumeData.custom_experience;
  if (experiences) {
    experiences.forEach((item) => {
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

  const resumeInfo = resumeData.resume;

  return {
    resume_id: resume_id,
    infoAll: {
      imgPath: resumeInfo.avatar ? resumeInfo.avatar : defaultRes,
      name: resumeInfo.cand_name + " " + resumeInfo.cand_surname,
      position: resumeInfo.place,
      mail: resumeInfo.cand_email,
      dateReg: dataReg,
      area_search: resumeInfo.area_search,
      my_user_type: localStorage.getItem("user_type"),
      is_favorite: isLiked,
    },
    jobOverview: {
      name: resumeInfo.cand_name,
      salary_min: nullToString(resumeInfo.salary_min),
      salary_max: nullToString(resumeInfo.salary_max),
      experience_level: nullToString(
        experienceLevel[resumeInfo.education_level]
      ),
      experience_month: nullToString(
        experienceMonth[resumeInfo.experience_month]
      ),
      interest: spheres[resumeInfo.sphere],
      education: nullToString(educationLevel[resumeInfo.education_level]),
      career_level: nullToString(resumeInfo.career_level),
    },
    description: {
      text: nullToString(resumeInfo.description),
      experience_custom_company: resumeData.custom_experience,
      skills: resumeInfo.skills,
    },
  };
};

export default class Resume {
  constructor(router, createRespF, loadMyVacanciesF, isLikedF, responseResumeF, addLikeF, deleteLikeF) {
    this.router = router;
    this.createResp = createRespF;
    this.myVacancies = loadMyVacanciesF;
    this.isLiked = isLikedF;
    this.responseResume = responseResumeF;
    this.addLike = addLikeF;
    this.deleteLike = deleteLikeF;
  }

  async render() {
    app.innerHTML = "";


    const infoAll = await resumeInfo(this);

    const main = createElem("div", "main", app);
    const contact = createElem("div", "mainPage-contact", main);

    contact.insertAdjacentHTML("afterbegin", briefInfoTemp(infoAll.infoAll));
    const photo = document.getElementById("cand-options-photo");
    photo.style.background = `no-repeat 0 0/cover url(${infoAll.infoAll.imgPath})`;

    // contact.insertAdjacentHTML("afterEnd", contactTemp(localStorage.getItem('user_type')));

    const mainContent = createElem("div", "main-content", main);

    const contentLeftColumn = createElem(
      "div",
      "content-left-column",
      mainContent
    );

    contentLeftColumn.insertAdjacentHTML(
      "beforeend",
      resumeTemp(infoAll.description)
    );

    const contentRightColumn = createElem(
      "div",
      "content-right-column",
      mainContent
    );

    contentRightColumn.insertAdjacentHTML(
      "beforeend",
      jobOverviewTemp({jobOverview: infoAll.jobOverview, page_type:'resume'})
    );

    // contentRightColumn.insertAdjacentHTML("beforeend", contactFormTemp());

    addDeleteLikes(this, infoAll);
    if (localStorage.getItem("user_type") === "employer") {
      renderResumeResp(this, infoAll);
    }

    // main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());
  }
}

async function renderResumeResp(resumeCls, infoAll) {
  const responseBtn = document.getElementById("responseResumeBtn");

  let selectedVacancy = null;

  responseBtn.addEventListener("click", async () => {
    const vacancyList = await resumeCls.myVacancies(infoAll.resume_id);
    if (vacancyList) {
      vacancyList.forEach((item) => {
        item.imgPath = item.avatar ? item.avatar : defaultVac;
      });
    }
    selectedVacancy = popUpList(app, resumeCls, infoAll.resume_id, {
      list: vacancyList,
      title: infoAll.infoAll.name,
    });
  });
}

async function addDeleteLikes(resumeClass, infoAll) {
  let addLike = document.getElementById("add_to_prefer");
  let deleteLike = document.getElementById("delete_from_prefer");
  let likes = document.getElementsByClassName("cand-options-contact");

  if (addLike) {
    addLike.addEventListener("click", async () => {
      // const addLikeResp = await network.doPost(
      //   addLikeResumeURL + `${infoAll.resume_id}`
      // );
      // console.assert(addLikeResp.ok);
      // const data = await addLikeResp.json();
      infoAll.infoAll.is_favorite = await resumeClass.addLike(infoAll.resume_id);
      likes[0].firstChild.remove();
      likes[0].insertAdjacentHTML(
        "afterbegin",
        favoritesTemp(infoAll.infoAll.is_favorite)
      );
      addDeleteLikes(resumeClass, infoAll);
    });
  }

  if (deleteLike) {
    deleteLike.addEventListener("click", async () => {
      // const addLikeResp = await network.doDelete(
      //   deleteLikeResumeURL + `${infoAll.infoAll.is_favorite}`
      // );
      // console.assert(addLikeResp.ok);
      await resumeClass.deleteLike(infoAll.infoAll.is_favorite);
      infoAll.infoAll.is_favorite = null;
      likes[0].firstChild.remove();
      likes[0].insertAdjacentHTML(
        "afterbegin",
        favoritesTemp(infoAll.infoAll.is_favorite)
      );
      addDeleteLikes(resumeClass, infoAll);
    });
  }
}
