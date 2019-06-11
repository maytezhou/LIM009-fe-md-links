"use strict";

var _readController = require("./read-controller.js");

// Create reference instance
var myMarked = require('marked'); // Get reference


var renderer = new myMarked.Renderer();

const gettingArrObjOfMdLinks = arrPaths => {
  let arrObj = [];
  arrPaths.forEach(filePath => {
    const markdownContent = (0, _readController.readFile)(filePath).toString(); // console.log(markdownContent)

    var renderer = new myMarked.Renderer();

    renderer.link = (href, _, text) => {
      arrObj.push({
        href,
        text
      });
    };

    myMarked(markdownContent, {
      renderer: renderer
    });
  }); // console.log(arrObj);

  return arrObj;
};