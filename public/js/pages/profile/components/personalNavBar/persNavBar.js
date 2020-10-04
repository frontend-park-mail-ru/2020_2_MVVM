import {renderPersNavBar} from '../../profile.js'

export function checkoutProfilePage(user) {
    const profNavBar = document.getElementsByClassName("persNavBar__menu-list");

    for (let i=0; i < profNavBar[0].childElementCount; i++) {
        profNavBar[0].children[i].addEventListener('click', () => {
            if (profNavBar[0].children[i].textContent === 'Личная информация'){
                renderPersNavBar(user, false);
            } else {
                renderPersNavBar(user, true);
            }
        });
    }
}

