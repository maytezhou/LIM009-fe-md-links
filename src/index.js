const mdLinks = (path2) => {
    if (path.isAbsolute(path2) === false) { // si es relativa
        console.log('Es una ruta relativa');
        console.log(path2)
        console.log(path.resolve(path2)); // que lo convierta a absoluta
        return path.resolve(path2);



    } else if (path.isAbsolute(path2) === true) { //sino que retorne absoluta
        console.log('Es una ruta Absoluta');
        console.log(path2);
        return path2;


    }

};