import Profile from "../pages/profile/profile.js";
import {meURL, SUCCESS, URL} from "../libs/constants.js";
import {network} from "../libs/networks.js";

export default class ProfileCtrl{
    constructor(router) {
        this.router = router;

        const onload = async () => {
            const response = await network.doGet(meURL);

            console.assert(response.ok);

            if (response.status === SUCCESS) {
                this.router.change('\/profile');
            }
        };

        this.page = new Profile(onload);
    }
}