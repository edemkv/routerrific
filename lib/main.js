var fs = require('fs');
var util = require('util');

var docmd = require('./docmd.js');
var listmd = require('./listmd.js');

var filename;
var title;
var lineBreakEnabled;
var type;


var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

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

var setOptions = function(config) {
    filename = config.filename || 'routerrific.md';
    lineBreakEnabled = config.lineBreakEnabled || true;
    title = config.title;
    type = docmd || config.type;
};

var init = function() {

  if(title){
    writeTofile(util.format(TITLE_HEADER, title));
    writeTofile(LINE_BREAK);
  }

  var content = app._router.stack;

  if(){

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
    setOptions: setOptions,
    init: init
};
