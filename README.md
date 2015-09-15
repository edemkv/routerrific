# Routerrific

[![Build Status](https://travis-ci.org/edemkv/routerrific.svg)](https://travis-ci.org/edemkv/routerrific)

[![Dependecies](https://david-dm.org/edemkv/routerrific.svg)](https://david-dm.org/edemkv/routerrific)


A minimal node module for express to document all routes.


## Installation

```shell
  npm install https://github.com/edemkv/routerrific --save
```

## Usage


### Document Mode

```js
  //create a route
	app.put('/api/user', function updateUser(req, res) {
	  ........
	});

  //set configuration
	routerrific.init({
	  filename:"test.md",
	  title:"Routerrific API"
	});

  //pass your defined app
	routerrific.docmd(app);
```

### List Mode

```js
  //create a route
	app.get('/api/', function getUser(req, res) {
	  ..........
	});

  //set configuration
	routerrific.init({
	  filename:"test.md",
	  title:"Routerrific API"
	});

  //pass your defined app
	routerrific.listmd(app);
```


## Tests

```shell
   npm test
```

## Bugs/Requests

__Bugs and requests__: submit them through the project's issues tracker.<br>
[![Issues](http://img.shields.io/github/issues/USER/REPO.svg)]( https://github.com/edemkv/routerrific/issues )

## Release History

* 1.0.0 Initial release
