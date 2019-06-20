import { readDir, readFile } from '../src/read-controller.js';
const path = require('path');
const cwd = process.cwd();
const output = ['example', 'hello.md', 'hola.md', 'lucero.md'];
describe(' readDir', () => {
    it('debería ser una función', () => {
        expect(typeof readDir).toBe('function');
    });
    it('Debería  retornar  un array de strings con el nombre de cada elemento dentro de la carpeta', () => {

        expect(readDir(path.join(cwd, 'archivos'))).toEqual(output);

    });
});
const output2 = 'Otras: [Modulos: Export](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export)';
describe(' readFile', () => {
    it('debería ser una función', () => {
        expect(typeof readFile).toBe('function');
    });
    it('Debería  retornar  un string con el contenido del file', () => {

        expect(readFile(path.join(cwd, 'archivos/hola.md'))).toEqual(output2);

    });
});