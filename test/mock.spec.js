import fetchMock from '../__mocks__/node-fetch.js';
import mockFs from 'mock-fs';
import { gettingStatsOfUrl, mdLinks, gettingArrObjOfMdLinks, gettingArrOfMarkdownFiles } from '../src/index.js';
import { cli } from '../src/cli.js';
const cwd = process.cwd();
const path = require('path');
fetchMock
    .mock('https://developer.mozilla.org/es/docs/CSS/Media_queries', 200)
    .mock('https://dzone.com/articles/how-single-page-web-applications-actually-work', 200)
    .mock('https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import', 200)
    .mock('https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export', 200)
    .mock('http://yoursite.com/new-link-to-replace/', 404)
fetchMock.config.sendAsJson = false;



beforeEach(() => {
    mockFs({
        'archivos': {
            'example': {
                'lola': {
                    'lulu': {
                        'luz.md': '[`media queries`](https://developer.mozilla.org/es/docs/CSS/Media_queries)',
                        'mar.md': '',

                    },
                    'lili.md': '',
                    'shawn.md': '',
                    'susan.md': '[SPA](https://dzone.com/articles/how-single-page-web-applications-actually-work)'

                },
                'me.md': '([`import`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import)',
            },
            'hello.md': 'Markdown content',
            'hola.md': 'Otras: [Modulos: Export](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export)',
            'lucero.md': 'Otras: [Error: 404](http://yoursite.com/new-link-to-replace/)'
        }

    });
});
afterEach(mockFs.restore);
const arrOfMarkdownPaths = [`${path.join(cwd, 'archivos/example/lola/lili.md')}`,
    `${path.join(cwd, 'archivos/example/lola/lulu/luz.md')}`,
    `${path.join(cwd, 'archivos/example/lola/lulu/mar.md')}`,
    `${path.join(cwd, 'archivos/example/lola/shawn.md')}`,
    `${path.join(cwd, 'archivos/example/lola/susan.md')}`,
    `${path.join(cwd, 'archivos/example/me.md')}`,
    `${path.join(cwd, 'archivos/hello.md')}`,
    `${path.join(cwd, 'archivos/hola.md')}`,
    `${path.join(cwd, 'archivos/lucero.md')}`
];
describe('gettingArrObjOfMdLinks', () => {
    it('debería ser una función', () => {
        expect(typeof gettingArrObjOfMdLinks).toBe('function');
    });
    it('Debería  retornar  un array de objetos(c/object representa un link con propiedad href,text y file)', () => {

        expect(gettingArrObjOfMdLinks(arrOfMarkdownPaths)).toEqual(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(path.join(cwd, 'archivos'))));

    });
});


const arObj5links = [{
        href: 'https://developer.mozilla.org/es/docs/CSS/Media_queries',
        text: '<code>media queries</code>',
        file: `${path.join(cwd, 'archivos/example/lola/lulu/luz.md')}`,
    },
    {
        href: 'https://dzone.com/articles/how-single-page-web-applications-actually-work',
        text: 'SPA',
        file: `${path.join(cwd, 'archivos/example/lola/susan.md')}`,
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
        text: '<code>import</code>',
        file: `${path.join(cwd, 'archivos/example/me.md')}`,
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export',
        text: 'Modulos: Export',
        file: `${path.join(cwd, 'archivos/hola.md')}`,
    },
    {
        href: 'http://yoursite.com/new-link-to-replace/',
        text: 'Error: 404',
        file: `${path.join(cwd, 'archivos/lucero.md')}`,
    }
];

const arObj5linksValidated = [{
        href: 'https://developer.mozilla.org/es/docs/CSS/Media_queries',
        text: '<code>media queries</code>',
        file: `${path.join(cwd, 'archivos/example/lola/lulu/luz.md')}`,
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://dzone.com/articles/how-single-page-web-applications-actually-work',
        text: 'SPA',
        file: `${path.join(cwd, 'archivos/example/lola/susan.md')}`,
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
        text: '<code>import</code>',
        file: `${path.join(cwd, 'archivos/example/me.md')}`,
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export',
        text: 'Modulos: Export',
        file: `${path.join(cwd, 'archivos/hola.md')}`,
        status: 200,
        ok: 'OK'
    },
    {
        href: 'http://yoursite.com/new-link-to-replace/',
        text: 'Error: 404',
        file: `${path.join(cwd, 'archivos/lucero.md')}`,
        status: 404,
        ok: 'Not Found'
    }
];
describe('gettingStatsOfUrl', () => {
    it('debería ser una función', () => {
        expect(typeof gettingStatsOfUrl).toBe('function');
    });
    it('Debería  retornar  una promesa  que resuelve un array de un solo objeto con status 200 y OK)', (done) => {
        return gettingStatsOfUrl(arObj5links).then((response) => {
            expect(response).toEqual(arObj5linksValidated);
            done();
        });

    });
    it('Debería  retornar  una promesa  que resuelve un array de  un solo objeto con status 404 y fail)', (done) => {

        return gettingStatsOfUrl(arObj5links).then((response) => {
            expect(response).toEqual(arObj5linksValidated);
            done();

        });

    });
});

