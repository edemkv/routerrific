var express = require('express');
var app = express();
var routerrific = require('./index.js');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.delete('/api', function (req, res) {
  res.send('Hello World!');
});

app.post('/api2', function (req, res) {
  res.send('Hello World!');
});

app.put('/api3', function (req, res) {
  res.send('Hello World!');
});


routerrific.init({
  filename:"test.md",
  title:"Routerrific API"
});

routerrific.docmd(app);
