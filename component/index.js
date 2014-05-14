'use strict';

var path = require('path'),
    GeneratorBase = require('../generator-base'),
    generatorUtil = require('../generator-util');

var ComponentGenerator = GeneratorBase.extend({
  init: function () {
    this._.camelize(this.name);
  },
    
  files: function () {
    this.writeTemplateFile('../../templates/component.js', path.join(this.appPath, 'components', this.name + '.js'), {
        className: generatorUtil.classify(this.name)
    });
  }
});

module.exports = ComponentGenerator;