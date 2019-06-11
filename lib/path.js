"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gettingAbsolutePath = exports.verifyingIfisAMarkdownFile = void 0;

const path = require('path');

const verifyingIfisAMarkdownFile = absolutePath => {
  if (path.extname(absolutePath) === '.md') {
    return absolutePath;
  }
};

exports.verifyingIfisAMarkdownFile = verifyingIfisAMarkdownFile;

const gettingAbsolutePath = path1 => {
  if (path.isAbsolute(path1) === false) {
    // si es relativa
    //console.log('Es una ruta relativa');
    //console.log(path2)
    const absolutePath = path.resolve(path1); // que lo convierta a absoluta

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