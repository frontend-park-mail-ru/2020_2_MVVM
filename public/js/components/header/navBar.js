import bNavBarTemp from './bNavBar/bNavBar.tmpl.xml'
import sNavBarTemp from './sNavBar/sNavBar.tmpl.xml'
import pNavBarTemp from './phoneNavBar/phoneNavBar.tmpl.xml'

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

        if (this.isBig) {
            this.app.innerHTML = bNavBarTemp(data);
        } else {
            this.app.innerHTML = sNavBarTemp(data);
        }
    }
}

