
const path = require('path');
export const verifyingIfisAMarkdownFile = (absolutePath) => {

    if (path.extname(absolutePath) === '.md') {
        return absolutePath;
    }

};
export const gettingAbsolutePath = (path1) => {
    if (path.isAbsolute(path1) === false) { // si es relativa
        //console.log('Es una ruta relativa');
        //console.log(path2)

        const absolutePath = path.resolve(path1); // que lo convierta a absoluta
        return absolutePath;
    } else if (path.isAbsolute(path1) === true) { //si es absoluta
        //console.log('Es una ruta Absoluta');
        //console.log(path2);
        return path1
    };
}