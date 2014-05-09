'use strict';
var util = require('util'),
    path = require('path'),
    GeneratorBase = require('../generator-base'),
    generatorUtils = require('../util');

var ComponentGenerator = GeneratorBase.extend({
  init: function () {
    this._.camelize(this.name);
  },
    
  files: function () {
    this.writeTemplateFile('../../templates/component.js', path.join(this.appPath, 'components', this.name + '.js'), {
        className: generatorUtils.classify(this.name)
    });
  }
});

module.exports = ComponentGenerator;