import {NavBarInit} from "Js/components/header/navBar";
import pNavBarTemp from "Js/components/header/phoneNavBar/phoneNavBar.tmpl.xml";

export default function openMenu (app, need_search) {

    if (document.body.className==='is-mobile') {
        app.innerHTML = pNavBarTemp(need_search);
        const burgerMenu = document.getElementsByClassName("header-burger-menu");

        burgerMenu[0].addEventListener('click', event =>{
            const header = document.getElementsByClassName(`header`);
            const menuList = new NavBarInit(header[0],  false,"");
            menuList.loadNavBar(true);

            const menu = document.getElementsByClassName("header-row-top-menu");
            menu[0].insertAdjacentHTML("beforeend", `<div class="burger-close-menu"></div>`);
            menu[0].lastChild.addEventListener('click', () =>{
                header[1].remove();
                openMenu(header[0], need_search);
            });

            const menuBlock = document.getElementsByClassName("menu-list-block");
            for (let i=0; i,menuBlock.length;i++) {
                menuBlock[i].addEventListener('click', ()=>{
                    header[1].remove();
                    openMenu(header[0], need_search);
                });
            }
        });
    } else {
        const list = new NavBarInit(app,  false,"");
        list.loadNavBar();
    }
}

