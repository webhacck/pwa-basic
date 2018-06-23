var CACHE_NAME = '【キャッシュ名】';
var urlsToCache = [
  '/',
  'manifest.json',
  'client.js'
];


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      
        return cache.addAll(urlsToCache);
      
    })
  );
});



self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(cacheName) {
      
        if (cacheWhitelist.indexOf(cacheName) === -1) return caches.delete(cacheName);
        
      }));
    })
  );
  
});



self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

