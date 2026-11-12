const CACHE='tmk-gestion-v1';
const CORE=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET') return;
 event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{
  const copy=res.clone(); caches.open(CACHE).then(c=>c.put(req,copy)); return res;
 }).catch(()=>caches.match('./index.html'))));
});
