import Profile from "../pages/profile/profile.js";
import {URL} from "../libs/constants.js";

export default class ProfileCtrl{
    constructor(router) {
        this.router = router;

        const get_person = async () => {
            const response = await fetch(
                `${URL}/v1/users/me`,
                {
                    credentials: "include",
                    method: "get",
                },
            )
            console.assert(response.ok);
            const content = await response.json();
            // const content = JSON.stringify({"user":{"id":"ca55070e-ea08-453b-94dc-b97317d89585","nickname":"asdasdasd","name":"asdasdasd","surname":"asdasdasd","email":"asd@asd.ru"}});

            return {
                firstName: content.user.name,
                lastName: content.user.surname,
                email: content.user.email,
                phone: 'NOT READY YET',
                resumeCount: 'NOT READY YET',
                locationOfSearch: 'NOT READY YET',
                socialNetworkLinks: 'NOT READY YET',
            }
        }

        this.page = new Profile(get_person);
    }
}