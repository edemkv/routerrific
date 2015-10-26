'use strict';
var md = require('./markdown.js');

exports.docmd = function(content) {

  if (content) {

    for (i = 0; i < content.length; i++) {
      if (content[i].route) {
        var routeName = content[i].route.stack[0].name;

        var titleLine = routeName === ANONYMOUS ? 'Unknown' : routeName;
        // insert a space before all caps  // uppercase the first character
        titleLine = titleLine.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) {
          return str.toUpperCase();
        })

        var method = Object.keys(content[i].route.methods).map(function(x) {
          return x.toUpperCase();
        });

        writeTofile(util.format(ROUTE_HEADER, titleLine, method));
        writeTofile(HEADER_BREAK);

        writeTofile(util.format(PATH_URL, content[i].route.path), true);

        if (content[i].keys) {
          var keys = content[i].keys;
          if (keys.length > 0) {
            writeTofile(PATH_VARIABLE_CONSTANT, true)
          };
          for (j = 0; j < keys.length; j++) {
            var optional = keys[j].optional === true ? 'Optional' : 'Not Optional';
            writeTofile(util.format(PATH_VARIABLES, keys[j].name, optional), true);
          }
        }

        writeTofile(LINE_BREAK);
      }
    }
  }
}
