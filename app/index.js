'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the astonishing ' + chalk.red('BabylonJS') + ' generator!'
    ));

    var prompts = [{
	  type: 'input',
	  name: 'project_name',
	  message: 'The name of your app'
    },{
      type: 'confirm',
      name: 'demo',
      message: 'Would you like me to create a demo scene?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.demo = props.demo;
      this.project_name = props.project_name;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
	  this.mkdir("app");
	  this.mkdir("app/scripts");
	  this.mkdir("app/assets");
	  this.mkdir("app/css");
	  this.mkdir("dist");
      this.fs.copy(this.templatePath('_package.json'), this.destinationPath('package.json'));
      this.fs.copy(this.templatePath('_gulpfile.js'), this.destinationPath('gulpfile.js'));
      if(this.demo) this.fs.copy(this.templatePath('_main_demo.js'), this.destinationPath('app/scripts/main.js'));
      else this.fs.copy(this.templatePath('_main.js'), this.destinationPath('app/scripts/main.js'));
      this.fs.copy(this.templatePath('_style.css'), this.destinationPath('app/css/style.css'));
      this.fs.copyTpl(this.templatePath('_index.html'), this.destinationPath('app/index.html'), { project_name: this.project_name });
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
