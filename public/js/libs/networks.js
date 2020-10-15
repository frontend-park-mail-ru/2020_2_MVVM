import {URL} from "./constants.js";

class Network {

    async doPost(url, data) {
        return await fetch(
            `${URL}${url}`,
            {
                body: JSON.stringify(data),
                credentials: "include",
                method: "POST",
            },
        )
    }

    async doGet(url) {
        return await fetch(
            `${URL}${url}`,
            {
                credentials: "include",
                method: "GET",
            },
        )
    }

    async doPut(url, data){
        return await fetch(
            `${URL}${url}`,
            {
                body: JSON.stringify(data),
                credentials: "include",
                method: "PUT",
            },
        )
    }

}

export const network = new Network();