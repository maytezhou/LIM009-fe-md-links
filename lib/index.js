#!/usr/bin/env node
// Create reference instance
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gettingTotalLinks = exports.gettingBrokenLinks = exports.gettingUniqueLinks = exports.mdLinks = exports.gettingStatsOfUrl = exports.gettingArrObjOfMdLinks = exports.gettingArrOfMarkdownFiles = void 0;

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
}; //gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles('../archivos'));
//console.log(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(pathCommandUser)));
// Ruta relativa de una carpeta '../archivos';
// Ruta relativa de un archivo '../archivos/lucero.md';
// retorna un array de repuestas de la promesas


exports.gettingArrObjOfMdLinks = gettingArrObjOfMdLinks;

var gettingStatsOfUrl = function gettingStatsOfUrl(arrObj, options) {
  //let contador = 0;
  var newArrObj = arrObj.map(function (obj) {
    //  contador++
    return fetch(obj.href).then(function (response) {
      obj.status = response.status;
      obj.ok = response.statusText; // console.log(obj);

      return obj;
    });
  }); //console.log(contador);

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
      return resolve(gettingStatsOfUrl(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(path))));
    });
  }
};

exports.mdLinks = mdLinks;
var arrObj2 = [{
  href: 'https://developer.mozilla.org/es/docs/DOM/Manipulando_el_historial_del_navegador',
  text: 'manipulando el historial del\nnavegador',
  file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
  status: 200,
  ok: 'OK'
}, {
  href: 'https://developer.mozilla.org/es/docs/Web/API/Window/history',
  text: '<code>window.history</code>',
  file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
  status: 200,
  ok: 'OK'
}, {
  href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export',
  text: 'Modulos: Export',
  file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
  status: 200,
  ok: 'OK'
}, {
  href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
  text: 'Modulos: Import',
  file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
  status: 200,
  ok: 'OK'
}, {
  href: 'https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/',
  text: 'Diseño web, responsive design y la importancia del mobile first - Media Click',
  file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
  status: 200,
  ok: 'OK'
}, {
  href: 'https://www.1and1.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/',
  text: 'Mobile First: el enfoque actual del diseño web móvil - 1and1',
  file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
  status: 200,
  ok: 'OK'
}, {
  href: 'http://yoursite.com/new-link-to-replace/',
  text: 'Error: 404',
  file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/lucero.md',
  status: 404,
  ok: 'Not Found'
}, {
  href: 'https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/',
  text: 'Diseño web, responsive design y la importancia del mobile first - Media Click',
  file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
  status: 200,
  ok: 'OK'
}, {
  href: 'https://www.1and1.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/',
  text: 'Mobile First: el enfoque actual del diseño web móvil - 1and1',
  file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
  status: 200,
  ok: 'OK'
}, {
  href: 'http://yoursite.com/new-link-to-replace/',
  text: 'Error: 404',
  file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/lucero.md',
  status: 404,
  ok: 'Not Found'
}];

var gettingUniqueLinks = function gettingUniqueLinks(arrObj) {
  var contador = 0;
  var arrOfHrefUniques = [];
  arrObj.forEach(function (obj) {
    if (arrOfHrefUniques.indexOf(obj.href) == -1) {
      arrOfHrefUniques.push(obj.href);
    }
  }); // console.log(arrOfHrefUniques);

  arrOfHrefUniques.forEach(function (href) {
    contador++;
  }); // console.log(`Total de links unicos  :` + contador);

  return contador;
};

exports.gettingUniqueLinks = gettingUniqueLinks;

var gettingBrokenLinks = function gettingBrokenLinks(arrObj) {
  var contador = 0;
  arrObj.forEach(function (obj) {
    if (obj.status == 404) {
      contador++;
    }
  }); //console.log(`Total de Links broken  :` + contador);

  return contador;
};

exports.gettingBrokenLinks = gettingBrokenLinks;

var gettingTotalLinks = function gettingTotalLinks(arrObj) {
  var contador = 0;
  arrObj.forEach(function (obj) {
    contador++;
  }); //console.log(`Total de Links  :` + contador);

  return contador;
}; //gettingTotalLinks(arrObj2);
//gettingBrokenLinks(arrObj2);
//gettingUniqueLinks(arrObj2);
//mdLinks(pathCommandUser);
//gettingUniqueLinks(gettingStatsOfUrl(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles('../archivos'))));
//gettingStatsOfUrl(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles('../archivos')));


exports.gettingTotalLinks = gettingTotalLinks;