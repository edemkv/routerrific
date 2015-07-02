var express = require('express');
var app = express();
var routerrific = require('./index.js');

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
  filename:"test.md",
  title:"Routerrific API"
});

routerrific.docmd(app);


//https://github.com/sindresorhus/urls-md
