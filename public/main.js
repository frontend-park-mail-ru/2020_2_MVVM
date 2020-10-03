import {renderCandList} from './js/pages/candidatesList/candidatesList.js'
// import {renderEmplList} from './js/pages/employersList/employersList.js'
import {renderEmplList} from './js/pages/resume/resume.js'


const app = window.document.getElementById('app');


function start(user) {

    // renderCandList(app, user);
    renderEmplList(app, user);

}

start(false);