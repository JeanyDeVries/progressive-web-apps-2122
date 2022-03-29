const CORE_CACHE_VERSION = 'v2'
const CORE_ASSETS = [
  '/views/partials/footer.ejs',
  '/views/partials/head.ejs',
  '/js/main.js',
  '/css/stylesheet.css',
];

//precaching
self.addEventListener('install', event => {
    event.waitUntil(
    caches.open(CORE_CACHE_VERSION)
    .then(cache => cache.addAll(CORE_ASSETS))
    .then(() => self.skipWaiting()))
 });

self.addEventListener('activate', function(event) {
    console.log('Activating service worker')
    return self.clients.claim();
});

self.addEventListener('fetch', event => {
    console.log("fetch " + event.request.url)

});



