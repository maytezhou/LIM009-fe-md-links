import { checkToSeeIfPathisAbsolute, convertToAboslutePath, checkToSeeIfPathIsFile, checkToSeeIfPathIsDirectory } from '../LIM009-fe-md-links/node.js'


describe('checkToSeeIfPathisAbsolute', () => {
    it('debería ser una función', () => {
        expect(typeof checkToSeeIfPathisAbsolute).toBe('function');
    });
    it('Debería retornar false  si la ruta es relativa', () => {

        expect(checkToSeeIfPathisAbsolute('.\practicando\style.css')).toEqual(false);

    });
    it('Debería retornar true si la ruta es absoluta', () => {

        expect(checkToSeeIfPathisAbsolute('\practicando\style.css')).toEqual(true);

    });
});


describe('convertToAboslutePath', () => {
    it('debería ser una función', () => {
        expect(typeof convertToAboslutePath).toBe('function');
    });
    it('Debería poder convetir la ruta relativa a ruta absoluta', () => {

        expect(convertToAbsolutePath('../LIM009-fe-md-links/index.spec.js')).toEqual('C:\Users\MayteZhou\Desktop\MD-LINKS\LIM009-fe-md-links\index.spec.js');

    });
});

describe('checkToSeeIfPathIsFile', () => {
    it('debería ser una función', () => {
        expect(typeof checkToSeeIfPathIsFile).toBe('function');
    });
    it('Debería  retornar true si  la ruta  es un archivo', () => {

        expect(checkToSeeIfPathIsFile('C:\Users\MayteZhou\Desktop\MD-LINKS\LIM009-fe-md-links\index.spec.js')).toEqual(true);

    });
});

describe('checkToSeeIfPathIsDirectory', () => {
    it('debería ser una función', () => {
        expect(typeof checkToSeeIfPathIsDirectory).toBe('function');
    });
    it('Debería  retornar true si  la ruta  es una carpeta', () => {

        expect(checkToSeeIfPathIsDirectory('C:\Users\MayteZhou\Desktop\MD-LINKS\LIM009-fe-md-links')).toEqual(true);

    });
});