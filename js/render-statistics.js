'use strict';

(function () {
  var STATISTIC = window.util.statistic;

  var getMaxOfArray = function (timeArray) {
    return Math.max.apply(null, timeArray);
  };

  window.renderStatistics = function (ctx, names, times) {
    ctx.save();

    ctx.shadowOffsetX = ctx.shadowOffsetY = STATISTIC.CLOUD['SHADOW_OFFSET'];
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.fillStyle = '#fff';
    ctx.fillRect(STATISTIC.CLOUD.X, STATISTIC.CLOUD.Y, STATISTIC.CLOUD.WIDTH, STATISTIC.CLOUD.HEIGHT);

    ctx.restore();

    ctx.font = STATISTIC.FONT.SIZE + STATISTIC.FONT.FAMILY;
    ctx.fillText('Ура вы победили!', STATISTIC.CLOUD.X + STATISTIC.FONT.GAP * 2, STATISTIC.FONT.GAP * 4);
    ctx.fillText('Список результатов:', STATISTIC.CLOUD.X + STATISTIC.FONT.GAP * 2, STATISTIC.FONT.GAP * 6);

    var maxTime = getMaxOfArray(times);

    for (var i = 0; i < names.length; i++) {
      var xPoint = STATISTIC.CLOUD.X + STATISTIC.FONT.GAP * 4 + (STATISTIC.BAR.WIDTH + STATISTIC.BAR.GAP) * i;
      var yPoint = STATISTIC.CLOUD.HEIGHT - STATISTIC.FONT.HEIGHT - STATISTIC.FONT.GAP * 2;
      var barHeight = (STATISTIC.BAR.HEIGHT * times[i]) / maxTime;

      ctx.save();
      ctx.fillText(names[i], xPoint, STATISTIC.CLOUD.HEIGHT - STATISTIC.FONT.GAP);
      ctx.fillText(Math.round(times[i]), xPoint, yPoint - barHeight - STATISTIC.FONT.GAP);

      ctx.fillStyle = 'hsla(241, ' + window.util.getRandomNumber(0, 100) + '%, 30%, 1)';

      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      }

      ctx.fillRect(xPoint, yPoint, STATISTIC.BAR.WIDTH, -barHeight);
      ctx.restore();
    }
  };
})();
