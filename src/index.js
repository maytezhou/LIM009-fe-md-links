#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

import { readFile } from './path.js';
import { readDir } from './path.js';

import { gettingFsStatObject } from './path.js';
const command = process.argv;
const commandUser = command[2];
//console.log(commandUser);

const mdLinks = (path2) => {
    if (path.isAbsolute(path2) === false) { // si es relativa
        //console.log('Es una ruta relativa');
        //console.log(path2)

        const absolutePath = path.resolve(path2); // que lo convierta a absoluta
        //console.log(absolutePath + 'ruta relativa convertida a absoluta');
        if (gettingFsStatObject(absolutePath).isFile() === true) {
            console.log('Es un archivo');
            if (path.extname(absolutePath) === '.md') {
                console.log("Es un archivo Markdown");
                const fileContent = readFile(path2);
                console.log(fileContent);
                return fileContent;
            }
        } else if (gettingFsStatObject(absolutePath).isDirectory() === true) {
            console.log('Es un directorio');
            const arrOfFilesOrDirsInsideADir = readDir(absolutePath);
            console.log(arrOfFilesOrDirsInsideADir);
            return arrOfFilesOrDirsInsideADir;
        }



    } else if (path.isAbsolute(path2) === true) { //si es absoluta
        //console.log('Es una ruta Absoluta');
        //console.log(path2);




    }

};
mdLinks(commandUser);

// Ruta relativa de una carpeta '../archivos';
// Ruta relativa de un archivo '../archivos/lucero.md';