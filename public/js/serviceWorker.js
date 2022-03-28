const CORE_CACHE_NAME = 'core-cache'; 
const CORE_ASSETS = [
  '/views/partials/footer.ejs',
  '/views/partials/head.ejs',
  '/views/index.ejs',
  '/css/stylesheet.css',
];

self.addEventListener('install', event => {
  event.waitUntil(
  caches.open(CORE_CACHE_NAME)
  .then(cache => cache.addAll(CORE_ASSETS))
  .then(() => self.skipWaiting())
  )
 });