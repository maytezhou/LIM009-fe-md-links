#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readDir = exports.readFile = exports.gettingFsStatObject = void 0;

const fs = require('fs');

const gettingFsStatObject = path => {
  const stat = fs.statSync(path);
  return stat;
}; // gettingFsStatObject('../archivos/lucero.md');
//console.log(gettingFsStatObject('../archivos/lucero.md'));


exports.gettingFsStatObject = gettingFsStatObject;

const readFile = path => {
  const fileContent = fs.readFileSync(path, 'utf8');
  return fileContent;
}; //console.log(readFile('../archivos/hola.md'));


exports.readFile = readFile;

const readDir = path => {
  const arrOfFilesOrDirs = fs.readdirSync(path, 'utf8');
  return arrOfFilesOrDirs;
}; //readDir('../archivos');
//console.log(readDir('../archivos'));
// Ruta relativa de una carpeta '../archivos';
// Ruta relativa de un archivo '../archivos/lucero.md';


exports.readDir = readDir;