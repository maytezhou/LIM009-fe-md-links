import mock from 'mock-fs';
import { verifyingIfisAMarkdownFile, gettingAbsolutePath } from '../src/path.js';
import { gettingArrOfMarkdownFiles, gettingArrObjOfMdLinks, gettingUniqueLinks, gettingBrokenLinks, gettingTotalLinks, gettingStatsOfUrl, mdLinks } from '../src/index.js';
import { cli } from '../src/cli.js';
import { readDir, readFile } from '../src/read-controller.js';

const path = require('path');


beforeEach(() => {
    mock({
        'archivos': {
            'example': {
                'lola': {
                    'lulu': {
                        'luz.md': '[`media queries`](https://developer.mozilla.org/es/docs/CSS/Media_queries)',
                        'mar.md': '',

                    },
                    'lili.md': '',
                    'shawn.md': '',
                    'susan.md': '[SPA](https://dzone.com/articles/how-single-page-web-applications-actually-work) ([versión traducida](https://dzone.com/articles/how-single-page-web-applications-actually-work))[mobile first](https://darwindigital.com/mobile-first-versus-responsive-web-design/) ([versión traducida](https://translate.google.com/translate?hl=&sl=auto&tl=es&u=https%3A%2F%2Fdarwindigital.com%2Fmobile-first-versus-responsive-web-design))- Debe permitir la persintencia de datos- Diseñar la arquitectura de tu aplicación, modularizando tu código a través de *es modules* ([`import`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import) y [`export`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export))- Familiarizarte con el patrón  modelo - vista - controlador ([MVC](https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador)).* Vista mobile![mobile](https://user-images.githubusercontent.com/32286663/56174616-ec9f6100-5fb8-11e9-9edb-d5ef7c251d9c.png)* Vista Desktop             ![desktop](https://user-images.githubusercontent.com/32286663/56174626-fcb74080-5fb8-11e9-8854-26e8d9c4e25f.png)## Recursos### Mobile first El concepto de [_mobile first_](https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/)[manipulando el historial del navegador](https://developer.mozilla.org/es/docs/DOM/Manipulando_el_historial_del_navegador)con [`window.history`](https://developer.mozilla.org/es/docs/Web/API/Window/history).En este proyecto te invitamos a explorar opciones y decidir una opción de implementación.usando [Firebase](https://firebase.google.com/).Para esto utilizaras respectivamente[`Firebase authentication`](https://firebase.google.com/docs/auth/)[`Firestore security rules`](https://firebase.google.com/docs/firestore/security/get-started)[`flexbox`](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)[`media queries`](https://developer.mozilla.org/es/docs/CSS/Media_queries)[Modulos: Export](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export)[Modulos: Import](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import)[Diseño web, responsive design y la importancia del mobile first - Media Click](https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/)[Mobile First: el enfoque actual del diseño web móvil - 1and1](https://www.1and1.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/)[Mobile First - desarrolloweb.com](https://desarrolloweb.com/articulos/mobile-first-responsive.html)[Mobile First - ZURB](https://zurb.com/word/mobile-first)[Mobile First Is NOT Mobile Only - Nielsen Norman Group](https://www.nngroup.com/articles/mobile-first-not-mobile-only/)'

                },
                'me.md': '- Diseñar la arquitectura de tu aplicación, modularizando tu código a través de *es modules* ([`import`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import) y [`export`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export))- Familiarizarte con el patrón  modelo - vista - controlador ([MVC](https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador)).#### Tecnologías HTML5 y CSS3',
            },
            'hello.md': 'Markdown content',
            'hola.md': 'Otras: [Modulos: Export](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export)',
            'lucero.md': 'Otras: [Error: 404](http://yoursite.com/new-link-to-replace/)'
        }

    });
});
afterEach(mock.restore);

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

