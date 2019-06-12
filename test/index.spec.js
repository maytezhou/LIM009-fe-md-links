import { verifyingIfisAMarkdownFile, gettingAbsolutePath } from '../src/path.js';
import { gettingArrOfMarkdownFiles, gettingArrObjOfMdLinks, gettingStatsOfUrl } from '../src/index.js';
import { userCommand } from '../src/cli.js';
import { readDir, readFile, gettingFsStatObject } from '../src/read-controller.js';


describe('verifyingIfisAMarkdownFile', () => {
    it('debería ser una función', () => {
        expect(typeof verifyingIfisAMarkdownFile).toBe('function');
    });
    it('Debería retornar una ruta absoluta de un archivo markdown', () => {

        expect(verifyingIfisAMarkdownFile('/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md')).toEqual('/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md');

    });

});


describe('gettingAbsolutePath', () => {
    it('debería ser una función', () => {
        expect(typeof gettingAbsolutePath).toBe('function');
    });
    it('Debería poder convetir la ruta relativa a ruta absoluta', () => {
        /* '..//..//..//Documents//ARCHIVOS//lucero.md'*/
        /* 'C:\\Users\\MayteZhou\\Documents\\ARCHIVOS\\lucero.md'*/
        expect(gettingAbsolutePath('../archivos/hola.md')).toEqual('/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/hola.md');

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