const PORT = 3000;

const path = require('path');
const express = require('express');

const app = express();

const root = path.resolve(__dirname, 'static');
const dist = path.resolve(__dirname, 'public');

app.use('/', express.static('public'));

// app.get('/favicon.ico', (req, res) => {
//     res.sendFile(root + '/img/favicon-play.ico');
// });

app.get("/sw.js", (req, res) => {
    res.sendFile(dist + '/js/sw.js');
});

app.get('*', (req, res) => {
    res.sendFile(dist + '/index.html');
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${process.env.PORT || PORT}`);
});