const CACHE_NAME = 'moods-mobile-training-de-v1';
const FILES = ["./MOODS-version-hors-ligne.zip", "./hero-sweet.jpg", "./02-decouvrez-votre-saveur.jpg", "./manifest.json", "./hero-fusion.jpg", "./hero-sans-filtre.jpg", "./pack-fusion.jpg", "./pack-silver.jpg", "./07-silver-filter.jpg", "./hero-filter.jpg", "./index.html", "./01-accueil.jpg", "./pack-sans-filtre.jpg", "./05-gold-filter.jpg", "./LISEZ-MOI.txt", "./hero-gold.jpg", "./pack-double.jpg", "./icon-512.png", "./09-fusion-filter.jpg", "./06-double-filter.jpg", "./pack-sweet.jpg", "./04-filter.jpg", "./accueil-portrait.jpg", "./icon-180.png", "./03-sans-filtre.jpg", "./10-gout-prefere.jpg", "./08-sweet-filter.jpg", "./hero-silver.jpg", "./pack-gold.jpg", "./pack-filter.jpg", "./favicon.png", "./hero-double.jpg", "./icon-192.png"];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match('./index.html'))));
});
