// Define a unique cache name. Change this whenever you update your files.
const CACHE_NAME = 'random-letter-generator-v1';

// List all the files and assets your app needs to function offline.
const URLS_TO_CACHE = [
  '/', // This represents the root, which serves index.html
  'index.html',
  'manifest.json',
  // You must list ALL your sound files here.
  // I've generated the list for you based on your script.
  'sounds/A.mp3',
  'sounds/H.mp3',
  'sounds/C.mp3',
  'sounds/D.mp3',
  'sounds/E.mp3',
  'sounds/F.mp3',
  'sounds/G.mp3',
  'sounds/Asharp.mp3',
  'sounds/Aflat.mp3',
  'sounds/Bflat.mp3',
  'sounds/Csharp.mp3',
  'sounds/Cflat.mp3',
  'sounds/Dsharp.mp3',
  'sounds/Dflat.mp3',
  'sounds/Eflat.mp3',
  'sounds/Fsharp.mp3',
  'sounds/Fflat.mp3',
  'sounds/Gsharp.mp3',
  'sounds/Gflat.mp3',
  // Add your icon files too
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-512.png'
];

// 1. Install the service worker and cache the assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// 2. Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the request is in the cache, return it.
        // Otherwise, fetch it from the network.
        return response || fetch(event.request);
      })
  );
});

// 3. Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});