#!/usr/bin/env node
//Grab provided args

/*const [,,...args]=process.argv;
//Print hello world provided args
console.log(args);*/
// Grab provided args 
//console.log(__dirname);
//console.log(__filename);
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options2User = exports.options1User = exports.pathCommandUser = void 0;

var f = _interopRequireWildcard(require("./index.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

console.log(require('./index.js')); //console.log(command);
//console.log(command[1]); // ruta relativa del archivo donde estoy
//console.log(command[2]); // 1 er commando que ingresa la persona
//console.log(command[3]); // 2 do commando que ingresa la persona

var command = process.argv; //console.log(command)

var userCommand = function userCommand(command1) {
  return command1[2];
};

var pathCommandUser = userCommand(command);
exports.pathCommandUser = pathCommandUser;

var options1 = function options1(command) {
  return command[3];
};

var options1User = options1(command); //console.log(options1User);

exports.options1User = options1User;

var options2 = function options2(command) {
  return command[4];
};

var options2User = options2(command); //console.log(options2User);

/* checkIfItsFileOrDir(mdLinks(userCommand));  */

exports.options2User = options2User;
var options = {
  validate: false
};

var cli = function cli(path, string1, string2) {
  //console.log(string2);
  if (path !== undefined && string1 == '--validate' && string2 == undefined) {
    options.validate = true;
    return mdLinks(path, options).then(function (response) {
      console.log(response);
    });
  } else if (path !== undefined && string1 == undefined && string2 == undefined) {
    options.validate = false;
    return mdLinks(path, options).then(function (response) {
      console.log(response);
    });
  }
}; //cli(pathCommandUser, options1User, options2User);