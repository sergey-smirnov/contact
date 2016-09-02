 'use strict';

 let SET_OPACITY_DURATION = 100;

 let SApplication = function() {
     this.backgroundElements = null;
 };

 SApplication.prototype.initializeBackground = function(elements) {
     this.backgroundElements = elements;
 };

 SApplication.prototype.updateOpacity = function(e) {
     if (!e || !this.backgroundElements || !this.backgroundElements.length) {
         return;
     }

     let me = this;
     let xPosition = e.clientX;
     let yPosition = e.clientY;

     _.forEach(this.backgroundElements, function(item, index) {
         let bgELement = $(item);
         let width = bgELement.width();
         let height = bgELement.height();
         let opacity = me.$calculateOpacity(index, xPosition, yPosition, width, height);

         bgELement.fadeTo(SET_OPACITY_DURATION, opacity);
     });
 };

 SApplication.prototype.$calculateOpacity = function(layerIndex, x, y, maxX, maxY) {
     let centerPoint = {
         x: maxX / 2,
         y: maxY / 2
     };
     let maxRadius = Math.sqrt(Math.pow(centerPoint.x, 2) + Math.pow(centerPoint.y, 2));
     let radius = Math.sqrt(Math.pow(x - centerPoint.x, 2) + Math.pow(y - centerPoint.y, 2));
     let ratio = radius / maxRadius;

     switch (layerIndex) {
         case 0:
             return 1;
         case 1:
             return ratio;
         case 2:
             return (1 - ratio);
         default:
             return Math.random();
     }
 };
