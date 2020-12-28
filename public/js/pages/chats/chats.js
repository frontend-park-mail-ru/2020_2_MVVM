import chatsTemp from "./components/chats/chatsCarcass.tmpl.xml";
import singleChatTemp from "./components/chats/singleChat.tmpl.xml";
import myMessageTemp from "./components/chats/myMessage.tmpl.xml";

const app = window.document.getElementById("main");
import { MessagePolling } from "Js/libs/router";

import defaultVac from "Img/defaultVac.png";
import defaultRes from "Img/defaultRes.png";
import { convertDate } from "Js/libs/convertDate";
import {getNewMesAndList, responsesStatus} from "Js/libs/constants";
import {
  changeAvatar,
  changeDate,
  checkoutChatPages,
} from "Js/components/chats/chatsFunc";
import {network} from "Js/libs/networks";
import chatsListTemp from "Js/pages/chats/components/chats/chatList.tmpl.xml";
import singleBodyTemp from "Js/pages/chats/components/chats/singleBody.tmpl.xml";

export default class Chats {
  constructor(router, getChatListF, singleChatPageF, sendMessageF) {
    this.router = router;
    this.getChatList = getChatListF;
    this.singleChatPage = singleChatPageF;
    this.sendMessage = sendMessageF;
  }

  async render() {
    this.is_mobile = document.body.className === "is-mobile";

    app.innerHTML = "";
    app.classList.add("fix-height");
    this.user_type = localStorage.getItem("user_type");
    this.chatListData = await this.getChatList();
    this.chatListData.sort((a, b) =>
      a.message.date_create < b.message.date_create ? 1 : -1
    );

    this.chatListData = changeDate(this.chatListData);

    app.insertAdjacentHTML(
      "afterbegin",
      chatsTemp({ chatList: this.chatListData, user_type: this.user_type })
    );

    const list = document.getElementsByClassName("chat-lists-single");

    this.chatListData = changeAvatar(this.user_type, this.chatListData);
    checkoutChatPages(this, this.is_mobile, true, list);

    MessagePolling.setChatClass(this);
  }
}

const sendMessageEvent = (chatClass, chat_id, is_mobile) => {
  const sendMessage = document.getElementById("sendMessage");
  const dialogueBody = document.getElementById("dialogueBody");
  sendMessage.focus();

  sendMessInput(chatClass, sendMessage, dialogueBody, chat_id, is_mobile);
  sendMessBtn(chatClass, sendMessage, dialogueBody, chat_id, is_mobile);
};

const sendMessInput = (chatClass, sendMessage, dialogueBody, chat_id, is_mobile) => {
  sendMessage.addEventListener("keydown", (event) => {
    sendMessage.removeEventListener("keydown", () => {});
    if (event.keyCode === 13) {
      if (!event.shiftKey) {
        sendMess(chatClass, sendMessage, dialogueBody, chat_id, is_mobile);
      } else {
        sendMessage.addEventListener("keydown", () => {
          if (event.shiftKey) {
            const inputField = document.getElementsByClassName(
              "input-field"
            )[0];
            setTimeout(() => {
              inputField.style.height = "auto";
              sendMessage.style.cssText =
                "height:" + 0.1 * sendMessage.scrollHeight + "rem";
            }, 1);
          }
        });
      }
    }
  });
};

const sendMessBtn = (chatClass, sendMessage, dialogueBody, chat_id, is_mobile) => {
  const sendMessageBtn = document.getElementById("sendMessageBtn");
  sendMessageBtn.addEventListener("click", (event) => {
    sendMessageBtn.removeEventListener("keydown", () => {});
    sendMess(chatClass, sendMessage, dialogueBody, chat_id, is_mobile);
  });
};

const sendMess = async (chatClass, sendMessage, dialogueBody, chat_id, is_mobile) => {
  const mesBody = sendMessage.value;
  sendMessage.value = "";
  if (mesBody.replace(/\s+/g, "") !== "") {
    const date = new Date();
    const mesTime = `${date.getHours()}.${date.getMinutes()}`;
    dialogueBody.insertAdjacentHTML(
      "beforeend",
      myMessageTemp({ body: mesBody, time: mesTime })
    );
    await chatClass.sendMessage(chat_id, mesBody);
    updateList(chat_id, is_mobile, chatClass);
    scrollDown();
    sendMessage.focus();
  }
};

const updateList = (chat_id, is_mobile, chatClass) => {
  const response =  network.doGet(getNewMesAndList+chat_id);
  response.then( async (response) => {
    const responseJSON = await response.json();
    let chatsList = responseJSON.chats.sort((a, b) => a.message.date_create < b.message.date_create ? 1 : -1);
    chatClass.chatListData = chatsList;
    chatsList = changeDate(chatsList);
    const chatsListBlock = document.getElementById('toInputChatList');
    chatsListBlock.innerHTML = chatsListTemp({chatList:chatsList, user_type:localStorage.getItem('user_type'), selected:chat_id, is_mobile:is_mobile});

    const list = document.getElementsByClassName('chat-lists-single');

    changeAvatar(localStorage.getItem('user_type'), chatsList);
    chatsList = checkoutChatPages(chatClass, is_mobile, false, list);

    const friendInfo = chatsList.find(item => item.chat_id === responseJSON.dialog);

    if (responseJSON.dialog) {
      const dialogueBody = document.getElementById('dialogueBody');
      const newMess = createSingleDialogue(responseJSON.dialog);

      if (dialogueBody) {
        dialogueBody.insertAdjacentHTML('beforeend', singleBodyTemp({is_mobile:is_mobile, chat:newMess, friendInfo: friendInfo, user_type:localStorage.getItem('user_type')}));
      } else {
        const singleChat = document.getElementById('singleChat');
        singleChat.insertAdjacentHTML('afterbegin', singleChatTemp({is_mobile:is_mobile, chat: newMess, friendInfo: friendInfo, user_type: localStorage.getItem('user_type')}))
      }
    }
  })
}

