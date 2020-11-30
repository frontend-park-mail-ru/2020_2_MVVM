const PORT = 8080;

const path = require('path');
const express = require('express');

const app = express();

const root = path.resolve(__dirname, 'public');
const dist = path.resolve(__dirname, 'dist');

app.use('/public', express.static('public'));
app.use('/src', express.static('dist/src'));
app.use('/dist', express.static('dist'));

// app.get('/favicon.ico', (req, res) => {
//     res.sendFile(root + '/img/favicon-play.ico');
// });

app.get('*', (req, res) => {
    res.sendFile(dist + '/index.html');
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${process.env.PORT || PORT}`);
});