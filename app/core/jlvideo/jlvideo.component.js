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
                        if (self.seeking !== true) {
                            self.seeking = true;
                            console.log("seeking event");
                            $scope.$apply(function () {
                                if (self.playButtonVisible !== "hide") {
                                    self.playButtonVisible = "fade-out";
                                }
                            });
                        }
                    });
                    self.video.addEventListener("seeked", function () {
                        console.log("seeked event");
                    });
                    self.video.addEventListener("play", function () {
                        if (self.seeking === true) {
                            self.seeking = false;
                        }
                        else {
                            $scope.$apply(function () {
                                if (self.playButtonVisible !== "fade-out") {
                                    self.playButtonVisible = "fade-out";
                                }
                            });
                        }
                        console.log("play event");
                    });
                    self.video.addEventListener("playing", function () {
                        console.log("playing event");
                    });
                    self.video.addEventListener("pause", function () {
                        setTimeout(function () {
                            // if (self.seeking !== true) {
                                console.log("pause event");
                                $scope.$apply(function () {
                                    if (self.playButtonVisible !== "fade-in") {
                                        self.playButtonVisible = "fade-in";
                                    }
                                    // $("#" + $attrs.videoId).removeAttr("controls");
                                });
                            // }
                        }, 0);
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

