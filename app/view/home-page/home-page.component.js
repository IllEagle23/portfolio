'use strict';

// Register `homePage` component, along with its associated controller and template
angular.module('view.homePage').component('homePage', {
    templateUrl: 'view/home-page/home-page.template.html',
    controller: ['Portfolio',
        function HomePageController(Portfolio) {
            var self = this;
            self.data = Portfolio.query(function (event) {
                // data loaded
            });
            self.ProjectDetail = function ProjectDetail (id) {
                Portfolio.SetCurrentRoute("portfolio/" + id);
            };
        }
    ]
});
// Limit project list for Home Page
// self.data = event.data.slice(0, 5);