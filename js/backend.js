'use strict';

(function () {
  var URL = {
    LOAD: 'https://js.dump.academy/code-and-magick/data',
    SAVE: 'https://js.dump.academy/code-and-magick'
  };

  var createRequest = function () {
    var Request = false;

    if (window.XMLHttpRequest) {
      Request = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      try {
        Request = new ActiveXObject('Microsoft.XMLHTTP');
      } catch (CatchException) {
        Request = new ActiveXObject('Msxml2.XMLHTTP');
      }
    }

    if (!Request) {
      throw new Error('Невозможно создать XMLHttpRequest');
    }

    return Request;
  };

  var load = function (onLoad, onError, loader) {
    var xhr = createRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        loader.classList.add('hidden');
        onLoad(xhr.response);
      } else {
        loader.classList.remove('hidden');
        loader.textContent = 'Не удалось загрузить персонажи';

        var errorMessage;

        switch (xhr.status) {
          case 400:
            errorMessage = 'Неверный запрос';
            break;
          case 401:
            errorMessage = 'Пользователь не авторизован';
            break;
          case 404:
            errorMessage = 'Запрашиваемая информация не найдена';
            break;
          default:
            errorMessage = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
        }
        onError(errorMessage);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL.LOAD);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = createRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', URL.SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
