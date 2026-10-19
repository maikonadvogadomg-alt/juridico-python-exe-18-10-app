// service-worker.js — gerado pelo Mini SK em 18/10/2026, 22:57:08
// Não precisa mexer: ele guarda sozinho o que o app usa.
const PREFIXO = 'sk-assistente-ia-juridico-';
const CACHE = PREFIXO + 'mveltavr';
// Lista feita automaticamente (para funcionar sem internet logo após instalar)
const GUARDAR = [
  "./",
  "./_redirects",
  "./assets/_commonjs-dynamic-modules-TDtrdbi3.js",
  "./assets/app-unico.js",
  "./assets/index-B-XLeRRI.css",
  "./assets/index-BTbp-g6q.js",
  "./assets/index-Btye5XlG.js",
  "./assets/mammoth.browser-BPa7Y1iS.js",
  "./assets/pdf-gh-BrLFn.js",
  "./assets/pdf.worker-BgryrOlp.mjs",
  "./assets/tiptap-DRvc6u7f.js",
  "./assets/ui-BFodMM-g.js",
  "./assets/vendor-I2kAlhUy.js",
  "./auditoria.html",
  "./conserto-ia.js",
  "./favicon.ico",
  "./favicon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./icon.svg",
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
  "./manifest.webmanifest",
  "./opengraph.jpg"
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
