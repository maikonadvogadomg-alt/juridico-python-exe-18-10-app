// service-worker.js — gerado pelo Mini SK em 18/10/2026, 22:57:33
// Não precisa mexer: ele guarda sozinho o que o app usa.
const PREFIXO = 'sk-juridico-python-exe-18-10-';
const CACHE = PREFIXO + 'mveltuf6';
// Lista feita automaticamente (para funcionar sem internet logo após instalar)
const GUARDAR = [
  "./",
  "./abrir.py",
  "./favicon.ico",
  "./icone.ico",
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
  "./LEIA-ME.md",
  "./manifest.json",
  "./PLANO.md",
  "./www/_redirects",
  "./www/assets/_commonjs-dynamic-modules-TDtrdbi3.js",
  "./www/assets/app-unico.js",
  "./www/assets/index-B-XLeRRI.css",
  "./www/assets/index-BTbp-g6q.js",
  "./www/assets/index-Btye5XlG.js",
  "./www/assets/mammoth.browser-BPa7Y1iS.js",
  "./www/assets/pdf-gh-BrLFn.js",
  "./www/assets/pdf.worker-BgryrOlp.mjs",
  "./www/assets/tiptap-DRvc6u7f.js",
  "./www/assets/ui-BFodMM-g.js",
  "./www/assets/vendor-I2kAlhUy.js",
  "./www/auditoria.html",
  "./www/conserto-ia.js",
  "./www/favicon.ico",
  "./www/favicon.svg",
  "./www/icon-192.png",
  "./www/icon-512.png",
  "./www/icon.svg",
  "./www/icons/apple-touch-icon.png",
  "./www/icons/icon-16.png",
  "./www/icons/icon-32.png",
  "./www/icons/icon-48.png",
  "./www/icons/icon-72.png",
  "./www/icons/icon-96.png",
  "./www/icons/icon-128.png",
  "./www/icons/icon-144.png",
  "./www/icons/icon-152.png",
  "./www/icons/icon-180.png",
  "./www/icons/icon-192.png",
  "./www/icons/icon-384.png",
  "./www/icons/icon-512.png",
  "./www/icons/icon.svg",
  "./www/icons/maskable-192.png",
  "./www/icons/maskable-512.png",
  "./www/icons/maskable.svg",
  "./www/index.html",
  "./www/manifest.json",
  "./www/manifest.webmanifest",
  "./www/opengraph.jpg",
  "./www/service-worker.js"
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