const oneMess = (mess) => {
  if (mess) {
    return {
      company_id: mess.hasOwnProperty("company_id") ? mess.company_id : null,
      company_name: mess.hasOwnProperty("company_name")
        ? mess.company_name
        : null,
      date_create: mess.hasOwnProperty("date_create")
        ? convertDate(mess.date_create)
        : null,
      response_id: mess.hasOwnProperty("response_id") ? mess.response_id : null,
      response_initial: mess.hasOwnProperty("response_initial")
        ? mess.response_initial
        : null,
      response_status: mess.hasOwnProperty("response_status")
        ? responsesStatus[mess.response_status]
        : null,
      resume_id: mess.hasOwnProperty("resume_id") ? mess.resume_id : null,
      resume_title: mess.hasOwnProperty("resume_title")
        ? mess.resume_title
        : null,
      vacancy_id: mess.hasOwnProperty("vacancy_id") ? mess.vacancy_id : null,
      vacancy_title: mess.hasOwnProperty("vacancy_title")
        ? mess.vacancy_title
        : null,
      is_read: mess.hasOwnProperty("is_read") ? mess.is_read : null,
      message: mess.hasOwnProperty("message") ? mess.message : null,
      sender: mess.hasOwnProperty("sender") ? mess.sender : null,
    };
  }
};

export const createSingleDialogue = (chatData) => {
  if (!chatData) {
    return null;
  }
  const dialogue = chatData.dialog;
  const technical = chatData.technical_messages;
  let dCounter = 0;
  let tCounter = 0;
  let chat = [];
  while (
    (dialogue && dCounter < dialogue.length) ||
    (technical && tCounter < technical.length)
  ) {
    if (
      dialogue &&
      dCounter < dialogue.length &&
      technical &&
      tCounter < technical.length
    ) {
      if (dialogue[dCounter].date_create < technical[tCounter].date_create) {
        chat.push(oneMess(dialogue[dCounter]));
        dCounter++;
      } else {
        chat.push(oneMess(technical[tCounter]));
        tCounter++;
      }
    } else if (dialogue && dCounter < dialogue.length) {
      chat.push(oneMess(dialogue[dCounter]));
      dCounter++;
    } else if (technical && tCounter < technical.length) {
      chat.push(oneMess(technical[tCounter]));
      tCounter++;
    } else {
      break;
    }
  }
  return chat;
};

export const chatsListDesktop = (
  chatClass,
  list,
  defaultChat,
  singleChat,
  need_checkout
) => {
  if (list) {
    [].forEach.call(list, (elem, i) => {
      elem.addEventListener("click", async () => {
        elem.removeEventListener("click", () => {});
        MessagePolling.setChatId(chatClass.chatListData[i].chat_id);
        MessagePolling.startMessPolling();
        const chatData = await chatClass.singleChatPage(
          chatClass.chatListData[i].chat_id
        );
        const chat = createSingleDialogue(chatData);
        checkoutColors(elem);

        defaultChat.classList.add("hide");
        singleChat.classList.remove("hide");
        singleChat.innerHTML = singleChatTemp({
          is_mobile: false,
          chat: chat,
          friendInfo: chatClass.chatListData[i],
          user_type: chatClass.user_type,
        });
        scrollDown();
        sendMessageEvent(chatClass, chatClass.chatListData[i].chat_id, false);
      });
    });
  }
};

const checkoutColors = (elem) => {
  const tmp = document.getElementsByClassName("selected-chat")[0];
  if (tmp) {
    tmp.classList.remove("selected-chat");
  }
  elem.classList.add("selected-chat");
};

export const chatsListPhone = (chatClass, list, singleChat, chatsList) => {
  if (list) {
    [].forEach.call(list, (elem, i) => {
      elem.addEventListener("click", async () => {
        elem.removeEventListener("click", () => {});
        MessagePolling.setChatId(chatClass.chatListData[i].chat_id);
        MessagePolling.startMessPolling();
        const chatData = await chatClass.singleChatPage(
          chatClass.chatListData[i].chat_id
        );
        const chat = createSingleDialogue(chatData);
        changeWindow(chatsList, singleChat);
        singleChat.innerHTML = singleChatTemp({
          is_mobile: true,
          chat: chat,
          friendInfo: chatClass.chatListData[i],
          user_type: chatClass.user_type,
        });

        const friendPhoto = document.getElementById("friendPhoto");
        const inputPhoto =
          chatClass.user_type === "candidate" ? defaultVac : defaultRes;
        const photo = chatClass.chatListData[i].avatar
          ? chatClass.chatListData[i].avatar
          : inputPhoto;

        friendPhoto.style.background = `no-repeat  0 0/cover url(${photo})`;

        scrollDown();
        sendMessageEvent(chatClass, chatClass.chatListData[i].chat_id, true);

        const backToChats = document.getElementById("backToChats");
        backToChats.addEventListener("click", () => {
          changeWindow(chatsList, singleChat);
        });
      });
    });
  }
};

const changeWindow = (chatsList, singleChat) => {
  chatsList.classList.toggle("max-width");
  chatsList.classList.toggle("hide");
  singleChat.classList.toggle("hide");
  singleChat.classList.toggle("max-width");
};

export const scrollDown = () => {
  const dialogueBody = document.getElementById("dialogueBody");
  dialogueBody.scrollTop = dialogueBody.scrollHeight;
};
