const cacheName = 'pwa-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/manifest.json',
  // Tambahkan file CSS, JS, dan lainnya jika diperlukan
];

// Install Service Worker dan cache file
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[Service Worker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting(); // Langsung aktif tanpa menunggu service worker lama
});

// Activate event untuk membersihkan cache lama
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          console.log('[Service Worker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// Mengambil resource dari cache saat offline
self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetching resource:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Background Sync untuk mengirim data lokasi saat kembali online
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-location') {
    console.log('[Service Worker] Syncing location...');
    event.waitUntil(syncLocationData());
  }
});

function syncLocationData() {
  return new Promise((resolve, reject) => {
    // Dummy function untuk simulasi pengiriman data lokasi
    fetch('/send-location', {
      method: 'POST',
      body: JSON.stringify({ latitude: 0, longitude: 0 }), // Ganti dengan data lokasi aktual
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      if (response.ok) {
        console.log('[Service Worker] Location synced');
        resolve();
      } else {
        console.log('[Service Worker] Location sync failed');
        reject();
      }
    }).catch(error => {
      console.log('[Service Worker] Sync failed:', error);
      reject();
    });
  });
}

// Push Notification handling
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.');
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Push Notification';
  const options = {
    body: data.body || 'Default body',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Event listener for notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/') // Buka kembali aplikasi ketika notifikasi diklik
  );
});
