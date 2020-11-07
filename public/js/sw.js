const CACHE_NAME = 'localCache';
let {assets} = global.serviceWorkerOption;
assets = assets.map((asset) => String.prototype.concat('/dist', asset));
const cacheUrls = [];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => (cache.addAll(cacheUrls)))
    );
});

// self.addEventListener('activate', (event) => {
//     event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
//         cache.keys().then((requests) => {
//             return Promise.all(
//                 requests
//                     .filter((request) => {
//                         const url = new URL(request.url);
//                         return !url.pathname.includes('/public/') && !assets.includes(url.pathname);
//                     })
//                     .map((request) => cache.delete(request))
//             );
//         });
//     }));
// });

self.addEventListener('activate', (event) => {
    console.log('Service worker activated!');
});

// self.addEventListener('fetch', (event) => {
//     event.respondWith(caches.open(CACHE_NAME).then((cache) =>
//         cache.match(event.request).then((cachedResponse) => {
//             const url = new URL(event.request.url);
//             const staticCheck = url.pathname.includes('/public/') && url.pathname.includes('.');
//             const distCheck = url.pathname.includes('/dist/');
//             if ((!navigator.onLine || staticCheck || distCheck) && cachedResponse) {
//                 return cachedResponse;
//             }
//
//             return fetch(event.request)
//                 .then((response) => {
//                     if (staticCheck || distCheck) {
//                         cache.put(event.request, response.clone());
//                     }
//                     return response;
//                 })
//                 .catch((err) => {
//                     if (event.request.mode === 'navigate') {
//                         console.log("error fetching ", err);
//                     }
//                 });
//         })));
// });