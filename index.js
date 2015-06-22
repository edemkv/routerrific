var fs = require('fs');
var util = require('util');

var filename;
var title;
var lineBreakEnabled;


const TITLE_HEADER = '#  %s \r\n ';
const ROUTE_HEADER = '###  %s [%s] \r\n';
const HEADER_BREAK = '------------------------\r\n';
const PATH_URL = 'Path : {url%s}\r\n';
const LINE_BREAK = '\r\n';

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

                var titleLine = content[i].name;
                var method = Object.keys(content[i].route.methods);
                var path = content[i].route.path;

                writeTofile(util.format(ROUTE_HEADER, titleLine, method));
                writeTofile(HEADER_BREAK);
                writeTofile(util.format(PATH_URL, path));
                if(lineBreakEnabled){writeTofile(LINE_BREAK);}
            }
        }
    }
}


function writeTofile(content) {
    fs.appendFile(filename, content, function(err) {
      if (err) throw err;
    });
}

function clearFile() {
    fs.truncate(filename, 0, function(err) {
        if (err) throw err;
    });
}

module.exports = {
    init: init,
    docmd: docmd
    // table: tablemd
};
