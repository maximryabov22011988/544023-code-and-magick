'use strict';

(function () {
  var WIZARD = window.util.wizard;
  var changeColorElement = window.util.changeColor;

  var userDialog = document.querySelector('.setup');
  var userDialogSimilar = document.querySelector('.setup-similar');
  var userAvatar = document.querySelector('.setup-open-icon');
  var userDialogOpenButton = document.querySelector('.setup-open');
  var userDialogCloseButton = userDialog.querySelector('.setup-close');

  var similarListElement = document.querySelector('.setup-similar-list');

  var customWizard = userDialog.querySelector('.setup-player');
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

  var popupEscPressHandler = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    window.renderWizards(similarListElement);
    userDialog.classList.remove('hidden');
    userDialogSimilar.classList.remove('hidden');
    customWizard.addEventListener('click', changeColorWizard);
    document.addEventListener('keydown', popupEscPressHandler);
  };

  var closePopup = function () {
    similarListElement.innerHTML = '';
    userDialog.classList.add('hidden');
    userDialogSimilar.classList.add('hidden');
    customWizard.removeEventListener('click', changeColorWizard);
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  userDialogOpenButton.addEventListener('click', function () {
    openPopup();
  });

  userAvatar.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  userDialogCloseButton.addEventListener('click', function () {
    closePopup();
  });

  userDialogCloseButton.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });
})();

