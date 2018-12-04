'use strict';

(function () {
  var COAT_COLORS = [
    'rgb(146, 100, 161)',
    'rgb(215, 210, 55)',
    'rgb(241, 43, 107)',
    'rgb(101, 137, 164)',
    'rgb(0, 0, 0)',
    'rgb(215, 210, 55)',
    'rgb(56, 159, 117)',
    'rgb(241, 43, 107)'
  ];

  var EYES_COLORS = [
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'blue',
    'purple'
  ];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var customWizard = document.querySelector('.setup-player');
  var wizardCoatElement = customWizard.querySelector('.wizard-coat');
  var wizardEyesElement = customWizard.querySelector('.wizard-eyes');
  var wizardFireballElement = customWizard.querySelector('.setup-fireball');
  var coatColorInput = customWizard.querySelector('input[name="coat-color"]');
  var eyesColorInput = customWizard.querySelector('input[name="eyes-color"]');
  var fireballColorInput = customWizard.querySelector('input[name="fireball-color"]');

  var wizard = {
    onEyesChange: function (color) {},
    onCoatChange: function (color) {}
  };

  var getRandomElement = function (array) {
    var randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
  };

  wizardCoatElement.addEventListener('click', function () {
    var newColor = getRandomElement(COAT_COLORS);
    this.style.fill = newColor;
    coatColorInput.value = newColor;
    wizard.onCoatChange(newColor);
  });

  wizardEyesElement.addEventListener('click', function () {
    var newColor = getRandomElement(EYES_COLORS);
    this.style.fill = newColor;
    eyesColorInput.value = newColor;
    wizard.onEyesChange(newColor);
  });

  wizardFireballElement.addEventListener('click', function () {
    var newColor = getRandomElement(FIREBALL_COLORS);
    this.style.backgroundColor = newColor;
    fireballColorInput.value = newColor;
  });

  return window.wizard = wizard;
})();
