# generator-babylon [![Build Status](https://secure.travis-ci.org/jakubbilko/generator-babylon.png?branch=master)](https://travis-ci.org/jakubbilko/generator-babylon)

> [Yeoman](http://yeoman.io) generator

### About

Generator-babylon is a simple generator for projects using the BabylonJS framework for creating 3d games/apps in javascript.

### Features
* Manage dependencies with gulp-wiredep
* BrowserSync for app testing and livereload
* Combine and minify css and js files for distribution

### Installation

To install generator-babylon from npm, run:

```bash
npm install -g generator-babylon
```

Finally, initiate the generator:

```bash
yo babylon
```

You can now work on your app in the app directory.

### Available tasks

Launch local server and watch for changes:

```bash
gulp serve
```

Add new dependencies installed with Bower:

```bash
gulp wiredep
```

Compile app for distribution (combine and minify css and js) to the dist directory:

```bash
gulp dist
```

### Additional notes

Use the app/assets directory to store additional files like textures and models. This directory is copied recursively to the dist directory when you publish your app.