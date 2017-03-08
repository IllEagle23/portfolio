(function () {
    "use strict";
    
    angular.module('portfolioApp').animation('.placeholder', function projectAnimationFactory() {
        return {
            addClass: animateIn,
            removeClass: animateOut
        };
        
        function animateIn(element, className, done) {
            console.log("animate in");
            if (className !== 'selected') return;
            
            element.css({
                display: 'block',
                position: 'absolute',
                top: 500,
                left: 0
            }).animate({
                top: 0
            }, done);
            
            return function animateInEnd(wasCanceled) {
                if (wasCanceled) element.stop();
            };
        }
        
        function animateOut(element, className, done) {
            if (className !== 'selected') return;
            
            element.css({
                position: 'absolute',
                top: 0,
                left: 0
            }).animate({
                top: -500
            }, done);
            
            return function animateOutEnd(wasCanceled) {
                if (wasCanceled) element.stop();
            };
        }
    });
})();