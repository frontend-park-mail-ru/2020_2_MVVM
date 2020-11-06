import {app} from "../../../createCandidateSum/createCandidateSum.js";

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
    console.log(list);
    if (isCand) {
        mainColumnLeft.insertAdjacentHTML("beforeend", window.fest['persResumes.tmpl'](list));
    } else {
        mainColumnLeft.insertAdjacentHTML("beforeend", window.fest['persVacancies.tmpl'](list));
    }


    const linksToResume = mainColumnLeft.getElementsByClassName("main__buttons_one");

    for (let i = 0; i < linksToResume.length; i++) {
        linksToResume[i].addEventListener('click', event => {
            event.preventDefault();
            if (isCand) {
                profile.router.change('/resume', list[i].resume);
            }
            else {
                profile.router.change('/vacancy', list[i].EmpID, list[i].ID, list[i].CompID);
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
    mainColumnLeft.insertAdjacentHTML("beforeend", window.fest['persInfo.tmpl'](person));
}
