// Create reference instance
var myMarked = require('marked');

// Get reference
var renderer = new myMarked.Renderer();

import {
    readFile
} from './read-controller.js';

const gettingArrObjOfMdLinks = (arrPaths) => {
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
    return arrObj;
};