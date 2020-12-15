import AuthList from '../../pages/auth/auth.js';
import {companyMineURL, loginURL, meUserURL, UNAUTHORISED} from 'Js/libs/constants';
import { network } from 'Js/libs/networks';
import { startPolling } from 'Js/libs/polling';

export default class AuthCtrl {
  constructor(router) {
    this.router = router;

    const onsubmit = async (event, form) => {
      event.preventDefault();
      const errorMes = document.getElementsByClassName('error');
      errorMes[0].innerHTML = '';

      const formData = new FormData(form);

      const body = {
        email: formData.get('email'),
        password: formData.get('password'),
      };

      const response = await network.doPost(`${loginURL}`, body);
      const res = await response.json();

      if (response.status >= 200 && response.status < 300) {
        const getUser = await network.doGet(`${meUserURL}`);
        const getUserData = await getUser.json();
        localStorage.setItem('user_type', getUserData.user.user_type);
        startPolling();
        if (getUserData.user.user_type === 'employer') {
          const response = await network.doGet(companyMineURL);
          const ans = await response.json();
          if (ans && ans.company) {
            localStorage.setItem("has_company", "true");
          } else {
            localStorage.setItem("has_company", "false");
          }
          this.router.change("/");
        } else if (getUserData.user.user_type === "candidate") {
          localStorage.setItem("has_company", "false");
          this.router.change("/");
        }
      } else {
        const formAuth = document.getElementsByClassName("input-data-card");
        formAuth[0].insertAdjacentHTML(
          "afterBegin",
          `<div class="error error_limit-width error_center">${res.error}</div>`
        );
      }
    };
    this.page = new AuthList(onsubmit);
  }
}