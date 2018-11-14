'use strict';

(function () {
  var WIZARD = {
    NUMBER: 4,
    NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

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
    wizard: WIZARD,
    statistic: STATISTIC_DATA,
    keycode: KEYCODE,
    getRandomNumber: getRandomNumber,
    generateData: generateData,
    changeColor: changeColor,
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent
  };
})();
