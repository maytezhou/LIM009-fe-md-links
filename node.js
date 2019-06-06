const path = require('path');
const fs = require('fs');

console.log(__filename);
export const checkToSeeIfPathisAbsolute = (route) => {
    return path.isAbsolute(route);

};
export const convertToAboslutePath = (route) => {
    return path.resolve(route);
};


export const checkToSeeIfPathIsFile = (route) => {
    return fs.statSync(route).isFile()
};

// en caso la ruta sea de un directorio
export const checkToSeeIfPathIsDirectory = (route) => {
    return fs.statSync(route).isDirectory()
};