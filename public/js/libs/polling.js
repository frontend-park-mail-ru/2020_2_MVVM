import {network} from "Js/libs/networks";
import {notificationsPageURL} from "Js/libs/constants";
import notificTemp from "Js/components/notifications/notifications.tmpl.xml";
import singleNotifTemp from "Js/components/notifications/singleNotif.tmpl.xml";
import responseNotifTemp from "Js/components/notifications/responesNotofic.tmpl.xml";
import {plural} from "Js/libs/plural";
import {convertDate} from "Js/libs/convertDate";

const TIMEOUT = 3000;

export let recNum = 0;

let unresponed = 0;

let intervalId = null;

const createNotifResponses = (responses) => {
    console.log(responses);
    responses.forEach((item) => {
        item.user_type = localStorage.getItem('user_type')
        item.date_create = convertDate(item.date_create);
        document.getElementById('notes-list').insertAdjacentHTML('afterbegin', responseNotifTemp(item));
    });
    let responsesList = document.getElementsByClassName('response-row');
    const deletedResponse = document.getElementsByClassName('response-row__close-btn');
    for (let i=0; i<deletedResponse.length; i++) {
        deletedResponse[i].addEventListener('click',()=>{
            responsesList[i].remove();
            const body = {
                watched_responses: [responses[i].response_id],
            };
            network.doPost(notificationsPageURL, body);
        })
    }
}


const createNotifVacancy = (newRecs) => {
    const word = plural(newRecs, ["рекомендуемая вакансия", "рекомендуемая вакансия", "рекомендуемые вакансии"]);
    const myString = `${newRecs} ${word}`;
    let popup = document.getElementById("notePopup");


    document.getElementById('notes-list').insertAdjacentHTML('beforebegin', singleNotifTemp({rec_vac:myString}));
    const linkToVac = document.getElementsByClassName('single-notific');
    linkToVac[0].addEventListener('click', (event)=>{
        const link = document.getElementsByClassName('menu-list-block__item_note');
        link[0].innerHTML = '';
        event.preventDefault();
        popup.style.display = "none";
        const body = {
            only_new_resp_cnt: true,
            vac_in_last_n_days: null,
        };
        network.doPost(notificationsPageURL, body);
    })
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
            watched_responses: [],
            only_new_vac_cnt: true,
        };
        const resp = network.doPost(notificationsPageURL, body);
        resp.then((response) => {
            response.json().then((parsedJson) => {
                const newRecs = parsedJson.recommended_vac_cnt;
                if (newRecs !== recNum) {
                    newRecs ? createNotifVacancy(newRecs) : emptyNotif();
                    recNum = newRecs;
                }
                console.log(parsedJson.unread_resp.length);
                console.log(unresponed);
                if (parsedJson.unread_resp && parsedJson.unread_resp.length !== unresponed) {
                    createNotifResponses(parsedJson.unread_resp);
                    unresponed = parsedJson.unread_resp.length;
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

    if (localStorage.getItem('user_type') !== "") {
        startPolling();
    }
}