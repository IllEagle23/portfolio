(function () {
    'use strict';
    
    angular.module('core.portfolio').factory('Portfolio', ['$location','$resource',
        function ($location, $resource) {
            var self = this;
            self.data = $resource('portfolioData/:projectId.json', {}, {
                query: {
                    method: 'GET',
                    params: {projectId: 'portfolio'}
                }
            });
            self.data.GetCurrentRoute = function GetCurrentRoute () {
                return self.currentRoute;
            };
            self.data.SetCurrentRoute = function SetCurrentRoute (newRoute) {
                self.currentRoute = newRoute.split("/")[0];
                $location.path(newRoute);
            };
            self.data.GetDefaultRoute = function SetDefaultRoute () {
                self.currentRoute = $location.$$path.split("/")[1];
                self.currentRoute == "" ? self.currentRoute = "home" : self.currentRoute;
            };
            self.data.GetDefaultRoute();
            return self.data;
        }
    ]);
})();
// https://docs.angularjs.org/api/ngResource/service/$resource
// $resource(url template, [paramDefaults], [actions], options);
