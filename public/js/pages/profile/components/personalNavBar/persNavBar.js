import {app} from "../../../createCandidateSum/createCandidateSum.js";
import persResumesTemp from 'Js/pages/profile/components/listOfResumes/persResumes.tmpl.xml'
import persVacanciesTemp from 'Js/pages/profile/components/listOfVacancies/persVacancies.tmpl.xml'
import createCompanyTemp from '../personalInfo/persInfo.tmpl.xml'
import {DOMAIN} from "Js/libs/constants";
import emptyListTemp from "Js/components/emptyList/emptyList.tmpl.xml";
import listOfCandidatesTemp from "Js/pages/candidatesList/components/listOfCandidates/listOfCandidates.tmpl.xml";
import {updateProfileFields} from "Js/pages/profile/components/personalInfo/persInfo";


function doCheckout(profile, content, body, person, navBar, idx) {
    body.innerHTML = '';
    switch (idx) {
        case 0: {
            personalInfo(person, body);
            updateProfileFields(person);
        }
        break;
        case 1: {
            if (content.user.user_type === "candidate") {
                personalResOrVac(profile, true, body, profile.resumes);
            } else {
                personalResOrVac(profile, false, body, profile.vacancies);
            }
        }
        break;
        case 2: {
            personalLikes(profile, body);
        }
        break;
        case 3: {

        }
    }

    // navBar.children[idx].style = "color:white; background: var(--main-pink-color)";
    navBar.childNodes.forEach((item, i)=>{
        if (i===idx) {
            item.style = "color:white; background: var(--main-pink-color)";
        } else {
            item.style = "color:var(--main-pink-color); background: white"
        }
    });

    // profile.isPersonalRusemes = navBar.children[idx].textContent !== 'Личная информация';
    // if (profile.isPersonalRusemes) {
    //     navBar.children[1].style = "color:white; background: var(--main-pink-color)";
    //     navBar.children[0].style = "color:var(--main-pink-color); background: white";
    //     if (content.user.user_type === "candidate") {
    //         personalResOrVac(profile, true, body, profile.resumes);
    //     } else {
    //         personalResOrVac(profile, false, body, profile.vacancies);
    //     }
    // } else {
    //     navBar.children[0].style = "color:white; background: var(--main-pink-color)";
    //     navBar.children[1].style = "color:var(--main-pink-color); background: white";
    //     personalInfo(person, body);
    // }
}

export function checkoutProfilePage(profile, content, body, person) {
    const profNavBar = document.getElementsByClassName("persNavBar__menu-list");
    for (let i = 0; i < profNavBar[0].childElementCount; i++) {
        profNavBar[0].children[i].addEventListener('click', () => {
            doCheckout(profile, content, body, person, profNavBar[0], i);
        });
    }
}


export function personalResOrVac(profile, isCand, mainColumnLeft, list) {
    if (list && list.length) {
        if (isCand) {
            list.forEach((resume) => {
                resume.imgPath = `${DOMAIN}static/resume/${resume.resume_id}`;
            });
            mainColumnLeft.insertAdjacentHTML("beforeend", persResumesTemp(list));
        } else {
            list.forEach((vacancy) => {
                vacancy.imgPath = `${DOMAIN}static/vacancy/${vacancy.vac_id}`;
            });
            mainColumnLeft.insertAdjacentHTML("beforeend", persVacanciesTemp(list));
        }
    } else {
        mainColumnLeft.insertAdjacentHTML("beforeend", emptyListTemp("Ваш список пуст"));
    }



    const linksToResume = mainColumnLeft.getElementsByClassName("main__buttons_one");

    for (let i = 0; i < linksToResume.length; i++) {
        linksToResume[i].addEventListener('click', event => {
            event.preventDefault();
            if (isCand) {
                profile.router.change('/resume', list[i]);
            }
            else {
                console.log(list[i]);
                profile.router.change('/vacancy', list[i].empl_id, list[i].vac_id, list[i].comp_id);
            }
        })
    }


    const linksToUpdateResume = mainColumnLeft.getElementsByClassName("main__buttons_two");

    for (let i = 0; i < linksToUpdateResume.length; i++) {
        linksToUpdateResume[i].addEventListener('click', event => {
            event.preventDefault();
            if (isCand) {
                profile.router.change('/updateResume', list[i]);
            }

        })
    }
}

export function personalInfo(person, mainColumnLeft) {
    mainColumnLeft.insertAdjacentHTML("beforeend", createCompanyTemp(person));
}

function personalLikes(profile, mainColumnLeft) {
    if (profile.favorites) {
        profile.favorites.forEach((res) => {
            res.imgPath = `${DOMAIN}static/resume/${res.resume_id}`;
        });
        mainColumnLeft.insertAdjacentHTML("beforeend", listOfCandidatesTemp(profile.favorites));
        const linksToFavResume = document.getElementsByClassName("go_to_resume");
        for (let i = 0; i < linksToFavResume.length; i++) {
            linksToFavResume[i].addEventListener('click', event => {
                event.preventDefault();
                profile.router.change('/resume', profile.favorites[i]);
            })
        }
    } else {
        mainColumnLeft.insertAdjacentHTML("beforeend", emptyListTemp("Нет избранных"));
    }
}