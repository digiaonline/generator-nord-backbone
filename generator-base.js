'use strict';
var util = require('util'),
    yeoman = require('yeoman-generator');

var GeneratorBase = module.exports = yeoman.generators.NamedBase.extend({
  constructor: function(args, options) {
    yeoman.generators.NamedBase.apply(this, arguments);
    
    this.appName = this.config.get('appName');
    this.appPath = this.config.get('appPath');
  },
    
  writeTemplateFile: function (source, destination, data) {
      data = data || {};
      this.template(source, destination, this._.extend(data, { appName: this.appName }));
  }
});
