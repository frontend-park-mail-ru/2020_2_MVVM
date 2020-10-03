import {renderCandList} from './js/pages/candidatesList/candidatesList.js'
import {renderEmployersList} from './js/pages/employersList/employersList.js'
import {renderPersNavBar} from './js/pages/profile/profile.js'
import {renderEmplList} from './js/pages/resume/resume.js'


const app = window.document.getElementById('app');

function start(user) {
    // renderCandList(user);
    // renderEmployersList(user);
    renderPersNavBar(user);
    // renderEmplList(app, user);
}


start(true);