#!/usr/bin/env node
//Grab provided args

/*const [,,...args]=process.argv;
//Print hello world provided args
console.log(args);*/
// Grab provided args 
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userCommand = void 0;

const path = require('path');

const fs = require('fs'); //console.log(__dirname);
//console.log(__filename);
//console.log(command);
//console.log(command[1]); // ruta relativa del archivo donde estoy
//console.log(command[2]); // 1 er commando que ingresa la persona
//console.log(command[3]); // 2 do commando que ingresa la persona


const userCommand = command1 => {
  return command1[2];
};
/* checkIfItsFileOrDir(mdLinks(userCommand));  */


exports.userCommand = userCommand;