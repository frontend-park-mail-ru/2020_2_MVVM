import {renderCandList} from './js/pages/candidatesList/candidatesList.js'
import {renderEmployersList} from './js/pages/employersList/employersList.js'
import {renderPersNavBar} from './js/pages/profile/profile.js'
import {renderResume} from './js/pages/resume/resume.js'
import {renderCandidateSummaryCreation} from "./js/pages/createCandidateSum/createCandidateSum.js";
import {renderEmployerSummaryCreation} from "./js/pages/createEmployerSum/createEmployerSum.js";
import {renderVacancy} from "./js/pages/vacancy/vacancy.js";
import {renderAuthList} from "./js/pages/auth/auth.js";


const app = window.document.getElementById('app');

function start(user) {
    // renderCandList(user);
    // renderEmployersList(user);
    // renderPersNavBar(user, false);
    //  renderCandidateSummaryCreation(user);
    // renderEmployerSummaryCreation(user);
    // renderResume(user);
    // renderVacancy(user);
    renderAuthList(user);
}

start(false);