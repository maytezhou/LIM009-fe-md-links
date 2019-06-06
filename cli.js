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

console.log('Before reading file or directory');
const checkIfItsFileOrDir = (path1) => {

    const arrOfMdFiles = [];
    if (fs.existsSync(path1)) {
        if (fs.statSync(path1).isFile() === true) {

            // console.log('Es un file')
            if (path.extname(path1) === ".md") {

                arrOfMdFiles.push(path1);
                // console.log(arrOfMdFiles);
                const pathOfAfile = path1;

                const contentOfAFile = fs.readFile(pathOfAfile, 'utf8', (error, data) => {
                    console.log(data)
                });
                return contentOfAFile;
            }
        } else if (fs.statSync(path1).isDirectory() === true) {
            console.log(path1);
            console.log('Es un directorio')
            const arrOfthingsInsideDir = fs.readdir(path1, 'utf8', (err, files) => {
                console.log(files)
            });
            // console.log(arrOfthingsInsideDir);
            return arrOfthingsInsideDir;
        }
    } else {
        console.log("Esta ruta no existe");
    }

};
console.log('After reading file or directory probably');
const mdLinks = (path2) => {
    if (path.isAbsolute(path2) === false) { // si es relativa
        console.log('Es una ruta relativa');
        console.log(path2)
        console.log(path.resolve(path2)); // que lo convierta a absoluta
        return path.resolve(path2);



    } else if (path.isAbsolute(path2) === true) { //sino que retorne absoluta
        console.log('Es una ruta Absoluta');
        console.log(path2);
        return path2;


    }

};
checkIfItsFileOrDir(mdLinks(userCommand));