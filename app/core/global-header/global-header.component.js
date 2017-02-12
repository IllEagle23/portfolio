(function () {
    'use strict';

// Register `globalHeader` component, along with its associated controller and template
    angular.module('core.globalHeader').component('globalHeader', {
        templateUrl: 'core/global-header/global-header.template.html',
        controller: ['$scope', 'Portfolio',
            function HeaderController($scope, Portfolio) {
                var self = this;
                
                // Read resource
                self.data = Portfolio.query(function () {
                    // UNIT TEST
                    // Set default header nav item active based on current route
                    // This path requires plain word without slashes
                    self.currentRoute = Portfolio.GetCurrentRoute();
                    self.currentRoute = self.currentRoute.split("/")[1];
                    self.data.globalHeader[self.currentRoute].isSelected = 'active';
                });
                
                // If title clicked != current route then change route
                self.NavItemClick = function NavItemClick(title) {
                    // event.preventDefault();
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
                    self.currentRouteSplit = Portfolio.GetCurrentRoute().split('/')[1];
                    self.title = title.toLowerCase();
                    if (self.currentRouteSplit == "" || self.currentRouteSplit == undefined) {
                        self.currentRouteSplit = "home"
                    }
                    if (self.title != self.currentRouteSplit) {
                        self.data.globalHeader[self.title].isSelected = "inactive";
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
                    self.currentRoute = next.$$route.originalPath;
                    Portfolio.SetCurrentRoute(self.currentRoute);
                    // Split the route string to get the word without slashes for css class
                    self.currentRouteSplit = Portfolio.GetCurrentRoute().split('/')[1];
                    if (self.currentRouteSplit == "" || self.currentRouteSplit == undefined) {
                        self.currentRouteSplit = "home"
                    }
                    // Set previous route inactive, set current route active
                    self.data.globalHeader[self.previousRoute].isSelected = "inactive";
                    self.data.globalHeader[self.currentRouteSplit].isSelected = "active";
                    // console.log("previous route og = " + current.$$route.originalPath);
                    // console.log("previous route split = " + self.previousRoute);
                    // console.log("self current route og = " + self.currentRoute);
                    // console.log("portfolio current route og = " + Portfolio.GetCurrentRoute());
                    // console.log("portfolio current route split = " + self.currentRouteSplit);
                    // console.log("");
                    // console.log("");
                };
                // How do I test this?
                $scope.$on('$routeChangeStart', function (scope, next, current) {
                    self.SetNavItemSelected(scope, next, current);
                });
            }
        ]
    });
})();