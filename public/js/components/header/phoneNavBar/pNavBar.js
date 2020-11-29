import {NavBarInit} from "Js/components/header/navBar";
import pNavBarTemp from "Js/components/header/phoneNavBar/phoneNavBar.tmpl.xml";
import notificTemp from "Js/components/notifications/notifications.tmpl.xml";
import {recNum} from "Js/app";


export default function openMenu (app, need_search) {


    let myString;
    if (recNum) {
        const word = plural(recNum, ["вакансий", "вакансию", "вакансии"]);
        myString = `${recNum} ${word}`;
    }
    const top = document.getElementById('app');
    top.insertAdjacentHTML("beforebegin", notificTemp({user:localStorage.getItem('user_type'), rec_vac: myString}));



    if (document.body.classList.contains('is-mobile')) {
        app.innerHTML = pNavBarTemp(need_search);


        const burgerMenu = document.getElementsByClassName("header-burger-menu");
        const searchMenu = document.getElementsByClassName("header-search-menu");

        burgerMenu[0].addEventListener('click', event =>{
            const header = document.getElementsByClassName(`header`);
            document.body.classList.add("hide-scroll");
            const menuList = new NavBarInit(header[0],  false,"");
            menuList.loadNavBar(true);

            const headerLogo = document.getElementsByClassName("header-row-top-menu__logo");
            headerLogo[0].addEventListener('click', ()=>{
                document.body.classList.remove("hide-scroll");
            });

            const menu = document.getElementsByClassName("header-row-top-menu");
            menu[0].insertAdjacentHTML("beforeend", `<div class="burger-close-menu"></div>`);
            menu[0].lastChild.addEventListener('click', () =>{
                header[1].remove();
                document.body.classList.remove("hide-scroll");
                openMenu(header[0], need_search);
            });

            const menuBlock = document.getElementsByClassName("menu-list-block");
            for (let i=0; i<menuBlock.length;i++) {
                menuBlock[i].addEventListener('click', ()=>{
                    document.body.classList.remove("hide-scroll");
                    const searchBlock = document.getElementById("main-navigation");
                    if (searchBlock) {
                        searchBlock.classList.add("hide");
                    }
                    header[1].remove();
                    openMenu(header[0], need_search);
                });
            }

            let nb = document.getElementById("note-button");
            let popup = document.getElementById("notePopup");

            if (nb != null) {
                nb.addEventListener('click', () => {
                    popup.style.display = "block";
                    header[1].remove();
                    openMenu(header[0], need_search);
                });
                window.onclick = function(event) {
                    if (event.target === popup) {
                        popup.style.display = "none";
                    }
                }
            }
        });

        if (searchMenu.length) {
            searchMenu[0].addEventListener('click', ()=>{
                const searchBlock = document.getElementById("main-navigation");
                const mainList = document.getElementsByClassName("main-list");
                if (searchBlock.classList.contains("hide")) {
                    mainList[0].classList.add("hide");
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
        let nb = document.getElementById("note-button");
        let popup = document.getElementById("notePopup");
        if (nb != null) {
            nb.addEventListener('click', () => {
                popup.style.display = "block";
            });
            window.onclick = function(event) {
                if (event.target === popup) {
                    popup.style.display = "none";
                }
            }
        }
    }
    // changeNavBarPos();

}


const plural = (count, variants) => {
    const lastTwo = count % 100;
    if (lastTwo > 10 && lastTwo < 20) {
        return variants[0];
    }

    const last = count % 10;
    if (last === 1) {
        return variants[1];
    }

    if (last > 1 && last < 5) {
        return variants[2];
    }

    return variants[0];
};

