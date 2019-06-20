import { gettingUniqueLinks, gettingBrokenLinks, gettingTotalLinks } from '../src/index.js';
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