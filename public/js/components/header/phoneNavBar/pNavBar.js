import { NavBarInit } from "Js/components/header/navBar";
import pNavBarTemp from "Js/components/header/phoneNavBar/phoneNavBar.tmpl.xml";
import notificTemp from "Js/components/notifications/notifications.tmpl.xml";

export default function openMenu(app, need_search) {
  if (document.body.classList.contains("is-mobile")) {
    app.innerHTML = pNavBarTemp(need_search);

    const burgerMenu = document.getElementsByClassName("header-burger-menu");
    const searchMenu = document.getElementsByClassName("header-search-menu");

    burgerMenu[0].addEventListener("click", (event) => {
      const header = document.getElementsByClassName(`header`);
      document.body.classList.add("hide-scroll");

      const menuList = new NavBarInit(header[0], false, "");
      menuList.loadNavBar(true);

      let nb = document.getElementById("note-button");
      let popup = document.getElementById("notePopup");
      popup.style.display = "none";

      const headerLogo = document.getElementsByClassName(
        "header-row-top-menu__logo"
      );
      headerLogo[0].addEventListener("click", () => {
        popup.style.display = "none";
        document.body.classList.remove("hide-scroll");
      });

      const menu = document.getElementsByClassName("header-row-top-menu");
      menu[0].insertAdjacentHTML(
        "beforeend",
        `<div class="burger-close-menu"></div>`
      );
      menu[0].lastChild.addEventListener("click", (event) => {
        header[1].remove();
        popup.style.display = "none";
        document.body.classList.remove("hide-scroll");
        openMenu(header[0], need_search);
      });

      const menuBlock = document.getElementsByClassName("menu-list-block");
      for (let i = 0; i < menuBlock.length; i++) {
        menuBlock[i].addEventListener("click", (event) => {
          document.body.classList.remove("hide-scroll");
          const searchBlock = document.getElementById("main-navigation");
          if (searchBlock) {
            searchBlock.classList.add("hide");
          }
          if (event.target !== nb) {
            popup.style.display = "none";
          }
          header[1].remove();
          openMenu(header[0], need_search);
        });
      }

      if (nb != null) {
        nb.addEventListener("click", () => {
          popup.style.display = "block";
          header[1].remove();
          openMenu(header[0], need_search);
        });
        window.onclick = function (event) {
          if (event.target === popup) {
            popup.style.display = "none";
          }
        };
      }
    });

    if (searchMenu.length) {
      let popup = document.getElementById("notePopup");
      searchMenu[0].addEventListener("click", () => {
        const searchBlock = document.getElementById("main-navigation");
        const mainList = document.getElementsByClassName("main-list");
        if (searchBlock.classList.contains("hide")) {
          mainList[0].classList.add("hide");
          popup.style.display = "none";
          searchBlock.classList.remove("hide");
        } else {
          mainList[0].classList.remove("hide");
          searchBlock.classList.add("hide");
        }
      });
    }
  } else {
    const list = new NavBarInit(app, false, "");
    list.loadNavBar(false);
    const nb = document.getElementById("note-button");
    const popup = document.getElementById("notePopup");

    if (nb != null) {
      nb.addEventListener("click", (event) => {
        popup.style.display = "block";
      });
      window.onclick = function (event) {
        if (event.target === popup) {
          popup.style.display = "none";
        }
      };
    }
  }
}




