// TateScribe service worker — caches the app shell so it opens offline.
// Transcription itself always goes to the network (api.elevenlabs.io) and is never cached.
const VERSION = "tatescribe-v4";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon.svg", "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.hostname.endsWith("elevenlabs.io")) return;
  // fonts: cache-first
  if (url.hostname.includes("fonts.googleapis.com") || url.hostname.includes("fonts.gstatic.com")) {
    e.respondWith(caches.open(VERSION).then(async c => {
      const hit = await c.match(e.request);
      if (hit) return hit;
      const res = await fetch(e.request);
      if (res.ok || res.type === "opaque") c.put(e.request, res.clone());
      return res;
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  // app shell: network-first so updates land quickly, cache as fallback
  e.respondWith(fetch(e.request).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html"))));
});
