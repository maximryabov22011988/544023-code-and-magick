'use strict';

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var NUMBER_OF_OBJECTS = 4;

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var userDialog = document.querySelector('.setup');
var userDialogForm = userDialog.querySelector('.setup-wizard-form');

var customWizard = userDialog.querySelector('.setup-player');
var coatColorInput = userDialog.querySelector('input[name="coat-color"]');
var eyesColorInput = userDialog.querySelector('input[name="eyes-color"]');
var fireballColorInput = userDialog.querySelector('input[name="fireball-color"]');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var userDialogOpenButton = document.querySelector('.setup-open');
var userAvatar = userDialogOpenButton.querySelector('.setup-open-icon');
var userDialogCloseButton = userDialog.querySelector('.setup-close');
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

/**
 * Закрывает попап при нажатии ESC
 * @param  {object} evt - объект event
 */
var popupEscPressHandler = function (evt) {
  if (evt.which === ESC_KEYCODE) {
    closePopup();
  }
};

/**
 * Изменяет цвет
 * @param  {object} evt - объект event
 */
var changeColor = function (evt) {
  var targetClass = evt.target.classList;
  var targetStyle = evt.target.style;
  var newColor;

  if (targetClass.contains('wizard-coat')) {
    newColor = COAT_COLORS[generateRandomNumber(0, COAT_COLORS.length - 1)];
    targetStyle.fill = newColor;
    coatColorInput.value = newColor;
  } else if (targetClass.contains('wizard-eyes')) {
    newColor = EYES_COLORS[generateRandomNumber(0, EYES_COLORS.length - 1)];
    targetStyle.fill = newColor;
    eyesColorInput.value = newColor;
  } else if (targetClass.contains('setup-fireball')) {
    newColor = FIREBALL_COLORS[generateRandomNumber(0, FIREBALL_COLORS.length - 1)];
    fireballColorInput.value = newColor;
    targetStyle.backgroundColor = newColor;
  }
};

/**
 * Открывает попап
 */
var openPopup = function () {
  insertElements(similarListElement);
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
  customWizard.addEventListener('click', changeColor);
};

/**
 * Закрывает попап
 */
var closePopup = function () {
  similarListElement.innerHTML = '';
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
  customWizard.removeEventListener('click', changeColor);
};

/**
 * Обработчики событий
 */

/**
 * Открытие попапа
 */
userDialogOpenButton.addEventListener('click', function () {
  openPopup();
});

userAvatar.addEventListener('keydown', function (evt) {
  if (evt.which === ENTER_KEYCODE) {
    openPopup();
  }
});

/**
 * Закрытие попапа
 */
userDialogCloseButton.addEventListener('click', function () {
  closePopup();
});

userDialogCloseButton.addEventListener('keydown', function (evt) {
  if (evt.which === ENTER_KEYCODE) {
    closePopup();
  }
});

/**
 * Отменяет отправку формы по умолчанию
 * @param  {object} evt - объект event
 */
userDialogForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  closePopup();
});
