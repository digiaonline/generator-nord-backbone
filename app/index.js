'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var process = require('child_process');

var NordBackboneGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic nord-backbone generator.'));

    var prompts = [
      {
        name: 'appName',
        message: 'What would you like to call your application?'
      },
      {
        name: 'appDir',
        message: 'Where would you like to create your application?'
      },
      {
        name: 'webRoot',
        message: 'Where is your web root located?'      
      }
    ];

    this.prompt(prompts, function (props) {
      this.appName = this._.camelize(props.appName);
      this.appDir = props.appDir;
      this.appPath = path.resolve(path.join(this.appDir, this.appName));
      this.webRoot = props.webRoot;

      done();
    }.bind(this));
  },

  app: function () {
    var dirsToCreate, i, filesToCopy, prop, templatesToWrite;
      
    dirsToCreate = [
      this.appPath,
      path.join(this.appPath, 'components'),
      path.join(this.appPath, 'views'),
      path.join(this.appPath, 'core')
    ];
      
    for (i = 0; i < dirsToCreate.length; i++) {
      this.mkdir(dirsToCreate[i]);
    }
    
    filesToCopy = {    
      '_config.js': path.join(this.appDir, 'config.js'),
      '_index.js': path.join(this.appDir, 'index.js'),
                
      '_package.json': 'package.json',
      '_bower.json': 'bower.json',
      '_Gruntfile.js': 'Gruntfile.js'
    }
      
    for (prop in filesToCopy) {
        this.copy(prop, filesToCopy[prop]);
    }
      
    templatesToWrite = {
      'core/entity.js': path.join(this.appPath, 'core', 'entity.js'),
      'utils/dependencyLoader.js': path.join(this.appPath, 'utils', 'dependencyLoader.js'),
      'core/component.js': path.join(this.appPath, 'core', 'component.js'),
      'components/viewManager.js': path.join(this.appPath, 'components', 'viewManager.js'),
      'core/app.js': path.join(this.appPath, 'core', 'app.js'),
    }
    
    for (prop in templatesToWrite) {
        this.template(prop, templatesToWrite[prop], { appName: this.appName });
    }
    
    this.config.set('appName', this.appName);
    this.config.set('appPath', this.appPath);
    this.config.save();
  },
    
  projectfiles: function () {
    this.copy('.editorconfig', '.editorconfig');
  }
});

module.exports = NordBackboneGenerator;