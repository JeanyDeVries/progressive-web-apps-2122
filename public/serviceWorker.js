const CORE_CACHE_VERSION = 'v10'
const CORE_ASSETS = [
  '/js/main.js',
  '/css/stylesheet.css',
  `/offline`
];

//precaching
self.addEventListener('install', event => {
    event.waitUntil(
    caches.open(CORE_CACHE_VERSION)
    .then(cache => cache.addAll(CORE_ASSETS))
    .then(() => self.skipWaiting()))
 });

self.addEventListener('activate', () =>{
    console.log('Activating service worker')
    return self.clients.claim();
});

self.addEventListener('fetch', event => {
    if (isCoreGetRequest(event.request)) 
    {
        console.log('Core get request: ', event.request.url);
        // cache only strategy
        event.respondWith(
        caches.open(CORE_CACHE_VERSION)
        .then(cache => cache.match(event.request.url)))
    } 
    else if (isHtmlGetRequest(event.request)) 
    {
        event.respondWith(
            caches.open('html-cache')
            .then(cache => {
              event.waitUntil(
                cache.keys().then(function(keys) {
                  keys.forEach((request, index) =>{
                    if(index >= 10){
                      cache.delete(request);
                    }
                  });
                })
              )   
              return cache.match(event.request.url) 
            })
            .then(response => response ? response : fetchAndCache(event.request, 'html-cache'))
            .catch(e => {
                return caches.open(CORE_CACHE_VERSION)
                // generic fallback
                .then(cache => cache.match('/offline'))
            }))
    }
});

function fetchAndCache(request, cacheName) {
    return fetch(request)
      .then(response => {
        if (!response.ok) {
          throw new TypeError('Bad response status');
        }
  
        const clone = response.clone()
        caches.open(cacheName).then((cache) => cache.put(request, clone))
        return response
      })
  }
  
  /**
   * Checks if a request is a GET and HTML request
   *
   * @param {Object} request        The request object
   * @returns {Boolean}            Boolean value indicating whether the request is a GET and HTML request
   */
  function isHtmlGetRequest(request) {
      //application/octet-stream
    return request.method === 'GET' && (request.headers.get('accept') !== null && request.headers.get('accept').indexOf('text/html') > -1);
  }
  
  /**
   * Checks if a request is a core GET request
   *
   * @param {Object} request        The request object
   * @returns {Boolean}            Boolean value indicating whether the request is in the core mapping
   */
  function isCoreGetRequest(request) {
    return request.method === 'GET' && CORE_ASSETS.includes(getPathName(request.url));
  }
  
  /**
   * Get a pathname from a full URL by stripping off domain
   *
   * @param {Object} requestUrl        The request object, e.g. https://www.mydomain.com/index.css
   * @returns {String}                Relative url to the domain, e.g. index.css
   */
  function getPathName(requestUrl) {
    const url = new URL(requestUrl);
    return url.pathname;
  }


