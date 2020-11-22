import {NavBarInit} from "Js/components/header/navBar";

const app = window.document.getElementById('app');

export default class Chat {
    constructor(router) {
        this.router = router
    }

    async render(content) {
        app.innerHTML =
          `  <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
                            <title>Websockets Chat</title>
                            <link rel="stylesheet" href="styles.css">
                                <script type="text/javascript" src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
        </head>
        <body>
        <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-sm-12">
                    <h1 class="text-center">Socket IO Chat</h1>
                    <br>
                        <div id="status"></div>
                        <div id="chat">
                            <input type="text" name="username" id="username" class="form-control" placeholder="Enter name...">
                                <br>
                                    <div class="card">
                                        <div id="messages" class="card-block"></div>
                                    </div>
                                    <br>
                                        <textarea id="textarea" name="inputMessage" class="form-control" placeholder="Enter message..."></textarea>
                                        <br>
                                            <button id="send" class="btn">Send</button>
                        </div>
                </div>
            </div>
        </div>
        <script type="text/javascript" src="main.js"></script>
        </body>
        </html>`;

        // const chat = new NavBarInit(app, content, false, "Чат");
        // chat.loadNavBar();
    }
}