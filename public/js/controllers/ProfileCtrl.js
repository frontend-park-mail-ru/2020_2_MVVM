import Profile from "../pages/profile/profile.js";
import {meUserURL, SUCCESS, resumeMineURL} from "../libs/constants.js";
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


        // const onload = async () => {
        //     try {
        //         // const response = await network.doGet(meUserURL);
        //         // console.assert(response.ok);
        //         const responseResumes = await network.doGet(resumeMineURL);
        //         console.log(responseResumes);
        //         this.router.change('\/profile', responseResumes);
        //         console.assert(responseResumes.ok);
        //     } catch (err){
        //         console.assert(err);
        //     }
        //
        //
        //     // if (response.status === SUCCESS) {
        //     //     this.router.change('\/profile');
        //     // }
        // };

        // this.page = new Profile(onload);
    }
}