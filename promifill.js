function supports(api) {
    return new Promise(function (resolve, reject) {
        if (!!api) {
            resolve(api);
        }
        reject(api);
    });
}

function loadPolyfill(src) {
    return new Promise(function (resolve, reject) {
        if (!src) {
            reject();
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

export function promifill(api, polyfillUrl) {
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