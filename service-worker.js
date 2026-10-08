// service-worker.js — gerado pelo Mini SK em 08/10/2026, 13:50:19
// Não precisa mexer: ele guarda sozinho o que o app usa.
const PREFIXO = 'sk-sk2-';
const CACHE = PREFIXO + 'muzrvl1p';
// Lista feita automaticamente (para funcionar sem internet logo após instalar)
const GUARDAR = [
  "./",
  "./404.html",
  "./assets/index-CMI17gg_.js",
  "./assets/index-CszvMv4M.css",
  "./assets/vendor-fs-BeamS8bA.js",
  "./assets/vendor-highlight-Bu9o_ty_.js",
  "./assets/vendor-highlight-DOOs4slz.css",
  "./assets/vendor-lucide-NZRTcJIq.js",
  "./assets/vendor-markdown-CM6-e2rl.js",
  "./assets/vendor-misc-COW7C1HQ.js",
  "./assets/vendor-monaco-CS9w1txC.js",
  "./assets/vendor-react-D8m3Uig9.js",
  "./assets/vendor-react-dom-CdNyEL3a.js",
  "./assets/vendor-webcontainer-BPoiPq3D.js",
  "./assets/vendor-xterm-CT6HrMBF.js",
  "./assets/vendor-xterm-DDGTF8rc.css",
  "./favicon.ico",
  "./favicon.svg",
  "./guia-completo-apk.md",
  "./hub.html",
  "./hub.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/icon-16.png",
  "./icons/icon-32.png",
  "./icons/icon-48.png",
  "./icons/icon-72.png",
  "./icons/icon-96.png",
  "./icons/icon-128.png",
  "./icons/icon-144.png",
  "./icons/icon-152.png",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-384.png",
  "./icons/icon-512.png",
  "./icons/icon.svg",
  "./icons/maskable-192.png",
  "./icons/maskable-512.png",
  "./icons/maskable.svg",
  "./index.html",
  "./manifest.json",
  "./manual-dev.md",
  "./MANUAL-SK-CODE-EDITOR.md",
  "./opengraph.jpg",
  "./sw.js"
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(GUARDAR.map((u) => c.add(u).catch(() => null)))));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((ks) => Promise.all(ks.filter((k) => k.startsWith(PREFIXO) && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Primeiro a internet (sempre a versão nova); sem internet, a cópia guardada.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then((res) => {
      if (res.ok) { const copia = res.clone(); caches.open(CACHE).then((c) => c.put(req, copia)); }
      // Igual ao Workbox da Replit: página que não existe (rota do app) abre o index
      if (res.status === 404 && req.mode === 'navigate') return caches.match('./').then((r) => r || fetch('./'));
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || (req.mode === 'navigate' ? caches.match('./') : undefined)))
  );
});
