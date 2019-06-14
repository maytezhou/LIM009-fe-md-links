"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gettingAbsolutePath = exports.verifyingIfisAMarkdownFile = void 0;

var path = require('path');

var verifyingIfisAMarkdownFile = function verifyingIfisAMarkdownFile(absolutePath) {
  if (path.extname(absolutePath) === '.md') {
    return absolutePath; // return true
  }
};

exports.verifyingIfisAMarkdownFile = verifyingIfisAMarkdownFile;

var gettingAbsolutePath = function gettingAbsolutePath(path1) {
  if (path.isAbsolute(path1) === false) {
    // si es relativa
    //console.log('Es una ruta relativa');
    //console.log(path2)
    var absolutePath = path.resolve(path1); // que lo convierta a absoluta

    return absolutePath;
  } else if (path.isAbsolute(path1) === true) {
    //si es absoluta
    //console.log('Es una ruta Absoluta');
    //console.log(path2);
    return path1;
  }

  ;
};

exports.gettingAbsolutePath = gettingAbsolutePath;