// A minimal service worker to pass the PWA installation requirements
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
});

self.addEventListener('fetch', (event) => {
    // We don't need to cache anything for offline use since this is a live radio
    return;
});
