#!/usr/bin/env node
 //Grab provided args
/*const [,,...args]=process.argv;
//Print hello world provided args
console.log(args);*/

// Grab provided args 
const path = require('path');
const fs = require('fs');

//console.log(__dirname);
//console.log(__filename);

const command = process.argv;

//console.log(command);
//console.log(command[1]); // ruta relativa del archivo donde estoy
//console.log(command[2]); // 1 er commando que ingresa la persona
//console.log(command[3]); // 2 do commando que ingresa la persona
command.forEach(element => {
    // console.log(element);
});

const userCommand = command[2];
//console.log(userCommand);
//console.log(path1);

const checkIfItsFileOrDir = (path1) => {
    //  console.log(path1)
    const arrOfMdFiles = [];
    /* if(fs.existsSync(path1)){*/
    if (fs.statSync(path1).isFile() === true) {

        console.log('Es un file')
        if (path.extname(path1) === ".md") {

            arrOfMdFiles.push(path1);
            console.log(arrOfMdFiles);
            return arrOfMdFiles;
        }
    } else if (fs.statSync(path1).isDirectory() === true) {

        console.log('Es un directorio')
        const arrOfthingsInsideDir = fs.readdirSync(path1);
        console.log(arrOfthingsInsideDir);
        return arrOfthingsInsideDir;
    }


    /* }else{
         console.log("Esta ruta no existe");
     }*/

};

const mdLinks = (path2) => {
    if (path.isAbsolute(path2) === false) { // si es relativa
        console.log("Es relativa");
        console.log(path.resolve(path2)); // que lo convierta a absoluta
        // une la ruta de la carpeta  padre donde se encuentra el archivo actual mas el path que pasa el usuario
        // /home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links + la ruta completa de la carpeta que pasa el usuario
        return path.resolve(path2);


    } else if (path.isAbsolute(path2) === true) { //sino que retorne absoluta
        console.log("Es absoluta");

        console.log(path2);
        return path2;


    }

};
//checkIfItsFileOrDir(mdLinks(userCommand));
mdLinks(userCommand);
/*
console.log('aaaaaaaaaaaaa')
console.log(__dirname);
const rutaDelaCarpetaDelArchivoActual = __dirname;
const obj2 = path.parse(rutaDelaCarpetaDelArchivoActual);
console.log(obj2);

console.log(__filename);*/