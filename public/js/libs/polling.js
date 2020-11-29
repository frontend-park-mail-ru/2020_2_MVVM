import {network} from "Js/libs/networks";
import {notificationsPageURL} from "Js/libs/constants";
import notificTemp from "Js/components/notifications/notifications.tmpl.xml";
import singleNotifTemp from "Js/components/notifications/singleNotif.tmpl.xml";
import {plural} from "Js/libs/plural";

const TIMEOUT = 3000;

export let recNum = 0;

let intervalId = null;


const createNotif = (newRecs) => {
    const word = plural(newRecs, ["вакансий", "вакансию", "вакансии"]);
    const myString = `${newRecs} ${word}`;

    document.getElementById('notes-list').insertAdjacentHTML('beforebegin', singleNotifTemp({rec_vac:myString}));
}

const emptyNotif = () => {
    document.getElementById('notes-list').innerHTML = "Уведомлений нет";
}

export const startPolling = () => {
    if (intervalId) {
        return;
    }

    intervalId = setInterval(() => {
        const body = {
            only_new_resp_cnt: false,
            vac_in_last_n_days: null,
            watched_responses: null,
            only_new_vac_cnt: true,
        };
        const resp = network.doPost(notificationsPageURL, body);
        resp.then((response) => {
            response.json().then((parsedJson) => {
                const newRecs = parsedJson.recommended_vac_cnt;
                if (newRecs !== recNum) {
                    newRecs ? createNotif(newRecs) : emptyNotif();
                    recNum = newRecs;
                }
            })
        });
    }, TIMEOUT);
}

export const stopPolling = () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

export const initPolling = () => {

    const top = document.getElementById('app');
    top.insertAdjacentHTML("beforebegin", notificTemp({user:localStorage.getItem('user_type')}));

    // let nb = document.getElementById("note-button");
    // let popup = document.getElementById("notePopup");
    // if (nb != null) {
    //     nb.addEventListener('click', () => {
    //         popup.style.display = "block";
    //     });
    //     window.onclick = function(event) {
    //         if (event.target === popup) {
    //             popup.style.display = "none";
    //         }
    //     }
    // }

    if (localStorage.getItem('user_type') !== "") {
        startPolling();
    }
}