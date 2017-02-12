(function () {
    'use strict';

// Register `contactPage` component, along with its associated controller and template
    angular.module('view.contactPage').component('contactPage', {
        templateUrl: 'view/contact-page/contact-page.template.html',
        controller: ['Portfolio',
            function ContactPageController(Portfolio) {
                var self = this;
                self.data = Portfolio.query(function (event) {
                    // data loaded
                });
            }
        ]
    });
})();