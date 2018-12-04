'use strict';

(function () {
  var backend = window.backend;
  var isEnterEvent = window.util.isEnterEvent;
  var isEscEvent = window.util.isEscEvent;

  var form = document.querySelector('.setup-wizard-form');
  var userDialog = document.querySelector('.setup');
  var userDialogSimilar = document.querySelector('.setup-similar');
  var userAvatar = document.querySelector('.setup-open-icon');
  var userDialogOpenButton = document.querySelector('.setup-open');
  var userDialogCloseButton = userDialog.querySelector('.setup-close');
  var similarListElement = document.querySelector('.setup-similar-list');

  var successHandler = function (response, evt) {
    userDialog.classList.add('hidden');
    evt.preventDefault();
  };

  var errorHandler = function (errorMessage) {
    throw new Error(errorMessage);
  };

  var popupEscPressHandler = function (evt) {
    isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    userDialogSimilar.classList.remove('hidden');
    document.addEventListener('keydown', popupEscPressHandler);
  };

  var closePopup = function () {
    similarListElement.innerHTML = '';
    userDialog.classList.add('hidden');
    userDialogSimilar.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  userDialogOpenButton.addEventListener('click', function () {
    openPopup();
  });

  userAvatar.addEventListener('keydown', function (evt) {
    isEnterEvent(evt, openPopup);
  });

  userDialogCloseButton.addEventListener('click', function () {
    closePopup();
  });

  userDialogCloseButton.addEventListener('keydown', function (evt) {
    isEnterEvent(evt, closePopup);
  });

  form.addEventListener('submit', function (evt) {
    backend.save(new FormData(form), successHandler, errorHandler);
  });
})();

