'use strict';

// Register `aboutPage` component, along with its associated controller and template
angular.module('view.aboutPage').component('aboutPage', {
    templateUrl: 'view/about-page/about-page.template.html',
    controller: ['Portfolio',
        function AboutPageController(Portfolio) {
            var self = this;
            self.data = Portfolio.query(function (event) {
                // data loaded
            });
        }
    ]
});