import Profile from '../../profile.js'

export function checkoutProfilePage(isAuthorized, content) {
    const profile = new Profile();
    const profNavBar = document.getElementsByClassName("persNavBar__menu-list");

    for (let i=0; i < profNavBar[0].childElementCount; i++) {
        profNavBar[0].children[i].addEventListener('click', () => {
            profile.isPersonalRusemes = profNavBar[0].children[i].textContent !== 'Личная информация';
            profile.render(isAuthorized, content);
        });
    }
}

