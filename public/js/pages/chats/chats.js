

import chatsTemp from "./components/chats/chatsCarcass.tmpl.xml";
import singleChatTemp from "./components/chats/singleChat.tmpl.xml"
import myMessageTemp from "./components/chats/myMessage.tmpl.xml"
const app = window.document.getElementById("main");
import {MessagePolling} from "Js/libs/router";

import defaultVac from "Img/defaultVac.png";
import defaultRes from "Img/defaultRes.png";
import {convertDate} from "Js/libs/convertDate";
import {responsesStatus} from "Js/libs/constants";
import {changeAvatar, changeDate, checkoutChatPages} from "Js/components/chats/chatsFunc";


export default class Chats {
  constructor(router, getChatListF,singleChatPageF, sendMessageF) {
    this.router = router;
    this.getChatList = getChatListF;
    this.singleChatPage = singleChatPageF;
    this.sendMessage = sendMessageF;
  }

  async render() {
    this.is_mobile = document.body.className === "is-mobile";

    app.innerHTML = '';
    app.classList.add('fix-height');
    this.user_type = localStorage.getItem('user_type');
    this.chatListData = await this.getChatList();

    this.chatListData = changeDate(this.chatListData);

    app.insertAdjacentHTML('afterbegin', chatsTemp({chatList: this.chatListData, user_type: this.user_type }));
    this.chatListData = changeAvatar(this.user_type, this.chatListData);
    checkoutChatPages(this, this.is_mobile, true);

    MessagePolling.setChatClass(this);
  }
}



const sendMessageEvent = (chatClass, chat_id) => {
  const sendMessage = document.getElementById('sendMessage');
  const dialogueBody = document.getElementById('dialogueBody');
  sendMessage.focus();

  sendMessInput(chatClass, sendMessage, dialogueBody, chat_id);
  sendMessBtn(chatClass, sendMessage, dialogueBody, chat_id);
}

const sendMessInput = (chatClass, sendMessage, dialogueBody,chat_id) => {
  sendMessage.addEventListener('keydown', (event) => {
    sendMessage.removeEventListener('keydown', ()=>{});
    if (event.keyCode === 13) {
      if (!event.shiftKey) {
        sendMess(chatClass, sendMessage, dialogueBody, chat_id);
      } else {
        sendMessage.addEventListener('keydown', () => {
          setTimeout(() => {
            sendMessage.style.cssText = 'height:auto; padding:0; border-radius:0;';
            sendMessage.style.cssText = 'height:' + 0.2*sendMessage.scrollHeight + 'rem';
          }, 1);
        });
      }
    }
  })
}

const sendMessBtn = (chatClass, sendMessage, dialogueBody,chat_id) => {
  const sendMessageBtn = document.getElementById('sendMessageBtn');
  sendMessageBtn.addEventListener('click', (event) => {
    sendMessageBtn.removeEventListener('keydown', ()=>{});
      sendMess(chatClass,sendMessage, dialogueBody, chat_id)
  })
}

const sendMess = async (chatClass, sendMessage, dialogueBody, chat_id) => {
  const mesBody = sendMessage.value;
  sendMessage.value = "";
  if (mesBody.replace(/\s+/g, '') !== '') {
    const date = new Date();
    const mesTime = `${date.getHours()}.${date.getMinutes()}`;
    dialogueBody.insertAdjacentHTML('beforeend', myMessageTemp({body:mesBody, time:mesTime}));
    await chatClass.sendMessage(chat_id, mesBody);
    scrollDown();
    sendMessage.focus();
  }
}

const oneMess = (mess) => {
  return {
    company_id: mess.hasOwnProperty('company_id') ? mess.company_id : null,
    company_name: mess.hasOwnProperty('company_name') ? mess.company_name : null,
    date_create: mess.hasOwnProperty('date_create') ? convertDate(mess.date_create) : null,
    response_id: mess.hasOwnProperty('response_id') ? mess.response_id : null,
    response_initial: mess.hasOwnProperty('response_initial') ? mess.response_initial : null,
    response_status: mess.hasOwnProperty('response_status') ? responsesStatus[mess.response_status] : null,
    resume_id: mess.hasOwnProperty('resume_id') ? mess.resume_id : null,
    resume_title: mess.hasOwnProperty('resume_title') ? mess.resume_title : null,
    vacancy_id: mess.hasOwnProperty('vacancy_id') ? mess.vacancy_id : null,
    vacancy_title: mess.hasOwnProperty('vacancy_title') ? mess.vacancy_title : null,
    is_read: mess.hasOwnProperty('is_read') ? mess.is_read : null,
    message: mess.hasOwnProperty('message') ? mess.message : null,
    sender: mess.hasOwnProperty('sender') ? mess.sender : null
  }
}

