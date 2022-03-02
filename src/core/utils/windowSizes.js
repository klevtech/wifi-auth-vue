/**
 * Возвращает объект с размерами страницы, окна и прокрутки
 */
export default () => {
    let body = document.body;
    let result;

    if (!body) {
        body = document.getElementsByTagName('body');
        body = body.length > 0 ? body[0] : null;
    }

    result = {
        winW: window.innerWidth ? window.innerWidth : document.body.offsetWidth,
        winH: window.innerHeight ? window.innerHeight : document.documentElement.clientHeight,
        contW: body ? body.scrollWidth : null,
        contH: body ? body.scrollHeight : null,
        scrlX: typeof window.pageXOffset === 'number' ? window.pageXOffset : false,
        scrlY: typeof window.pageYOffset === 'number' ? window.pageYOffset : false
    };

    if (result.scrlX === false && body) {
        result.scrlX = body.scrollLeft || document.documentElement.scrollLeft;
        result.scrlY = body.scrollTop || document.documentElement.scrollTop - 100;
    }

    if (result.contW == null &&
        typeof document.documentElement !== 'undefined' &&
        typeof document.documentElement.clientWidth !== 'undefined' &&
        document.documentElement.clientWidth !== 0) {
        result.contW = document.width ? document.width : document.documentElement.clientWidth;
        result.contH = document.height ? document.height : document.documentElement.clientHeight;
    }

    return result;
};
