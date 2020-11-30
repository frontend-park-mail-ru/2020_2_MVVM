import { network } from "Js/libs/networks";
import { logoutURL } from "Js/libs/constants";
import Logout from "../../pages/logout/logout.js";
import { stopPolling } from "Js/libs/polling";

export default class LogoutCtrl {
  constructor(router) {
    this.router = router;

    const onsubmit = async () => {
      const response = await network.doPost(`${logoutURL}`, "");

      if (response.status >= 200 && response.status < 300) {
        console.assert(response.ok);
        localStorage.setItem("user_type", "");
        stopPolling();
        localStorage.setItem("has_company", "false");
        this.router.change("/auth");
      }
    };
    this.page = new Logout(onsubmit);
  }
}