export const createSingleDialogue = (chatData) => {
  const dialogue = chatData.dialog;
  const technical = chatData.technical_messages;
  let dCounter = 0;
  let tCounter = 0;
  let chat = [];
  while ((dialogue && (dCounter < dialogue.length)) || (technical && (tCounter < technical.length))) {
    if ((dialogue && (dCounter < dialogue.length)) && (technical && (tCounter < technical.length))) {
      if (dialogue[dCounter].date_create < technical[tCounter].date_create) {
        chat.push(oneMess(dialogue[dCounter]));
        dCounter++;
      } else {
        chat.push(oneMess(technical[tCounter]));
        tCounter++;
      }
    } else if (dialogue) {
      chat.push(oneMess(dialogue[dCounter]));
      dCounter++;
    } else if (technical) {
      chat.push(oneMess(technical[tCounter]));
      tCounter++;
    }
  }
  return chat;
}

export const chatsListDesktop = (chatClass, list, defaultChat, singleChat, need_checkout) => {
  if (list) {
    [].forEach.call(list, (elem, i) => {
      elem.addEventListener('click', async () => {
        elem.removeEventListener('click', ()=>{});
        MessagePolling.setChatId(chatClass.chatListData[i].chat_id);
        MessagePolling.startMessPolling();
        const chatData = await chatClass.singleChatPage(chatClass.chatListData[i].chat_id);
        const chat = createSingleDialogue(chatData);
        checkoutColors(elem);

        defaultChat.classList.add('hide');
        singleChat.classList.remove('hide');
        singleChat.innerHTML = singleChatTemp({is_mobile:false, chat: chat, friendInfo:chatClass.chatListData[i], user_type: chatClass.user_type});
        scrollDown();
        sendMessageEvent(chatClass, chatClass.chatListData[i].chat_id);
      })
    })
  }
}


const checkoutColors = (elem) => {
  const tmp = document.getElementsByClassName('selected-chat')[0];
  if (tmp) {
    tmp.classList.remove('selected-chat');
  }
  elem.classList.add('selected-chat');
}

export const chatsListPhone = (chatClass, list, singleChat, chatsList) => {
  if (list) {
    [].forEach.call(list, (elem, i) => {
      elem.addEventListener('click', async () => {
        elem.removeEventListener('click', ()=>{});
        MessagePolling.setChatId(chatClass.chatListData[i].chat_id);
        MessagePolling.startMessPolling();
        const chatData = await chatClass.singleChatPage(chatClass.chatListData[i].chat_id);
        const chat = createSingleDialogue(chatData);
        changeWindow(chatsList, singleChat);
        singleChat.innerHTML = singleChatTemp({is_mobile:true, chat: chat, friendInfo:chatClass.chatListData[i], user_type: chatClass.user_type});

        const friendPhoto = document.getElementById('friendPhoto');
        const inputPhoto = chatClass.user_type === 'candidate' ? defaultVac : defaultRes;
        const photo = chatClass.chatListData[i].avatar ? chatClass.chatListData[i].avatar : inputPhoto;
        friendPhoto.style.background = `no-repeat  0 0/cover url(${photo})`;

        insertPhotoScrollDown();
        sendMessageEvent(chatClass, chatClass.chatListData[i].chat_id);

        const backToChats = document.getElementById('backToChats');
        backToChats.addEventListener('click', () => {
          changeWindow(chatsList, singleChat);
        })
      })
    });
  }
}

const changeWindow = (chatsList, singleChat) => {
  chatsList.classList.toggle('max-width');
  chatsList.classList.toggle('hide');
  singleChat.classList.toggle('hide');
  singleChat.classList.toggle('max-width');
}

const insertPhotoScrollDown = () => {
  const friendPhoto = document.getElementById('friendPhoto');
  if (localStorage.getItem('user_type') === 'candidate') {
    friendPhoto.style.background = `no-repeat 0 0/cover url(${defaultVac})`;
  } else {
    friendPhoto.style.background = `no-repeat 0 0/cover url(${defaultRes})`;
  }

  scrollDown();
}

export const scrollDown = () => {
  const dialogueBody = document.getElementById('dialogueBody');
  dialogueBody.scrollTop = dialogueBody.scrollHeight;
}