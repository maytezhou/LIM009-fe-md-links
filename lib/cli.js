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

var _index = require("./index.js");

//console.log(command);
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
    return (0, _index.mdLinks)(path, options).then(function (response) {
      //console.log(response);
      response.forEach(function (obj) {
        console.log("  ".concat(obj.file, " \n ").concat(obj.href, " \n ").concat(obj.ok !== 'OK' ? 'fail' : obj.ok, " \n ").concat(obj.status, " \n").concat(obj.text, " \n"));
        return "  ".concat(obj.file, ",").concat(obj.href, ",").concat(obj.ok, ",").concat(obj.status, ",").concat(obj.text, " \n");
      });
    });
  } else if (path !== undefined && string1 == undefined && string2 == undefined) {
    options.validate = false;
    return (0, _index.mdLinks)(path, options).then(function (response) {
      //console.log(response);
      response.forEach(function (obj) {
        console.log("  ".concat(obj.file, "\n ").concat(obj.href, " \n ").concat(obj.text, " \n"));
        return "".concat(obj.file, ",").concat(obj.href, ",").concat(obj.text, " \n");
      });
    });
  } else if (path !== undefined && string1 == '--stats' && string2 == undefined) {
    options.validate = false;
    return (0, _index.mdLinks)(path, options).then(function (response) {
      response;
      console.log("Total : ".concat((0, _index.gettingTotalLinks)(response), " \n Unique: ").concat((0, _index.gettingUniqueLinks)(response)));
    });
  } else if (path !== undefined && string1 == '--stats' && string2 == '--validate' || path !== undefined && string1 == '--validate' && string2 == '--stats') {
    options.validate = true;
    return (0, _index.mdLinks)(path, options).then(function (response) {
      response;
      console.log("Total : ".concat((0, _index.gettingTotalLinks)(response), " \n Unique: ").concat((0, _index.gettingUniqueLinks)(response), " \n Broken: ").concat((0, _index.gettingBrokenLinks)(response), " "));
    });
  }
};

cli(pathCommandUser, options1User, options2User);