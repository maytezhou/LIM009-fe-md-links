const path = require('path');
export const verifyingIfisAMarkdownFile = (absolutePath) => {

    if (path.extname(absolutePath) === '.md') {
        return absolutePath; // retorna ruta absoluta del archivo markdown
    }

};

export const gettingAbsolutePath = (path1) => {
    if (path.isAbsolute(path1) === false) { // si es relativa


        const absolutePath = path.resolve(path1); // que lo convierta a absoluta
        return absolutePath;
    } else if (path.isAbsolute(path1) === true) { //si es absoluta
        return path1 // que retorne absoluta
    };
}