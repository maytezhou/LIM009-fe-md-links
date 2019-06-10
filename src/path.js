#!/usr/bin/env node


const fs = require('fs');
const path = require('path');

export const gettingFsStatObject = (path) => {
    const stat = fs.statSync(path);
    return stat;
};
// gettingFsStatObject('../archivos/lucero.md');
//console.log(gettingFsStatObject('../archivos/lucero.md'));

export const readFile = (path) => {
    const fileContent = fs.readFileSync(path, 'utf8')
    return fileContent;
};
console.log(readFile('../archivos/lucero.md'));

export const readDir = (path) => {
    const arrOfFilesOrDirs = fs.readdirSync(path, 'utf8');
    return arrOfFilesOrDirs;
};
//readDir('../archivos');
console.log(readDir('../archivos'));
// Ruta relativa de una carpeta '../archivos';
// Ruta relativa de un archivo '../archivos/lucero.md';