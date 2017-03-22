(function () {
    'use strict';

// Register `global-navigation` component, along with its associated controller and template
    angular.module('core.globalNavigation').component('globalNavigation', {
        templateUrl: function($element, $attrs) {
            return $attrs.templateUrl;
        },
        controller: ['$attrs', '$scope', 'Portfolio', '$route',
            function NavigationController($attrs, $scope, Portfolio, $route) {
                var self = this;
                if ($attrs.defaultRoute !== undefined) {
                    Portfolio.SetDefaultRoute($attrs.defaultRoute);
                }
                
                self.dataPath = $attrs.datapath;
                // Read from resource
                self.data = Portfolio.query(function () {
                    // Check if datapath has topRoute as an object
                    // It will otherwise be undefined and fail
                    // For example the footer datapath will likely not have the same header nav object
                    if (self.data[self.dataPath][Portfolio.GetTopRoute()] !== undefined) {
                        // Set default nav item active based on current route on page load / refresh
                        self.data[self.dataPath][Portfolio.GetTopRoute()].isSelected = 'active';
                    }
                });
                self.RouteClass = function RouteClass () {
                    return Portfolio.GetTopRoute();
                };
                // Set document title on header template init
                // Helpful in analytics page views
                self.SetDocumentTitle = function SetDocumentTitle () {
                    document.title = $route.current.title;
                };
                // Rollover and click animation for nav items based on assigned css class and mouse state
                // Template li repeat class is bound to isSelected, which can be active or inactive
                // hover.inactive css class scales bottom border width from 0 to 100%
                // .active css class scales bottom border width from 0 to 100%
                // .inactive css class scales bottom border width from 100 to 0%
                // CAN THIS SIMPLY RELY ON EVENT DEFAULT AND LET ROUTE CHANGE EVENT HANDLE BUTTON STATES?
                self.NavItemClick = function NavItemClick(event, title) {
                    // // Don't perform normal anchor tag click actions
                    // // This allows us to see the href location of our anchor tag in our browser on rollover
                    // event.preventDefault();
                    // // Passed from template on click for comparison to current route
                    // self.title = "/" + title.toLowerCase();
                    // // If title clicked != current route then set route and window location (view)
                    // if (self.title != Portfolio.GetCurrentRoute()) {
                    //     Portfolio.SetNextRoute(self.title);
                    //     Portfolio.SetLocation();
                    // }
                };
                // .inactive css class is only added by JS on rollover and not in the template by default
                // If it were, each nav item would perform the .inactive css class animation on page load
                // Not sure if there's a pure css way to do this?
                self.NavItemMouseEnter = function NavItemMouseEnter(title) {
                    self.title = title.toLowerCase();
                    if (self.title != Portfolio.GetTopRoute()) {
                        self.data[self.dataPath][self.title].isSelected = "active";
                    }
                };
                self.NavItemMouseLeave = function NavItemMouseLeave(title) {
                    self.title = title.toLowerCase();
                    if (self.title != Portfolio.GetTopRoute()) {
                        self.data[self.dataPath][self.title].isSelected = "inactive";
                    }
                };
                // Listen to $rootScope for $routeChangeSuccess
                // Fires once for each navigation component in view
                $scope.$on('$routeChangeSuccess', function () {
                    self.SetNavItemSelected();
                });
                // On route change success
                // deactivate previous nav item if it exists in this component
                // and activate new one if it exists in this component
                self.SetNavItemSelected = function SetNavItemSelected () {
                    // Again, ensure the object exists in the datapath or this will fail
                    if (self.data[self.dataPath][Portfolio.GetPreviousRoute()] !== undefined) {
                        self.data[self.dataPath][Portfolio.GetPreviousRoute()].isSelected = "inactive";
                    }
                    if (self.data[self.dataPath][Portfolio.GetTopRoute()] !== undefined) {
                        self.data[self.dataPath][Portfolio.GetTopRoute()].isSelected = "active";
                    }
                };
            }
        ]
    });
})();