'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var SHADOW_CLOUD_OFFSET = 10;

var FONT_SIZE = '16px';
var FONT_FAMILY = 'PT Mono';
var FONT_HEIGHT = 10;
var FONT_GAP = 10;

var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

var getRandomNumber = function (min, max) {
  var number = min - 0.5 + Math.random() * (max - min + 1);
  number = Math.round(number);
  return number;
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  ctx.save();

  ctx.shadowOffsetX = SHADOW_CLOUD_OFFSET;
  ctx.shadowOffsetY = SHADOW_CLOUD_OFFSET;
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';

  ctx.fillStyle = '#fff';
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.restore();

  ctx.font = FONT_SIZE + ' ' + FONT_FAMILY;
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP * 2, FONT_GAP * 4);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP * 2, FONT_GAP * 6);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var xPoint = CLOUD_X + FONT_GAP * 4 + (BAR_WIDTH + BAR_GAP) * i;
    var yPoint = CLOUD_HEIGHT - FONT_HEIGHT - FONT_GAP * 2;
    var barHeight = (BAR_HEIGHT * times[i]) / maxTime;

    ctx.save();
    ctx.fillText(names[i], xPoint, CLOUD_HEIGHT - FONT_GAP);
    ctx.fillText(Math.round(times[i]), xPoint, yPoint - barHeight - FONT_GAP);

    ctx.fillStyle = 'hsla(241, ' + getRandomNumber(0, 100) + '%, 30%, 1)';

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    ctx.fillRect(xPoint, yPoint, BAR_WIDTH, -barHeight);
    ctx.restore();
  }
};
