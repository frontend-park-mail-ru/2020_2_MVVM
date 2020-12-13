

import chatsTemp from "./components/chats/chats.tmpl.xml";
import singleChatTemp from "./components/chats/singleChat.tmpl.xml"

const app = window.document.getElementById("main");

import defaultVac from "Img/defaultVac.png";
import defaultRes from "Img/defaultRes.png";


export default class Chats {
  constructor(router) {
    this.router = router;
  }

  async render() {
    this.is_mobile = document.body.className === "is-mobile";

    app.innerHTML = '';
    app.classList.add('fix-height');
    app.insertAdjacentHTML('afterbegin', chatsTemp());

    const chatsList = document.getElementById('chatsList');
    const defaultChat = document.getElementById('defaultChat');
    const singleChat = document.getElementById('singleChat');

    const list = document.getElementsByClassName('chat-lists-single');

    if (this.is_mobile) {
      defaultChat.classList.add('hide');
      chatsList.classList.add('max-width');
      singleChat.classList.add('hide');
      chatsListPhone(list, singleChat, chatsList);
    } else {
      singleChat.classList.add('hide');
      chatsListDesktop(list, defaultChat, singleChat);
    }
  }
}


const chatsListDesktop = (list, defaultChat, singleChat) => {
  if (list) {
    [].forEach.call(list, (elem) => {
      elem.addEventListener('click', () => {
        checkoutColors(elem);
        defaultChat.classList.add('hide');
        singleChat.classList.remove('hide');
        singleChat.innerHTML = singleChatTemp({is_mobile:false});
        scrollDown();
      })
    })
  }
}


const checkoutColors = (elem) => {
  const tmp = document.getElementsByClassName('selected-chat')[0];
  if (tmp) {
    tmp.classList.remove('selected-chat');
  }
  console.log(elem);
  elem.classList.add('selected-chat');
}

const chatsListPhone = (list, singleChat, chatsList) => {
  if (list) {
    [].forEach.call(list, (elem) => {
      elem.addEventListener('click', () => {
        changeWindow(chatsList, singleChat);
        singleChat.innerHTML = singleChatTemp({is_mobile:true});
        insertPhotoScrollDown();

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