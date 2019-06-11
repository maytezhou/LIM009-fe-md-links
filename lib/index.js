#!/usr/bin/env node
"use strict";

var _readController = require("./read-controller.js");

var _path = require("./path.js");

const command = process.argv;
const commandUser = command[2]; //console.log(commandUser);

const gettingArrOfMarkdownFiles = path2 => {
  let arrOfMarkdownFilesPath = [];
  const absolutePath = (0, _path.gettingAbsolutePath)(path2);

  if ((0, _readController.gettingFsStatObject)(absolutePath).isFile() === true) {
    // si es un archivo
    // console.log('Es un archivo');
    const markdownFilePath = (0, _path.verifyingIfisAMarkdownFile)(absolutePath); //verificar que sea un archivo markdown
    // console.log('Es un archivo markdown');

    arrOfMarkdownFilesPath.push(markdownFilePath); //  guardar el archivo markdown
  }

  if ((0, _readController.gettingFsStatObject)(absolutePath).isDirectory() === true) {
    // si es una carpeta 
    //  console.log('Es un directorio');
    const arrOfFilesOrDirsInsideADir = (0, _readController.readDir)(absolutePath); // que lea  la carpeta  
    // console.log(arrOfFilesOrDirsInsideADir);

    arrOfFilesOrDirsInsideADir.forEach(filesOrDirs => {
      // que  obtenga los elementos de la carpeta 
      const newPathAbsolute = absolutePath + '/' + filesOrDirs; // que  obtenga la ruta absoluta de cada uno de los elementos

      let newArr = gettingArrOfMarkdownFiles(newPathAbsolute); //   console.log(newArr);

      arrOfMarkdownFilesPath = arrOfMarkdownFilesPath.concat(newArr);
    });
  }

  console.log(arrOfMarkdownFilesPath);
  return arrOfMarkdownFilesPath;
};

gettingArrOfMarkdownFiles(commandUser);

const gettingArrObjOfMdLinks = arrPaths => {
  let arrObj = [];
  arrPaths.forEach(filePath => {
    const markdownContent = (0, _readController.readFile)(filePath).toString(); //  console.log(markdownContent)

    const url = 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)';
    let a = markdownContent.search(url);
  });
};

const mdLinks = arrPaths => {
  arrPaths.forEach(filePath => {
    let content = (0, _readController.readFile)(filePath);
  });
};

gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(commandUser)); // Ruta relativa de una carpeta '../archivos';
// Ruta relativa de un archivo '../archivos/lucero.md';