const arrOfMarkdownPaths = ['/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/lili.md',
    '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/lulu/luz.md',
    '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/lulu/mar.md',
    '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/shawn.md',
    '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
    '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md',
    '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/hello.md',
    '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/hola.md',
    '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/lucero.md'
];

describe('gettingArrOfMarkdownFiles', () => {
    it('debería ser una función', () => {
        expect(typeof gettingArrOfMarkdownFiles).toBe('function');
    });
    it('Debería  retornar un array con  las  rutas de todos los archivos markdows', () => {

        expect(gettingArrOfMarkdownFiles(path.join(cwd, 'archivos'))).toEqual(arrOfMarkdownPaths);

    });
});


describe('gettingArrObjOfMdLinks', () => {
    it('debería ser una función', () => {
        expect(typeof gettingArrObjOfMdLinks).toBe('function');
    });
    it('Debería  retornar  un array de objetos(c/object representa un link con propiedad href,text y file)', () => {

        expect(gettingArrObjOfMdLinks(arrOfMarkdownPaths)).toEqual(gettingArrObjOfMdLinks(gettingArrOfMarkdownFiles(path.join(cwd, 'archivos'))));

    });
});


const input4 = [{
        href: 'https://desarrolloweb.com/articulos/mobile-first-responsive.html',
        text: 'Mobile First - desarrolloweb.com',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://zurb.com/word/mobile-first',
        text: 'Mobile First - ZURB',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://www.nngroup.com/articles/mobile-first-not-mobile-only/',
        text: 'Mobile First Is NOT Mobile Only - Nielsen Norman Group',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
        text: '<code>import</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export',
        text: '<code>export</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md'
    },
    {
        href: 'https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador',
        text: 'MVC',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export',
        text: 'Modulos: Export',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/hola.md'
    },
    {
        href: 'http://yoursite.com/new-link-to-replace/',
        text: 'Error: 404',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/lucero.md'
    }
]
const output4 = [{
        href: 'https://desarrolloweb.com/articulos/mobile-first-responsive.html',
        text: 'Mobile First - desarrolloweb.com',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://zurb.com/word/mobile-first',
        text: 'Mobile First - ZURB',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://www.nngroup.com/articles/mobile-first-not-mobile-only/',
        text: 'Mobile First Is NOT Mobile Only - Nielsen Norman Group',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
        text: '<code>import</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export',
        text: '<code>export</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador',
        text: 'MVC',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export',
        text: 'Modulos: Export',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/hola.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'http://yoursite.com/new-link-to-replace/',
        text: 'Error: 404',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/lucero.md',
        status: 404,
        ok: 'Not Found'
    }
]
describe('gettingStatsOfUrl', () => {
    it('debería ser una función', () => {
        expect(typeof gettingStatsOfUrl).toBe('function');
    });
    it('Debería  retornar  una promesa  que resuelve un array de objetos)', (done) => {

        return gettingStatsOfUrl(input4).then((response) => {
            expect(response).toEqual(output4);
            done();
        })

    });
});

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

