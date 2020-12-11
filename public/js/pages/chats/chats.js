

import chatsTemp from "./components/chats/chats.tmpl.xml";

const app = window.document.getElementById("main");


export default class Chats {
  constructor(router) {
    this.router = router;
  }

  async render() {
    app.innerHTML = '';
    main.classList.add('fix-height');
    app.insertAdjacentHTML('afterbegin', chatsTemp());
  }
}