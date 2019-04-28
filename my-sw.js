importScripts("https://rosong1.github.io/foodPage/precache-manifest.fcd45c9208c29ce914d4f2f56a21dd62.js", "https://rosong1.github.io/foodPage/workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "https://rosong1.github.io/foodPage/workbox-v3.6.3"});
/* globals workbox */
/* eslint-disable no-restricted-globals */
workbox.core.setCacheNameDetails({
    prefix: 'bbq-mobile-template',
    suffix: 'v1',
  });
  // Control all opened tabs ASAP
  workbox.clientsClaim();
  
  /**
   * Use precaching list generated by workbox in build process.
   * https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.precaching
   */
  /* eslint-disable no-underscore-dangle */
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
  
  /**
   * Register a navigation route.
   * https://developers.google.com/web/tools/workbox/modules/workbox-routing#how_to_register_a_navigation_route
   */
  workbox.routing.registerNavigationRoute('/index.html');
  
  /**
   * Use runtime cache:
   * https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.routing#.registerRoute
   *
   * Workbox provides all common caching strategies including CacheFirst, NetworkFirst etc.
   * https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.strategies
   */
  
  /**
   * Handle API requests
   */
  workbox.routing.registerRoute(/\/api\//, workbox.strategies.networkFirst());
  
  /**
   * Handle third party requests
   */
  workbox.routing.registerRoute(
    /^https:\/\/as.alipayobjects.com\//,
    workbox.strategies.networkFirst()
  );
  workbox.routing.registerRoute(
    /^https:\/\/rosong1.github.io\/foodPage\//,
    workbox.strategies.networkFirst()
  );
 
  
  /**
   * Response to client after skipping waiting with MessageChannel
   */
  addEventListener('message', event => {
    const replyPort = event.ports[0];
    const message = event.data;
    if (replyPort && message && message.type === 'skip-waiting') {
      event.waitUntil(
        self
          .skipWaiting()
          .then(
            () => replyPort.postMessage({ error: null }),
            error => replyPort.postMessage({ error })
          )
      );
    }
  });
  
