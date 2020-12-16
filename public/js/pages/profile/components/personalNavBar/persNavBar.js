import { responsesStatus } from "Js/libs/constants";
import emptyListTemp from "Js/components/emptyList/emptyList.tmpl.xml";
import {doSubmit, updateProfileFields} from "Js/pages/profile/components/personalInfo/persInfo";
import persResumesTemp from "Js/pages/profile/components/listOfResumes/persResumes.tmpl.xml";
import persVacanciesTemp from "Js/pages/profile/components/listOfVacancies/persVacancies.tmpl.xml";
import profileTemp from "../personalInfo/persInfo.tmpl.xml";
import listOfCandidatesTemp from "Js/pages/candidatesList/components/listOfCandidates/listOfCandidates.tmpl.xml";
import responsesTemp from "Js/pages/profile/components/responses/responses.tmpl.xml";
import createElem from "Js/libs/createElem";

import defaultVac from "Img/defaultVac.png";
import defaultRes from "Img/defaultRes.png";
import {getBase64} from "Js/components/base64FileUpload/base64Upload";
import {convertDate} from "Js/libs/convertDate";

function doCheckout(profile, content, body, person, navBar, idx) {
  body.innerHTML = "";
  switch (idx) {
    case 0:
      {
        personalInfo(profile, person, body);
        updateProfileFields();
      }
      break;
    case 1:
      {
        if (localStorage.getItem("user_type") === "candidate") {
          personalResOrVac(profile, true, body, profile.resumes);
        } else {
          personalResOrVac(profile, false, body, profile.vacancies);
        }
      }
      break;
    case 2:
      {
        const main__list = createElem("div", "main__list-profile", body);
        personalLikes(profile, main__list);
      }
      break;
    case 3: {
      personalResponses(profile, body);
    }
  }

  navBar.childNodes.forEach((item, i) => {
    if (i === idx) {
      item.style = "color:white; background: var(--buttons-purple-color)";
    } else {
      item.style = "color:var(--buttons-purple-color); background: white";
    }
  });
}

export function checkoutProfilePage(profile, content, body, person) {
  const profNavBar = document.getElementsByClassName("navbar-menu-list");
  for (let i = 0; i < profNavBar[0].childElementCount; i++) {
    profNavBar[0].children[i].addEventListener("click", () => {
      doCheckout(profile, content, body, person, profNavBar[0], i);
    });
  }
}

export function personalResOrVac(profile, isCand, mainColumnLeft, list) {
  if (list && list.length) {
    let DomList = document.getElementsByClassName("list-row-photo__bg");
    if (isCand) {
      mainColumnLeft.insertAdjacentHTML("beforeend", persResumesTemp(list));
      list.forEach((resume, i) => {
        const photo = resume.avatar ? resume.avatar : defaultRes;
        DomList[i].style.background = `no-repeat  0 0/cover url(${photo}`;
      });
    } else {
      mainColumnLeft.insertAdjacentHTML("beforeend", persVacanciesTemp(list));
      list.forEach((vacancy, i) => {
        const photo = vacancy.avatar ? vacancy.avatar : defaultVac;
        DomList[i].style.background = `no-repeat  0 0/cover url(${photo}`;
      });
    }
  } else {
    if (isCand) {
      mainColumnLeft.insertAdjacentHTML(
        "beforeend",
        emptyListTemp("Списк резюме пуст")
      );
    } else {
      mainColumnLeft.insertAdjacentHTML(
        "beforeend",
        emptyListTemp("Списк вакансий пуст")
      );
    }
  }

  const linksToResume = mainColumnLeft.getElementsByClassName(
    "main__buttons_one"
  );

  for (let i = 0; i < linksToResume.length; i++) {
    linksToResume[i].addEventListener("click", (event) => {
      event.preventDefault();
      if (isCand) {
        profile.router.change(`/resume?id=${list[i].resume_id}`);
      } else {
        profile.router.change(
          `/vacancy?vac_id=${list[i].vac_id}&comp_id=${list[i].comp_id}`
        );
      }
    });
  }

  const linksToUpdateResume = mainColumnLeft.getElementsByClassName(
    "main__buttons_two"
  );

  for (let i = 0; i < linksToUpdateResume.length; i++) {
    linksToUpdateResume[i].addEventListener("click", (event) => {
      event.preventDefault();
      if (isCand) {
        profile.router.change(`/updateResume?id=${list[i].resume_id}`, list[i]);
      } else {
        profile.router.change(`/updateVacancy?vac_id=${list[i].vac_id}`, list[i]);
      }
    });
  }
}

