'use strict';

(function () {
  var STATISTIC_DATA = {
    CLOUD: {
      X: 100,
      Y: 10,
      WIDTH: 420,
      HEIGHT: 270,
      SHADOW_OFFSET: 10
    },
    FONT: {
      SIZE: '16px',
      FAMILY: 'PT Mono',
      HEIGHT: 10,
      GAP: 10
    },
    BAR: {
      WIDTH: 40,
      HEIGHT: 150,
      GAP: 50
    }
  };

  var KEYCODE = {
    ENTER: 13,
    ESC: 27
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
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
    statistic: STATISTIC_DATA,
    getRandomNumber: getRandomNumber,
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent
  };
})();
