import {renderCandList} from './js/pages/candidatesList/candidatesList.js'
import {renderEmployersList} from './js/pages/employersList/employersList.js'
import {renderPersNavBar} from './js/pages/profile/profile.js'
import {renderResume} from './js/pages/resume/resume.js'
import {renderVacancy} from './js/pages/vacancy/vacancy.js'
import {renderCandidateSummaryCreation} from "./js/pages/createCandidateSum/createCandidateSum.js";
import {renderEmployerSummaryCreation} from "./js/pages/createEmployerSum/createEmployerSum.js";
import {renderMainPage} from "./js/pages/mainPage/mainPage.js"
import {renderAuthList} from "./js/pages/auth/auth.js";
import {renderRegList} from "./js/pages/reg/reg.js";


const app = window.document.getElementById('app');

function start(user) {
    // renderCandList(user);
    // renderEmployersList(user);
    // renderPersNavBar(user, false);
    // renderCandidateSummaryCreation(user);
    // renderEmployerSummaryCreation(user);
    // renderVacancy(user);
    // renderResume(user);
    // renderAuthList(user);
    renderRegList(user);
    // renderMainPage(user);
}

start(false);