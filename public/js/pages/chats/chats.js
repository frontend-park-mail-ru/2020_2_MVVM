

import chatsTemp from "./components/chats/chats.tmpl.xml";
import singleChatTemp from "./components/chats/singleChat.tmpl.xml"
import myMessageTemp from "./components/chats/myMessage.tmpl.xml"


const app = window.document.getElementById("main");

import defaultVac from "Img/defaultVac.png";
import defaultRes from "Img/defaultRes.png";
import {convertDate} from "Js/libs/convertDate";


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

    if (this.chatListData) {
      this.chatListData.forEach( (item, i) => {
        item.date_create = convertDate(item.date_create);
      })
    }


    app.insertAdjacentHTML('afterbegin', chatsTemp({chatList: this.chatListData, user_type: this.user_type }));

    const chatAvatars = document.getElementsByClassName('chat-lists-single__photo');

    const friendDefPhoto = this.user_type === 'candidate' ? defaultVac : defaultRes;

    if (this.chatListData) {
      this.chatListData.forEach((item, i) => {
        const photo = item.avatar ? item.avatar : friendDefPhoto;
        chatAvatars[i].style.background = `no-repeat  0 0/cover url(${photo})`;
      });

    }


    const chatsList = document.getElementById('chatsList');
    const defaultChat = document.getElementById('defaultChat');
    const singleChat = document.getElementById('singleChat');

    const list = document.getElementsByClassName('chat-lists-single');

    if (this.is_mobile) {
      defaultChat.classList.add('hide');
      chatsList.classList.add('max-width');
      singleChat.classList.add('hide');
      chatsListPhone(this, list, singleChat, chatsList);
    } else {
      singleChat.classList.add('hide');
      chatsListDesktop(this, list, defaultChat, singleChat);
    }
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
    if (event.code === 'Enter') {
      sendMess(chatClass, sendMessage, dialogueBody, chat_id)
    }
  })
}

const sendMessBtn = (chatClass, sendMessage, dialogueBody,chat_id) => {
  const sendMessageBtn = document.getElementById('sendMessageBtn');
  sendMessageBtn.addEventListener('click', (event) => {
      sendMess(chatClass,sendMessage, dialogueBody, chat_id)
  })
}

const sendMess = async (chatClass, sendMessage, dialogueBody, chat_id) => {
  const mesBody = sendMessage.value;
  if (mesBody) {
    const date = new Date();
    const mesTime = `${date.getHours()}.${date.getMinutes()}`;
    dialogueBody.insertAdjacentHTML('beforeend', myMessageTemp({body:mesBody, time:mesTime}));
    sendMessage.value = '';

    const res = await chatClass.sendMessage(chat_id, mesBody);
    console.log(res);

    scrollDown();
    sendMessage.focus();
  }
}



const chatsListDesktop = (chatClass, list, defaultChat, singleChat) => {
  if (list) {
    [].forEach.call(list, (elem, i) => {
      elem.addEventListener('click', async () => {
        const chatData = await chatClass.singleChatPage(chatClass.chatListData[i].chat_id);
        chatData.forEach((item) => {
          item.date_create = convertDate(item.date_create);
        });
        checkoutColors(elem);
        defaultChat.classList.add('hide');
        singleChat.classList.remove('hide');
        singleChat.innerHTML = singleChatTemp({is_mobile:false, chat: chatData, friendInfo:chatClass.chatListData[i], user_type: chatClass.user_type});
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

const chatsListPhone = (chatClass, list, singleChat, chatsList) => {
  if (list) {
    [].forEach.call(list, (elem, i) => {
      elem.addEventListener('click', async () => {
        const chatData = await chatClass.singleChatPage(chatClass.chatListData[i].chat_id);
        chatData.forEach((item) => {
          item.date_create = convertDate(item.date_create);
        })

        changeWindow(chatsList, singleChat);
        singleChat.innerHTML = singleChatTemp({is_mobile:true, chat: chatData, friendInfo:chatClass.chatListData[i], user_type: chatClass.user_type});

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

const scrollDown = () => {
  const dialogueBody = document.getElementById('dialogueBody');
  dialogueBody.scrollTop = dialogueBody.scrollHeight;
}