describe('mdLinks', () => {
    it('debería ser una función', () => {
        expect(typeof mdLinks).toBe('function');
    });
    it('Debería  retornar  una promesa que al resolverse retorna un array de objetos [{href,file,text},{}])', (done) => {
        return mdLinks(path.join(cwd, 'archivos'), { validate: false }).then((response) => {
            expect(response).toEqual(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(path.join(cwd, 'archivos'))));
            done();
        })


    });
});

describe('mdLinks', () => {
    it('debería ser una función', () => {
        expect(typeof mdLinks).toBe('function');
    });
    it('Debería  retornar  una promesa que al resolverse retorna un array de objetos [{href,file,text},{}])', (done) => {
        return mdLinks(path.join(cwd, 'archivos'), { validate: true }).then((response) => {
            expect(response).toEqual(arObj5linksValidated);
            done();
        });
    });
});


const output13 = `Total:5,Unique:5`;
describe('cli', () => {
    it('debería ser una función', () => {
        expect(typeof cli).toBe('function');
    });
    it('Debería  retornar  un  string con la informaciòn de los links href,file,text,ok,status a partir de una ruta absoluta)', (done) => {

        return cli(path.join(cwd, 'archivos'), '--stats').then((response) => {
            expect(response).toEqual(output13);
            done();
        })
    });
});


const output14 = `Total:5,Unique:5,Broken:1`;
describe('cli', () => {
    it('debería ser una función', () => {
        expect(typeof cli).toBe('function');
    });
    it('Debería  retornar  un  string con la informaciòn de los links href,file,text,ok,status a partir de una ruta absoluta)', (done) => {

        return cli(path.join(cwd, 'archivos'), '--validate', '--stats').then((response) => {
            expect(response).toEqual(output14);
            done();
        })
    });
});

const output15 = `Total:5,Unique:5,Broken:1`;
describe('cli', () => {
    it('debería ser una función', () => {
        expect(typeof cli).toBe('function');
    });
    it('Debería  retornar  un  string con la informaciòn de los links href,file,text,ok,status a partir de una ruta absoluta)', (done) => {

        return cli(path.join(cwd, 'archivos'), '--stats', '--validate').then((response) => {
            expect(response).toEqual(output15);
            done();
        })
    });
});
const output16 = `/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/lulu/luz.md
https://developer.mozilla.org/es/docs/CSS/Media_queries
<code>media queries</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://dzone.com/articles/how-single-page-web-applications-actually-work
SPA
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import
<code>import</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/hola.md
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export
Modulos: Export
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/lucero.md
http://yoursite.com/new-link-to-replace/
Error: 404`;

describe('cli', () => {
    it('debería ser una función', () => {
        expect(typeof cli).toBe('function');
    });
    it('Debería  retornar  un  string con la informaciòn de los links href,file,text a partir de una ruta absoluta)', (done) => {

        return cli(path.join(cwd, 'archivos')).then((response) => {
            expect(response).toEqual(output16);
            done();
        })


    });
});
const output17 = `/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/lulu/luz.md https://developer.mozilla.org/es/docs/CSS/Media_queries OK 200 <code>media queries</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://dzone.com/articles/how-single-page-web-applications-actually-work OK 200 SPA
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import OK 200 <code>import</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/hola.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export OK 200 Modulos: Export
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/lucero.md http://yoursite.com/new-link-to-replace/ fail 404 Error: 404`;

describe('cli', () => {
    it('debería ser una función', () => {
        expect(typeof cli).toBe('function');
    });
    it('Debería  retornar  un  string con la informaciòn de los links href,file,text,ok,status a partir de una ruta absoluta)', (done) => {

        return cli(path.join(cwd, 'archivos'), '--validate').then((response) => {
            expect(response).toEqual(output17);
            done();
        })


    });
});