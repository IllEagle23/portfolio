(function () {
    'use strict';
    // Register the Portfolio factory with it's route getters and setters used in navigation
    angular.module('core.portfolio').factory('Portfolio', ['$location','$resource', '$rootScope',
        function ($location, $resource, $rootScope) {
            var self = this;
            // Load resource
            console.log("check");
            self.data = $resource('portfolioData/:projectId.json', {}, {
                query: {
                    method: 'GET',
                    params: {projectId: 'portfolio'}
                }
            });
            // On initial app load look into location object for current route
            self.data.SetDefaultRoute = function SetDefaultRoute () {
                self.currentRoute = $location.$$path;
                // Known default from location object will be / due to app config
                // Change to /home for comparison on nav item click
                self.data.CheckForHome();
                self.data.SetTopRoute();
            };
            self.data.CheckForHome = function CheckForHome () {
                if (self.currentRoute == "/" || self.currentRoute == "" || self.currentRoute == undefined) {
                    self.currentRoute = "/home"
                }
            };
            // Return current route for comparison to clicked nav item
            self.data.GetCurrentRoute = function GetCurrentRoute () {
                return self.currentRoute;
            };
            // Set current route to incoming _currentRoute_ on routeChange event
            self.data.SetCurrentRoute = function SetCurrentRoute (_currentRoute_) {
                // Route change may happen without click
                // Navigating with back and forward on browser via keyboard input
                // should still change nav item selected when not using the mouse to click
                self.currentRoute = _currentRoute_;
                self.data.CheckForHome();
                self.data.SetTopRoute();
            };
            // Clean current route of slashes and sub-routes for css
            self.data.SetTopRoute = function SetTopRoute () {
                self.topRoute = self.currentRoute.split('/')[1];
            };
            // Return route for top level directories only
            self.data.GetTopRoute = function GetCleanRoute () {
                return self.topRoute;
            };
            // Set previous route to incoming _previousRoute_ on route change event
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
            self.data.SetNextRoute = function SetNextRoute (_nextRoute_) {
                self.nextRoute = _nextRoute_;
            };
            // Set window location to incoming id
            self.data.SetLocation = function SetLocation () {
                // If /home is sent the route changes twice due to app config
                if (self.nextRoute == '/home') {self.nextRoute = '/';}
                
                $location.path(self.nextRoute);
            };
            // Listen to $rootScope for route change event
            $rootScope.$on('$routeChangeStart', function (scope, next, current) {
                self.SetRoutes(scope, next, current);
            });
            // Redefine previous and current route on route change
            self.SetRoutes = function SetRoutes(scope, next, current) {
                self.data.SetPreviousRoute(current.$$route.originalPath.split('/')[1]);
                self.data.SetCurrentRoute(next.$$route.originalPath);
                document.title = next.$$route.title;
            };
            self.data.SetDefaultRoute();
            return self.data;
        }
    ]);
})();
// https://docs.angularjs.org/api/ngResource/service/$resource
// $resource(url template, [paramDefaults], [actions], options);