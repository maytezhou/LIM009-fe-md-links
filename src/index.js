#!/usr/bin/env node
 // Create reference instance
var myMarked = require('marked');

// Get reference
//var renderer = new myMarked.Renderer();
const fetch = require('node-fetch');


import {
    readFile
} from './read-controller.js';
import {
    readDir
} from './read-controller.js';

import {
    gettingFsStatObject
} from './read-controller.js';
import {
    verifyingIfisAMarkdownFile
} from './path.js';
import {
    gettingAbsolutePath
} from './path.js';



const command = process.argv;
const commandUser = command[2];
//console.log(commandUser);


const gettingArrOfMarkdownFiles = (path2) => {
    let arrOfMarkdownFilesPath = [];
    const absolutePath = gettingAbsolutePath(path2);
    if (gettingFsStatObject(absolutePath).isFile() === true) { // si es un archivo
        // console.log('Es un archivo');
        const markdownFilePath = verifyingIfisAMarkdownFile(absolutePath); //verificar que sea un archivo markdown
        // console.log('Es un archivo markdown');
        arrOfMarkdownFilesPath.push(markdownFilePath); //  guardar el archivo markdown
    }

    if (gettingFsStatObject(absolutePath).isDirectory() === true) { // si es una carpeta 
        //  console.log('Es un directorio');
        const arrOfFilesOrDirsInsideADir = readDir(absolutePath); // que lea  la carpeta  
        // console.log(arrOfFilesOrDirsInsideADir);
        arrOfFilesOrDirsInsideADir.forEach((filesOrDirs) => { // que  obtenga los elementos de la carpeta 
            const newPathAbsolute = absolutePath + '/' + filesOrDirs; // que  obtenga la ruta absoluta de cada uno de los elementos
            let newArr = gettingArrOfMarkdownFiles(newPathAbsolute);
            //   console.log(newArr);
            arrOfMarkdownFilesPath = arrOfMarkdownFilesPath.concat(newArr)

        });


    }
    // console.log(arrOfMarkdownFilesPath);
    return arrOfMarkdownFilesPath;



};



const gettingArrObjOfMdLinks = (arrPaths) => {
    let arrObj = [];
    // console.log(arrPaths);
    arrPaths.forEach((filePath) => {
        const markdownContent = readFile(filePath).toString();
        // console.log(markdownContent)
        var renderer = new myMarked.Renderer();

        renderer.link = (href, _, text) => {
            arrObj.push({ href, text })

        };
        myMarked(markdownContent, { renderer: renderer });
    })
    return arrObj;
};

/*const mdLinks = (arrPaths) => {
    arrPaths.forEach((filePath) => {
        let content = readFile(filePath);
    })
};*/
console.log(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(commandUser)));
// Ruta relativa de una carpeta '../archivos';
// Ruta relativa de un archivo '../archivos/lucero.md';
/*const gettingStatsOfUrl = (arrArr) => {
    arrArr.forEach((arr) => {
        arr.forEach((obj) => {
            obj.h
        })
        fetch(link).then((response) => {
            console.log(response.status);
        })

    });
};*/