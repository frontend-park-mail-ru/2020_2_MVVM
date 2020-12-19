import {network} from "Js/libs/networks";
import {getNewMesAndList} from "Js/libs/constants";
import chatsListTemp from "Js/pages/chats/components/chats/chatList.tmpl.xml";
import singleBodyTemp from "Js/pages/chats/components/chats/singleBody.tmpl.xml"
import {changeAvatar, changeDate, checkoutChatPages} from "Js/components/chats/chatsFunc";
import {createSingleDialogue, scrollDown} from "Js/pages/chats/chats";


export default class MessagePolling {
  constructor() {
    this.intervalId = null;
    this.TIMEOUT = 3000;
    this.chat_id = null;
    this.chatClass = null;
    this.user_type = null;
  }

  setChatId (chat_id) {
    this.chat_id = chat_id;
  }

  setChatClass (chatClass) {
    this.chatClass = chatClass;
  }

  getChatId (chat_id) {
    return this.chat_id;
  }

  initMessPolling (path) {
    if (path === "/chats") {
      if (!this.user_type) {
        this.user_type = localStorage.getItem('user_type');
      }
      this.startMessPolling();
    } else {
      this.stopMessPolling();
    }
  };

  stopMessPolling() {
    if (this.intervalId) {
      this.chat_id = null;
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  };

  startMessPolling ()  {

    if (this.intervalId) {
      return;
    }

    if (this.chat_id) {
      this.intervalId = setInterval(() => {

        const response = network.doGet(getNewMesAndList+this.chat_id);
        response.then( async (response) => {
          const responseJSON = await response.json();
          let chatsList = changeDate(responseJSON.chats);
          const chatsListBlock = document.getElementById('toInputChatList');
          chatsListBlock.innerHTML = chatsListTemp({chatList:chatsList, user_type:localStorage.getItem('user_type'), selected:this.chat_id});
          changeAvatar(this.user_type, chatsList);
          checkoutChatPages(this.chatClass, this.chatClass.is_mobile, false);

          if (responseJSON.dialog) {
            const dialogueBody = document.getElementById('dialogueBody');
            const newMess = createSingleDialogue(responseJSON.dialog);
            const friendInfo = chatsList.find(item => item.chat_id === responseJSON.dialog);
            dialogueBody.insertAdjacentHTML('beforeend', singleBodyTemp({is_mobile:this.chatClass.is_mobile, chat:newMess, friendInfo: friendInfo, user_type:localStorage.getItem('user_type')}));
            scrollDown();
          }

        })
      }, this.TIMEOUT);
    }
  };
}