#!/usr/bin/env node
// Create reference instance
"use strict";

var _readController = require("./read-controller.js");

var _path = require("./path.js");

var _cli = require("./cli.js");

var myMarked = require('marked'); // Get reference
//var renderer = new myMarked.Renderer();


const fetch = require('node-fetch');

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
  } // console.log(arrOfMarkdownFilesPath);


  return arrOfMarkdownFilesPath;
};

const gettingArrObjOfMdLinks = arrPaths => {
  let arrObj = []; // console.log(arrPaths);

  arrPaths.forEach(filePath => {
    const markdownContent = (0, _readController.readFile)(filePath).toString(); // console.log(markdownContent)

    var renderer = new myMarked.Renderer();

    renderer.link = (href, _, text) => {
      arrObj.push({
        href,
        text,
        file: filePath
      });
    };

    myMarked(markdownContent, {
      renderer: renderer
    });
  });
  return arrObj;
};

const mdLinks = arrObj => {
  arrObj.forEach(obj => {});
}; //console.log(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(pathCommandUser)));
// Ruta relativa de una carpeta '../archivos';
// Ruta relativa de un archivo '../archivos/lucero.md';
// retorna un array de repuestas de la promesas


const gettingStatsOfUrl = arrObj => {
  // let contador = 0;
  const newArrObj = arrObj.map(obj => {
    // contador++
    return fetch(obj.href).then(response => {
      obj.status = response.status;
      obj.ok = response.statusText;
      console.log(obj);
      return obj;
    });
  }); // console.log(contador);

  return Promise.all(newArrObj);
};

gettingStatsOfUrl(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(_cli.pathCommandUser))).then(response => {
  console.log(response);
});