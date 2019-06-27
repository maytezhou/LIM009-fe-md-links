#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cli = exports.options2User = exports.options1User = exports.pathCommandUser = void 0;

var _index = require("./index.js");

var command = process.argv;

var userCommand = function userCommand(command1) {
  return command1[2];
};

var pathCommandUser = userCommand(command);
exports.pathCommandUser = pathCommandUser;

var options1 = function options1(command) {
  return command[3];
};

var options1User = options1(command);
exports.options1User = options1User;

var options2 = function options2(command) {
  return command[4];
};

var options2User = options2(command);
exports.options2User = options2User;
var options = {
  validate: false
};

var cli = function cli(path, string1, string2) {
  if (path !== undefined && string1 === '--validate' && string2 === undefined) {
    options.validate = true;
    return (0, _index.mdLinks)(path, options).then(function (response) {
      var newArrObjLinks = response.map(function (obj) {
        return "".concat(obj.file, " ").concat(obj.href, " ").concat(obj.ok !== 'OK' ? 'fail' : obj.ok, " ").concat(obj.status, " ").concat(obj.text);
      });
      var result = newArrObjLinks.toString().replace(/,/g, '\n');
      return result;
    });
  } else if (path !== undefined && string1 === undefined && string2 === undefined) {
    options.validate = false;
    return (0, _index.mdLinks)(path, options).then(function (response) {
      var newArrObjLinks = response.map(function (obj) {
        return "".concat(obj.file, "\n").concat(obj.href, "\n").concat(obj.text);
      });
      var result = newArrObjLinks.toString().replace(/,/g, '\n');
      return result;
    });
  } else if (path !== undefined && string1 === '--stats' && string2 === undefined) {
    options.validate = false;
    return (0, _index.mdLinks)(path, options).then(function (response) {
      return "Total:".concat((0, _index.gettingTotalLinks)(response), ",Unique:").concat((0, _index.gettingUniqueLinks)(response));
    });
  } else if (path !== undefined && string1 === '--stats' && string2 === '--validate' || path !== undefined && string1 == '--validate' && string2 == '--stats') {
    options.validate === true;
    return (0, _index.mdLinks)(path, options).then(function (response) {
      return "Total:".concat((0, _index.gettingTotalLinks)(response), ",Unique:").concat((0, _index.gettingUniqueLinks)(response), ",Broken:").concat((0, _index.gettingBrokenLinks)(response));
    });
  }
};

exports.cli = cli;

if (require.main === module) {
  cli(pathCommandUser, options1User, options2User).then(function (result) {
    console.log(result);
  });
}