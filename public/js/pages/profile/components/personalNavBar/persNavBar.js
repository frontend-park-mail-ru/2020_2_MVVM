import {DOMAIN, responsesStatus} from "Js/libs/constants";
import emptyListTemp from "Js/components/emptyList/emptyList.tmpl.xml";
import {updateProfileFields} from "Js/pages/profile/components/personalInfo/persInfo";
import persResumesTemp from 'Js/pages/profile/components/listOfResumes/persResumes.tmpl.xml'
import persVacanciesTemp from 'Js/pages/profile/components/listOfVacancies/persVacancies.tmpl.xml'
import createCompanyTemp from '../personalInfo/persInfo.tmpl.xml'
import listOfCandidatesTemp from "Js/pages/candidatesList/components/listOfCandidates/listOfCandidates.tmpl.xml";
import responsesTemp from "Js/pages/profile/components/responses/responses.tmpl.xml";
import createElem from "Js/libs/createElem";

function doCheckout(profile, content, body, person, navBar, idx) {
    body.innerHTML = '';
    switch (idx) {
        case 0: {
            personalInfo(person, body);
            updateProfileFields();
        }
        break;
        case 1: {
            if (localStorage.getItem('user_type') === "candidate") {
                personalResOrVac(profile, true, body, profile.resumes);
            } else {
                personalResOrVac(profile, false, body, profile.vacancies);
            }
        }
        break;
        case 2: {
            const main__list = createElem("div", "main__list-profile", body);
            personalLikes(profile, main__list);
        }
        break;
        case 3: {
            personalResponses(profile, body);
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
            let imgs = document.getElementsByClassName("persResImg");
            for (let i=0; i<imgs.length;i++){
                imgs[i].onerror = ()=>{imgs[i].src = `${DOMAIN}static/resume/default.png`};
            }
        } else {
            list.forEach((vacancy) => {
                vacancy.imgPath = `${DOMAIN}static/company/${vacancy.comp_id}`;
            });
            mainColumnLeft.insertAdjacentHTML("beforeend", persVacanciesTemp(list));
            let imgs = document.getElementsByClassName("persVacImg");
            for (let i=0; i<imgs.length;i++){
                imgs[i].onerror = ()=>{imgs[i].src = `${DOMAIN}static/company/default.png`};
            }
        }
    } else {
        mainColumnLeft.insertAdjacentHTML("beforeend", emptyListTemp("Ваш список пуст"));
    }



    const linksToResume = mainColumnLeft.getElementsByClassName("main__buttons_one");

    for (let i = 0; i < linksToResume.length; i++) {
        linksToResume[i].addEventListener('click', event => {
            event.preventDefault();
            if (isCand) {
                console.log(list[i]);
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
        let imgs = document.getElementsByClassName("listOfCandImg");
        for (let i=0; i<imgs.length;i++){
            imgs[i].onerror = ()=>{imgs[i].src = `${DOMAIN}static/resume/default.png`};
        }
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

async function personalResponses(profile, body) {
    let myResponses = {};
    myResponses.responses = await profile.getMyResponses();
    myResponses.responses.forEach((item) => {
        item.date_create = item.date_create.slice(0,10);
        item.status = responsesStatus[item.status];
    })
    myResponses.user_type = localStorage.getItem('user_type');
    body.insertAdjacentHTML('afterbegin', responsesTemp(myResponses));
    createLinks(profile, myResponses.responses);
}

async function createLinks(profile, myResponses) {
    const linkToResume = document.getElementsByClassName("responses__resume-link");
    const linkToVacancy = document.getElementsByClassName("responses__vacancy-link");
    const linkToCompany = document.getElementsByClassName("responses__company-link");

    myResponses.forEach((item, idx) => {
        if (linkToResume) {
            linkToResume[idx].addEventListener('click', event=>{
                event.preventDefault();
                profile.router.change('/resume', {resume_id: item.resume_id});
            });
        }
        if (linkToVacancy) {
            linkToVacancy[idx].addEventListener('click', event=>{
                event.preventDefault();
                profile.router.change('/vacancy', localStorage.getItem('id'), item.vacancy_id, item.company_id);
            });
        }
        if (linkToCompany) {
            linkToCompany[idx].addEventListener('click', event=>{
                event.preventDefault();
                profile.getCompanyById(item.company_id).then((data)=>{
                    console.log(data);
                    profile.router.change('/company', data);
                });
                // profile.router.change('/company', );
            });
        }
    })
}