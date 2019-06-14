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
import {
    pathCommandUser
} from './cli.js';
import {
    options1User
} from './cli.js';
import {
    options2User
} from './cli.js';


export const gettingArrOfMarkdownFiles = (path2) => {
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
        //console.log(arrOfFilesOrDirsInsideADir);
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

export const gettingArrObjOfMdLinks = (arrPaths) => {
    let arrObj = [];
    // console.log(arrPaths);
    arrPaths.forEach((filePath) => {
            const markdownContent = readFile(filePath).toString();
            // console.log(markdownContent)
            var renderer = new myMarked.Renderer();
            renderer.link = (href, _, text) => {
                arrObj.push({ href, text, file: filePath })

            };
            myMarked(markdownContent, { renderer: renderer });
        })
        //console.log(arrObj);
    return arrObj;
};



//console.log(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(pathCommandUser)));
// Ruta relativa de una carpeta '../archivos';
// Ruta relativa de un archivo '../archivos/lucero.md';
// retorna un array de repuestas de la promesas
export const gettingStatsOfUrl = (arrObj, options) => {
    //let contador = 0;
    const newArrObj = arrObj.map((obj) => {
        //  contador++
        return fetch(obj.href).then((response) => {
            obj.status = response.status;
            obj.ok = response.statusText;
            // console.log(obj);
            return obj;
        })

    });
    //console.log(contador);
    return Promise.all(newArrObj);
};


export const mdLinks = (path, obj) => {
    if (obj.validate == false) {
        return new Promise((resolve, reject) => {
            resolve(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(path)));
            reject('Something went wrong');
        })

    } else {
        return new Promise((resolve, reject) => {
            resolve(gettingStatsOfUrl(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(path))));
            reject('something went wrong');
        })
    }

};

const arrObj2 = [{
        href: 'https://developer.mozilla.org/es/docs/DOM/Manipulando_el_historial_del_navegador',
        text: 'manipulando el historial del\nnavegador',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/API/Window/history',
        text: '<code>window.history</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export',
        text: 'Modulos: Export',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
        text: 'Modulos: Import',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/',
        text: 'Diseño web, responsive design y la importancia del mobile first - Media Click',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://www.1and1.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/',
        text: 'Mobile First: el enfoque actual del diseño web móvil - 1and1',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
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
    },
    {
        href: 'https://www.1and1.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/',
        text: 'Mobile First: el enfoque actual del diseño web móvil - 1and1',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'http://yoursite.com/new-link-to-replace/',
        text: 'Error: 404',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/lucero.md',
        status: 404,
        ok: 'Not Found'
    }
];

export const gettingUniqueLinks = (arrObj) => {
    let contador = 0;
    const arrOfHrefUniques = [];
    arrObj.forEach((obj) => {
            if (arrOfHrefUniques.indexOf(obj.href) == -1) {
                arrOfHrefUniques.push(obj.href)
            }


        })
        // console.log(arrOfHrefUniques);
    arrOfHrefUniques.forEach((href) => {
            contador++
        })
        // console.log(`Total de links unicos  :` + contador);
    return contador
};
export const gettingBrokenLinks = (arrObj) => {
    let contador = 0;

    arrObj.forEach((obj) => {

            if (obj.status == 404) {
                contador++
            }
        })
        //console.log(`Total de Links broken  :` + contador);
    return contador
};

export const gettingTotalLinks = (arrObj) => {
    let contador = 0;

    arrObj.forEach((obj) => {

            contador++

        })
        //console.log(`Total de Links  :` + contador);
    return contador
};
//gettingTotalLinks(arrObj2);
//gettingBrokenLinks(arrObj2);
//gettingUniqueLinks(arrObj2);
//mdLinks(pathCommandUser);
//gettingUniqueLinks(gettingStatsOfUrl(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles('../archivos'))));
//gettingStatsOfUrl(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles('../archivos')));