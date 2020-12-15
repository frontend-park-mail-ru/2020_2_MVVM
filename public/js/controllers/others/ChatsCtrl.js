
import Chats from "Js/pages/chats/chats";

export default class ChatsCtrl {
  constructor(router) {
    this.router = router;
    this.page = new Chats();
  }
}