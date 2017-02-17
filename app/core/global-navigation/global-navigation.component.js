(function () {
    'use strict';

// Register `globalNavigation` component, along with its associated controller and template
    angular.module('core.globalNavigation').component('globalNavigation', {
        templateUrl: function($element, $attrs) {
            return $attrs.templateUrl;
        },
        controller: ['$attrs', '$scope', 'Portfolio',
            function NavigationController($attrs, $scope, Portfolio) {
                var self = this;
                self.dataPath = $attrs.datapath;
                // Read from resource
                self.data = Portfolio.query(function () {
                    // Set default nav item active based on current route
                    // CHECK IF DATAPATH HAS CURRENT ROUTE OBJECT
                    // FOR EXAMPLE, FOOTER MAY NOT HAVE "HOME"
                    if (self.data[self.dataPath][Portfolio.GetCleanRoute()] != undefined) {
                        self.data[self.dataPath][Portfolio.GetCleanRoute()].isSelected = 'active';
                    }
                });
                // If title clicked != current route then change route
                self.NavItemClick = function NavItemClick(title) {
                    event.preventDefault();
                    self.title = title.toLowerCase();
                    if (self.title != Portfolio.GetCurrentRoute()) {
                        Portfolio.SetCurrentRoute(self.title);
                        Portfolio.SetLocation();
                    }
                };
                // Rollover animation for unselected nav items
                // hover.inactive css class scales bottom border width from 0 to 100%
                // .active css class scales bottom border width from 0 to 100%
                // .inactive css class scales bottom border width from 100 to 0%
                self.NavItemMouseEnter = function NavItemMouseEnter(title) {
                    self.title = title.toLowerCase();
                    if (self.title != Portfolio.GetCleanRoute()) {
                        self.data[self.dataPath][self.title].isSelected = "inactive";
                    }
                };
                // On route change, deactivate previous nav item and activate new one
                self.SetNavItemSelected = function SetNavItemSelected(scope, next, current) {
                    // Define previous route from route change
                    self.previousRoute = current.$$route.originalPath.split('/')[1];
                    if (self.previousRoute == "") {
                        self.previousRoute = 'home';
                    }
                    // Define current route and set it in portfolio
                    Portfolio.SetCurrentRoute(next.$$route.originalPath);
                    // Set previous route inactive, set current route active
                    if (self.data[self.dataPath][self.previousRoute] != undefined) {
                        self.data[self.dataPath][self.previousRoute].isSelected = "inactive";
                    }
                    if (self.data[self.dataPath][Portfolio.GetCleanRoute()] != undefined) {
                        self.data[self.dataPath][Portfolio.GetCleanRoute()].isSelected = "active";
                    }
                };
                $scope.$on('$routeChangeStart', function (scope, next, current) {
                    self.SetNavItemSelected(scope, next, current);
                });
            }
        ]
    });
})();