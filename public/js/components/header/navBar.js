import bNavBarTemp from './bNavBar/bNavBar.tmpl.xml'
import sNavBarTemp from './sNavBar/sNavBar.tmpl.xml'
import notificTemp from 'Js/components/notifications/notifications.tmpl.xml'
import pNavBarTemp from './phoneNavBar/phoneNavBar.tmpl.xml'
import {network} from "Js/libs/networks";
import {loginURL, notificationsPageURL, updateRespStatusURL} from "Js/libs/constants";
import {recNum} from "Js/app";

export class NavBarInit {
    constructor(app, isBig, title) {
        this.app = app;
        this.user = localStorage.getItem('user_type');
        this.has_company = localStorage.getItem('has_company');
        this.isBig = isBig;
        this.title = title;
    }

    loadNavBar(is_open) {


        let has_company = this.has_company === 'true';
        if (this.user === '') {
            this.user = null;
        }
        let data = {title: this.title, user: this.user, has_company: has_company};
        data['is_open'] = is_open ? is_open : false;
        // if (recNum !== undefined) {
        //     let word = plural(recNum, ["вакансий", "вакансию", "вакансии"]);
        //     data['rec_vac'] = recNum.toString() + " " + word;
        // }

        if (this.isBig) {
            this.app.innerHTML = bNavBarTemp(data);
        } else {
            this.app.innerHTML = sNavBarTemp(data);
        }

    }
}

// const plural = (count, variants) => {
//     const lastTwo = count % 100;
//     if (lastTwo > 10 && lastTwo < 20) {
//         return variants[0];
//     }
//
//     const last = count % 10;
//     if (last === 1) {
//         return variants[1];
//     }
//
//     if (last > 1 && last < 5) {
//         return variants[2];
//     }
//
//     return variants[0];
// };