export function personalInfo(profileClass, person, mainColumnLeft) {
  mainColumnLeft.insertAdjacentHTML("beforeend", profileTemp(person));
  const deleteAccount = document.getElementById('deleteAccount');
  deleteAccount.addEventListener('click', () => {
    profileClass.deleteUser();
  })
  if (person.user_type === "candidate") {
    const photoBlock = document.getElementById("logoProfile");
    const photo = person.avatar ? person.avatar : defaultRes;
    photoBlock.style.background = `no-repeat 0 0/cover url(${photo})`;
    const inputAvatar = document.getElementById("avatar");
    inputAvatar.addEventListener("change", async () => {
      photoBlock.style.background = `no-repeat 0 0/cover url(${window.URL.createObjectURL(inputAvatar.files[0])})`;
      const newAvatar = await getBase64(inputAvatar.files[0]);
      doSubmit({avatar: newAvatar});
    });
  }
}

function personalLikes(profile, mainColumnLeft) {
  if (profile.favorites) {
    mainColumnLeft.insertAdjacentHTML(
      "beforeend",
      listOfCandidatesTemp(profile.favorites)
    );
    const photo = document.getElementsByClassName("list-row-photo__bg");
    profile.favorites.forEach((res, i) => {
      const photoRes = res.avatar ? res.avatar : defaultRes;
      photo[i].style.background = `no-repeat 0 0/cover url(${photoRes})`;
    });

    const linksToFavResume = document.getElementsByClassName("list-row");
    for (let i = 0; i < linksToFavResume.length; i++) {
      linksToFavResume[i].addEventListener("click", (event) => {
        event.preventDefault();
        profile.router.change(`/resume?id=${profile.favorites[i].resume_id}`);
      });
    }
  } else {
    mainColumnLeft.insertAdjacentHTML(
      "beforeend",
      emptyListTemp("Нет избранных")
    );
  }
}

async function personalResponses(profile, body) {
  let myResponses = {};
  myResponses.responses = await profile.getMyResponses();
  if (myResponses.responses && myResponses.responses.length) {
    myResponses.responses.forEach((item) => {
      // item.date_create = item.date_create.slice(0, 10);
      item.date_create = convertDate(item.date_create);
      //TODO Проверь!!
      item.status = responsesStatus[item.status];
    });
    myResponses.user_type = localStorage.getItem("user_type");
    body.insertAdjacentHTML("afterbegin", responsesTemp(myResponses));
    createLinks(profile, myResponses.responses);
    acceptReject(profile, myResponses.responses, body);
  } else {
    body.insertAdjacentHTML(
      "afterbegin",
      emptyListTemp("У вас еще нет откликов")
    );
  }
}

async function acceptReject(profile, myResponses) {
  const acceptBtn = document.getElementsByClassName(
    "response-row__buttons_accept"
  );
  const rejectBtn = document.getElementsByClassName(
    "response-row__buttons_reject"
  );
  const respStatus = document.getElementsByClassName("response-row__status");
  for (let i = 0; i < acceptBtn.length; i++) {
    acceptBtn[i].addEventListener("click", (event) => {
      const elem = event.target;
      const arrMatch = /.*?(\d+)$/.exec(elem.id);
      const idx = Number(arrMatch[1]);
      profile
        .updateStatus(myResponses[idx].response_id, "accepted")
        .then(() => {
          acceptBtn[i].classList.add('hide');
          rejectBtn[i].classList.add('hide');
          respStatus[idx].innerHTML = "Приглашение";
          respStatus[idx].style.color = "var(--accept-green)";
          respStatus[idx].style.fontSize = "20px";
        });
    });
    rejectBtn[i].addEventListener("click", (event) => {
      const elem = event.target;
      const arrMatch = /.*?(\d+)$/.exec(elem.id);
      const idx = Number(arrMatch[1]);
      profile.updateStatus(myResponses[idx].response_id, "refusal").then(() => {
        acceptBtn[i].classList.add('hide');
        rejectBtn[i].classList.add('hide');
        respStatus[idx].innerHTML = "Отказ";
        respStatus[idx].style.color = "var(--reject-red)";
        respStatus[idx].style.fontSize = "20px";
      });
    });
  }
}

async function createLinks(profile, myResponses) {
  const linkToResume = document.getElementsByClassName(
    "response-row-info__resume-link"
  );
  const linkToVacancy = document.getElementsByClassName(
    "response-row-info__vacancy-link"
  );
  const linkToCompany = document.getElementsByClassName(
    "response-row-info__company-link"
  );

  myResponses.forEach((item, idx) => {
    if (linkToResume.length) {
      linkToResume[idx].addEventListener("click", (event) => {
        event.preventDefault();
        profile.router.change(`/resume?id=${item.resume_id}`);
      });
    }
    if (linkToVacancy.length) {
      linkToVacancy[idx].addEventListener("click", (event) => {
        event.preventDefault();
        profile.router.change(
          `/vacancy?vac_id=${item.vacancy_id}&comp_id=${item.company_id}`
        );
      });
    }
    if (linkToCompany.length) {
      linkToCompany[idx].addEventListener("click", (event) => {
        event.preventDefault();
        profile.router.change(`/company?id=${item.company_id}`);
      });
    }
  });
}
