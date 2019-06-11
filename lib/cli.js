#!/usr/bin/env node
//Grab provided args

/*const [,,...args]=process.argv;
//Print hello world provided args
console.log(args);*/
// Grab provided args 
//console.log(__dirname);
//console.log(__filename);
//console.log(command);
//console.log(command[1]); // ruta relativa del archivo donde estoy
//console.log(command[2]); // 1 er commando que ingresa la persona
//console.log(command[3]); // 2 do commando que ingresa la persona
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pathCommandUser = void 0;
const command = process.argv;

const userCommand = command1 => {
  return command1[2];
};

const pathCommandUser = userCommand(command);
/* checkIfItsFileOrDir(mdLinks(userCommand));  */

exports.pathCommandUser = pathCommandUser;