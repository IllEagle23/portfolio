(function () {
    'use strict';

// Register `portfolioPage` component, along with its associated controller and template
    angular.module('view.portfolioPage').component('portfolioPage', {
        templateUrl: 'view/portfolio-page/portfolio-page.template.html',
        controller: ['Portfolio', '$document',
            function PortfolioPageController(Portfolio, $document) {
                var self = this;
                self.data = Portfolio.query(function (event) {
                    // data loaded
                    self.projectElement = angular.element(document.getElementById('#scroll-top'));
                });
                self.ScrollClick = function ScrollClick () {
                    event.preventDefault();
                    $document.scrollTo(self.projectElement, 55, 500);
                };
            }
        ]
    });
})();