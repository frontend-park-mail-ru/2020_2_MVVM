import Profile from "../pages/profile/profile.js";
import {resumeMineURL} from "../libs/constants.js";
import {network} from "../libs/networks.js";

export default class ProfileCtrl{
    constructor(router) {
        this.router = router;

        const onload = async () => {
            try {
                const response = await network.doGet(resumeMineURL);
                const data = await response.json();
                console.assert(response.ok);
                return data;
            } catch (err){
                console.assert(err);
            }
        };

        this.page = new Profile(onload,router);

    }
}