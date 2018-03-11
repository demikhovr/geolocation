'use strict';

(function () {
  var trackingAreas = document.querySelectorAll('.btn--gradient-tracking');

  var areaMouseOverHandler = function (event) {
    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;

    /* If the element's parent has a positioning context (position: relative), you will need to subtract its offsets as well.

    var x = e.pageX - btn.offsetLeft - btn.offsetParent.offsetLeft
    var y = e.pageY - btn.offsetTop - btn.offsetParent.offsetTop
    */

    this.style.setProperty('--x', x + 'px');
    this.style.setProperty('--y', y + 'px');
  };

  Array.from(trackingAreas).forEach(function (area) {
    area.addEventListener('mousemove', areaMouseOverHandler);
  });
}());
