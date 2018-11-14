'use strict';

(function () {
  var WIZARD = window.util.wizard;
  var generateData = window.util.generateData;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var generateWizardsData = function (count) {
    var wizardsData = [];

    for (var i = 0; i < count; i++) {
      wizardsData[i] = {
        name: generateData(WIZARD['NAMES']) + generateData(WIZARD['SURNAMES']),
        coatColor: generateData(WIZARD['COAT_COLORS']),
        eyesColor: generateData(WIZARD['EYES_COLORS'])
      };
    }

    return wizardsData;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  window.renderWizards = function (parentElement) {
    var fragment = document.createDocumentFragment();
    var wizards = generateWizardsData(WIZARD['NUMBER']);

    wizards.forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });

    parentElement.appendChild(fragment);
  };
})();
