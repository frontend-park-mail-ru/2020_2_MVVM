import { network } from "Js/libs/networks";
import { notificationsPageURL } from "Js/libs/constants";
import notificTemp from "Js/components/notifications/notifications.tmpl.xml";
import singleNotifTemp from "Js/components/notifications/singleNotif.tmpl.xml";
import responseNotifTemp from "Js/components/notifications/responesNotofic.tmpl.xml";
import { plural } from "Js/libs/plural";
import {convertDate} from "Js/libs/convertDate";
import {desktopNavBarInit, removeNotifPage} from "Js/components/header/phoneNavBar/pNavBar";

const TIMEOUT = 3000;

let recNum = 0;

let unresponed = 0;

let intervalId = null;

const createNotifResponses = (responses) => {
  const user_type = localStorage.getItem("user_type");
  let myResponses = [];
  responses.forEach((item) => {
    if (item.initial !== user_type) {
      unresponed++;
      myResponses.push(item);
    }
    item.user_type = user_type;
    item.date_create = convertDate(item.date_create);
    document
      .getElementById("notes-list")
      .insertAdjacentHTML("afterbegin", responseNotifTemp(item));
  });
  let responsesList = document.getElementsByClassName("response-row");
  const deletedResponse = document.getElementsByClassName(
    "response-row__close-btn"
  );

  myResponses.forEach((item, i) => {
    deletedResponse[i].addEventListener("click", () => {
      responsesList[i].classList.add('hide');
      unresponed--;
      const body = {
        watched_responses: [item.response_id],
        only_new_vac_cnt:true,
      };
      network.doPost(notificationsPageURL, body);
    });
  })
};

const createNotifVacancy = (newRecs) => {
  const word = plural(newRecs, [
    "рекомендуемая вакансия",
    "рекомендуемая вакансия",
    "рекомендуемые вакансии",
  ]);
  const myString = `Подобрано ${newRecs} ${word}`;

  document
    .getElementById("notes-list")
    .insertAdjacentHTML("beforebegin", singleNotifTemp({ rec_vac: myString }));
  const linkToVac = document.getElementsByClassName("single-notific");
  linkToVac[0].addEventListener("click", (event) => {
    const link = document.getElementsByClassName("menu-list-block__item_note");
    link[0].innerHTML = "";
    desktopNavBarInit();
    removeNotifPage();
  });
};

const emptyNotif = (text) => {
  document.getElementById("notes-list").innerHTML = text;
};

export const startPolling = () => {
  if (intervalId) {
    return;
  }

  intervalId = setInterval(() => {
    const body = {
      only_new_resp_cnt: false,
      vac_in_last_n_days: 1,
      watched_responses: [],
      only_new_vac_cnt: true,
    };
    const resp = network.doPost(notificationsPageURL, body);
    resp.then((response) => {
      response.json().then((parsedJson) => {
        let empty = !(parsedJson.recommended_vac || parsedJson.recommended_vac_cnt || parsedJson.unread_messages || parsedJson.unread_resp || parsedJson.unread_resp_cnt);
        const newRecs = parsedJson.recommended_vac_cnt;
        if (newRecs !== recNum) {
          createNotifVacancy(newRecs);
          recNum = newRecs;
          empty = false;
        }
        if ( parsedJson.unread_resp && parsedJson.unread_resp.length !== unresponed) {
          createNotifResponses(parsedJson.unread_resp);
          unresponed = parsedJson.unread_resp.length;
          empty = false;
        }
        if (empty) {
          emptyNotif("У вас нет новых уведомлений");
        }
      });
    });
  }, TIMEOUT);
};

export const stopPolling = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

export const initPolling = () => {
  if (localStorage.getItem("user_type") !== "") {
    startPolling();
  } else {
    stopPolling();
  }
};

export const createPolling = () => {
  const top = document.getElementById("app");
  top.insertAdjacentHTML(
    "beforebegin",
    notificTemp({ user: localStorage.getItem("user_type") })
  );
}