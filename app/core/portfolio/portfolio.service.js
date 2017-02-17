(function () {
    'use strict';
    
    angular.module('core.portfolio').factory('Portfolio', ['$location','$resource',
        function ($location, $resource) {
            var self = this;
            // Load resource
            self.data = $resource('portfolioData/:projectId.json', {}, {
                query: {
                    method: 'GET',
                    params: {projectId: 'portfolio'}
                }
            });
            // On initial app load look into location object for current route
            self.data.GetDefaultRoute = function GetDefaultRoute () {
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
            // Set current route to incoming newRoute
            self.data.SetCurrentRoute = function SetCurrentRoute (newRoute) {
                self.currentRoute = newRoute;
                self.data.CleanCurrentRoute();
            };
            // Clean current route of slashes for css
            self.data.CleanCurrentRoute = function CleanCurrentRoute () {
                self.currentRouteSplit = self.currentRoute.split('/')[1];
                if (self.currentRouteSplit == "" || self.currentRouteSplit == undefined) {
                    self.currentRouteSplit = "home";
                }
            };
            // Return clean route
            self.data.GetCleanRoute = function GetCleanRoute () {
                return self.currentRouteSplit;
            };
            // Set window location to incoming id
            self.data.SetLocation = function SetLocation () {
                // If home is sent the route changes twice
                if (self.currentRoute == 'home') {self.currentRoute = '/';}
                $location.path(self.currentRoute);
            };
            self.data.GetDefaultRoute();
            return self.data;
        }
    ]);
})();
// https://docs.angularjs.org/api/ngResource/service/$resource
// $resource(url template, [paramDefaults], [actions], options);