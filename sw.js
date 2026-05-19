// Text Formatter — Service Worker
// Network-first for HTML so new deploys show up immediately.
// Cache-first for static assets (icon, manifest) since they rarely change.

const CACHE_NAME = 'text-formatter-v2';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

// On install: pre-cache all static assets, then take over immediately.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// On activate: delete any caches that aren't the current version.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// On fetch:
//   - For navigations / HTML: network-first, fall back to cache offline.
//   - For everything else: cache-first, fall back to network.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const isHTML =
    req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    event.respondWith(
      fetch(req)
        .then(res => {
          // Update the cached copy in the background.
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then(c => c || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req))
  );
});
