import Profile from '../../profile.js'

export function checkoutProfilePage(get_current_user) {
    const profile = new Profile(get_current_user);
    const profNavBar = document.getElementsByClassName("persNavBar__menu-list");

    for (let i=0; i < profNavBar[0].childElementCount; i++) {
        profNavBar[0].children[i].addEventListener('click', () => {
            if (profNavBar[0].children[i].textContent === 'Личная информация'){
                profile.isPersonalRusemes = false;
                profile.render();
            } else {
                profile.isPersonalRusemes = true;
                profile.render();
            }
        });
    }
}

