import {NavBar} from './js/components/navBar/navBar.js'
import {renderCandList, candidatesListModule} from './js/modules/candidatesList.js'
import employersListModule from './js/modules/employersList.js'


const app = window.document.getElementById('app');


function start(user) {
    renderCandList(app, user);
}

start(true);