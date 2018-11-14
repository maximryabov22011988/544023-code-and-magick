'use strict';

(function () {
  var dialogElement = document.querySelector('.setup');
  var dialogHandler = dialogElement.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isDragged = false;

    var moveDialogElement = function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      dialogElement.style.left = (dialogElement.offsetLeft - shift.x) + 'px';
      dialogElement.style.top = (dialogElement.offsetTop - shift.y) + 'px';
    };

    var fixDialogElement = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', moveDialogElement);
      document.removeEventListener('mouseup', fixDialogElement);

      if (isDragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };

        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', moveDialogElement);
    document.addEventListener('mouseup', fixDialogElement);
  });
})();
