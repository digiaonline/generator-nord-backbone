'use strict';

var path = require('path'),
    util = require('util'),
    GeneratorBase = require('../generator-base'),
    generatorUtils = require('../util');

var ViewGenerator = GeneratorBase.extend({
  init: function () 
    this._.camelize(this.name);
  },
    
  files: function () {   
    this.writeTemplateFile('../../templates/view.js', path.join(this.appPath, 'views', this.name + '.js'), {
        className: generatorUtils.classify(this.name + 'View')
    });
  }
});

module.exports = ViewGenerator;