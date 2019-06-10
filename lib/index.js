#!/usr/bin/env node
"use strict";

var _path = require("./path.js");

const fs = require('fs');

const path = require('path');

const command = process.argv;
const commandUser = command[2];
console.log(commandUser);

const mdLinks = path2 => {
  if (path.isAbsolute(path2) === false) {
    // si es relativa
    console.log('Es una ruta relativa');
    console.log(path2);
    console.log(path.resolve(path2)); // que lo convierta a absoluta

    path.resolve(path2);

    if ((0, _path.gettingFsStatObject)(path2).isFile() === true) {
      console.log('Es un archivo');

      if (path.extname(path2) === '.md') {
        console.log("Es un archivo Markdown");
        const fileContent = (0, _path.readFile)(path2);
        console.log(fileContent);
        return fileContent;
      }
    } else if ((0, _path.gettingFsStatObject)(path2).isDirectory() === true) {
      console.log('Es un directorio');
      const arrOfFilesOrDirsInsideADir = (0, _path.readDir)(path2);
      console.log(arrOfFilesOrDirsInsideADir);
      return arrOfFilesOrDirsInsideADir;
    }
  } else if (path.isAbsolute(path2) === true) {
    //si es absoluta
    console.log('Es una ruta Absoluta');
    console.log(path2);
  }
};

mdLinks(commandUser); // Ruta relativa de una carpeta '../archivos';
// Ruta relativa de un archivo '../archivos/lucero.md';