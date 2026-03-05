/**
 * Service Worker für Progressive Web App
 * Offline-Support + Caching Strategien
 */

const CACHE_VERSION = 'v2.0.0';
const CACHE_NAME = `energievergleichnrw-${CACHE_VERSION}`;

// Assets die sofort gecached werden sollen
const PRECACHE_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/favicon.ico'
];

// Cache Strategien
const CACHE_STRATEGIES = {
  // Netzwerk zuerst, dann Cache (für API Calls)
  networkFirst: async (request) => {
    try {
      const networkResponse = await fetch(request);
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    } catch (error) {
      const cachedResponse = await caches.match(request);
      return cachedResponse || caches.match('/offline');
    }
  },

  // Cache zuerst, dann Netzwerk (für statische Assets)
  cacheFirst: async (request) => {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;

    try {
      const networkResponse = await fetch(request);
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    } catch (error) {
      return caches.match('/offline');
    }
  },

  // Nur Netzwerk (für dynamische Inhalte)
  networkOnly: async (request) => {
    try {
      return await fetch(request);
    } catch (error) {
      return caches.match('/offline');
    }
  }
};

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event - Alte Caches löschen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Request Interception
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-GET requests
  if (request.method !== 'GET') return;

  // Ignore chrome-extension and other schemes
  if (!url.protocol.startsWith('http')) return;

  // Route to appropriate cache strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(CACHE_STRATEGIES.networkFirst(request));
  } else if (
    url.pathname.match(/\.(js|css|woff2|png|jpg|jpeg|svg|webp|avif)$/)
  ) {
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request));
  } else if (url.pathname === '/') {
    event.respondWith(CACHE_STRATEGIES.networkFirst(request));
  } else {
    event.respondWith(CACHE_STRATEGIES.networkFirst(request));
  }
});

// Background Sync für Offline-Formular-Submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

async function syncForms() {
  // Implementierung für Background Sync
  console.log('Syncing offline form submissions...');
}

// Push Notifications (Optional)
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || 'Neue Nachricht';
  const options = {
    body: data.body || '',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    vibrate: [200, 100, 200],
    data: data.url
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification Click Handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.notification.data) {
    event.waitUntil(
      clients.openWindow(event.notification.data)
    );
  }
});
