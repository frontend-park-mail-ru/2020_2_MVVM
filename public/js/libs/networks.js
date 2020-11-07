import {URL} from "./constants.js";

class Network {

    async doPost(url, data) {
        return await fetch(
            `${URL}${url}`,
            {
                body: JSON.stringify(data),
                mode: 'cors',
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
                mode: 'cors',
                credentials: "include",
                method: "PUT",
            },
        )
    }

    async doGetLimit(url, start, limit){
        return await fetch(
            `${URL}${url}` + new URLSearchParams({
                start: start,
                limit: limit,
            }),
            {
                mode: "cors",
                method: "GET",
                credentials: "include",
            }
        )
    }

    async doDelete(url) {
        return await fetch(
            `${URL}${url}`,
            {
                credentials: "include",
                method: "DELETE",
            },
        )
    }
}

export const network = new Network();