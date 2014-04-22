'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');



var SweetjsSupportGenerator = yeoman.generators.Base.extend({
  init: function() {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.updateFile = function(path, hook, text) {
      var file = this.readFileAsString(path);
      if (file.indexOf(text) === -1) {
        this.write(path, file.replace(hook, hook + '\n\n' + text));
      }
    }

    this.on('end', function() {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  gruntSweetjs: function() {
    var hook = "require('load-grunt-tasks')(grunt);",
      path = './Gruntfile.js',
      insert = "  grunt.loadNpmTasks('grunt-sweet.js');";
    this.updateFile(path, hook, insert);
  },
  sweetjs: function() {
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
    this.updateFile(path, hook, insert);
  },
  watch: function() {
    var hook = 'watch: {',
      path = './Gruntfile.js',
      insert = "\n\
      sweetjs: {\n\
        files: ['<%= yeoman.app %>/scripts/**/*.sjs'],\n\
        tasks: ['sweetjs']\n\
      },";
    this.updateFile(path, hook, insert);
  },
  concurrentServer: function() {
    var hook = 'server: [',
      path = './Gruntfile.js',
      insert = "        'sweetjs',";
      this.updateFile(path, hook, insert);
  },
  concurrentTest: function() {
    var hook = 'test: [',
      path = './Gruntfile.js',
      insert = "        'sweetjs',";
      this.updateFile(path, hook, insert);
  },
  concurrentDist: function() {
    var hook = 'dist: [',
      path = './Gruntfile.js',
      insert = "        'sweetjs',";
      this.updateFile(path, hook, insert);
  },
  packageJson: function() {
    var hook = ' "devDependencies": {',
      path = './package.json',
      insert = '"grunt-sweet.js": "~0.1.4",';
      this.updateFile(path, hook, insert);
  }
});

module.exports = SweetjsSupportGenerator;