import { checkToSeeIfPathisAbsolute, convertToAboslutePath, checkToSeeIfPathIsFile, checkToSeeIfPathIsDirectory } from '../node.js'

describe('checkToSeeIfPathisAbsolute', () => {
    it('debería ser una función', () => {
        expect(typeof checkToSeeIfPathisAbsolute).toBe('function');
    });
    it('Debería retornar false  si la ruta es relativa', () => {

        expect(checkToSeeIfPathisAbsolute('../../../../Documents/ARCHIVOS/lucero.md')).toEqual(false);

    });
    it('Debería retornar true si la ruta es absoluta', () => {
        /*'C:\\Users\\MayteZhou\\Documents\\ARCHIVOS\\lucero.md'*/
        expect(checkToSeeIfPathisAbsolute('/home/maytezhou/Documents/ARCHIVOS')).toEqual(true);

    });
});


describe('convertToAboslutePath', () => {
    it('debería ser una función', () => {
        expect(typeof convertToAboslutePath).toBe('function');
    });
    it('Debería poder convetir la ruta relativa a ruta absoluta', () => {
        /* '..//..//..//Documents//ARCHIVOS//lucero.md'*/
        /* 'C:\\Users\\MayteZhou\\Documents\\ARCHIVOS\\lucero.md'*/
        expect(convertToAboslutePath('../../../../maytezhou/Documents/ARCHIVOS/lucero.md')).toEqual('/home/maytezhou/Documents/ARCHIVOS/lucero.md');

    });
});

describe('checkToSeeIfPathIsFile', () => {
    it('debería ser una función', () => {
        expect(typeof checkToSeeIfPathIsFile).toBe('function');
    });
    it('Debería  retornar true si  la ruta  es un archivo', () => {
        /* 'C:\\Users\\MayteZhou\\Documents\\ARCHIVOS\\lucero.md'*/
        expect(checkToSeeIfPathIsFile('/home/maytezhou/Documents/ARCHIVOS/lucero.md')).toEqual(true);

    });
});

describe('checkToSeeIfPathIsDirectory', () => {
    it('debería ser una función', () => {
        expect(typeof checkToSeeIfPathIsDirectory).toBe('function');
    });
    it('Debería  retornar true si  la ruta  es una carpeta', () => {
        /* 'C:\\Users\\MayteZhou\\Documents\\ARCHIVOS'*/
        expect(checkToSeeIfPathIsDirectory('/home/maytezhou/Documents/ARCHIVOS')).toEqual(true);

    });
});