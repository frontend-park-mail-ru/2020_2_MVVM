import { changeNavBarPos } from "Js/libs/chengeNavBarPos";

const app = document.getElementById("app");
const main = document.getElementById("main");

const clickHeaderLogoEvent = (NavBar, header) => {
  const headerLogo = document.getElementsByClassName(
    "header-row-top-menu__logo"
  )[0];
  headerLogo.addEventListener("click", () => {
    headerLogo.removeEventListener("click", () => {});
    removeNotifPage();
    header.remove();
    NavBar.loadPhoneNavBarSmall();
    document.body.classList.remove("hide-scroll");
    openNotifications(NavBar);
    changeNavBarPos(window.location.pathname);
    burgerOpen(NavBar);
  });
};

const closeBurgerEvent = (NavBar, header) => {
  const menuList = document.getElementsByClassName("header-row-top-menu")[0];
  menuList.insertAdjacentHTML(
    "beforeend",
    `<div class="burger-close-menu"></div>`
  );

  menuList.lastChild.addEventListener("click", (event2) => {
    menuList.lastChild.removeEventListener("click", () => {});
    removeNotifPage();
    header.remove();
    NavBar.loadPhoneNavBarSmall();
    document.body.classList.remove("hide-scroll");
    changeNavBarPos(window.location.pathname);
    openSearchMenu(NavBar);
    openNotifications(NavBar);
    burgerOpen(NavBar);
  });
};

const headerLinkEvent = (NavBar, header) => {
  const menuBlock = document.getElementsByClassName("menu-list-block");
  for (let i = 0; i < menuBlock.length; i++) {
    menuBlock[i].addEventListener("click", (event) => {
      menuBlock[i].removeEventListener("click", () => {});
      document.body.classList.remove("hide-scroll");
      const searchBlock = document.getElementById("main-navigation");
      if (searchBlock) {
        searchBlock.classList.add("hide");
      }
      header.remove();
      NavBar.loadPhoneNavBarSmall();
      changeNavBarPos(window.location.pathname);
      openSearchMenu(NavBar);
      openNotifications(NavBar);
      burgerOpen(NavBar);
    });
  }
};

const burgerOpen = (NavBar) => {
  const burgerMenu = document.getElementsByClassName("header-burger-menu")[0];

  burgerMenu.addEventListener("click", (event) => {
    burgerMenu.removeEventListener("click", () => {});
    const header = document.getElementsByClassName(`header`)[0];
    document.body.classList.add("hide-scroll");

    NavBar.loadNavBar(true);

    clickHeaderLogoEvent(NavBar, header);
    closeBurgerEvent(NavBar, header);
    headerLinkEvent(NavBar, header);
    removeNotifPage();
  });
};

const openSearchMenu = () => {
  const searchMenu = document.getElementsByClassName("header-search-menu")[0];

  if (searchMenu) {
    searchMenu.addEventListener("click", () => {
      searchMenu.removeEventListener("click", () => {});
      const searchBlock = document.getElementById("main-navigation");
      const mainList = document.getElementsByClassName("main-list")[0];
      if (searchBlock.classList.contains("hide")) {
        mainList.classList.add("hide");
        searchBlock.classList.remove("hide");
      } else {
        mainList.classList.remove("hide");
        searchBlock.classList.add("hide");
      }
    });
  }
};

export const removeNotifPage = () => {
  const popup = document.getElementById("notePopup");
  if (!popup.classList.contains("hide")) {
    popup.classList.add("hide");
    main.classList.remove("hide");
    app.classList.remove("notification-bg");
  }
};

const addNotifPage = () => {
  const popup = document.getElementById("notePopup");
  if (popup.classList.contains("hide")) {
    popup.classList.remove("hide");
    main.classList.add("hide");
    app.classList.add("notification-bg");
  }
};

const openNotifications = () => {
  const notifButton = document.getElementsByClassName("header-notification")[0];
  if (notifButton) {
    notifButton.addEventListener("click", () => {
      notifButton.removeEventListener("click", () => {});
      const popup = document.getElementById("notePopup");
      if (popup.classList.contains("hide")) {
        addNotifPage();
      } else {
        removeNotifPage();
      }
    });
  }
};

export const mobileNavBarInit = (NavBar) => {
  openSearchMenu();
  openNotifications();
  burgerOpen(NavBar);
};

const notifBigMenu = () => {
  const nb = document.getElementById("note-button");
  const popup = document.getElementById("notePopup");
  const popUpContent = document.getElementsByClassName("popup-content")[0];

  if (nb && popup.classList.contains('hide')) {
    nb.addEventListener("click", () => {
      nb.removeEventListener('click', ()=>{});
      popup.classList.remove("hide");
      notifBigMenu();
    });
  } else if (popup){
    popup.addEventListener("click", (event) => {
      popup.removeEventListener('click', ()=>{});
      if (!popup.classList.contains("hide") && event.target !== popUpContent && event.target !== nb) {
        popup.classList.add("hide");
        notifBigMenu();
      }
    });
  }
}

export const desktopNavBarInit = () => {
  notifBigMenu();
};
