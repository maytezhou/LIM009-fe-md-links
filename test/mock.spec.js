import mock from 'mock-fs';
import { gettingAbsolutePath } from '../src/path.js';
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


describe.only('gettingAbsolutePath', () => {
    it('debería ser una función', () => {
        expect(typeof gettingAbsolutePath).toBe('function');
    });
    it('Debería poder convetir la ruta relativa a ruta absoluta', () => {
        //  /home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos/hola.md
        expect(gettingAbsolutePath(path.join(cwd, 'archivos'))).toEqual('/home/maytezhou/Desktop/MD-LINKS/LIM009-fe-md-links/archivos');

    });
});