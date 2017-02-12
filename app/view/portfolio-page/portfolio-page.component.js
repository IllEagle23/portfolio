(function () {
    'use strict';

// Register `portfolioPage` component, along with its associated controller and template
    angular.module('view.portfolioPage').component('portfolioPage', {
        templateUrl: 'view/portfolio-page/portfolio-page.template.html',
        controller: ['Portfolio',
            function PortfolioPageController(Portfolio) {
                var self = this;
                self.data = Portfolio.query(function (event) {
                    // data loaded
                });
            }
        ]
    });
})();