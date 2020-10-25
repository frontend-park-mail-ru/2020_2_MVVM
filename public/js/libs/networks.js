import {resumePageURL, URL} from "./constants.js";

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

    async doGetLimit(url, start, limit){
        return await fetch(
            `${URL}${url}` + new URLSearchParams({
                start: start,
                limit: limit,
            }),
            {
                method: "GET",
                credentials: "include",
            }
        )
    }
}

export const network = new Network();