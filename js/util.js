'use strict';

(function () {
  var KEYCODE = {
    ENTER: 13,
    ESC: 27
  };

  var isEnterEvent = function (evt, action) {
    if (evt.which === KEYCODE.ENTER) {
      action();
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.which === KEYCODE.ESC) {
      action();
    }
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent
  };
})();