const string5 = [{
        href: 'https://developer.mozilla.org/es/docs/CSS/Media_queries',
        text: '<code>media queries</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/lulu/luz.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://dzone.com/articles/how-single-page-web-applications-actually-work',
        text: 'SPA',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://dzone.com/articles/how-single-page-web-applications-actually-work',
        text: 'versión traducida',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://darwindigital.com/mobile-first-versus-responsive-web-design/',
        text: 'mobile first',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://translate.google.com/translate?hl=&sl=auto&tl=es&u=https%3A%2F%2Fdarwindigital.com%2Fmobile-first-versus-responsive-web-design',
        text: 'versión traducida',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
        text: '<code>import</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export',
        text: '<code>export</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador',
        text: 'MVC',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/',
        text: '<em>mobile first</em>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/DOM/Manipulando_el_historial_del_navegador',
        text: 'manipulando el historial del navegador',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/API/Window/history',
        text: '<code>window.history</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://firebase.google.com/',
        text: 'Firebase',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://firebase.google.com/docs/auth/',
        text: '<code>Firebase authentication</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://firebase.google.com/docs/firestore/security/get-started',
        text: '<code>Firestore security rules</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
        text: '<code>flexbox</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/CSS/Media_queries',
        text: '<code>media queries</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export',
        text: 'Modulos: Export',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
        text: 'Modulos: Import',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/',
        text: 'Diseño web, responsive design y la importancia del mobile first - Media Click',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://www.1and1.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/',
        text: 'Mobile First: el enfoque actual del diseño web móvil - 1and1',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://desarrolloweb.com/articulos/mobile-first-responsive.html',
        text: 'Mobile First - desarrolloweb.com',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://zurb.com/word/mobile-first',
        text: 'Mobile First - ZURB',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://www.nngroup.com/articles/mobile-first-not-mobile-only/',
        text: 'Mobile First Is NOT Mobile Only - Nielsen Norman Group',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
        text: '<code>import</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export',
        text: '<code>export</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador',
        text: 'MVC',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export',
        text: 'Modulos: Export',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/hola.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'http://yoursite.com/new-link-to-replace/',
        text: 'Error: 404',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/lucero.md',
        status: 404,
        ok: 'Not Found'
    }
];

describe('mdLinks', () => {
    it('debería ser una función', () => {
        expect(typeof mdLinks).toBe('function');
    });
    it('Debería  retornar  una promesa que al resolverse retorna un array de objetos [{href,file,text},{}])', (done) => {
        return mdLinks(path.join(cwd, 'archivos'), { validate: true }).then((response) => {
            expect(response).toEqual(string5);
            done();
        });
    });
});

const arrObj3 = [{
        href: 'https://developer.mozilla.org/es/docs/DOM/Manipulando_el_historial_del_navegador',
        text: 'manipulando el historial del\nnavegador',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/API/Window/history',
        text: '<code>window.history</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export',
        text: 'Modulos: Export',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
        text: 'Modulos: Import',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/',
        text: 'Diseño web, responsive design y la importancia del mobile first - Media Click',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://www.1and1.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/',
        text: 'Mobile First: el enfoque actual del diseño web móvil - 1and1',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'http://yoursite.com/new-link-to-replace/',
        text: 'Error: 404',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/lucero.md',
        status: 404,
        ok: 'Not Found'
    }, {
        href: 'https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/',
        text: 'Diseño web, responsive design y la importancia del mobile first - Media Click',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'https://www.1and1.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/',
        text: 'Mobile First: el enfoque actual del diseño web móvil - 1and1',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md',
        status: 200,
        ok: 'OK'
    },
    {
        href: 'http://yoursite.com/new-link-to-replace/',
        text: 'Error: 404',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/lucero.md',
        status: 404,
        ok: 'Not Found'
    }
];
describe('gettingTotalLinks', () => {
    it('debería ser una función', () => {
        expect(typeof gettingTotalLinks).toBe('function');
    });
    it('Debería  retornar  un numero que representa el total de links (total de objetos) dentro del array)', () => {

        expect(gettingTotalLinks(arrObj3)).toEqual(10);

    });
});
describe('gettingUniqueLinks', () => {
    it('debería ser una función', () => {
        expect(typeof gettingUniqueLinks).toBe('function');
    });
    it('Debería  retornar  un numero que representa el total de links unicos (objetos unicos) dentro del array)', () => {

        expect(gettingUniqueLinks(arrObj3)).toEqual(7);

    });
});

describe('gettingBrokenLinks', () => {
    it('debería ser una función', () => {
        expect(typeof gettingBrokenLinks).toBe('function');
    });
    it('Debería  retornar  un numero que representa el total de links rotos)', () => {

        expect(gettingBrokenLinks(arrObj3)).toEqual(2);

    });
});




const output13 = `Total:28,Unique:19`;
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


const output14 = `Total:28,Unique:19,Broken:1`;
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

