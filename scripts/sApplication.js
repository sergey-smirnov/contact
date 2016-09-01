'use strict';

let SET_OPACITY_DURATION = 50;

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

        console.log("opacity: " + opacity, item);
        bgELement.fadeTo(SET_OPACITY_DURATION, opacity);
    });
};

SApplication.prototype.$calculateOpacity = function(layerIndex, x, y, maxX, maxY) {
    switch (layerIndex) {
        case 0:
            return 1;
        case 1:
            return x / maxX;
        case 2:
            return y / maxY;
        default:
            return Math.random();
    }
};
