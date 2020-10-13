import Profile from '../../profile.js'

export function checkoutProfilePage(isAuthorized, content) {
    const profile = new Profile();
    const profNavBar = document.getElementsByClassName("persNavBar__menu-list");

    for (let i=0; i < profNavBar[0].childElementCount; i++) {
        profNavBar[0].children[i].addEventListener('click', () => {
            if (profNavBar[0].children[i].textContent === 'Личная информация'){
                profile.isPersonalRusemes = false;
                profile.render(isAuthorized, content);
            } else {
                profile.isPersonalRusemes = true;
                profile.render(isAuthorized, content);
            }
        });
    }
}

