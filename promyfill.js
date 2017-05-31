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
        let p = document.createElement('script');
        p.type = 'text/javascript';
        p.async = true; p.defer = true;
        p.src = src;
        p.onload = () => resolve(src);
        p.onerror = () => reject();
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
