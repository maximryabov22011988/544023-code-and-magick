'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_CLOUD_OFFSET = 10;
var GAP = 20;
var FONT_HEIGHT = 10;
var FONT_GAP = 10;
var BAR_WIDTH = 40;
var barHeight = 150;
var BAR_GAP = 50;

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

  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, GAP * 3);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.save();
    ctx.fillText(names[i], CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP / 2);

    ctx.fillStyle = (names[i] === 'Вы') ? ('rgba(255, 0, 0, 1)') : ('hsl(235, ' + Math.round(Math.random() * 100) + '%, ' + Math.round(Math.random() * 80 + 20) + '%)');
    ctx.fillRect(CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP / 2 - FONT_HEIGHT - FONT_GAP, BAR_WIDTH, -(barHeight * times[i]) / maxTime);
    ctx.restore();

    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP / 2  - FONT_HEIGHT - FONT_GAP - (barHeight * times[i]) / maxTime - GAP / 2);
  }
};
