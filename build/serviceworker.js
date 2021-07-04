//cache stands for storage of the browser if we load something once 
// if we make a request for example if you load a image you dont have to load a image every time 
//when you go online you just take it from the cache 'its faster and more effecctive'.
const CACHE_NAME = "version-1";

//here offline.html is used when we offline
const urlsToCache = [
    "/static/css/main.a56a16e9.chunk.css",
    "/static/js/main.be828e27.chunk.js",
    "/static/js/main.be828e27.chunk.js.map",
    "/static/js/runtime-main.ba3ed84e.js",
    "/static/js/runtime-main.ba3ed84e.js.map",
    "/static/js/2.ec6ee7fb.chunk.js",
    "/static/js/2.ec6ee7fb.chunk.js.map",
    "/index.html",
    "/precache-manifest.7289731fd6ad18bbaec010fb3d1e8bc8.js",
    "/service-worker.js",
    "/static/css/main.a56a16e9.chunk.css.map",
    "/static/js/2.ec6ee7fb.chunk.js.LICENSE.txt"
];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)//here request means EX: you need to see a image you send request
            .then((response) => {
                if (response) {
                    return response
                }
                return fetch(event.request)
                // .catch(() => caches.match('offline.html'))
            })
    )
});

// Activate the SW
self.addEventListener('activate', (event) => {
    // const cacheWhitelist = [];
    // cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheNames) => {
                }).map((cacheName) => {
                    // if (!cacheWhitelist.includes(cacheName)) {//if cacheWhitelist does not include a cacheName then return
                    return caches.delete(cacheName);
                    // }
                })
            )
        }
        )

    )
});
