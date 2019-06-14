#!/usr/bin/env node
// Create reference instance
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aaaa = exports.mdLinks = exports.gettingStatsOfUrl = exports.gettingArrObjOfMdLinks = exports.gettingArrOfMarkdownFiles = void 0;

var _readController = require("./read-controller.js");

var _path = require("./path.js");

var _cli = require("./cli.js");

var myMarked = require('marked'); // Get reference
//var renderer = new myMarked.Renderer();


var fetch = require('node-fetch');

var gettingArrOfMarkdownFiles = function gettingArrOfMarkdownFiles(path2) {
  var arrOfMarkdownFilesPath = [];
  var absolutePath = (0, _path.gettingAbsolutePath)(path2);

  if ((0, _readController.gettingFsStatObject)(absolutePath).isFile() === true) {
    // si es un archivo
    // console.log('Es un archivo');
    var markdownFilePath = (0, _path.verifyingIfisAMarkdownFile)(absolutePath); //verificar que sea un archivo markdown
    // console.log('Es un archivo markdown');

    arrOfMarkdownFilesPath.push(markdownFilePath); //  guardar el archivo markdown
  }

  if ((0, _readController.gettingFsStatObject)(absolutePath).isDirectory() === true) {
    // si es una carpeta 
    //  console.log('Es un directorio');
    var arrOfFilesOrDirsInsideADir = (0, _readController.readDir)(absolutePath); // que lea  la carpeta  
    //console.log(arrOfFilesOrDirsInsideADir);

    arrOfFilesOrDirsInsideADir.forEach(function (filesOrDirs) {
      // que  obtenga los elementos de la carpeta 
      var newPathAbsolute = absolutePath + '/' + filesOrDirs; // que  obtenga la ruta absoluta de cada uno de los elementos

      var newArr = gettingArrOfMarkdownFiles(newPathAbsolute); //   console.log(newArr);

      arrOfMarkdownFilesPath = arrOfMarkdownFilesPath.concat(newArr);
    });
  } // console.log(arrOfMarkdownFilesPath);


  return arrOfMarkdownFilesPath;
};

exports.gettingArrOfMarkdownFiles = gettingArrOfMarkdownFiles;

var gettingArrObjOfMdLinks = function gettingArrObjOfMdLinks(arrPaths) {
  var arrObj = []; // console.log(arrPaths);

  arrPaths.forEach(function (filePath) {
    var markdownContent = (0, _readController.readFile)(filePath).toString(); // console.log(markdownContent)

    var renderer = new myMarked.Renderer();

    renderer.link = function (href, _, text) {
      arrObj.push({
        href: href,
        text: text,
        file: filePath
      });
    };

    myMarked(markdownContent, {
      renderer: renderer
    });
  }); //console.log(arrObj);

  return arrObj;
}; //console.log(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(pathCommandUser)));
// Ruta relativa de una carpeta '../archivos';
// Ruta relativa de un archivo '../archivos/lucero.md';
// retorna un array de repuestas de la promesas


exports.gettingArrObjOfMdLinks = gettingArrObjOfMdLinks;

var gettingStatsOfUrl = function gettingStatsOfUrl(arrObj, options) {
  // let contador = 0;
  var newArrObj = arrObj.map(function (obj) {
    // contador++
    return fetch(obj.href).then(function (response) {
      obj.status = response.status;
      obj.ok = response.statusText; // console.log(obj);

      return obj;
    });
  }); // console.log(contador);

  return Promise.all(newArrObj);
};

exports.gettingStatsOfUrl = gettingStatsOfUrl;

var mdLinks = function mdLinks(path, obj) {
  if (obj.validate == false) {
    return new Promise(function (resolve, reject) {
      resolve(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(path)));
      reject('Something went wrong');
    });
  }

  ;

  if (obj.validate == true) {
    return new Promise(function (resolve, reject) {
      resolve(gettingStatsOfUrl(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(path))));
      reject('something went wrong');
    });
  }
}; //mdLinks(pathCommandUser);


exports.mdLinks = mdLinks;
var aaaa = 'aaaaa';
exports.aaaa = aaaa;