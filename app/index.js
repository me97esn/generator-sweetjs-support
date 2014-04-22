'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var SweetjsSupportGenerator = yeoman.generators.Base.extend({
  init: function() {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function() {
      if (!this.options['skip-install']) {
        console.log('::::::: running npm install ::::::');
        this.npmInstall();
      }
    });
  },

  gruntSweetjs: function() {
    var hook = "require('load-grunt-tasks')(grunt);",
      path = './Gruntfile.js',
      file = this.readFileAsString(path),
      insert = "grunt.loadNpmTasks('grunt-sweet.js');";
    console.log(file);
    console.log(file.indexOf(insert));
    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, hook  + '\n\n' + insert ));
    }
  },sweetjs: function() {
    var hook = ' grunt.initConfig({',
      path = './Gruntfile.js',
      file = this.readFileAsString(path),
      insert = "\n\
    sweetjs: {\n\
      options: {\n\
        sourceMap: false,\n\
        sourceRoot: '',\n\
        readableNames: true,\n\
        modules: []\n\
      },\n\
      dist: {\n\
        files: [{\n\
          expand: true,\n\
          cwd: '<%= yeoman.app %>/scripts',\n\
          src: '{,*/}*.sjs',\n\
          dest: '.tmp/scripts',\n\
          ext: '.js'\n\
        }]\n\
      },\n\
      test: {\n\
        files: [{\n\
          expand: true,\n\
          cwd: 'test/spec',\n\
          src: '{,*/}*.sjs',\n\
          dest: '.tmp/spec',\n\
          ext: '.js'\n\
        }]\n\
      }\n\
    },";
    console.log(file);
    console.log(file.indexOf(insert));
    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, hook  + '\n\n' + insert ));
    }
  },watch: function() {
    var hook = 'watch: {',
      path = './Gruntfile.js',
      file = this.readFileAsString(path),
      insert = "\n\
      sweetjs: {\n\
        files: ['<%= yeoman.app %>/scripts/**/*.sjs'],\n\
        tasks: ['sweetjs']\n\
      },";
    console.log(file);
    console.log(file.indexOf(insert));
    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, hook  + '\n\n' + insert ));
    }
  },concurrentServer: function() {
    var hook = 'server: [',
      path = './Gruntfile.js',
      file = this.readFileAsString(path),
      insert = "'sweetjs',";
    console.log(file);
    console.log(file.indexOf(insert));
    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, hook  + '\n\n' + insert ));
    }
  },concurrentTest: function() {
    var hook = 'test: [',
      path = './Gruntfile.js',
      file = this.readFileAsString(path),
      insert = "'sweetjs',";
    console.log(file);
    console.log(file.indexOf(insert));
    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, hook  + '\n\n' + insert ));
    }
  },concurrentDist: function() {
    var hook = 'dist: [',
      path = './Gruntfile.js',
      file = this.readFileAsString(path),
      insert = "'sweetjs',";
    console.log(file);
    console.log(file.indexOf(insert));
    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, hook  + '\n\n' + insert ));
    }
  },packageJson: function() {
    var hook = ' "devDependencies": {',
      path = './package.json',
      file = this.readFileAsString(path),
      insert = '"grunt-sweet.js": "~0.1.4",';
    console.log(file);
    console.log(file.indexOf(insert));
    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, hook  + '\n\n' + insert ));
    }
  }
});

module.exports = SweetjsSupportGenerator;