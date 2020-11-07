import {app} from "../../../createCandidateSum/createCandidateSum.js";
import persResumesTemp from 'Js/pages/profile/components/listOfResumes/persResumes.tmpl.xml'
import persVacanciesTemp from 'Js/pages/profile/components/listOfVacancies/persVacancies.tmpl.xml'
import createCompanyTemp from '../personalInfo/persInfo.tmpl.xml'

export function checkoutProfilePage(profile, content, body, person) {
    const profNavBar = document.getElementsByClassName("persNavBar__menu-list");
    for (let i = 0; i < profNavBar[0].childElementCount; i++) {
        profNavBar[0].children[i].addEventListener('click', () => {
            body.innerHTML = '';
            profile.isPersonalRusemes = profNavBar[0].children[i].textContent !== 'Личная информация';
            if (profile.isPersonalRusemes) {
                if (content.user.user_type === "candidate") {
                    personalResOrVac(profile, true, body, profile.resumes);
                } else {
                    personalResOrVac(profile, false, body, profile.vacancies);
                }

            } else {
                personalInfo(person, body);
            }
        });
    }
}


export function personalResOrVac(profile, isCand, mainColumnLeft, list) {
    if (isCand) {
        console.log(list);
        mainColumnLeft.insertAdjacentHTML("beforeend", persResumesTemp(list));
    } else {
        mainColumnLeft.insertAdjacentHTML("beforeend", persVacanciesTemp(list));
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
                profile.router.change('/updateResume', list[i].cand_id, list[i].id, list[i]);
            }

        })
    }
}

export function personalInfo(person, mainColumnLeft) {
    mainColumnLeft.insertAdjacentHTML("beforeend", createCompanyTemp(person));
}
