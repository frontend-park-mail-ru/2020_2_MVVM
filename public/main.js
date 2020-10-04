import {renderCandList} from './js/pages/candidatesList/candidatesList.js'
// import {renderEmplList} from './js/pages/employersList/employersList.js'
import {renderResume} from './js/pages/resume/resume.js'
import {renderVacancy} from './js/pages/vacancy/vacancy.js'


const app = window.document.getElementById('app');


function start(user) {

    // renderCandList(app, user);
    renderVacancy(app, user);

}

start(false);