#!/usr/bin/env node
 // Create reference instance
var myMarked = require('marked');
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



export const gettingArrOfMarkdownFiles = (path2) => {
    let arrOfMarkdownFilesPath = [];
    const absolutePath = gettingAbsolutePath(path2);
    if (gettingFsStatObject(absolutePath).isFile()) { // si es un archivo
        const markdownFilePath = verifyingIfisAMarkdownFile(absolutePath); //verificar que sea un archivo markdown
        arrOfMarkdownFilesPath.push(markdownFilePath); //  guardar el archivo markdown
    }
    if (gettingFsStatObject(absolutePath).isDirectory()) { // si es una carpeta 
        const arrOfFilesOrDirsInsideADir = readDir(absolutePath); // que lea  la carpeta  
        arrOfFilesOrDirsInsideADir.forEach((filesOrDirs) => { // que  obtenga los elementos de la carpeta 
            const newPathAbsolute = absolutePath + '/' + filesOrDirs; // que  obtenga la ruta absoluta de cada uno de los elementos
            let newArr = gettingArrOfMarkdownFiles(newPathAbsolute);
            arrOfMarkdownFilesPath = arrOfMarkdownFilesPath.concat(newArr)
        });
    }
    return arrOfMarkdownFilesPath;
};

export const gettingArrObjOfMdLinks = (arrPaths) => {
    let arrObj = [];
    arrPaths.forEach((filePath) => {
        const markdownContent = readFile(filePath).toString();
        var renderer = new myMarked.Renderer(); // Get reference var renderer = new myMarked.Renderer();
        renderer.link = (href, _, text) => {
            arrObj.push({ href, text, file: filePath })
        };
        myMarked(markdownContent, { renderer: renderer });
    })
    return arrObj;
};

export const gettingStatsOfUrl = (arrObj) => {
    const newArrObj = arrObj.map((obj) => {
        return fetch(obj.href).then((response) => {
            const newObj = {...obj,
                status: response.status,
                ok: response.statusText,
            }
            return newObj;
        }).catch((e) => {
            obj.status = e.message
            obj.ok = 'fail'
            return obj

        })
    });
    return Promise.all(newArrObj);
};

export const mdLinks = (path, obj) => {
    if (obj.validate == false) {
        return new Promise((resolve, reject) => {
            resolve(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(path)));
        })
    } else {
        return new Promise((resolve, reject) => {
            resolve(gettingStatsOfUrl(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(path))));
        })
    }
};

export const gettingUniqueLinks = (arrObj) => {

    const arrOfHrefUniques = [];
    const newArrObj = arrObj.filter((obj) => {
        return arrOfHrefUniques.indexOf(obj.href) == -1;
    })
    const numberOfUniqueLinks = newArrObj.length;
    return numberOfUniqueLinks;
};

export const gettingBrokenLinks = (arrObj) => {
    let contador = 0;
    arrObj.forEach((obj) => {
        if (obj.status == 404) {
            contador++
        }
    })
    return contador
};

export const gettingTotalLinks = (arrObj) => {
    let contador = 0;
    arrObj.forEach((obj) => {
        contador++
    })
    return contador
};