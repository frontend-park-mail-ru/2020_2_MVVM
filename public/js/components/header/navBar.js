import NavBarTemp from "./NavBar/NavBar.tmpl.xml";
import pNavBarTemp from "Js/components/header/phoneNavBar/phoneNavBar.tmpl.xml";
import {desktopNavBarInit, mobileNavBarInit} from "Js/components/header/phoneNavBar/pNavBar";



export class NavBarInit {
  constructor() {
    this.app = document.getElementById('header');
    this.user = localStorage.getItem("user_type");
    this.has_company = localStorage.getItem("has_company");
    this.is_open = false;
    this.need_search = false;
  }

  loadPhoneNavBarBig() {
    this.loadNavBar(true);
  }

  loadPhoneNavBarSmall() {
    this.user = localStorage.getItem("user_type");
    this.app.innerHTML = this.need_search ?  pNavBarTemp({need_search:true, user:this.user}) : pNavBarTemp({need_search:false, user:this.user});
  }

  loadNavBar(is_open) {
    const has_company = this.has_company === "true";
    if (this.user === "") {
      this.user = null;
    }
    const data = {
      user: this.user,
      has_company: has_company,
    };
    data["is_open"] = Boolean(is_open);
    this.app.innerHTML = NavBarTemp(data);
  }

  updateNavBar(need_search) {
    const tmpNeedSearch = need_search;
    const tmpUser = localStorage.getItem("user_type");
    const tmpCompany = localStorage.getItem("has_company");

    if (!(this.user === tmpUser && this.has_company === tmpCompany && this.need_search === tmpNeedSearch)) {
      this.user = tmpUser;
      this.has_company = tmpCompany;
      this.need_search = tmpNeedSearch;
      if (document.body.classList.contains("is-mobile")) {
        this.loadPhoneNavBarSmall(this.need_search);
        mobileNavBarInit(this);
      } else {
        this.loadNavBar(false);
        desktopNavBarInit();
      }
    }
  }
}