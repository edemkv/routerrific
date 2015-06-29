# Routerrific
===============

[![Build Status](https://travis-ci.org/edemkv/routerrific.svg)](https://travis-ci.org/edemkv/routerrific)

[![Dependecies](https://david-dm.org/edemkv/routerrific.svg)](https://david-dm.org/edemkv/routerrific)


A minimal node module for express to document all routes.


## Installation

```shell
  npm install routerrific --save
```

## Usage

```js
  //create a router
	app.put('/api/user', function api3(req, res) {
	  res.send('Hello World!');
	});

  //set configuration
	routerrific.init({
	  filename:"test.md",
	  title:"Routerrific API"
	});

  //pass your defined app
	routerrific.docmd(app);
```

## Tests

```shell
   node test.js
```

## Release History

* 1.0.0 Initial release
