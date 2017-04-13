(function () {
    'use strict';
    
    angular.module('core.jlvideo').component('jlvideo', {
        templateUrl: function($element, $attrs) {
            return $attrs.templateUrl;
        },
        controller: ['$attrs', '$scope', '$element',
            function JlvideoController ($attrs, $scope, $element) {
                var self = this;
                self.attrs = $attrs;
                // self.playButtonVisible = "fade-in";
                self.VideoClick = function VideoClick () {
                    if (self.video === undefined) {
                        self.SetVideo();
                    }
                    if (self.video.paused === true) {
                        // self.video.src = $attrs.src;
                        self.video.play();
                        self.playButtonVisible = "fade-out";
                    }
                };
                self.SetVideo = function SetVideo () {
                    self.video = document.getElementById($attrs.videoId);
                    self.videoControls = document.getElementById($attrs.videoId + "-controls");
                    self.video.addEventListener("seeking", function () {
                        self.seeking = true;
                    });
                    self.video.addEventListener("pause", function () {
                        setTimeout(function () {
                            if (self.seeking !== true) {
                                $scope.$apply(function () {
                                    self.playButtonVisible = "fade-in";
                                    $("#" + $attrs.videoId).removeAttr("controls");
                                });
                            }
                        }, 1);
                    });
                    self.video.addEventListener("seeked", function () {
                        self.seeking = false;
                    });
                    self.videoControls.addEventListener("animationend", function () {
                        $scope.$apply(function () {
                            if (self.playButtonVisible === "fade-out") {
                                self.playButtonVisible = "hide";
                                $("#" + $attrs.videoId).attr("controls", "true");
                            }
                        });
                    });
                };
            }
        ]
    });
})();

/*
* Todo:
* Animate play button show / hide
*
*
* */

