import {network} from "../../libs/networks.js";
import {logoutURL} from "../../libs/constants.js";
import Logout from "../../pages/logout/logout.js";

export default class LogoutCtrl{
    constructor(router) {
        this.router = router;

        const onsubmit = async () => {

            const response = network.doPost(`${logoutURL}`, "");
            this.router.change('\/auth');

            if (response.status >= 200 && response.status < 300) {
                console.assert(response.ok);
            }
        }
        this.page = new Logout(onsubmit);
    }
}