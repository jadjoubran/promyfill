function supports(api) {
    return new Promise(function (resolve, reject) {
        if (!!api) {
            resolve(api);
        }
        reject(false);
    });
}

function loadPolyfill(src) {
    return new Promise(function (resolve, reject) {
        if (!src) {
            reject(false);
        }
        var p = document.createElement('script');
        p.async = 1; p.defer = 1;
        p.src = src;
        p.onload = function(){resolve(src)};
        p.onerror = function(){reject()};
        window.document.body.appendChild(p);
    });
}

export function promyfill(api, polyfillUrl) {
    return new Promise(function (resolve, reject) {
        supports(api).then(function () {
            resolve(api);
        }).catch(function () {
            loadPolyfill(polyfillUrl).then(function () {
                resolve(api);
            });
        });
    });
}
