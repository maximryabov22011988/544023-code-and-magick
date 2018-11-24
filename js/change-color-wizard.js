'use strict';
(function () {
  var changeColorElement = window.util.changeColor;

  var WIZARD = {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var userDialog = document.querySelector('.setup');
  var coatColorInput = userDialog.querySelector('input[name="coat-color"]');
  var eyesColorInput = userDialog.querySelector('input[name="eyes-color"]');
  var fireballColorInput = userDialog.querySelector('input[name="fireball-color"]');

  var changeColorWizard = function (evt) {
    var target = evt.target;
    var targetClass = target.classList;

    if (targetClass.contains('wizard-coat')) {
      changeColorElement(target, WIZARD['COAT_COLORS'], coatColorInput);
    } else if (targetClass.contains('wizard-eyes')) {
      changeColorElement(target, WIZARD['EYES_COLORS'], eyesColorInput);
    } else if (targetClass.contains('setup-fireball')) {
      changeColorElement(target, WIZARD['FIREBALL_COLORS'], fireballColorInput);
    }
  };

  window.changeColorWizard = changeColorWizard;
})();
