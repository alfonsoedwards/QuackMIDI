// Guarda la app para que funcione sin internet. Cambia de versión con cada actualización.
const V='quack-midi-02d300c2';
const FILES=['./','index.html','nunito.woff2','manifest.webmanifest','icon5a-192.png','icon5a-512.png','icon5m-192.png','icon5m-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))));self.clients.claim();});
// Primero la red (para recibir actualizaciones); sin conexión, lo guardado.
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;   // Google/Drive nunca se guardan aquí
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));});
