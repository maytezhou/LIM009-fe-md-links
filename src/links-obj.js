

import {
    readFile
} from './read-controller.js';

const gettingArrObjOfMdLinks= (arrPaths) =>{
    let arrObj = [];
    arrPaths.forEach((filePath)=> {
        const markdownContent = readFile(filePath).toString();
        console.log(markdownContent)
        var renderer = new myMarked.Renderer();
       
        renderer.link =(href, title,text)=>{
            arrObj.push({href, text})
            
          };
          myMarked(markdownContent,{renderer:renderer})
            return arrObj;
     })
   
};