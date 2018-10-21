'use strict';

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];


var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

var generateIndex = function (arr) {
  var minIndex = 0;
  var maxIndex = arr.length - 1;
  var index = generateRandomNumber(minIndex, maxIndex);

  return index;
};

var generateArrayElement = function (array) {
  var index = generateIndex(array);
  return array[index];
};


var generateWizards = function (namesArray, lastNamesArray, coatColorArray, eyesColorArray, wizardsCount) {
  var wizards = [];

  for (var i = 0; i < wizardsCount; i++) {
    wizards[i] = {
      name: generateArrayElement(namesArray) + ' ' + generateArrayElement(lastNamesArray),
      coatColor: generateArrayElement(coatColorArray),
      eyesColor: generateArrayElement(eyesColorArray)
    };
  }

  return wizards;
};

var wizards = generateWizards(names, lastNames, coatColors, eyesColors, 4);

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
