'use strict';

var path = require('path'),
    GeneratorBase = require('../generator-base'),
    generatorUtil = require('../generator-util');

var ViewGenerator = GeneratorBase.extend({
  init: function () {
    this._.camelize(this.name);
  },
    
  files: function () {   
    this.writeTemplateFile('../../templates/view.js', path.join(this.appPath, 'views', this.name + '.js'), {
        className: generatorUtil.classify(this.name + 'View')
    });
  }
});

module.exports = ViewGenerator;