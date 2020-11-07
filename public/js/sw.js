const CACHE_NAME = 'localCache';
let {assets} = global.serviceWorkerOption;
assets = assets.map((asset) => String.prototype.concat('/dist', asset));
// const cacheUrls = [];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => (cache.addAll(assets)))
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activated!');
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    function(response) {
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        let responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});