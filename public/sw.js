const CACHE_NAME = 'astra-assets-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  const isVideo = request.destination === 'video' || 
                  url.pathname.endsWith('.mp4') || 
                  url.pathname.endsWith('.webm');

  if (isVideo) {
    event.respondWith(handleRangeRequest(event));
  } else {
    // Cache-first for images, fonts, scripts, stylesheets
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        });
      })
    );
  }
});

// Range request helper for cached videos to support partial streaming
async function handleRangeRequest(event) {
  const request = event.request;
  const cache = await caches.open(CACHE_NAME);
  
  // Match without Range headers
  const cacheKey = new Request(request.url, { headers: {} });
  let response = await cache.match(cacheKey);

  if (!response) {
    try {
      response = await fetch(cacheKey);
      if (response && response.status === 200) {
        await cache.put(cacheKey, response.clone());
      }
    } catch (e) {
      return fetch(request);
    }
  }

  const rangeHeader = request.headers.get('range');
  if (!rangeHeader) {
    return response;
  }

  const total = response.headers.get('content-length') ? parseInt(response.headers.get('content-length'), 10) : null;
  if (!total) {
    return response;
  }

  const bounds = rangeHeader.trim().replace(/bytes=/, '').split('-');
  const start = parseInt(bounds[0], 10);
  const end = bounds[1] ? parseInt(bounds[1], 10) : total - 1;

  try {
    const arrayBuffer = await response.arrayBuffer();
    const slicedBuffer = arrayBuffer.slice(start, end + 1);

    return new Response(slicedBuffer, {
      status: 206,
      statusText: 'Partial Content',
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'video/mp4',
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Content-Length': slicedBuffer.byteLength,
        'Accept-Ranges': 'bytes'
      }
    });
  } catch (err) {
    return fetch(request);
  }
}
