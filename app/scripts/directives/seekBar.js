(function() {
     function seekBar($document) {
        
        /**
        * @function calculatePercent
        * @scope private
        * @desc calculates the horizontal percent along the seek bar
        * @param {Object} seekBar
        * @param {Object} event 
        */
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            console.log(offsetX);
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };
         
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: {
                onChange: '&'
            },
            link: function(scope, element, attributes) {
                scope.value = 0;
                scope.max = 100;
                
                var seekBar = $(element);
                
                attributes.$observe('value', function(newValue) {
                    scope.value = newValue;
                });
 
                attributes.$observe('max', function(newValue) {
                    scope.max = newValue;
                });
                
                /**
                * @function percentString
                * @scope private
                * @desc calculates a percentage - based on value and max - and returns it as a string
                */
                var percentString = function() {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };
                
                /**
                * @function fillStyle
                * @scope public
                * @desc returns width of seek bar fill element, as a css class
                */
                scope.fillStyle = function() {
                    return {width: percentString()};
                };
                
                /**
                * @function thumbStyle
                * @scope public
                * @desc returns the style of the handle
                */
                scope.thumbStyle = function() {
                    return {left: percentString()};
                };
                
                /**
                * @function onClickSeekBar
                * @scope public
                * @desc calculates a percent, when passed an event
                * @param {Object} event 
                */
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };
                
                
                /**
                * @function trackThumb
                * @scope public
                * @desc tracks mouse move and calcs a percent - also tracks the mouse up
                * @param {Object} event 
                */
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.$apply(function() {
                        scope.value = percent * scope.max;
                        notifyOnChange(scope.value);
                        });
                    });
                    
 
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
                
                var notifyOnChange = function(newValue) {
                        if (typeof scope.onChange === 'function') {
                        scope.onChange({value: newValue});
                        }
                };
            }
        };
     }
 
     angular
         .module('blocJams')
         .directive('seekBar', ['$document', seekBar]);
 })();
