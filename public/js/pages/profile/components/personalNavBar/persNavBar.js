import {app} from "../../../createCandidateSum/createCandidateSum.js";

export function checkoutProfilePage(profile,isAuthorized, content, body, person) {
    const profNavBar = document.getElementsByClassName("persNavBar__menu-list");

    for (let i=0; i < profNavBar[0].childElementCount; i++) {
        profNavBar[0].children[i].addEventListener('click', () => {
            body.innerHTML='';
            profile.isPersonalRusemes = profNavBar[0].children[i].textContent !== 'Личная информация';
            if (profile.isPersonalRusemes){
                personalResumes(profile,body, profile.resumes);
            } else {
                personalInfo(person, body);
            }
        });
    }
}


export function personalResumes(profile,mainColumnLeft, resumeList){
    mainColumnLeft.insertAdjacentHTML("beforeend", window.fest['persResumes.tmpl'](resumeList.resume));

    const linksToResume = mainColumnLeft.getElementsByClassName("main__buttons_one");

    for (let i = 0; i < linksToResume.length; i++) {
        linksToResume[i].addEventListener('click', event => {
            event.preventDefault();
            profile.router.change('/resume', resumeList.resume[i].user_id, resumeList.resume[i].id);
        })
    }

    const linksToUpdateResume = mainColumnLeft.getElementsByClassName("main__buttons_two");

    for (let i = 0; i < linksToUpdateResume.length; i++) {
        linksToUpdateResume[i].addEventListener('click', event => {
            event.preventDefault();
            profile.router.change('/createResume', resumeList.resume[i].user_id, resumeList.resume[i].id, resumeList.resume[i]);
        })
    }
}

export function personalInfo(person, mainColumnLeft){
    mainColumnLeft.insertAdjacentHTML("beforeend", window.fest['persInfo.tmpl'](person));
}
