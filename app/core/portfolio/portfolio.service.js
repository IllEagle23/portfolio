(function () {
    'use strict';
    // Register the Portfolio factory with it's route getters and setters used in navigation
    angular.module('core.portfolio').factory('Portfolio', ['$location','$resource', '$rootScope',
        function ($location, $resource, $rootScope) {
            var self = this;
            // Load resource
            self.data = $resource('portfolioData/:projectId.json', {}, {
                query: {
                    method: 'GET',
                    params: {projectId: 'portfolio'}
                }
            });
            // On initial app load look into location object for current route
            self.data.SetDefaultRoute = function SetDefaultRoute () {
                self.currentRoute = $location.$$path;
                if (self.currentRoute == "/" || self.currentRoute == "" || self.currentRoute == undefined) {
                    self.currentRoute = "/home"
                }
                self.data.CleanCurrentRoute();
            };
            // Return current route
            self.data.GetCurrentRoute = function GetCurrentRoute () {
                return self.currentRoute;
            };
            // Set current route to incoming _currentRoute_
            self.data.SetCurrentRoute = function SetCurrentRoute (_currentRoute_) {
                // This is called on click and again on route change
                // Nav item click sets currentRoute var and then changes location
                // On route change currentRoute is set again
                // Route change may happen without click
                // Navigating with back and forward on browser via keyboard input
                // should still change nav item selected when not using the mouse to click
                // Performance issue with scalability?
                self.currentRoute = _currentRoute_;
                // console.log(self.currentRoute);
                self.data.CleanCurrentRoute();
            };
            // Clean current route of slashes and sub-routes for css
            self.data.CleanCurrentRoute = function CleanCurrentRoute () {
                self.currentRouteSplit = self.currentRoute.split('/')[1];
                if (self.currentRouteSplit == "" || self.currentRouteSplit == undefined) {
                    self.currentRouteSplit = "home";
                }
            };
            // Return clean route for top level directories only
            self.data.GetCleanRoute = function GetCleanRoute () {
                return self.currentRouteSplit;
            };
            // Set previous route to incoming _previousRoute_
            self.data.SetPreviousRoute = function SetPreviousRoute (_previousRoute_) {
                self.previousRoute = _previousRoute_;
                if (self.previousRoute == "" || self.previousRoute == undefined) {
                    self.previousRoute = 'home';
                }
            };
            // Return previous route
            self.data.GetPreviousRoute = function GetPreviousRoute () {
                return self.previousRoute;
            };
            // Set window location to incoming id
            self.data.SetLocation = function SetLocation () {
                // If home is sent the route changes twice due to app config
                if (self.currentRoute == 'home') {self.currentRoute = '/';}
                $location.path(self.currentRoute);
            };
            // Listen to $rootScope for route change event
            $rootScope.$on('$routeChangeStart', function (scope, next, current) {
                self.SetRoutes(scope, next, current);
            });
            // Redefine previous and current route on route change
            self.SetRoutes = function SetRoutes(scope, next, current) {
                self.data.SetPreviousRoute(current.$$route.originalPath.split('/')[1]);
                // NEXT has / at beginning of route which
                self.data.SetCurrentRoute(next.$$route.originalPath);
            };
            self.data.SetDefaultRoute();
            return self.data;
        }
    ]);
})();
// https://docs.angularjs.org/api/ngResource/service/$resource
// $resource(url template, [paramDefaults], [actions], options);