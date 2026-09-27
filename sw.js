const BLOCKED_HOSTS = ['busi-min', 'busi_min', 'nullput_error_log.php'];
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    for (const h of BLOCKED_HOSTS) {
        if (url.pathname.includes(h) || url.hostname.includes(h)) {
            event.respondWith(new Response('// Blocked', { status: 200 }));
            return;
        }
    }
});
