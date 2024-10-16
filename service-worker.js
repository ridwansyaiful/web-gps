self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('location-tracker-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/monitor.html',
                '/manifest.json',
                '/firebase-config.js',
                '/firebase-app.js',
                '/firebase-database.js',
                // Tambahkan file lain yang diperlukan
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
