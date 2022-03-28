if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('public/js/service-worker.js')
      .then(function(registration) {
        return registration.update();
        })
      });
   }