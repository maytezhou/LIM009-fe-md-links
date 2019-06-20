import { verifyingIfisAMarkdownFile, gettingAbsolutePath } from '../src/path.js';
import { gettingArrOfMarkdownFiles } from '../src/index.js';
const path = require('path');
const cwd = process.cwd();

describe('gettingAbsolutePath', () => {
    it('debería ser una función', () => {
        expect(typeof gettingAbsolutePath).toBe('function');
    });
    it('Debería poder convetir la ruta relativa a ruta absoluta', () => {
        //  /home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/hola.md
        expect(gettingAbsolutePath(path.join(cwd, 'archivos'))).toEqual(path.join(cwd, 'archivos'));

    });
    it('Debería poder convetir la ruta relativa a ruta absoluta', () => {

        expect(gettingAbsolutePath('archivos/hola.md')).toEqual(path.join(cwd, 'archivos/hola.md'));

    });
});
describe('verifyingIfisAMarkdownFile', () => {
    it('debería ser una función', () => {
        expect(typeof verifyingIfisAMarkdownFile).toBe('function');
    });
    it('Debería retornar una ruta absoluta de un archivo markdown', () => {

        expect(verifyingIfisAMarkdownFile(path.join(cwd, 'archivos/example/me.md'))).toEqual(path.join(cwd, 'archivos/example/me.md'));

    });

});

const arrOfMarkdownPaths = [`${path.join(cwd, 'archivos/example/lola/lili.md') }`,
    `${path.join(cwd, 'archivos/example/lola/lulu/luz.md') }`,
    `${path.join(cwd, 'archivos/example/lola/lulu/mar.md') }`,
    `${path.join(cwd, 'archivos/example/lola/shawn.md') }`,
    `${path.join(cwd, 'archivos/example/lola/susan.md') }`,
    `${path.join(cwd, 'archivos/example/me.md') }`,
    `${path.join(cwd, 'archivos/hello.md') }`,
    `${path.join(cwd, 'archivos/hola.md') }`,
    `${path.join(cwd, 'archivos/lucero.md') }`
];

describe('gettingArrOfMarkdownFiles', () => {
    it('debería ser una función', () => {
        expect(typeof gettingArrOfMarkdownFiles).toBe('function');
    });
    it('Debería  retornar un array con  las  rutas de todos los archivos markdows', () => {

        expect(gettingArrOfMarkdownFiles(path.join(cwd, 'archivos'))).toEqual(arrOfMarkdownPaths);

    });
});