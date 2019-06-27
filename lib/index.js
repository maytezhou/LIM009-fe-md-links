#!/usr/bin/env node
// Create reference instance
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gettingTotalLinks = exports.gettingBrokenLinks = exports.gettingUniqueLinks = exports.mdLinks = exports.gettingStatsOfUrl = exports.gettingArrObjOfMdLinks = exports.gettingArrOfMarkdownFiles = void 0;

var _readController = require("./read-controller.js");

var _path = require("./path.js");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var myMarked = require('marked');

var fetch = require('node-fetch');

var gettingArrOfMarkdownFiles = function gettingArrOfMarkdownFiles(path2) {
  var arrOfMarkdownFilesPath = [];
  var absolutePath = (0, _path.gettingAbsolutePath)(path2);

  if ((0, _readController.gettingFsStatObject)(absolutePath).isFile()) {
    // si es un archivo
    var markdownFilePath = (0, _path.verifyingIfisAMarkdownFile)(absolutePath); //verificar que sea un archivo markdown

    arrOfMarkdownFilesPath.push(markdownFilePath); //  guardar el archivo markdown
  }

  if ((0, _readController.gettingFsStatObject)(absolutePath).isDirectory()) {
    // si es una carpeta 
    var arrOfFilesOrDirsInsideADir = (0, _readController.readDir)(absolutePath); // que lea  la carpeta  

    arrOfFilesOrDirsInsideADir.forEach(function (filesOrDirs) {
      // que  obtenga los elementos de la carpeta 
      var newPathAbsolute = absolutePath + '/' + filesOrDirs; // que  obtenga la ruta absoluta de cada uno de los elementos

      var newArr = gettingArrOfMarkdownFiles(newPathAbsolute);
      arrOfMarkdownFilesPath = arrOfMarkdownFilesPath.concat(newArr);
    });
  }

  return arrOfMarkdownFilesPath;
};

exports.gettingArrOfMarkdownFiles = gettingArrOfMarkdownFiles;

var gettingArrObjOfMdLinks = function gettingArrObjOfMdLinks(arrPaths) {
  var arrObj = [];
  arrPaths.forEach(function (filePath) {
    var markdownContent = (0, _readController.readFile)(filePath).toString();
    var renderer = new myMarked.Renderer(); // Get reference var renderer = new myMarked.Renderer();

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
  });
  return arrObj;
};

exports.gettingArrObjOfMdLinks = gettingArrObjOfMdLinks;

var gettingStatsOfUrl = function gettingStatsOfUrl(arrObj) {
  var newArrObj = arrObj.map(function (obj) {
    return fetch(obj.href).then(function (response) {
      var newObj = _objectSpread({}, obj, {
        status: response.status,
        ok: response.statusText
      });

      return newObj;
    })["catch"](function (e) {
      obj.status = e.message;
      obj.ok = 'fail';
      return obj;
    });
  });
  return Promise.all(newArrObj);
};

exports.gettingStatsOfUrl = gettingStatsOfUrl;

var mdLinks = function mdLinks(path, obj) {
  if (obj.validate == false) {
    return new Promise(function (resolve, reject) {
      resolve(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(path)));
    });
  } else {
    return new Promise(function (resolve, reject) {
      resolve(gettingStatsOfUrl(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(path))));
    });
  }
};

exports.mdLinks = mdLinks;

var gettingUniqueLinks = function gettingUniqueLinks(arrObj) {
  var arrOfHrefUniques = [];
  var newArrObj = arrObj.filter(function (obj) {
    return arrOfHrefUniques.indexOf(obj.href) == -1;
  });
  var numberOfUniqueLinks = newArrObj.length;
  return numberOfUniqueLinks;
};

exports.gettingUniqueLinks = gettingUniqueLinks;

var gettingBrokenLinks = function gettingBrokenLinks(arrObj) {
  var contador = 0;
  arrObj.forEach(function (obj) {
    if (obj.status == 404) {
      contador++;
    }
  });
  return contador;
};

exports.gettingBrokenLinks = gettingBrokenLinks;

var gettingTotalLinks = function gettingTotalLinks(arrObj) {
  var contador = 0;
  arrObj.forEach(function (obj) {
    contador++;
  });
  return contador;
};

exports.gettingTotalLinks = gettingTotalLinks;