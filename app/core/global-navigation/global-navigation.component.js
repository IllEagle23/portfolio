(function () {
    'use strict';

// Register `global-navigation` component, along with its associated controller and template
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
                    // Check if datapath has currentRoute as an object
                    // It will otherwise be undefined and fail
                    // For example the footer datapath may not have a "Home" object
                    if (self.data[self.dataPath][Portfolio.GetCleanRoute()] != undefined) {
                        // Set default nav item active based on current route on page load / refresh
                        self.data[self.dataPath][Portfolio.GetCleanRoute()].isSelected = 'active';
                    }
                });
                // Rollover and click animation for nav items based on assigned css class and mouse state
                // Template li repeat class is bound to isSelected, which can be active or inactive
                // hover.inactive css class scales bottom border width from 0 to 100%
                // .active css class scales bottom border width from 0 to 100%
                // .inactive css class scales bottom border width from 100 to 0%
                self.NavItemClick = function NavItemClick(event, title) {
                    // Don't perform normal anchor tag click actions
                    // This allows us to see the href location of our anchor tag in our browser on rollover
                    // console.log(event);
                    event.preventDefault();
                    // Passed from template on click for comparison to current route
                    self.title = title.toLowerCase();
                    // If title clicked != current route then set route and window location (view)
                    // GetCleanRoute BREAKS when in portfolio project detail
                    // Setting to GetCurrentRoute works
                    // clicking current button runs code again unnecessarily though
                    // Fix?
                    // Will become issue with complex sub menu navigation
                    if (self.title != Portfolio.GetCurrentRoute()) {
                        Portfolio.SetCurrentRoute(self.title);
                        Portfolio.SetLocation();
                    }
                };
                // .inactive css class is only added by JS on rollover and not in the template by default
                // If it were, each nav item would perform the .inactive css class animation on page load
                // Not sure if there's a pure css way to do this?
                self.NavItemMouseEnter = function NavItemMouseEnter(title) {
                    self.title = title.toLowerCase();
                    if (self.title != Portfolio.GetCleanRoute()) {
                        self.data[self.dataPath][self.title].isSelected = "inactive";
                    }
                };
                // Listen to $rootScope for $routeChangeSuccess
                $scope.$on('$routeChangeSuccess', function () {
                    self.SetNavItemSelected();
                });
                // On route change success, deactivate previous nav item and activate new one
                self.SetNavItemSelected = function SetNavItemSelected () {
                    // Again, ensure the object exists in the datapath or this will fail
                    if (self.data[self.dataPath][Portfolio.GetPreviousRoute()] != undefined) {
                        self.data[self.dataPath][Portfolio.GetPreviousRoute()].isSelected = "inactive";
                    }
                    if (self.data[self.dataPath][Portfolio.GetCleanRoute()] != undefined) {
                        self.data[self.dataPath][Portfolio.GetCleanRoute()].isSelected = "active";
                    }
                };
            }
        ]
    });
})();