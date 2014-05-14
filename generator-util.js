'use strict';

var classify = function(string) {
  string = string.replace(/[\W_](\w)/g, function (match) { return ' ' + match[1].toUpperCase(); })
    .replace(/\s/g, '');
  return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = {
  classify: classify
};