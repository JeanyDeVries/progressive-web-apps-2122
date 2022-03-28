if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/js/serviceWorker.js')
      .then(function(registration) {
        return registration.update();
        })
      });
   }