var express = require('express');
var app = express();
var routerrific = require('../index.js');

app.get('/', function Home(req, res) {
  res.send('Hello World!');
});

app.delete('/api/user', function deleteUser(req, res) {
  res.send('Hello World!');
});

app.post('/api/user', function createUser(req, res) {
  res.send('Hello World!');
});

app.put('/api/customer/:customer/:yes', function updateCustomer(req, res) {
  res.send('Hello World!');
});

routerrific.init({
  filename:"test/test.md",
  title:"Test Api"
});

routerrific.docmd(app);

routerrific.init({
  filename:"test/test2.md",
  title:"Test Api 2"
});
routerrific.listmd(app);

//https://github.com/sindresorhus/urls-md
