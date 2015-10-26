var fs = require('fs');
var util = require('util');
var docmd = require('./docmd.js');
var listmd = require('./listmd.js');
var md = require('./markdown.js');
var readJson = require('read-package-json');

var init = function(opts, app) {

  var options = {
    filename: config.filename || 'routerrific.md';
    lineBreakEnabled: config.lineBreakEnabled || true;
    type: docmd || config.type;
  }

  try {
    var pkg = require(options.pkgPath)
  } catch (e) {
    return console.error("Invalid JSON file: %s", pkgPath)
  }

  try {
    var content = app._router.stack;
  } catch (e) {
    return console.error("Invalid app file! Are you sure this is an express file")
  }

  switch (options.type) {
    case listmd:
      listmd(app);
      break;
    default:
      docmd(app);
  }

}

// function replaceInfile(filename) {
//   fs.readFile(filename, 'utf8', function(err, data) {
//     if (err) {
//       return console.log(err);
//     }
//     var result = data.replace('', 'replacement');
//
//     fs.writeFile(filename, result, 'utf8', function(err) {
//       if (err) return console.log(err);
//     });
//   });
// }

function writeTofile(filename, content, lineBreak) {
  fs.appendFileSync(filename, content);
  if (lineBreakEnabled && lineBreak) {
    fs.appendFileSync(filename, md.LINE_BREAK);
  }
}

function clearFile(filename) {
  fs.truncateSync(filename, 0);
}

module.exports = {
  init: init
};
