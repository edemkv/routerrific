var fs = require('fs');
var util = require('util');

var filename;
var title;
var lineBreakEnabled;

//GLOBAL HEADER
const TITLE_HEADER = '#  `%s` \r\n ';
const ROUTE_HEADER = '###  %s [%s] \r\n';
const HEADER_BREAK = '------------------------\r\n';

//DOCMD CONSTANTS
const PATH_URL = '**Path :** {url}%s \r\n';
const LINE_BREAK = '\r\n';
const ANONYMOUS = '<anonymous>';
const PATH_VARIABLE_CONSTANT = '**Path Variables** \r\n';
const PATH_VARIABLES = '* %s (%s) \r\n';

//LIST CONSTANTS
const LIST_FORMAT = '* %s  `%s` %s\r\n ';

var init = function(config) {
    filename = config.filename || 'routerrific.md';
    lineBreakEnabled = config.lineBreakEnabled || true;
    title = config.title;
};

var docmd = function(app) {
    clearFile();
    if(title){
      writeTofile(util.format(TITLE_HEADER, title));
      writeTofile(LINE_BREAK);
    }

    var content = app._router.stack;

    if (content) {

        for (i = 0; i < content.length; i++) {
            if (content[i].route) {
                var routeName = content[i].route.stack[0].name;

                var titleLine = routeName===ANONYMOUS ? 'Unknown' : routeName;
                // insert a space before all caps  // uppercase the first character
                titleLine = titleLine.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })

                var method = Object.keys(content[i].route.methods).map(function(x) { return x.toUpperCase(); });

                writeTofile(util.format(ROUTE_HEADER, titleLine, method));
                writeTofile(HEADER_BREAK);

                writeTofile(util.format(PATH_URL, content[i].route.path), true);

                if(content[i].keys){
                  var keys = content[i].keys;
                  if(keys.length > 0){ writeTofile(PATH_VARIABLE_CONSTANT, true)};
                  for (j = 0; j < keys.length; j++) {
                      var optional = keys[j].optional===true ? 'Optional' : 'Not Optional';
                      writeTofile(util.format(PATH_VARIABLES, keys[j].name, optional), true);
                  }
                }

                  writeTofile(LINE_BREAK);
            }
        }
    }
}


var listmd = function(app) {
    clearFile();
    if(title){
      writeTofile(util.format(TITLE_HEADER, title));
      writeTofile(LINE_BREAK);
    }

    var content = app._router.stack;

    if (content) {
      for (i = 0; i < content.length; i++) {
          if (content[i].route) {
              var routeName = content[i].route.stack[0].name;

              var titleLine = routeName===ANONYMOUS ? 'Unknown' : routeName;
              // insert a space before all caps  // uppercase the first character
              titleLine = titleLine.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })

              var method = Object.keys(content[i].route.methods).map(function(x) { return x.toUpperCase(); });

              writeTofile(util.format(LIST_FORMAT, method, content[i].route.path, titleLine), true);
            }
          }

    }
}


 function replaceInfile(filename){
    fs.readFile(filename, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var result = data.replace('', 'replacement');

      fs.writeFile(filename, result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
}


function writeTofile(content, lineBreak) {
    fs.appendFileSync(filename, content);
    if(lineBreakEnabled && lineBreak) {
      fs.appendFileSync(filename,LINE_BREAK);
    }
}

function clearFile() {
    fs.truncateSync(filename, 0);
}

module.exports = {
    init: init,
    docmd: docmd,
    listmd:listmd
};
