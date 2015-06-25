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
const ANONYMOUS = '<anonymous>';

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
                var method = Object.keys(content[i].route.methods).map(function(x) { return x.toUpperCase(); });

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
    fs.appendFileSync(filename, content);
}

function clearFile() {
    fs.truncateSync(filename, 0);
}

module.exports = {
    init: init,
    docmd: docmd
    // table: tablemd
};
