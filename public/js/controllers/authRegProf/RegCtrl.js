import RegList from "../../pages/reg/reg.js";
import {addUserURL, companyMineURL} from "Js/libs/constants";
import { network } from "Js/libs/networks";
import {startPolling} from "Js/libs/polling";

export default class RegCtrl {
  constructor(router) {
    this.router = router;

    const onsubmit = async (event, form, errorMes) => {
      event.preventDefault();

      const formData = new FormData(form);
      errorMes[0].innerHTML = "";

      const body = {
        name: formData.get("firstname"),
        surname: formData.get("lastname"),
        email: formData.get("email"),
        password: formData.get("password"),
        user_type: formData.get("type"),
      };

      const formReg = await document.getElementsByClassName("reg");
      const response = await network.doPost(`${addUserURL}`, body);

      const userInfo = await response.json();
      console.log(userInfo);

      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem('user_type', userInfo.user.user_type);
        startPolling();
        if (userInfo.user.user_type === 'employer') {
          const response = await network.doGet(companyMineURL);
          const ans = await response.json();
          if (ans && ans.company) {
            localStorage.setItem("has_company", "true");
          } else {
            localStorage.setItem("has_company", "false");
          }
          this.router.change("/");
        } else if (userInfo.user.user_type === "candidate") {
          localStorage.setItem("has_company", "false");
          this.router.change("/");
        }
      } else {
        formReg[0].insertAdjacentHTML(
          "afterBegin",
          `<div class="error">${userInfo.error}</div>`
        );
      }
    };

    this.page = new RegList(onsubmit);
  }
}
