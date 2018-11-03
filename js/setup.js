'use strict';

var NUMBER_OF_OBJECTS = 4;

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

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

var coatWizard = userDialog.querySelector('.setup-wizard .wizard-coat');
var eyesWizard = userDialog.querySelector('.setup-wizard .wizard-eyes');
var fireball = userDialog.querySelector('.setup-fireball-wrap');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userAvatar = userDialogOpen.querySelector('.setup-open-icon');
var userSettingsSave = userDialog.querySelector('.setup-submit');

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

/**
 * Отправляет данные на сервер
 * @param  {object} evt - объект event
 */
var sendSettingsToServer = function (evt) {
  evt.submit();
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
 * Формирует цвет плаща волшебника и записывает значение в соответствующий input (скрытый)
 */
var setCoatColor = function () {
  var newColor = COAT_COLORS[generateRandomNumber(0, COAT_COLORS.length - 1)];
  userDialog.querySelector('input[name="coat-color"]').value = newColor;
  coatWizard.style.fill = newColor;
};

/**
 * Формирует цвет глаз волшебника и записывает значение в соответствующий input (скрытый)
 */
var setEyesColor = function () {
  var newColor = EYES_COLORS[generateRandomNumber(0, EYES_COLORS.length - 1)];
  userDialog.querySelector('input[name="eyes-color"]').value = newColor;
  eyesWizard.style.fill = newColor;
};

/**
 * Формирует цвет фаейрболла и записывает значение в соответствующий input (скрытый)
 */
var setFireballColor = function () {
  var newColor = FIREBALL_COLORS[generateRandomNumber(0, FIREBALL_COLORS.length - 1)];
  userDialog.querySelector('input[name="fireball-color"]').value = newColor;
  fireball.style.background = newColor;
};

/**
 * Открывает попап
 */
var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);

  coatWizard.addEventListener('click', setCoatColor);
  eyesWizard.addEventListener('click', setEyesColor);
  fireball.addEventListener('click', setFireballColor);

  userSettingsSave.addEventListener('click', sendSettingsToServer);
};

/**
 * Закрывает попап
 */
var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);

  coatWizard.removeEventListener('click', setCoatColor);
  eyesWizard.removeEventListener('click', setEyesColor);
  fireball.removeEventListener('click', setFireballColor);

  userSettingsSave.removeEventListener('click', sendSettingsToServer);
};

/**
 * Обработчики событий на открытие попапа
 */
userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userAvatar.addEventListener('keydown', function (evt) {
  if (evt.which === ENTER_KEYCODE) {
    openPopup();
  }
});

/**
 * Обработчики событий на закрытие попапа
 */
userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.which === ENTER_KEYCODE) {
    closePopup();
  }
});

