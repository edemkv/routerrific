var express = require('express');
var app = express();
var routerrific = require('./index.js');

app.get('/', function Home(req, res) {
  res.send('Hello World!');
});

app.delete('/api', function(req, res) {
  res.send('Hello World!');
});

app.post('/api2', function api2(req, res) {
  res.send('Hello World!');
});

app.put('/api3', function api3(req, res) {
  res.send('Hello World!');
});


routerrific.init({
  filename:"test.md",
  title:"Routerrific API"
});

routerrific.docmd(app);


//https://github.com/sindresorhus/urls-md