const output15 = `Total:28,Unique:19,Broken:1`;
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
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://dzone.com/articles/how-single-page-web-applications-actually-work
versión traducida
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://darwindigital.com/mobile-first-versus-responsive-web-design/
mobile first
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://translate.google.com/translate?hl=&sl=auto&tl=es&u=https%3A%2F%2Fdarwindigital.com%2Fmobile-first-versus-responsive-web-design
versión traducida
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import
<code>import</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export
<code>export</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador
MVC
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/
<em>mobile first</em>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://developer.mozilla.org/es/docs/DOM/Manipulando_el_historial_del_navegador
manipulando el historial del navegador
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://developer.mozilla.org/es/docs/Web/API/Window/history
<code>window.history</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://firebase.google.com/
Firebase
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://firebase.google.com/docs/auth/
<code>Firebase authentication</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://firebase.google.com/docs/firestore/security/get-started
<code>Firestore security rules</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://css-tricks.com/snippets/css/a-guide-to-flexbox/
<code>flexbox</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://developer.mozilla.org/es/docs/CSS/Media_queries
<code>media queries</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export
Modulos: Export
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import
Modulos: Import
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/
Diseño web
 responsive design y la importancia del mobile first - Media Click
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://www.1and1.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/
Mobile First: el enfoque actual del diseño web móvil - 1and1
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://desarrolloweb.com/articulos/mobile-first-responsive.html
Mobile First - desarrolloweb.com
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://zurb.com/word/mobile-first
Mobile First - ZURB
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md
https://www.nngroup.com/articles/mobile-first-not-mobile-only/
Mobile First Is NOT Mobile Only - Nielsen Norman Group
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import
<code>import</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export
<code>export</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md
https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador
MVC
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/hola.md
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export
Modulos: Export
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/lucero.md
http://yoursite.com/new-link-to-replace/
Error: 404`;
const output11 = `/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/lulu/luz.md https://developer.mozilla.org/es/docs/CSS/Media_queries <code>media queries</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://dzone.com/articles/how-single-page-web-applications-actually-work SPA,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://dzone.com/articles/how-single-page-web-applications-actually-work versión traducida,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://darwindigital.com/mobile-first-versus-responsive-web-design/ mobile first,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://translate.google.com/translate?hl=&sl=auto&tl=es&u=https%3A%2F%2Fdarwindigital.com%2Fmobile-first-versus-responsive-web-design versión traducida,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import <code>import</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export <code>export</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador MVC,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/ <em>mobile first</em>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/DOM/Manipulando_el_historial_del_navegador manipulando el historial del navegador,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/Web/API/Window/history <code>window.history</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://firebase.google.com/ Firebase,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://firebase.google.com/docs/auth/ <code>Firebase authentication</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://firebase.google.com/docs/firestore/security/get-started <code>Firestore security rules</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://css-tricks.com/snippets/css/a-guide-to-flexbox/ <code>flexbox</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/CSS/Media_queries <code>media queries</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export Modulos: Export,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import Modulos: Import,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/ Diseño web, responsive design y la importancia del mobile first - Media Click,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://www.1and1.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/ Mobile First: el enfoque actual del diseño web móvil - 1and1,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://desarrolloweb.com/articulos/mobile-first-responsive.html Mobile First - desarrolloweb.com,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://zurb.com/word/mobile-first Mobile First - ZURB,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://www.nngroup.com/articles/mobile-first-not-mobile-only/ Mobile First Is NOT Mobile Only - Nielsen Norman Group,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import <code>import</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export <code>export</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador MVC,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/hola.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export Modulos: Export,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/lucero.md http://yoursite.com/new-link-to-replace/ Error: 404`;
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
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://dzone.com/articles/how-single-page-web-applications-actually-work OK 200 versión traducida
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://darwindigital.com/mobile-first-versus-responsive-web-design/ OK 200 mobile first
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://translate.google.com/translate?hl=&sl=auto&tl=es&u=https%3A%2F%2Fdarwindigital.com%2Fmobile-first-versus-responsive-web-design OK 200 versión traducida
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import OK 200 <code>import</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export OK 200 <code>export</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador OK 200 MVC
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/ OK 200 <em>mobile first</em>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/DOM/Manipulando_el_historial_del_navegador OK 200 manipulando el historial del navegador
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/Web/API/Window/history OK 200 <code>window.history</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://firebase.google.com/ OK 200 Firebase
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://firebase.google.com/docs/auth/ OK 200 <code>Firebase authentication</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://firebase.google.com/docs/firestore/security/get-started OK 200 <code>Firestore security rules</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://css-tricks.com/snippets/css/a-guide-to-flexbox/ OK 200 <code>flexbox</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/CSS/Media_queries OK 200 <code>media queries</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export OK 200 Modulos: Export
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import OK 200 Modulos: Import
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/ OK 200 Diseño web
 responsive design y la importancia del mobile first - Media Click
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://www.1and1.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/ OK 200 Mobile First: el enfoque actual del diseño web móvil - 1and1
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://desarrolloweb.com/articulos/mobile-first-responsive.html OK 200 Mobile First - desarrolloweb.com
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://zurb.com/word/mobile-first OK 200 Mobile First - ZURB
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://www.nngroup.com/articles/mobile-first-not-mobile-only/ OK 200 Mobile First Is NOT Mobile Only - Nielsen Norman Group
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import OK 200 <code>import</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export OK 200 <code>export</code>
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador OK 200 MVC
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/hola.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export OK 200 Modulos: Export
/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/lucero.md http://yoursite.com/new-link-to-replace/ fail 404 Error: 404`;
const output12 = `/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/lulu/luz.md https://developer.mozilla.org/es/docs/CSS/Media_queries OK 200 <code>media queries</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://dzone.com/articles/how-single-page-web-applications-actually-work OK 200 SPA,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://dzone.com/articles/how-single-page-web-applications-actually-work OK 200 versión traducida,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://darwindigital.com/mobile-first-versus-responsive-web-design/ OK 200 mobile first,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://translate.google.com/translate?hl=&sl=auto&tl=es&u=https%3A%2F%2Fdarwindigital.com%2Fmobile-first-versus-responsive-web-design OK 200 versión traducida,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import OK 200 <code>import</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export OK 200 <code>export</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador OK 200 MVC,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/ OK 200 <em>mobile first</em>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/DOM/Manipulando_el_historial_del_navegador OK 200 manipulando el historial del navegador,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/Web/API/Window/history OK 200 <code>window.history</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://firebase.google.com/ OK 200 Firebase,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://firebase.google.com/docs/auth/ OK 200 <code>Firebase authentication</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://firebase.google.com/docs/firestore/security/get-started OK 200 <code>Firestore security rules</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://css-tricks.com/snippets/css/a-guide-to-flexbox/ OK 200 <code>flexbox</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/CSS/Media_queries OK 200 <code>media queries</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export OK 200 Modulos: Export,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import OK 200 Modulos: Import,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/ OK 200 Diseño web, responsive design y la importancia del mobile first - Media Click,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://www.1and1.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/ OK 200 Mobile First: el enfoque actual del diseño web móvil - 1and1,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://desarrolloweb.com/articulos/mobile-first-responsive.html OK 200 Mobile First - desarrolloweb.com,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://zurb.com/word/mobile-first OK 200 Mobile First - ZURB,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md https://www.nngroup.com/articles/mobile-first-not-mobile-only/ OK 200 Mobile First Is NOT Mobile Only - Nielsen Norman Group,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import OK 200 <code>import</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export OK 200 <code>export</code>,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/me.md https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador OK 200 MVC,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/hola.md https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export OK 200 Modulos: Export,/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/lucero.md http://yoursite.com/new-link-to-replace/ fail 404 Error: 404`;
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