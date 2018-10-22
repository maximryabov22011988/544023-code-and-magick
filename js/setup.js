'use strict';

var NUMBER_OF_OBJECTS = 4;

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');

/**
 * Генерирует случайное число в диапазоне от min до max (включительно)
 * @param  {number} min - минимальное число
 * @param  {number} max - максимальное число
 * @return {number}     - случайное число
 */
var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

/**
 * Генерирует массив волшебников
 * @param  {number} count - необходимое количество волшебников
 * @return {array}        - массив объектов (волшебников)
 */
var generateWizards = function (count) {
  var wizards = [];

  for (var i = 0; i < count; i++) {
    var wizardSample = {
      name: NAMES[generateRandomNumber(0, NAMES.length - 1)] + ' ' + SURNAMES[generateRandomNumber(0, SURNAMES.length - 1)],
      coatColor: COAT_COLORS[generateRandomNumber(0, COAT_COLORS.length - 1)],
      eyesColor: EYES_COLORS[generateRandomNumber(0, EYES_COLORS.length - 1)]
    };

    wizards.push(wizardSample);
  }

  return wizards;
};

/**
 * Отрисовывает волшебника
 * @param  {object} wizard - объект с описанием волшебника
 * @return {DOM}           - DOM-элемент с измененными данными
 */
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

/**
 * Вставляет DOM-элемент в нужное место в DOM
 * @param  {DOM} parentElement - контейнер, для вставки сгенерированных DOM-элементов
 */
var insertElements = function (parentElement) {
  var fragment = document.createDocumentFragment();
  var wizards = generateWizards(NUMBER_OF_OBJECTS);

  wizards.forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });

  parentElement.appendChild(fragment);
};

insertElements(similarListElement);
