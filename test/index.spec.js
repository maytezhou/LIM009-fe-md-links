import { verifyingIfisAMarkdownFile, gettingAbsolutePath } from '../src/path.js';
import { gettingArrOfMarkdownFiles, gettingArrObjOfMdLinks, gettingUniqueLinks, gettingBrokenLinks, gettingTotalLinks, gettingStatsOfUrl } from '../src/index.js';

import { readDir, readFile } from '../src/read-controller.js';


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

        expect(gettingAbsolutePath('archivos/hola.md')).toEqual('/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/hola.md');

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

        expect(gettingArrOfMarkdownFiles('/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos')).toEqual(arrOfMarkdownPaths);

    });
});

const arrObjOfMdLinks = [{
        href: 'https://developer.mozilla.org/es/docs/CSS/Media_queries',
        text: '<code>media queries</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/lulu/luz.md'
    },
    {
        href: 'https://dzone.com/articles/how-single-page-web-applications-actually-work',
        text: 'SPA',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://dzone.com/articles/how-single-page-web-applications-actually-work',
        text: 'versión traducida',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://darwindigital.com/mobile-first-versus-responsive-web-design/',
        text: 'mobile first',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://translate.google.com/translate?hl=&sl=auto&tl=es&u=https%3A%2F%2Fdarwindigital.com%2Fmobile-first-versus-responsive-web-design',
        text: 'versión traducida',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
        text: '<code>import</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export',
        text: '<code>export</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador',
        text: 'MVC',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/',
        text: '<em>mobile first</em>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/DOM/Manipulando_el_historial_del_navegador',
        text: 'manipulando el historial del\nnavegador',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/API/Window/history',
        text: '<code>window.history</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://firebase.google.com/',
        text: 'Firebase',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://firebase.google.com/docs/auth/',
        text: '<code>Firebase authentication</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://firebase.google.com/docs/firestore/security/get-started',
        text: '<code>Firestore security rules</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
        text: '<code>flexbox</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/CSS/Media_queries',
        text: '<code>media queries</code>',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export',
        text: 'Modulos: Export',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
        text: 'Modulos: Import',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/',
        text: 'Diseño web, responsive design y la importancia del mobile first - Media Click',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
        href: 'https://www.1and1.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/',
        text: 'Mobile First: el enfoque actual del diseño web móvil - 1and1',
        file: '/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/example/lola/susan.md'
    },
    {
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
];
describe('gettingArrObjOfMdLinks', () => {
    it('debería ser una función', () => {
        expect(typeof gettingArrObjOfMdLinks).toBe('function');
    });
    it('Debería  retornar  un array de objetos(c/object representa un link con propiedad href,text y file)', () => {

        expect(gettingArrObjOfMdLinks(arrOfMarkdownPaths)).toEqual(arrObjOfMdLinks);

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
    it('Debería  retornar  una promesa  que resuelve un array de objetos)', () => {

        return gettingStatsOfUrl(input4).then((response) => {
            expect(response).toEqual(output4)
        })

    });
});



const output = ['example', 'hello.md', 'hola.md', 'lucero.md'];
describe(' readDir', () => {
    it('debería ser una función', () => {
        expect(typeof readDir).toBe('function');
    });
    it('Debería  retornar  un array de strings con el nombre de cada elemento dentro de la carpeta', () => {

        expect(readDir('/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos')).toEqual(output);

    });
});
const output2 = 'Otras: [Modulos: Export](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export)';

describe(' readFile', () => {
    it('debería ser una función', () => {
        expect(typeof readFile).toBe('function');
    });
    it('Debería  retornar  un string con el contenido del file', () => {

        expect(readFile('/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/hola.md')).toEqual(output2);

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
    it('Debería  retornar  un numero que representa el total de links rotos (object.herf) dentro del array)', () => {

        expect(gettingBrokenLinks(arrObj3)).toEqual(2);

    });
});