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

console.log('After reading file or directory probably');





/* checkIfItsFileOrDir(mdLinks(userCommand));  */