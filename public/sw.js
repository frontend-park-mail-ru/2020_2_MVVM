const CACHE_NAME = "localCache";
let { assets } = global.serviceWorkerOption;
// assets = assets.map((asset) => String.prototype.concat('/dist', asset));
assets.push("./public/fallback.html");

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(assets))
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activated!");
});

self.addEventListener("fetch", function (event) {
  if (navigator.onLine) {
    return fetch(event.request);
  }

  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request);
      })
      .catch((err) => {
        console.error("smth went wrong with caches.match: ", err);
        return caches.match("./public/fallback.html");
      })
  );
});