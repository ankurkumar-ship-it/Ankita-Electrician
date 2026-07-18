// Cache ka naam aur files jo save karni hain
const CACHE_NAME = 'ankita-electrician-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/image/logo.png',
  '/image/icon.png',
  '/image/call.png',
  '/image/home.png',
  '/image/battery.png',
  '/image/power-plug.png',
  '/image/Fan.png',
  '/image/light.png',
  '/image/check.png',
  '/image/thanks.png',
  '/image/Whatsapp.png'
];

// Install Event - Jab app pehli baar load ho toh files download karke save kar lo
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Event - Jab koi naya page ya image load ho, toh pehle cache me check karo
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Agar file cache me mil gayi toh wahi se de do, warna internet se download karo
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate Event - Purane cache delete karne ke liye (agar aap update karte hain)
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