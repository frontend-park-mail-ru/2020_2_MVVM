
import Chats from "Js/pages/chats/chats";
import {network} from "Js/libs/networks";
import {chatsListURL, getChat, messageSendURL} from "Js/libs/constants";

export default class ChatsCtrl {
  constructor(router) {
    this.router = router;

    const getChatList = async () => {
      try {
        const response = await network.doGet(chatsListURL);
        console.assert(response.ok);
        return await response.json();
      }catch (err) {
        console.assert(err);
      }
    }

    const singleChatPage = async (chat_id) => {
      try {
        const response = await network.doGet(getChat+chat_id);
        console.assert(response.ok);
        return await response.json();
      }catch (err) {
        console.assert(err);
      }
    }

    const sendMessage = async (chat_id, message) => {
      try {
        const response = await network.doPost(messageSendURL, {
          chat_id: chat_id,
          message: message,
        });
        console.assert(response.ok);
        return await response.json();
      }catch (err) {
        console.assert(err);
      }
    }

    this.page = new Chats(router, getChatList, singleChatPage, sendMessage);
  }
}