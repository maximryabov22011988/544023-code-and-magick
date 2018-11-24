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

  var generateData = function (dataArray) {
    return dataArray[getRandomNumber(0, dataArray.length - 1)];
  };

  var changeColor = function (element, colors, input) {
    var newColor = window.util.generateData(colors);

    if (element.tagName === 'DIV') {
      element.style.backgroundColor = newColor;
    } else {
      element.style.fill = newColor;
    }

    input.value = newColor;
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
    generateData: generateData,
    changeColor: changeColor,
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent
  };
})();
