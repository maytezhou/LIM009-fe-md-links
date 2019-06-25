#!/usr/bin/env node

const fs = require('fs');
export const gettingFsStatObject = (path) => {
    const stat = fs.statSync(path);
    return stat;
};

export const readFile = (path) => {
    const fileContent = fs.readFileSync(path, 'utf8')
    return fileContent;
};

export const readDir = (path) => {
    const arrOfFilesOrDirs = fs.readdirSync(path, 'utf8');
    return arrOfFilesOrDirs;
};