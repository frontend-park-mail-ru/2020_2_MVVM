import {URL} from "./constants.js";

class Network {

    async doPost(url, data) {
        return await fetch(
            `${URL}${url}`,
            {
                body: JSON.stringify(data),
                credentials: "include",
                method: "post",
            },
        )
    }

    async doGet(url) {
        return await fetch(
            `${URL}${url}`,
            {
                credentials: "include",
                method: "get",
            },
        )
    }

}

export const network = new Network();