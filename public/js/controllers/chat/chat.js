import ChatPage from "../../pages/chat/chat.js";

export default class ChatCtrl{
    constructor(router) {
        this.router = router;
        this.page = new ChatPage(router);
        console.log("after  ");
        const send = document.querySelector('#send');
        const url = "ws://localhost:8080/v1/ws";
        const ws = new WebSocket(url);

        send.onclick = () => {
            const message = {
                username: "username",
                content: "value",
            }

            ws.send(JSON.stringify(message));
            // input.value = "";
        };
    }
}
