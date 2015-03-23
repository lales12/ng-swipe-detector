angular.module('ngSwipeDetector', []).directive('ngSwipeDetector',  function () {
    return {
        scope: {
            ngSwipe: '&',
            ngHorizontalSensibility: '=',
            ngVerticalSensibility: '='
        }
        link: function ($scope, element, attrs, controller) {
            var swipeCallback = $scope.ngSwipe,
            console.log($scope);
            
            var Touch = {
                horizontal_sensitivity: 80,
                vertical_sensitivity: 6,
                touchDX: 0,
                touchDY: 0,
                touchStartX: 0,
                touchStartY: 0,
             
                bind: function (element) {
                    var self = this;

                    element.addEventListener("touchstart", function (event) {
                        self.handleStart(event, element);
                    })

                    element.addEventListener("touchmove", (event) {
                        self.handleMove(event, element);
                    })

                    element.addEventListener("touchend", function (event) {
                        self.handleEnd(event, element);
                    })
                },
                     
                emitSlideLeft: function () {
                    if (swipeCallback)
                        swipeCallback direction: 'left';
                },

                emitSlideRight: function () {
                    if (swipeCallback) 
                        swipeCallback direction: 'right';
                },

                handleStart: function (event, elem) {
                    if (event.touches.length is 1) {
                          this.touchDX = 0;
                          this.touchDY = 0;

                          this.touchStartX = event.touches[0].pageX;
                          this.touchStartY = event.touches[0].pageY;
                    }
                },
                 
                handleMove: function (event, elem) {
                    if (event.touches.length > 1) {
                        @cancelTouch(elem);
                        return false
                    }
                 
                    this.touchDX = event.touches[0].pageX - @touchStartX;
                    this.touchDY = event.touches[0].pageY - @touchStartY;
                },
             
                handleEnd: function (event, elem) {
                    dx = Math.abs(@touchDX);
                    dy = Math.abs(@touchDY);
             
                    if (dx > @horizontal_sensitivity) and (dy < (dx * 2 / 3)) {
                        if (this.touchDX > 0) 
                            @emitSlideRight();
                        else 
                            @emitSlideLeft();
                    }
                    
                    this.cancelTouch(event, elem);
                },
             
                cancelTouch: function (event, elem) {
                    elem.removeEventListener('touchmove', @handleTouchMove, false);
                    elem.removeEventListener('touchend', @handleTouchEnd, false);
                }
            }

            Touch.bind element[0]
        }
    }
})
