javascript
// Define a versioned cache name
const CACHE_NAME = 'stopwatch-app-cache-v1';

// List of essential files to cache
const CACHE_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/icon-192x192.png', // Replace with your actual icon paths
    '/icon-512x512.png'
];

// Install event: Cache essential files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(CACHE_ASSETS);
        })
    );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event: Serve cached files or fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached response or fetch from the network
            return response || fetch(event.request);
        })
    );
});
