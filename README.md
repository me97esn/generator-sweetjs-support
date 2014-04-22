# generator-sweetjs-support [![Build Status](https://secure.travis-ci.org/me97esn/generator-sweetjs-support.png?branch=master)](https://travis-ci.org/me97esn/generator-sweetjs-support)

> [Yeoman](http://yeoman.io) generator


## Getting Started

### Yeoman Generators

This generator takes an existing Yeoman webapp and updates Gruntfile.js and package.json to enable the use of sweet.js files.

Tested with generator-angular.

To install generator-sweetjs-support from npm, run:

```
$ npm install -g generator-sweetjs-support
```

Then, install another generator, for instance angular:
```
$ npm install -g generator-angular
```
Now, first create a new project

```
$ mkdir myProject
$ cd myProject
$ yo angular
$ yo sweetjs-support
```

To test if it works:  
```
$ mv app/scripts/app.js app/scripts/app.sjs
$ grunt serve
```

The app.sjs file should be copied and renamed to .tmp/app.js and working.