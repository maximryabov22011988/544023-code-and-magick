'use strict';

(function () {
  var backend = window.backend;
  var loaderElement = document.querySelector('.setup-similar-loader');
  var debounce = window.debounce;
  var renderWizards = window.renderWizards;
  var wizard = window.wizard;

  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRating = function (wizard) {
    var rating = 0;

    if (wizard.colorCoat === coatColor) {
      rating += 2;
    }

    if (wizard.colorEyes === eyesColor) {
      rating += 1;
    }

    return rating;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    renderWizards(wizards.sort(function (left, right) {
      var ratingDiff = getRating(right) - getRating(left);

      if (ratingDiff === 0) {
        ratingDiff = namesComparator(left.name, right.name);
      }

      return ratingDiff;
    }));
  };

  wizard.onEyesChange = debounce(function (color) {
    eyesColor = color;
    updateWizards();
  }, 500);

  wizard.onCoatChange = debounce(function (color) {
    coatColor = color;
    updateWizards();
  }, 500);

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  backend.load(successHandler, errorHandler, loaderElement);
})();
