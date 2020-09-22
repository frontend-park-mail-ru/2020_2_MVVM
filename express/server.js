'use strict';

/*
const fs = require('fs');
const http = require('http');
const express = http.createServer((req, res) => {
  console.log('requested', req.url);
  let path = '../public';
  switch (req.url) {
    case '/' || '/StudHunt':
      path += '/main_page.html';
      break;
    case '/employers':
      path += '/employers_list.html';
      break;
    case '/applicants':
      path += '/candidates_list.html';
      break;
    case '/create_resume':
      path += '/candidates.html';
      break;
    default:
      path += req.url;
  }
  fs.readFile(path, (err, file) => {
    if (err) {
      console.log('file read error', path, err);
      res.write('error in template.html');
      res.end();
      return;
    }
    res.write(file);
    res.end();
  });
});
*/
/*
const fs = require('fs');
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
    res

});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.get('/index', (req, res) => {
    res.sendFile(root + '/');
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../public/main_page.html')));

module.exports = app;
module.exports.handler = serverless(app);
*/

const fs = require('fs');
const express = require('express');
const path = require('path');
const http = require('http')
const app = express();

const server = http.createServer((req, res) => {
    console.log('requested', req.url);
    let pat = path.join(__dirname, '../public')
    switch (req.url) {
        case '/' || '/StudHunt':
            pat += '/main_page.html';
            break;
        case '/employers':
            pat += '/employers_list.html';
            break;
        case '/applicants':
            pat += '/candidates_list.html';
            break;
        case '/create_resume':
            pat += '/candidates.html';
            break;
        default:
            pat += req.url;
    }
    fs.readFile(pat, (err, file) => {
        if (err) {
            console.log('file read error', path, err);
            res.write('error in template.html');
            res.end();
            return;
        }
        res.write(file);
        res.end();
    });
});

module.exports = server;

