'use strict';

(function () {
  window.debounce = function (fn, interval) {
    var lastTimeout = null;

    return function () {
      var args = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        fn.apply(null, args);
      }, interval);
    };
  };
})();
