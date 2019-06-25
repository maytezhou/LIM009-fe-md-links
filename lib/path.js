"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gettingAbsolutePath = exports.verifyingIfisAMarkdownFile = void 0;

var path = require('path');

var verifyingIfisAMarkdownFile = function verifyingIfisAMarkdownFile(absolutePath) {
  if (path.extname(absolutePath) === '.md') {
    return absolutePath; // retorna ruta absoluta del archivo markdown
  }
};

exports.verifyingIfisAMarkdownFile = verifyingIfisAMarkdownFile;

var gettingAbsolutePath = function gettingAbsolutePath(path1) {
  if (path.isAbsolute(path1) === false) {
    // si es relativa
    var absolutePath = path.resolve(path1); // que lo convierta a absoluta

    return absolutePath;
  } else if (path.isAbsolute(path1) === true) {
    //si es absoluta
    return path1; // que retorne absoluta
  }

  ;
};

exports.gettingAbsolutePath = gettingAbsolutePath;