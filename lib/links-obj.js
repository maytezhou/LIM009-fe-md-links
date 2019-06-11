"use strict";

var _readController = require("./read-controller.js");

const gettingArrObjOfMdLinks = arrPaths => {
  let arrObj = [];
  arrPaths.forEach(filePath => {
    const markdownContent = (0, _readController.readFile)(filePath).toString();
    console.log(markdownContent);
    var renderer = new myMarked.Renderer();

    renderer.link = (href, title, text) => {
      arrObj.push({
        href,
        text
      });
    };

    myMarked(markdownContent, {
      renderer: renderer
    });
    return arrObj;
  });
};