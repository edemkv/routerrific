'use strict';
var md = require('./markdown.js');

exports.listmd = function(content, fs) {

  if (content) {
    for (i = 0; i < content.length; i++) {
      if (content[i].route) {
        var routeName = content[i].route.stack[0].name;

        var titleLine = routeName === ANONYMOUS ? 'Unknown' : routeName;
        // insert a space before all caps  // uppercase the first character
        titleLine = titleLine.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) {
          return str.toUpperCase();
        });

        var method = Object.keys(content[i].route.methods).map(function(x) {
          return x.toUpperCase();
        });

        writeTofile(util.format(LIST_FORMAT, method, content[i].route.path, titleLine), true);
      }
    }
  }
  return fs;
}
