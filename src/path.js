#!/usr/bin/env node

const util = require('util');
const fs = require('fs');
const path = require('path');

const gettingFsStatObject = (path) => {
    const stat = util.promisify(fs.stat);
    return stat(path)
};
// gettingFsStatObject('../../../../Documents/ARCHIVOS/lucero.md');

const readFile = (path) => {
    const promiseForReadingFile = util.promisify(fs.readFile);
    return promiseForReadingFile(path, 'utf8')
};
//readFile('../../../../Documents/ARCHIVOS/lucero.md');
const readDir = (path) => {
    const promiseForReadingDir = util.promisify(fs.readdir);
    return promiseForReadingDir(path)
};
//readDir('../../../../Documents/ARCHIVOS/');

//fs.stat(path[, options], callback);
const getArrOfMarkDowns = (path1) => {
    return gettingFsStatObject(path1).then((statsObj) => {

        if (statsObj.isFile() === true) {
            if (path.extname(path1) === '.md') {
                return readFile(path1);

            }
        } else if (statsObj.isDirectory() === true) {
            return readDir(path1);

        }
    })


};

// Ruta relativa de una carpeta '../../../../Documents/ARCHIVOS';
// Ruta relativa de un archivo '../../../../Documents/ARCHIVOS/lucero.md'

getArrOfMarkDowns('./archivos/lucero.md');
// Ruta relativa de una carpeta '../../../../Documents/ARCHIVOS'
// Ruta relativa de un archivo '../../../../Documents/ARCHIVOS/lucero.md'
/*
const getArrMarkdowns = (path1) => {
    const arrOfMdFiles = [];
    if (fs.statSync(path1).isFile() === true) {
        if (path.extname(path1) === ".md") {
            arrOfMdFiles.push(path1);
            const pathOfAfile = path1;

            const contentOfAFile = fs.readFile(pathOfAfile, 'utf8', (error, data) => {
                console.log(data)
            });
            return contentOfAFile;
        }
    } else if (fs.statSync(path1).isDirectory() === true) {
        const arrOfthingsInsideDir = fs.readdir(path1, 'utf8', (err, files) => {
            console.log(files)
        });
        // console.log(arrOfthingsInsideDir);
        return arrOfthingsInsideDir;
    }
};*/