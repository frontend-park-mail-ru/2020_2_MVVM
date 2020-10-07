import Profile from "../pages/profile/profile.js";

export default class ProfileCtrl{
    constructor(router) {
        this.router = router;

        const get_person = async () => {
            const response = await fetch(
                "api/v1/users/me",
                {
                    method: "get",
                },
            )
            console.assert(response.ok);
            const content = await response.json();
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