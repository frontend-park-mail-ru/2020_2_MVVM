import bNavBarTemp from "./bNavBar/bNavBar.tmpl.xml";
import sNavBarTemp from "./sNavBar/sNavBar.tmpl.xml";

export class NavBarInit {
  constructor(app, isBig, title) {
    this.app = app;
    this.user = localStorage.getItem("user_type");
    this.has_company = localStorage.getItem("has_company");
    this.isBig = isBig;
    this.title = title;
  }

  loadNavBar(is_open) {
    const has_company = this.has_company === "true";
    if (this.user === "") {
      this.user = null;
    }
    const data = {
      title: this.title,
      user: this.user,
      has_company: has_company,
    };
    data["is_open"] = Boolean(is_open);

    this.app.innerHTML = this.isBig ? bNavBarTemp(data) : sNavBarTemp(data);
  }
}